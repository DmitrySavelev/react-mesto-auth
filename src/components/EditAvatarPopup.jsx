import { useEffect } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ title, name, isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title={title}
      name={name}
      isOpen={isOpen}
      onClose={onClose}
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
