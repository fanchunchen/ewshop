import { cartList } from "@/request/cart";
import {ADDTOCART} from './mutations.type'
const actions = {
  addCart(context) {
    cartList().then(res => {
      // console.log(res);
      context.commit(ADDTOCART,res.data.length)
    });
  }
};
export default actions;
