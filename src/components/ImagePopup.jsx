const ImagePopup = ({ card, onClose }) => {
  return (
    <section className={`popup popup_zoom ${card ? "popup_opened" : ""}`}>
      <figure className="popup__figure">
        <button
          type="button"
          aria-label="закрыть изображение"
          className="popup__button-close popup__button-close_image"
          onClick={onClose}
        ></button>
        <img
          alt={card ? card.name : " "}
          className="popup__image"
          src={card ? card.link : " "}
        />
        <figcaption className="popup__caption">
          {card ? card.name : " "}
        </figcaption>
      </figure>
    </section>
  );
};
export default ImagePopup;
