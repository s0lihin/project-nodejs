const INITIAL_STATE = {
  isLoaderActive: false
};

const loaderReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        ...state,
        isLoaderActive: true
      };
    case 'HIDE_LOADER':
      return {
        ...state,
        isLoaderActive: false
      };
    default:
      return state;
  }

};

export default loaderReducer;