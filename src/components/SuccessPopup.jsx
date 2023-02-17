import Confirmation from "./Confirmation";

const SuccessPopup = (props) => {
  return (
    <Confirmation
      name={props.name}
      title={props.title}
      isOpen={props.isOpen}
      onClose={props.onClose}
    ></Confirmation>
  );
};
export default SuccessPopup;
