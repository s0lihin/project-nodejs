const INITIAL_STATE = {
    isSidebarActive: false
  };
  
  const sidebarReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
      case 'TOGGLE_SIDEBAR':
        return {
          ...state,
          isSidebarActive: !state.isSidebarActive
        };
      default:
        return state;
    }
    
  };
  
  export default sidebarReducer;