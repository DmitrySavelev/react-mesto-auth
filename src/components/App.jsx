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
import { register, authorize, checkToken } from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialData()
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
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
            return c._id !== card._id;
          })
        );
      })
      .catch((error) => console.log(error));
  }
  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
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

  function handleUpdateAvatar(userData) {
    api
      .updateAvatar(userData.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsOpenInfoTooltip(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData({
            email: res.data.email,
          });
          navigate("/main", { replace: true });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function handleLogin({ email, password }) {
    return authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserData({
          email: email,
          password: password,
        });
        navigate("/");
      }
    });
  }

  function handleRegister({ email, password }) {
    return register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccessTooltipStatus(true);
          navigate("/signin", { replace: true });
        }
      })
      .finally(() => setIsOpenInfoTooltip(true));
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userData={userData}
          location={location}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                title="Вход"
                submitValue="Войти"
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                title="Регистрация"
                submitValue="Зарегистрироваться"
                handleRegister={handleRegister}
                setIsSuccessTooltipStatus={setIsSuccessTooltipStatus}
              />
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                loggedIn={loggedIn}
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
          title="Редактировать профиль"
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
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          isRequestStatus={isSuccessTooltipStatus}
          text={
            isSuccessTooltipStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так!"
          }
        />
        <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
