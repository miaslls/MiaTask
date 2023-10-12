import { Prisma } from '@prisma/client';

export default function getErrorMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // COMMON
      case 'P1000':
      case 'P1001':
      case 'P1002':
      case 'P1003':
      case 'P1008':
      case 'P1009':
      case 'P1010':
      case 'P1011':
      case 'P1013':
      case 'P1014':
      case 'P1015':
      case 'P1016':
      case 'P1017':
        return 'Database Connection Error';

      // PRISMA CLIENT (Query Engine)
      case 'P2000':
        return 'One of the values provided is too long.';
      case 'P2001':
        return 'The record searched for does not exist.';
      case 'P2002':
        return 'Unique constraint failed. (Duplicate task)'; // ⚠️
      case 'P2003':
        return 'Foreign key constraint failed.';
      case 'P2004':
        return 'A constraint failed on the database.';
      case 'P2012':
        return 'Missing a required value.';

      default:
        return 'Prisma Client Request Error';
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return 'Prisma Client Unknown Request Error';
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return 'Prisma Client Initialization Error';
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'Prisma Client Validation Error';
  }

  return 'Internal Server Error';
}
