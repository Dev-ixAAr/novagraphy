'use client';

import { useActionState } from 'react';
import { loginAdmin } from './actions';

export default function AdminLoginPage() {
  // Updated Hook: useActionState (imported from 'react')
  // It returns [state, formAction, isPending]
  const [state, action, isPending] = useActionState(loginAdmin, undefined);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f1115] text-slate-200">
      <div className="w-full max-w-md p-8 bg-[#181b21] rounded-xl border border-slate-800 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm">Sign in to access your dashboard</p>
        </div>

        <form action={action} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-slate-300 block"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 bg-[#0f1115] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-slate-600 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="text-sm font-medium text-slate-300 block"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#0f1115] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-slate-600 transition-all"
            />
          </div>

          {/* Error Message Display */}
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {state.error}
            </div>
          )}

          {/* Submit Button - Now uses isPending directly */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}