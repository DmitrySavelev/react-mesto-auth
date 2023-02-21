import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const CurrentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === CurrentUser._id;
  const isLiked = card.likes.some((i) => i._id === CurrentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      <div className="elements__wrapper">
        <div
          className="elements__image"
          style={{ backgroundImage: `url(${card.link})` }}
          onClick={handleCardClick}
        />
        {isOwn && (
          <button
            type="button"
            onClick={handleDeleteClick}
            aria-label="удалить карточку"
            className="elements__delete"
          ></button>
        )}
      </div>
      <div className="elements__text-content">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like_wrapper">
          <button
            type="button"
            aria-label="поставить лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like_count">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
