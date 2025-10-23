import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/ui/button';
import {FiCheckCircle, FiHome, FiUsers, FiShoppingCart, FiInfo, FiStar} from 'react-icons/fi';
import { getAllSubscriptionPlans } from '../../../Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks';
import { subscribeToPlan, upgradeSubscription, getStoreSubscriptions } from '../../../Redux Toolkit/features/subscription/subscriptionThunks';
// import { createOrder } from '../../../Redux Toolkit/features/order/orderThunks';
import { createPaymentLinkThunk } from '../../../Redux Toolkit/features/payment/paymentThunks';

const Upgrade = () => {
  const dispatch = useDispatch();
  const { plans, loading: plansLoading, error: plansError } = useSelector((state) => state.subscriptionPlan);
  const { subscriptions, loading: subLoading, error: subError } = useSelector((state) => state.subscription);
  const { store } = useSelector((state) => state.store);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Get current active subscription for this store
  const currentSubscription = subscriptions?.find(
    (sub) => sub.store?.id === store?.id && sub.status === 'ACTIVE'
  );

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
    if (store?.id) {
      dispatch(getStoreSubscriptions({ storeId: store.id , status:"ACTIVE"}));
    }
  }, [dispatch, store?.id]);

  const handleSubscribe = async (planId) => {
    if (!store?.id) return;
    setActionLoading(true);
    setActionError(null);
    setSuccessMsg(null);
    try {
      if (currentSubscription) {
        // Upgrade
        await dispatch(upgradeSubscription({ storeId: store.id, planId })).unwrap();
        // setSuccessMsg('Subscription upgraded successfully!');
        dispatch(createPaymentLinkThunk({planId, paymentMethod: 'STRIPE'})).unwrap();
      } else {
        // New subscription
        await dispatch(subscribeToPlan({ storeId: store.id, planId })).unwrap();
        setSuccessMsg('Subscribed successfully!');
      }
      // Refresh subscriptions
      dispatch(getStoreSubscriptions({ storeId: store.id, status:"ACTIVE" }));
    } catch (err) {
      setActionError((err && err.message) || 'Failed to subscribe/upgrade.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Upgrade Your Subscription</h1>
      {plansLoading || subLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : plansError || subError ? (
        <div className="text-center text-red-500 py-8">{plansError || subError}</div>
      ) : (
        <>
          {currentSubscription && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-3">
              <FiCheckCircle  className="w-6 h-6 text-green-500" />
              <div>
                <div className="font-semibold">Current Plan: {currentSubscription.plan?.name}</div>
                <div>Status: {currentSubscription.status}</div>
                <div>Valid till: {currentSubscription.endDate}</div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`bg-card rounded-2xl p-8 shadow-lg border relative flex flex-col ${
                  currentSubscription?.plan?.id === plan.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                {currentSubscription?.plan?.id === plan.id && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Your Plan
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      ₹{plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{plan.billingCycle?.toLowerCase()}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.description && (
                    <li className="text-muted-foreground mb-2 flex items-center gap-2">
                      <FiInfo  className="w-5 h-5 text-blue-500" />
                      {plan.description}
                    </li>
                  )}
                  {plan.maxBranches && (
                    <li className="text-muted-foreground flex items-center gap-2">
                      <FiHome  className="w-5 h-5 text-purple-500" />
                      Max Branches: {plan.maxBranches}
                    </li>
                  )}
                  {plan.maxUsers && (
                    <li className="text-muted-foreground flex items-center gap-2">
                      <FiUser s className="w-5 h-5 text-orange-500" />
                      Max Users: {plan.maxUsers}
                    </li>
                  )}
                  {plan.maxProducts && (
                    <li className="text-muted-foreground flex items-center gap-2">
                      <FiShoppingCart  className="w-5 h-5 text-green-500" />
                      Max Products: {plan.maxProducts}
                    </li>
                  )}
                  {/* Extra Features as bullet points */}
                  {plan.extraFeatures && plan.extraFeatures.length > 0 && (
                    <li className="text-muted-foreground flex flex-col gap-1 mt-2">
                      <span className="font-medium flex items-center gap-2">
                        <FiStar  className="w-5 h-5 text-yellow-500" />
                        Extra Features:
                      </span>
                      <ul className="ml-7 list-disc space-y-1">
                        {plan.extraFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FiStar  className="w-4 h-4 text-yellow-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                  {/* Add more features as needed */}
                </ul>
                <Button
                  className="w-full mt-auto"
                  variant="default"
                  size="default"
                  disabled={actionLoading || currentSubscription?.plan?.id === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {currentSubscription?.plan?.id === plan.id
                    ? 'Current Plan'
                    : currentSubscription
                    ? 'Upgrade to this Plan'
                    : 'Subscribe'}
                </Button>
              </div>
            ))}
          </div>
          {actionError && <div className="text-center text-red-500 mt-6">{actionError}</div>}
          {successMsg && <div className="text-center text-green-600 mt-6">{successMsg}</div>}
        </>
      )}
    </div>
  );
};

export default Upgrade;