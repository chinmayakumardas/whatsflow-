'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginStart, loginSuccess, loginFailure } from '@/store/features/authSlice';
import Cookies from 'js-cookie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';  // Lucide React icons
import { toast } from 'react-toastify';  // React Toastify for notifications

const mockLogin = async (credentials) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (credentials.email === 'it_chinmaya@outlook.com' && credentials.password === 'admin123') {
    return {
      user: {
        id: 1,
        name: 'Chinmaya(Admin)',
        email: credentials.email,
        role: 'admin',
      },
      token: 'mock-jwt-token',
    };
  }
  throw new Error('Invalid credentials');
};

const AuthFormContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState('it_chinmaya@outlook.com');
  const [password, setPassword] = useState('admin123');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // For toggling password visibility
  const [sendingEmail, setSendingEmail] = useState(false);  // State for email sending during reset

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const response = await mockLogin({ email, password });
      dispatch(loginSuccess(response));

      Cookies.set('auth_token', response.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });

      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 5000,
      });

      router.push('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.message));
      toast.error('Invalid credentials!', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleResetPassword = async () => {
    setSendingEmail(true);
    toast.info('Sending password reset email...', {
      position: "top-right",
      autoClose: 5000,
    });

    // Simulate sending email process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSendingEmail(false);
    setResetEmailSent(true);
    toast.success('Password reset email sent!', {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <Card
        className="w-[50vw] h-auto max-w-md bg-white flex justify-center flex-col rounded-xl border border-white/10 p-8 space-y-6 transition-all duration-500 ease-in-out"
      >
        <CardHeader>
          <CardTitle className="text-center">{isReset ? 'Reset Password' : 'Admin Login'}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 w-full">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
            }}
            className="w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#57b092] focus:border-[#57b092]"
            required
          />

          {!isReset && (
            <div className="relative w-full">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#57b092] focus:border-[#57b092]"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          )}

          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full cursor-pointer"
              onClick={isReset ? handleResetPassword : handleLogin}
              disabled={loading || (isReset ? !isEmailValid : !email || !password)}
            >
              {loading ? 'Processing...' : isReset ? (sendingEmail ? 'Sending Email...' : 'Reset Password') : 'Login'}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Button
              variant="link"
              className="w-full text-center cursor-pointer"
              onClick={() => {
                if (isReset && resetEmailSent) {
                  setResetEmailSent(false);
                }
                setIsReset(!isReset);
              }}
            >
              {isReset ? (resetEmailSent ? 'Try another email' : 'Back to Login') : 'Forgot Password?'}
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default AuthFormContainer;
