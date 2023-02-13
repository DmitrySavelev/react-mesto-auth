import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const CurrentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
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
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{CurrentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="добавить новую карточку"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__card">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onDeleteCard={props.onDeleteCard}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Main;
