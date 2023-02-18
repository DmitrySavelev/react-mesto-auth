import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      return;
    }

    props
      .handleLogin(userData)
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
            name="email"
            value={email || ""}
            onChange={handleChangeEmail}
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
            name="password"
            value={password || ""}
            onChange={handleChangePassword}
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
