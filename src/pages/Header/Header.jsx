import "./Header.scss";
import logo from "../../assets/Logo.svg";

const Header = () => {
  // SMOOTH SCROLL TO NESSESSARY BLOCK BY CLASSNAME
  const handleScroll = (className) => {
    const section = document.querySelector(`.${className}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__right">
        <div className="header__buttons">
          <button onClick={() => handleScroll("users")}>Users</button>
          <button onClick={() => handleScroll("registration")}>Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
