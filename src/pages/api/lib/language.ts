import { NextApiRequest } from 'next';

export const availableLocales = ['en', 'pt'];
export const fallbackLang: string = 'en';

export function getRequestLanguage(req: NextApiRequest) {
  const reqLocale = req.headers['accept-language'];

  if (reqLocale) {
    const lang = reqLocale.slice(0, 2);

    if (availableLocales.includes(lang)) {
      return lang;
    }
  }

  return fallbackLang;
}
