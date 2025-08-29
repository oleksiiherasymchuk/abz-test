import { useEffect, useState } from "react";
import "./RegistrationForm.scss";
import Preloader from "../Preloader/Preloader";
import SuccessImg from "../../assets/success-image.svg";
import { getPositions, getToken, registerUser } from "../../api/api";

const RegistrationForm = ({ onSuccess }) => {
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: null,
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // GET POSITIONS FROM API
  useEffect(() => {
    const fetchPositionsAndToken = async () => {
      try {
        const posData = await getPositions();
        // SET POSITIONS FROM API TO FORM
        setPositions(posData.positions || []);

        const tokenData = await getToken();
        // SET TOKEN TO LOCAL STATE
        setToken(tokenData);
      } catch (err) {
        console.error("Сталась помилка:", err);
      }
    };
    fetchPositionsAndToken();
  }, []);

  // VALIDATE FORM FIELDS ACCORDING TO REQUIREMENTS
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim() || value.length < 2) return "Імя мінімум 2 символи";
        break;
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          return "Невалідний email";
        break;
      case "phone":
        if (!/^[\+]{0,1}380([0-9]{9})$/.test(value))
          return "Формат +380XXXXXXXXX";
        break;
      case "position_id":
        if (!value) return "Виберіть позицію";
        break;
      case "photo":
        if (!value) return "Завантажте фото";
        break;
      default:
        return "";
    }
    return "";
  };

  // SHOW ERROR IF IT IS WHEN CURRENT FIELD WAS TOUCHED
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // SET TO LOCAL STAGE VALUES FROM FORM FIELDS USER FILLED
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const val = type === "file" ? files[0] : value;

    setForm((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (type === "file") {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  // MAKE SIGN UP BUTTON ABLE IF ALL FIEDS ARE FILLED BY USER
  const isFormValid = () => {
    return (
      Object.values(form).every((v) => v !== "" && v !== null) &&
      Object.values(errors).every((e) => !e)
    );
  };

  // SUBMIT FORM AND SEND POST API QUERY
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTouched = {};
    Object.keys(form).forEach((key) => (newTouched[key] = true));
    setTouched(newTouched);

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      setLoading(true);
      await registerUser(formData, token); 
      // CALLBACK TO CHANGE FLAG REFRESH IN APP.JSX TO PASS IT TO USERLIST FOR UPDATING USERS AND GET FIRST PAGE OF 6 USERS 
      if (onSuccess) onSuccess();
      setSuccess(true);
      // CLEAR FORM AND ERRORS
      setForm({ name: "", email: "", phone: "", position_id: "", photo: null });
      setTouched({});
      setErrors({});
    } catch (err) {
      alert(err.message || err)
      console.error(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // SHOW IMAGE SUCCESSFULLY REGISTERED USER IF ALL IS OK
  if (success) {
    return (
      <section className="registration">
        <h1 style={{ marginBottom: "65px" }}>User successfully registered</h1>
        <img src={SuccessImg} alt="Success" />
      </section>
    );
  }

  return (
    <section className="registration">
      <h1>Working with POST request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? "error-input" : ""}
        />
        {errors.name && touched.name && (
          <span className="error">{errors.name}</span>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "error-input" : ""}
        />
        {errors.email && touched.email && (
          <span className="error">{errors.email}</span>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone ? "error-input" : ""}
        />
        <p className="phone">+38 (XXX)-XXX-XX-XX</p>
        {errors.phone && touched.phone && (
          <span className="error">{errors.phone}</span>
        )}

        <div className="positions">
          <p>Select your position</p>
          {positions.map((pos) => (
            <label key={pos.id}>
              <input
                type="radio"
                name="position_id"
                value={pos.id}
                checked={form.position_id === String(pos.id)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="radio-label">{pos.name}</span>
            </label>
          ))}
          {errors.position_id && touched.position_id && (
            <span className="error">{errors.position_id}</span>
          )}
        </div>

        <div className="file-input">
          <div className="file-input__left">
            <input type="file" name="photo" onChange={handleChange} aria-label="Upload photo" />
            <span>Upload</span>
          </div>
          <div className="file-input__right">Upload your photo</div>
        </div>
        {errors.photo && touched.photo && (
          <span className="error" style={{ marginTop: "20px" }}>
            {errors.photo}
          </span>
        )}

        <button type="submit" disabled={!isFormValid() || loading}>
          {loading ? <Preloader /> : "Sign up"}
        </button>
      </form>
    </section>
  );
};

export default RegistrationForm;
