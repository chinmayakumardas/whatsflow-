// export default function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard Page</h1>
//       <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
//         <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px' }}>
//           <h3>Total Users</h3>
//           <p>1,234</p>
//         </div>
//         <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px' }}>
//           <h3>Active Subscriptions</h3>
//           <p>987</p>
//         </div>
//         <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px' }}>
//           <h3>Monthly Revenue</h3>
//           <p>$12,345</p>
//         </div>
//       </div>
//       <div style={{ height: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
//         <h3>User Growth</h3>
//         {/* Chart placeholder */}
//       </div>
//     </div>
//   );
// }


'use client'

import { 
  MessageSquare, 
  CheckCircle, 
  FileText, 
  Users,
  UserPlus
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white  p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 ">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
      </div>
      <Icon className="text-blue-500" size={24} />
    </div>
  </div>
);

export default function DashboardPage() {
  // Mock data for charts
  const messageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Messages Sent',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'User Engagement',
      data: [30, 45, 57, 48, 65, 59, 80],
      borderColor: 'rgb(34, 197, 94)',
      tension: 0.1,
      fill: false
    }]
  };

  const deliveryData = {
    labels: ['Delivered', 'Failed', 'Pending'],
    datasets: [{
      data: [85, 10, 5],
      backgroundColor: [
        'rgba(34, 197, 94, 0.5)',
        'rgba(239, 68, 68, 0.5)',
        'rgba(234, 179, 8, 0.5)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(234, 179, 8)'
      ],
      borderWidth: 1
    }]
  };

  return (
 
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Messages" 
            value="12,543"
            icon={MessageSquare}
            trend={8.2}
          />
          <MetricCard 
            title="Delivery Rate" 
            value="95.8%"
            icon={CheckCircle}
            trend={2.1}
          />
          <MetricCard 
            title="Active Templates" 
            value="24"
            icon={FileText}
            trend={-1.5}
          />
          <MetricCard 
            title="New Users" 
            value="156"
            icon={UserPlus}
            trend={12.5}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Performance */}
          <div className="bg-white  p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Message Performance</h3>
            <Bar 
              data={messageData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>

          {/* User Engagement */}
          <div className="bg-white  p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
            <Line 
              data={engagementData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>

          {/* Delivery Status */}
          <div className="bg-white  p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Delivery Status</h3>
            <div className="w-2/3 mx-auto">
              <Pie 
                data={deliveryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white  p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'sent a promotional message', time: '2 minutes ago' },
                { user: 'Jane Smith', action: 'created a new template', time: '15 minutes ago' },
                { user: 'Mike Johnson', action: 'updated API credentials', time: '1 hour ago' },
                { user: 'Sarah Wilson', action: 'deleted a campaign', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0">
                  <div>
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-500 "> {activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500 ">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
  );
}
