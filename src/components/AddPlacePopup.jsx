import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

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
          value={name}
          name="name"
          type="text"
          id="name-place-input"
          className="popup__input popup__name-input-place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChangeName}
        />
        <span className="popup__error name-place-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          value={link}
          name="link"
          type="url"
          id="url-input-card"
          className="popup__input popup__link-input-place"
          placeholder="Ссылка на картинку"
          onChange={handleChangeLink}
        />
        <span className="popup__error url-input-card-error"></span>
      </label>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
