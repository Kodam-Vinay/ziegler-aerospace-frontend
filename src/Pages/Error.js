import { useNavigate } from "react-router-dom";
import "../css/Error.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page-container">
      <h1>Something Went Wrong</h1>
      <button
        className="form-submit-button button error-page-button"
        onClick={() => navigate("/")}
        type="button"
      >
        Go To Home
      </button>
    </div>
  );
};

export default Error;
