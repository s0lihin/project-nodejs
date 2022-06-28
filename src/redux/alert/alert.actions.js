export const showAlert = (alertType, alertMessage) => ({
  type: 'SHOW_ALERT',
  alertType,
  alertMessage
});

export const hideAlert = () => ({
  type: 'HIDE_ALERT'
});