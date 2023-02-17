import Confirmation from "./Confirmation";

const FailPopup = (props) => {
  return (
    <Confirmation
      name={props.name}
      title={props.title}
      isOpen={props.isOpen}
      onClose={props.onClose}
    ></Confirmation>
  );
};
export default FailPopup;
