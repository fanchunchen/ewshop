import { ADDTOCART } from "./mutations.type";

const mutations = {
  [ADDTOCART](state, num) {
    state.cartNum = num;
  }
};
export default mutations;
