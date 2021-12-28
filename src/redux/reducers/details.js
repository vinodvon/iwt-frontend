import { FETCH_ALL, SAVE_NEW } from "../types/actionTypes";

export const detailStore = (initialState = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case SAVE_NEW:
      return [...initialState, action.payload];
    default:
      return initialState;
  }
};
