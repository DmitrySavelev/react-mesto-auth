import { useEffect } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
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
          ref={avatarRef}
          name="link"
          type="url"
          id="url-input-avatar"
          className="popup__input popup__link-input-avatar"
          placeholder="Ссылка на новую аватарку"
          required
        />
        <span className="popup__error url-input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
