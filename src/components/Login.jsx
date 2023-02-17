import { useState } from "react";

const Login = ({ handleLogin }, props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      return;
    }

    handleLogin(userData)
      .then(() => {
        setUserData({ email: "", password: "" });
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! ${error} `);
      });
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} name="authForm" className={`auth__form`}>
        <h2 className="auth__title">{props.title}</h2>
        <label className="popup__form-field">
          <input
            name="inputEmail"
            value={userData.password || ""}
            onChange={handleChange}
            type="email"
            id="email-input"
            className="auth__input auth__input_email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__error name-input-error"></span>
        </label>
        <label className="popup__form-field">
          <input
            name="inputJob"
            value={userData.password || ""}
            onChange={handleChange}
            type="password"
            id="password-input"
            className="auth__input auth__input_password"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__error job-input-error"></span>
        </label>
        <button type="submit" className="auth__button">
          {props.submitValue}
        </button>
      </form>
    </div>
  );
};
export default Login;
