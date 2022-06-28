const INITIAL_STATE = {
  provider: { providerName: '', label: '' },
  shift: null,
  openingSession: new Date(),
  providerStatus: []
};

const gameReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'SET_PROVIDER':
      return {
        ...state,
        provider: action.provider
      };
    case 'SET_SHIFT':
      return {
        ...state,
        shift: action.shift
      };
    case 'SET_OPENING_SESSION':
      return {
        ...state,
        openingSession: action.openingSession
      };
    case 'SET_PROVIDER_STATUS':
      return {
        ...state,
        providerStatus: action.providerStatus
      };
    default:
      return state;
  }

};

export default gameReducer;