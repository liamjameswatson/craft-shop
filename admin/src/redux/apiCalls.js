import { loginStart, loginFailure, loginSuccess } from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from "./productRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log("login sucess");
  } catch (err) {
    console.log("fail");
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
    console.log("login sucess");
  } catch (err) {
    console.log("fail");
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    console.log("login sucess");
  } catch (err) {
    console.log(err);
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // const res = await userRequest.post(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
    console.log("login sucess");
  } catch (err) {
    console.log("fail");
    dispatch(updateProductFailure());
  }
};

export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(createProductSuccess(res.data));
    console.log("product created");
  } catch (err) {
    console.log("fail");
    dispatch(createProductFailure());
  }
};
