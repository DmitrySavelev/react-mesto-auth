const Header = () => {
  return (
    <header className="header">
      <img
        src="./images/header__logo.svg"
        alt="Надпись Mesto с индексом RUSSIA."
        className="header__logo"
      />
      <div className="header__spans">
        <span className="header__email">Dsavelev1703@yandex.ru</span>
        <span className="header__switcher">Войти</span>
      </div>
    </header>
  );
};

export default Header;
