import { useSelector } from "react-redux";
import "../css/ChangablePanel.css";
import { useNavigate } from "react-router-dom";

const ChangableHome = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const onClickButton = () => {
    user?.user_type === "admin"
      ? navigate("/users")
      : user?.user_type === "buyer"
      ? navigate("/explore")
      : navigate("orders");
  };
  return (
    <div className="panel-container">
      <h1 className="user-name">Hello, {user?.name}</h1>
      <div className="height-width-for-form-elements input-field-container white-color-background button-field-container button-container">
        <button
          className="form-submit-button height-width-for-form-elements button"
          type="button"
          onClick={onClickButton}
        >
          {user?.user_type === "admin"
            ? "Manage Users"
            : user?.user_type === "buyer"
            ? "Explore"
            : "Orders"}
        </button>
      </div>
    </div>
  );
};

export default ChangableHome;
