import { User } from '@prisma/client';

export type SafeUser = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
