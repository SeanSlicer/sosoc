import React from 'react';
import { useRouter } from 'next/router';
import { trpc } from '@/lib/client/trpc';

const SignOutButton: React.FC = () => {
  const router = useRouter();
  const { mutate: signOut, error } = trpc.user.signOut.useMutation({
    onSuccess: async () => {
      await router.push('/login')
    },
  })

  return (
    <button
      onClick={() => signOut}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
