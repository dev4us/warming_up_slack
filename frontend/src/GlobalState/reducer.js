import faker from "faker";

export const initialState = {
  selectedChannelId: 1,
  nickname: faker.name.findName(),
  thumbnail: faker.image.avatar()
};

const reducer = (state, action) => {
  const reduced = { ...state };

  switch (action.type) {
    case "SET_VALUE":
      return {
        ...reduced,
        [action.target]: action.payload
      };
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
