import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/Api";
import { register, authorize, getData } from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import SuccessPopup from "./SuccessPopup";
import FailPopup from "./FailPopup";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.log(error));
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleSuccessClick() {
    setIsSuccessPopupOpen(true);
  }
  function handleFailClick() {
    setIsFailPopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => {
      return i._id === currentUser._id;
    });
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
        console.log(cards);
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c !== card;
          })
        );
      })
      .catch((error) => console.log(error));
  }
  function handleUpdateUser(card) {
    api
      .editProfile(card)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(card) {
    api
      .updateAvatar(card.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    CheckToken();
  }, []);

  function handleLogin({ email, password }) {
    return authorize(email, password).then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        setLoggedIn(true);
        console.log(data);
        // setUserData({
        //   email: data.user.email,
        //   password: data.user.password,
        // });
        navigate("/main");
      }
    });
  }

  function handleRegister({ email, password }) {
    return register(email, password).then(() => {
      navigate("/login");
    });
  }

  function CheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getData(jwt).then((res) => {
        setLoggedIn(true);
        setUserData({
          email: res.email,
          password: res.password,
        });
        navigate("/main");
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                title="Вход"
                name="login"
                submitValue="Войти"
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                title="Регистрация"
                name="register"
                submitValue="Зарегистрироваться"
              />
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onSuccess={handleSuccessClick}
                onFail={handleFailClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                setCards={setCards}
              />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          title="Обновить аватар"
          name="avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          title="редактировать профиль"
          name="edit"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          title="Новое место"
          name="card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <SuccessPopup
          title="Вы успешно зарегистрировались!"
          name="success"
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
        />
        <FailPopup
          title="Что-то пошло не так!
          Попробуйте ещё раз."
          name="fail"
          isOpen={isFailPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" />
        <nav>
          <ul>
            <li>
              <Link to="/sign-in">sign-in</Link>
            </li>
            <li>
              <Link to="/sign-up">sign-up</Link>
            </li>
            <li>
              <Link to="/main">main</Link>
            </li>
          </ul>
        </nav>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

{
  /* <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onSuccess={handleSuccessClick}
            onFail={handleFailClick}
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            setCards={setCards}
          />
          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup
            title="Обновить аватар"
            name="avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            title="редактировать профиль"
            name="edit"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            title="Новое место"
            name="card"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <SuccessPopup
            title="Вы успешно зарегистрировались!"
            name="success"
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
          />
          <FailPopup
            title="Что-то пошло не так!
          Попробуйте ещё раз."
            name="fail"
            isOpen={isFailPopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" /> */
}
