'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { CreateUser } from '../components/actions/auth';

export default function SignupPage() {
  const [state, submit, isPending] = useActionState(CreateUser, undefined);
  const router = useRouter();

  return (
    <div className="pt-[3%] flex items-center justify-center bg-[#0a0f1a] px-4">
      <div className="w-full max-w-md bg-[#121826] rounded-[8px] px-8 py-6 shadow-2xl text-white">

        <h1 className="text-2xl font-bold text-center text-gray-100">
          Create Account
        </h1>
        <p className='text-[14px]  text-green-400 py-2'>{state?.message}</p>

        <form action={submit} className="space-y-5 text-[12px]">
          {/* Email */}
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="text"
              name="Email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {state?.errors?.Email && (
              <ul className="mt-1 text-sm text-red-500 list-disc list-inside">
                {state.errors.Email.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {state?.errors?.Password && (
              <ul className="mt-1 text-sm text-red-500 list-disc list-inside">
                {state.errors.Password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="ConfrimPassword" className="block text-sm font-medium text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="ConfrimPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {state?.errors?.ConfrimPassword && (
              <ul className="mt-1 text-sm text-red-500 list-disc list-inside">
                <li>{state.errors.ConfrimPassword}</li>
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition"
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p
          onClick={() => router.push('/login')}
          className="text-center text-sm text-cyan-400 mt-6 hover:underline cursor-pointer"
        >
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
}
