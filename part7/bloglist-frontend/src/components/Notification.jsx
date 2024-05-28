import { useSelector } from "react-redux";

const Notification = () => {
  const notificationMessage = useSelector((state) => state.notification.message);
  let className = "";

  if (notificationMessage) {
    className = notificationMessage.includes("INFO") ? "confirmation" : "error";
  }

  return (
    <div className={className}>
      {notificationMessage && <p>{notificationMessage}</p>}
    </div>
  );
};

export default Notification;

  /*
  const className = message.includes("INFO") ? "confirmation" : "error";
  return <div className={className}>{message}</div>;
};

*/