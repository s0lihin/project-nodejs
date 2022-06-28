const INITIAL_STATE = {
    balance: 0
  };
  
  const userinfoReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
      case 'SET_BALANCE':
        return {
          ...state,
          balance: action.balance
        };
      default:
        return state;
    }
    
  };
  
  export default userinfoReducer;