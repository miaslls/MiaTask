// issue #484 - getT on API route on Vercel (serverless)
// https://github.com/aralroca/next-translate/issues/484

import getT from 'next-translate/getT';
import i18n from '@root/i18n';

export function ensureGetTAvailability() {
  global.i18nConfig = i18n;
  return getT;
}
