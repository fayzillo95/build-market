import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function BasicAlerts({ target, message, isAllert, onClose }) {
  const [open, setOpen] = React.useState(isAllert);

  React.useEffect(() => {
    setOpen(isAllert);
  }, [isAllert]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    if (onClose) onClose();
  };

  const alerts = {
    success: <Alert severity="success">This is a success Alert.</Alert>,
    info: <Alert severity="info">This is an info Alert.</Alert>,
    warning: <Alert severity="warning">This is a warning Alert.</Alert>,
    error: <Alert severity="error">{message}</Alert>,
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // 3 soniya
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {alerts[target]}
    </Snackbar>
  );
}
