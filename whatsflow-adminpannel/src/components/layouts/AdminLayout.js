
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Cookies from 'js-cookie';
import { logout } from '@/store/features/authSlice';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    // Check if user is authenticated on page load
    const token = Cookies.get('auth_token');
    const user = Cookies.get('user');
    
    if (token && user) {
      // If token and user exist in cookies, authenticate the user
      dispatch({
        type: 'auth/loginSuccess',
        payload: { token, user: JSON.parse(user) }
      });
    } else if (!loading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/');
    }
  }, [isAuthenticated, loading, router, dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 text-gray-900">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
