module.exports = {
  locales: ['__default', 'en', 'pt'],
  defaultLocale: '__default',
  localesToIgnore: ['__default'],
  pages: {
    '*': ['common', 'a11y'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}.json`).then((r) => r.default),
};
