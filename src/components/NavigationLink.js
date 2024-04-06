import { useNavigate } from "react-router-dom";
import "../css/NavigationLink.css";

const NavigationLink = ({ data, isActive }) => {
  const { id, name } = data;
  const navigate = useNavigate();
  const onClickNavigationLink = () => {
    navigate(id);
  };
  return (
    <div
      className={`each-navigation-link-container add-animation ${
        isActive ? "active-navigation-link" : ""
      }`}
      onClick={() => onClickNavigationLink()}
    >
      {name}
    </div>
  );
};

export default NavigationLink;
