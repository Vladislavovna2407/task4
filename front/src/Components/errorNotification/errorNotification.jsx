import "./errorNotification.css";

export const ErrorNotification = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="row">
      <div
        className="alert alert-warning col-md-4 ml-50 width-250"
        role="alert"
      >
        Something went wrong...
      </div>
    </div>
  );
};
