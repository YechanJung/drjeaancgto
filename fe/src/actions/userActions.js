import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET
} from "../constants/userConstants";



export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(
            "/api/users/login/",
            {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify({ 'username':email, 'password':password }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    data && data.message ? data.message : "Login failed",
            });
        }

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(
            "/api/users/register/",
            {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify({ 'name':name, 'email':email, 'password':password }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    data && data.message ? data.message : "Registration failed",
            });
        }
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await fetch(
            `/api/users/${id}/`,
            config
        );

        const data = await response.json();

        
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data,
            });
         
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await fetch(
            `/api/users/profile/update/`,
            {
                method: "PUT",
                headers: config.headers,
                body: JSON.stringify(user),
            }
        );

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } else {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload:
                    data && data.message ? data.message : "Update failed",
            });
        }
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}