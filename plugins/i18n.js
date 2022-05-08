import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let config = {
  headers: {
      withCredentials: true,
      'Content-Type': 'application/json'
  }
}

export default async ({ app, store }) => {
  store.commit('SET_LOCALES', ['fr', 'nl', 'en'])
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'nl',
    messages: {
      en: require('~/locales/en/common.json'),
      fr: require('~/locales/fr/common.json'),
      nl: require('~/locales/nl/common.json')
    }
  })

  app.i18n.path = (link) => {
    return `/${app.i18n.locale}/${link}`
  }
}
