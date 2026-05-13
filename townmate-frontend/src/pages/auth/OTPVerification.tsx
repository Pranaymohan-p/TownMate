import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { formatPhoneNumber } from '@/lib/utils';
import { Loader } from 'lucide-react';

export function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const phone = localStorage.getItem('tempPhone');

  useEffect(() => {
    if (!phone) {
      navigate('/login');
    }
  }, [phone, navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/verify-otp', {
        phoneNumber: phone,
        otpCode: otp,
      });

      login(response.data.token, response.data.user);
      navigate(response.data.user.role === 'CUSTOMER' ? '/customer-dashboard' : '/traveler-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post('/auth/send-otp', { phoneNumber: phone });
      setResendCountdown(30);
      setError('');
    } catch (err: any) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center font-heading mb-2">Verify OTP</h1>
          <p className="text-center text-muted-foreground">
            We sent an OTP to {phone && formatPhoneNumber(phone)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter 6-digit OTP</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-border rounded-lg text-center text-2xl letter-spacing tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resendCountdown > 0}
            className="text-primary font-medium hover:underline disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            {resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}s`
              : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
