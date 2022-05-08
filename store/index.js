import app from './../firebase'
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
const auth = getAuth(app);


export const state = () => ({
    locales: ['en', 'fr', 'nl'],
    locale: 'nl'
})

export const mutations = {
    SET_LANG(state, locale) {
        console.log(`set lang called with state: ${state.locale}, locale: ${locale}`)
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
        else {
            state.locale = 'nl'
        }
    },
    SET_LOCALES(state, locales) {
        state.locales = locales
    }
}

export const actions = {
    async nuxtClientInit(context) {
        await setPersistence(auth, browserLocalPersistence)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                context.commit('auth/SET_USER', JSON.parse(JSON.stringify(user)))
                context.commit('auth/SET_ACCESS_TOKEN', user.accessToken)
            }
        });
    },
    async nuxtServerInit({ commit, dispatch }, { req }) {
        
    }
}