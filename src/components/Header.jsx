import { Link } from "react-router-dom";

const Header = ({ userData, location, onSignOut }) => {
  return (
    <header className="header">
      <img
        src="./images/header__logo.svg"
        alt="Надпись Mesto с индексом RUSSIA."
        className="header__logo"
      />
      <div className="header__spans">
        <span className="header__email">
          {location.pathname === "/signin" ? (
            <Link to="/signup" className="header__switcher">
              Регистрация
            </Link>
          ) : location.pathname === "/signup" ? (
            <Link to="/signin" className="header__switcher">
              Войти
            </Link>
          ) : (
            <div>
              <span className="header__email">{userData.email}</span>
              <Link
                to="/signin"
                className="header__switcher"
                onClick={() => {
                  onSignOut();
                }}
              >
                Выйти
              </Link>
            </div>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
