import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../constants/productConstants";

// export const listProducts =
//   (query = "", page = "") =>
//   async (dispatch) => {
//     try {
//       if (query === "") {
//         if(page === ""){

//         dispatch({ type: PRODUCT_LIST_REQUEST });
//         const res = await fetch(`/api/products/`);
//         const data = await res.json();
//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//       } else {
//         dispatch({ type: PRODUCT_LIST_REQUEST });
//         const res = await fetch(`/api/products?page=${page}`);
//         const data = await res.json();
//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//       }}
//       else {
//         if(!page === ""){
//         dispatch({ type: PRODUCT_LIST_REQUEST });
//         const res = await fetch(`/api/products?query=${query}&?page=${page}`);
//         const data = await res.json();
//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//       }

//       else {
//         dispatch({ type: PRODUCT_LIST_REQUEST });
//         const res = await fetch(`/api/products?query=${query}`);
//         const data = await res.json();
//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//       }
//     }
//     } catch (error) {
//       dispatch({
//         type: PRODUCT_LIST_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };
// export const listProducts = (query = '', page = '') => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });

//     let url = '/api/products?';
//     if (query !== '') {
//       url += `query=${query}`;
//     }
//     if (page !== '') {
//       url += `&page=${page}`;
//     }

//     const res = await fetch(url);
//     const data = await res.json();

//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
export const listProducts = (query = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const res = await fetch(`/api/products?query=${query}`);
    const data = await res.json();
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};


export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await fetch(`/api/products/delete/${id}`, config);
    const data = await res.json();
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await fetch(`/api/products/create/`, config);
    const data = await res.json();
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(product),
    };
    const res = await fetch(`/api/products/update/${product._id}/`, config);
    const data = await res.json();
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(review),
      };
      const res = await fetch(`/api/products/${productId}/reviews/`, config);
      const data = await res.json();
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
