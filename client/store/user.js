import axios from "axios";

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// INITIAL STATE
const initialState = {};

// ACTION CREATORS
export const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// THUNK CREATORS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/user");
      dispatch(getUser(res.data || initialState));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
};
