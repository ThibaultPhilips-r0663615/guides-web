import axios from 'axios';
import app from './../firebase'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
const auth = getAuth(app);

export const state = () => ({
    user: null,
    accessToken: ''
})

export const mutations = {
    SET_USER(state, user) {
        console.log('auth set user')
        state.user = user;
    },
    SIGN_OUT(state) {
        console.log('auth remove user')
        state.user = null;
    },
    SET_ACCESS_TOKEN(state, value) {
        state.accessToken = value;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        console.log('nuxtServerInit')
    },
    async login({ commit, req }, payload) {
        return await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then(async (userCredential) => {
                console.log(userCredential)
                commit('SET_ACCESS_TOKEN', userCredential.stsTokenManager.accessToken)
                commit('SET_USER', JSON.parse(JSON.stringify(userCredential)))
            })
            .catch((error) => {
                console.log(error)
            });
    },
    async logout({ commit, req }) {
        return await signOut(auth).then(async () => {
            console.log('signed out user')
            commit('SIGN_OUT')
            commit('SET_ACCESS_TOKEN', '')
        }).catch((error) => {
            // An error happened.
        });
    },
    async isAuthenticated({ commit, req }) {
        return await axios.get(`${process.env.API_URL_REMOTE}/is-authenticated`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`, "refreshToken": localStorage.getItem('refreshToken'), "Content-Type": "application/json"
            }
        })
            .then((res) => {

            })
            .catch((err) => {
                commit('SET_USER', null)
            })
    }
}
export const getters = {
    getUser(state) {
        return state
    }
}