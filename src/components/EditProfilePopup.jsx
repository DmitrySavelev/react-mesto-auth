import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title={props.title}
      name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          name="inputName"
          value={name}
          onChange={handleNameChange}
          type="text"
          id="name-input"
          className="popup__input popup__input_name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          name="inputJob"
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          id="job-input"
          className="popup__input popup__input_job"
          placeholder="Ваша специализация"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
