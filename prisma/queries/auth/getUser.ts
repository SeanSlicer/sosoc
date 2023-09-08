// prisma/queries/user.ts

import { prisma } from '@/lib/client/db';
import bcrypt from 'bcrypt';

export async function getUserByUsernameOrEmailAndPassword(
  usernameOrEmail: string,
  password: string
) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: usernameOrEmail,
        },
        {
          email: usernameOrEmail,
        },
      ],
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }

  return null; // Return null if no matching user or invalid password
}
