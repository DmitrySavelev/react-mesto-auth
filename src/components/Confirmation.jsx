const Confirmation = ({ isOpen, name, title, onClose, children }) => {
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container-${name}`}>
        <button
          type="button"
          aria-label="закрыть попап"
          className={`popup__button-close popup__button-close_${name}`}
          onClick={onClose}
        ></button>
        <div className={`popup__${name}`}></div>
        <h2 className={`popup__title-${name}`}>{title}</h2>
        {children}
      </div>
    </section>
  );
};
export default Confirmation;

