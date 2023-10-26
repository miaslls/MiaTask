module.exports = {
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  defaultNS: 'common',
  pages: {
    '*': ['common', 'a11y'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: async (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}`).then((r) => r.default),
};
