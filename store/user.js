export const state = () => ({
  value: false,
});

export const getters = {
  getUser(state) {
    return state.value;
  },
};

export const mutations = {
  mountUser(state, payload) {
    state.value = payload;
  },
  dismountUser(state) {
    state.value = false;
  },
};
