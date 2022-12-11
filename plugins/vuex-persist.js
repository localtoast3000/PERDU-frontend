import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    state: store,
  }).plugin(store);
};
