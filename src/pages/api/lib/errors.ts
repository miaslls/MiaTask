import { Prisma } from '@prisma/client';
import getT from 'next-translate/getT';

export async function getErrorMessage(error: unknown, lang: string) {
  const t = await getT(lang, 'errors');

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
        return t('db-connection');

      // PRISMA CLIENT (Query Engine)
      case 'P2000':
        return t(error.code); // ⚠️ default: One of the values provided is too long.
      case 'P2001':
        return t('P2001');
      case 'P2002':
        return t(error.code); // ⚠️ default: Unique constraint failed.
      case 'P2003':
        return t(error.code);
      case 'P2004':
        return t(error.code);
      case 'P2012':
        return t(error.code);

      default:
        return t('prisma-client.request');
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return t('prisma-client.unknown-request');
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return t('prisma-client.initialization');
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return t('prisma-client.validation');
  }

  return t('internal-server');
}
