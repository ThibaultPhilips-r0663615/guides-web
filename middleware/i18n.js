export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }
  // Get locale from params

  let currentPathLang;
  let locale = defaultLocale
  if (params.lang) {
    currentPathLang = store.state.locales.filter(locale => locale.toLowerCase() == params.lang.toLowerCase())

    if (currentPathLang.length >= 1) {
      locale = currentPathLang[0];
    }
  }
  else if (params.pathMatch) {
    currentPathLang = store.state.locales.filter(locale => locale.toLowerCase() == params.pathMatch?.substring(1, 3)?.toLowerCase())

    console.log(currentPathLang)

    if (currentPathLang.length >= 1) {
      locale = currentPathLang[0];
    }
  }

  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /<defaultLocale>/... -> redirect to /...
  if (route.fullPath.indexOf('/' + locale) === -1) {
    const toReplace = '^/';
    //const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, `/${defaultLocale}/`)
    )
  }
}
