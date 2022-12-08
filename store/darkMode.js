export const state = () => ({
  value: false,
});

export const getters = {
  darkModeValue(state) {
    return state.value;
  },
};

export const mutations = {
  toggleDarkMode(state) {
    state.value = !state.value;
  },
  setDarkmode(state, { mode }) {
    state.value = mode;
  },
};
