const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const className = message.includes("INFO") ? "confirmation" : "error";
  return <div className={className}>{message}</div>;
};

export default Notification;
