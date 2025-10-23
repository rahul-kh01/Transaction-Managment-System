import {FiStar} from 'react-icons/fi'
import { Badge } from '../../../../components/ui/badge'

const CustomerCard = ({customer, onSelectCustomer, selectedCustomer}) => {
  return (
     <div 
            key={customer.id} 
            className={`p-4 cursor-pointer hover:bg-accent transition-colors ${selectedCustomer?.id === customer.id ? 'bg-accent' : ''}`}
            onClick={() => onSelectCustomer(customer)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{customer.fullName || 'Unknown Customer'}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">{customer.email || 'N/A'}</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <FiStar className="h-3 w-3" />
                {customer.loyaltyPoints || 0} pts
              </Badge>
            </div>
            {/* <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">{customer.totalOrders || 0}</span> orders
              </div>
              <div>
                <span className="font-medium">₹{(customer.totalSpent || 0).toFixed(2)}</span> spent
              </div>
            </div> */}
          </div>
  )
}

export default CustomerCard