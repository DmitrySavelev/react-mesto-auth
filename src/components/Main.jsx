import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardDelete,
  onCardClick,
  onCardLike,
  cards,
}) => {
  const CurrentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar" onClick={  onEditAvatar}>
            <div
              style={{ backgroundImage: `url(${CurrentUser.avatar})` }}
              alt="аватар."
              className="profile__avatar-img"
            />
          </div>
          <div className="profile__info">
            <div className="profile__paragraph-btn">
              <h1 className="profile__name">{CurrentUser.name}</h1>
              <button
                type="button"
                aria-label="редактировать"
                className="profile__edit-button"
                onClick={ onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{CurrentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="добавить новую карточку"
          className="profile__add-button"
          onClick={ onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__card">
          { cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={ onCardClick}
              onCardLike={  onCardLike}
              onCardDelete={  onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Main;
