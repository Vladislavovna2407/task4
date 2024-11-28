export const UnblockingNotification = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="row">
      <div className="alert alert-light  col-md-4 ml-50 width-250" role="alert">
        Your account is unblocked!
      </div>
    </div>
  );
};
