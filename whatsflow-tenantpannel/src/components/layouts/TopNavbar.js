'use client'
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, LogOut } from 'lucide-react';
import { logout } from '@/store/features/authSlice';

export default function TopNavbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const notifications = useSelector(state => state.notifications.items);
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract first two letters of name if no image
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <div className="h-16 bg-white text-black px-4 flex items-center justify-between border-b border-gray-200 relative">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="cursor-pointer p-2 rounded-full hover:bg-gray-200">
            <Bell size={20} className="text-black" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="cursor-pointer flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200"
          >
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                {getInitials(user?.name)}
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-4 text-center">
                <p className="font-semibold">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 text-red-500 hover:bg-gray-200 rounded-b-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
