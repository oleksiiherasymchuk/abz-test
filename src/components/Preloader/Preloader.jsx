import PreloaderImg from "../../assets/Preloader.png";
import "./Preloader.scss"

const Preloader = () => {
  return (
    <div className="loader">
      <img src={PreloaderImg} alt="Loading..." />
    </div>
  );
};

export default Preloader;
