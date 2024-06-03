import { useSelector } from 'react-redux'
import { Container, Alert } from '@mui/material'

const Notification = () => {
  const notificationMessage = useSelector((state) => state.notification.message)
  let className = ''

  if (notificationMessage) {
    className = notificationMessage.includes('INFO') ? 'confirmation' : 'error'
  }

  return (
    <Container>
      <div>
        {notificationMessage && (
          <Alert severity="success"> {notificationMessage} </Alert>
        )}
      </div>
    </Container>
  )
}

export default Notification

/*
  const className = message.includes("INFO") ? "confirmation" : "error";
  return <div className={className}>{message}</div>;
};

*/
