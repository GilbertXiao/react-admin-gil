import { ADD_PRODUCT, UPDATE_PRODUCT,PRODUCT_DETAIL } from "../actionType";

const initProduct = {};

const productReducer = (state=initProduct,action) => {
  const {type} = action;
  switch (type) {
    case ADD_PRODUCT:
      return {};
    case UPDATE_PRODUCT:
    case PRODUCT_DETAIL:
      const {product} = action;
      return product;
    default:
      return state;
  }

}

export default productReducer;


