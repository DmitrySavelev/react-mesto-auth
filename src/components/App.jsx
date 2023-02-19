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
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
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
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsOpenInfoTooltip(false);
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
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserData({
          email: email,
          password: password,
        });
        navigate("/main");
      }
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
        setEmail(res.email);
        navigate("/main");
      });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then((res) => {
        if (res) {
          setRequestStatus(true);
          console.log(isOpenInfoTooltip);
          setIsOpenInfoTooltip(true);
          navigate("/signin");
          console.log(isOpenInfoTooltip);
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setRequestStatus(false);
        setIsOpenInfoTooltip(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
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
                name="login"
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
                name="register"
                submitValue="Зарегистрироваться"
                handleRegister={handleRegister}
              />
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute
                component={Main}
                userData={userData}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
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
        <nav>
          <ul>
            <li>
              <Link to="/signin">sign-in</Link>
            </li>
            <li>
              <Link to="/signup">sign-up</Link>
            </li>
            <li>
              <Link to="/main">main</Link>
            </li>
          </ul>
        </nav>
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
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          isRequestStatus={requestStatus}
        />

        {/* <SuccessPopup
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
        /> */}
        <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
