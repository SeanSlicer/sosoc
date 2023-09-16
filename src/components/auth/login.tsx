import React, { type FC, useState, type ChangeEvent } from 'react';
import { useRouter} from 'next/router';
import { trpc } from '@/lib/client/trpc';
import Link from 'next/link';

const Login : FC = () => {

  const router = useRouter()

  const { mutate: login, error } = trpc.user.login.useMutation({
    onSuccess: async () => {
      await router.push('/dashboard')
    },
  })

const [input, setInput] = useState({
  usernameOrEmail: '',
  password: '',
})

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setInput((prev) => ({ ...prev, [name]: value }))
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" >
        <div className="text-center text-red-500 text-sm">
            {error && (
              <p>{error.message}</p>
            )}
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email or Username
              </label>
              <input
                id="email"
                name="usernameOrEmail"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={input.usernameOrEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
            onClick={() => login(input)}
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link className="text-indigo-600 hover:text-indigo-500" href="/signUp">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
