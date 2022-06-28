const INITIAL_STATE = {
  showAlert: false,
  alertType: '',
  alertMessage: ''
};

const alertReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        showAlert: true,
        alertType: action.alertType,
        alertMessage: action.alertMessage
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertMessage: ''
      };
    default:
      return state;
  }

};

export default alertReducer;