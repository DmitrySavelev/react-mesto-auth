const InfoTooltip = ({ onClose, isOpen, isRequestStatus, success, fail }) => {
  return (
    <section
      className={`popup popup_info-tooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container`}>
        <button
          type="button"
          aria-label="закрыть попап"
          className={`popup__button-close`}
          onClick={onClose}
        ></button>
        <div
          className={isRequestStatus ? "popup__success" : "popup__fail"}
        ></div>
        <h2 className={`popup__title-tooltip`}>
          {isRequestStatus ? success : fail}
        </h2>
      </div>
    </section>
  );
};
export default InfoTooltip;
