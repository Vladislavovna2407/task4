import "./blockingNotification.css";

// Если модальное окно не открыто, ничего не рендерим

export const BlockingNotification = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="row">
      <div
        className="alert alert-primary col-md-4 ml-50 width-250"
        role="alert"
      >
        Your account is blocked!
      </div>
    </div>
  );
};
