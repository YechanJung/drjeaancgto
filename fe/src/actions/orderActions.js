// import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_CREATE_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
} from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(order)
        };

        const response = await fetch('/api/orders/add/', config);
        const data = await response.json();

        
    

        if (response.ok) {
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data,
            });
            dispatch({
                type: CART_CLEAR_ITEMS,
            });
            localStorage.removeItem('cartItems');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message,
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const response = await fetch(`/api/orders/${id}`, config);
        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data,
            });
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.message,
        });
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(paymentResult)
        };

        const response = await fetch(`/api/orders/${id}/pay`, config);
        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data,
            });
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.message,
        });
    }
}