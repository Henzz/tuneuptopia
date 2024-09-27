import { Dispatch } from 'redux';

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const createUser = (user: {
  id: number;
  name: string;
  email: string;
}) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CREATE_USER, payload: user });
  };
};

export const updateUser = (user: {
  id: number;
  name: string;
  email: string;
}) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };
};

export const deleteUser = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: DELETE_USER, payload: id });
  };
};
