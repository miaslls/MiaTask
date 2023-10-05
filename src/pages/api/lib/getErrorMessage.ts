import { Prisma } from '@prisma/client';

export default function getErrorMessage(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return error.message.split('\n').filter(Boolean).join(' ');
  }

  return 'Internal Server Error';
}
