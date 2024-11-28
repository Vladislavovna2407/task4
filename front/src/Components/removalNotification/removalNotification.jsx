import "./removalNotification.css";

export const RemovalNotification = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="position">
      <div className="alert alert-danger col-md-4 ml-50 width-250" role="alert">
        Your accout is deleted!
      </div>
    </div>
  );
};
