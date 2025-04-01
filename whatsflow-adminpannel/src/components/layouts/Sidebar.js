// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   ChevronRight,ChevronLeft,
//   LayoutDashboard, 
//   Bell, 
//   Megaphone,
//   Users, 
//   LifeBuoy, 
//   ShoppingCart, 
//   Zap, 
//   FileText, 
//   Key, 
//   Settings,UsersRound , 
//   TabletSmartphone 
// } from 'lucide-react';

// const menuItems = [
//   // Core Navigation
//   { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
//   { icon: LayoutDashboard, label: 'Analytics & Reports', href: '/analysis' },
//   { icon: LayoutDashboard, label: 'User Management', href: '/user' },
//   { icon: LayoutDashboard, label: 'Billing & Subscription', href: '/billings' },
//   { icon: LayoutDashboard, label: 'System Settings', href: '/system-settings' },
//   { icon: LayoutDashboard, label: 'Notifications & Alerts', href: '/notifications' },
//   { icon: LayoutDashboard, label: 'Audit Logs', href: '/audit' },
//   { icon: LayoutDashboard, label: 'Support & Help Center', href: '/support' },
 
  
 
 
 

 
// ];


// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const pathname = usePathname();

//   return (
//     <div className={`bg-black text-white h-screen shadow-lg transition-all duration-300 ${
//       collapsed ? 'w-16' : 'w-64'
//     }`}>
//       <div className="flex items-center justify-between p-4 border-b ">
//         {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className=" cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//         >
//           {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>
      
//       <nav className="p-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;
          
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center px-3 py-2 my-1 rounded-lg transition-colors ${
//                 isActive 
//                   //? 'bg-blue-100 text-button dark:bg-blue-900 dark:text-blue-300' 
//                   ? 'bg-blue-100 text-button dark:bg-blue-900 dark:text-blue-300' 
//                   : 'hover:bg-gray-100 dark:hover:bg-gray-800'
//               }`}
//             >
//               <Icon size={20} />
//               {!collapsed && <span className="ml-3">{item.label}</span>}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, ChevronLeft,
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  Key, 
  Settings, 
  Bell, 
  Zap, 
  LifeBuoy, 
  Megaphone, 
  TabletSmartphone,
  
   
  MessageCircle, 
  Edit, 
  
  
  
  

  Code, 
  UserCheck 
} from 'lucide-react';

// Sidebar menu items
const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Bell, label: 'Notifications & Alerts', href: '/notifications' },
  { icon: ShoppingCart, label: 'Billing & Subscription', href: '/billings' },
  { icon: FileText, label: 'Analytics & Reports', href: '/analysis' },
  { icon: Users, label: 'User Management', href: '/user' },
  { icon: Zap, label: 'Audit Logs', href: '/audit' },
  { icon: Settings, label: 'System Settings', href: '/system-settings' },
  { icon: LifeBuoy, label: 'Support & Help Center', href: '/support' },




  // for tenats

  // { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  // { icon: MessageCircle, label: 'Message Templates', href: '/templates' },
  // { icon: Zap, label: 'Campaigns & Automation', href: '/campaigns' },
  // { icon: Code, label: 'API Integration', href: '/api-integration' },
  // { icon: Users, label: 'User Management', href: '/users' },
  // { icon: ShoppingCart, label: 'Billing & Subscription', href: '/billing' },
  // { icon: Bell, label: 'Notifications & Alerts', href: '/notifications' },
  // { icon: Settings, label: 'Settings & Profile', href: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`bg-black text-white h-screen shadow-lg transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 my-1 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-button dark:bg-blue-900 dark:text-blue-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
