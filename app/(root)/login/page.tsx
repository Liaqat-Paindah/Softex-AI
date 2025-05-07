'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import { useActionState } from 'react';
import { LoginAction } from '../components/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [state, handleLogin, IsPending ] = useActionState(LoginAction, undefined)

  return (
    <div className="pt-[3%] flex items-center justify-center bg-[#0a0f1a] px-4">
      <div className="w-full max-w-md bg-[#121826] rounded-[8px] p-8 shadow-2xl text-white">


        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">
          Sign in to your account
        </h2>

        <form action={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-[12px] text-gray-400 mb-1">
              Email address
            </label>
            <input
              type="email"
              name='Email'
              className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border text-[12px] border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
               { state?.errors?.Email && (
              <ul className="mt-1 text-sm text-red-500 list-disc list-inside">
                {state.errors.Email.map((en) => (
                  <li key={en}>{en}</li>
                ))}
              </ul>
            )}
          </div>
       

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm text-[12px] text-gray-400">
                Password
              </label>
              <span
                onClick={() => router.push('/forgot')}
                className="text-cyan-500 text-sm text-[12px] cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>
            <input
              id="password"
              type="password"
              name='Password'

              className="w-full px-4 py-2 rounded bg-[#1f2937] text-white border text-[12px] border-[#2e3a4e] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-cyan-600 text-[12px] hover:bg-cyan-700 transition rounded-md text-white text-[12px]"
          >
            { IsPending ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => signIn('github')}
          className="w-full mt-4 flex items-center justify-center text-[12px] gap-2 py-2 border border-[#2e3a4e] hover:bg-[#2e3a4e] transition rounded-md text-sm text-gray-200"
        >
          <Github size={18} />
          Sign in with GitHub
        </button>
        <p
          onClick={() => router.push('/signup')}
          className="text-center text-sm text-cyan-400 text-[12px] mt-6 hover:underline cursor-pointer"
        >
          Create Account 
        </p>
      </div>
    </div>
  );
}
