export const initialState = {
  modalDisplay: false,
  selectedBox: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET-MODAL":
      return {
        ...state,
        modalDisplay: action.payload,
      };
    case "SET-BOX":
      return {
        ...state,
        selectedBox: action.payload,
      };

    default:
      return;
  }
};
