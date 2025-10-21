import React from 'react'
import { Card } from '../../../components/ui/card'
import InactiveCashierTable from './InactiveCashierTable'
import LowStockProductTable from './LowStockProductTable'
import NoSaleTodayBranchTable from './NoSaleTodayBranchTable'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getStoreAlerts } from '../../../Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks'
import { useEffect } from 'react'
import RefundSpikeTable from './RefundSpikeTable'

const Alerts = () => {
     const dispatch = useDispatch();
      const storeAnalytics = useSelector((state) => state.storeAnalytics);
      const user=useSelector((state) => state.user.userProfile);
    
      useEffect(() => {
        if (user?.id) {
          dispatch(getStoreAlerts(user.id));
        }
      }, [dispatch, user?.id]);
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
        <div className='col-span-2 '>
            <Card className="min-h-96  px-5 py-1 pt-5">
                <h1 className='font-bold text-2xl'>Inactive Cashiers</h1>
                <InactiveCashierTable/>
            </Card>
        </div>
        <div className='col-span-2'>
              <Card className="min-h-96  px-5 py-1 pt-5">
                <h1 className='font-bold text-2xl'>Low Stock Alerts</h1>
                <LowStockProductTable/>
              </Card>
          
        </div>
        <div className='col-span-2'>
            <Card className="min-h-96 px-5 py-1 pt-5">
                <h1 className='font-bold text-2xl'>No Sale Today</h1>
                <NoSaleTodayBranchTable/>
            </Card>
        </div>
        <div className='col-span-2'>
            <Card className="min-h-96 py-1 pt-5 px-5">
                <h1 className='font-bold text-2xl'>Refund Spike</h1>
                <RefundSpikeTable/>
            </Card>
        </div>
    </div>
  )
}

export default Alerts