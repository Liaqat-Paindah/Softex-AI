'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ForgotPassword = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    // TODO: Add API call to trigger password reset
  };

  return (
    <div className="pt-[6%] flex items-center justify-center bg-[#0a0f1a] px-4">
      <div className="w-full max-w-md bg-[#121826] rounded-[8px] p-8 shadow-2xl text-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-[12px]">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-white/70"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 transition rounded-md text-white font-medium"
          >
            Send Reset Link
          </button>
        </form>

        <p
          onClick={() => router.push('/login')}
          className="text-sm text-cyan-400 mt-6 cursor-pointer hover:underline"
        >
          Back to login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
