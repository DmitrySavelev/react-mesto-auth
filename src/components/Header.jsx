const Header = (props) => {
  return (
    <header className="header">
      <img
        src="./images/header__logo.svg"
        alt="Надпись Mesto с индексом RUSSIA."
        className="header__logo"
      />
      <div className="header__spans">
        <span className="header__email">{props.email}</span>
        <span className="header__switcher">Войти</span>
      </div>
    </header>
  );
};

export default Header;
