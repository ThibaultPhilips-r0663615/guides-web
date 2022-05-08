import axios from 'axios';

export const state = () => ({
    walks: []
})

export const mutations = {
    SET_WALKS(state, walks) {
        state.walks = [...walks];
    }
}

export const actions = {
    async fetch({ commit, req }) {
        console.log('fetching')
        return await axios
            .get(`${process.env.API_URL_LOCALE}/walks`)
            .then((res) => {
                console.log(res.data)
                commit('SET_WALKS', res.data)
            });
    }
}