import axios from 'axios';
var prevCachedTime;
var cachDuration = 1 * 60000;


export const state = () => ({
    items: [],
})

export const mutations = {
    SET_GUIDES(state, guides) {
        state.items = guides;
    },
}

export const actions = {
    async get({ commit, req }) {
        if(!!prevCachedTime) {
            if ((new Date()).getTime() > prevCachedTime.getTime() + cachDuration) {
                prevCachedTime = new Date();
                return await axios.get(`${process.env.API_URL_REMOTE}/get-guides`)
                    .then((res) => {
                        commit('SET_GUIDES', res.data);
                    })
            }
        }
        else {
            prevCachedTime = new Date();
            return await axios.get(`${process.env.API_URL_REMOTE}/get-guides`)
                .then((res) => {
                    commit('SET_GUIDES', res.data);
                })
        }
    },
    async getForce({ commit, req }) {
        return await axios.get(`${process.env.API_URL_REMOTE}/get-guides`)
            .then((res) => {
                commit('SET_GUIDES', res.data);
            })
    }
}