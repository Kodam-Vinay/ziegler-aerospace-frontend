import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "../css/Navbar.css";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import useDeviceResize from "../hooks/useDeviceResize";

import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "../DataManager/slices/UserSlice";
import {
  CLOUDINARY_IMAGE_ACCESS_URL,
  navigationFunc,
} from "../constants/constants";
import { toggleHamburger } from "../DataManager/slices/HamburgerSlice";

const navigationLinks = [
  {
    id: "/",
    name: "Home",
  },
  {
    id: "/cart",
    name: "Cart",
  },
];

const adminNavigationLinks = [
  {
    id: "/",
    name: "Home",
  },
  {
    id: "/users",
    name: "Users",
  },
];

const sellerNavigationLinks = [
  {
    id: "/",
    name: "Home",
  },
];

const Navbar = () => {
  const isHamburgerClicked = useSelector(
    (store) => store?.hamburger?.isHamburgerClicked
  );

  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(navigationLinks[0].id);
  const size = useDeviceResize();

  useEffect(() => {
    setActiveId(location?.pathname);
  }, [location?.pathname]);

  const onClickLogout = () => {
    const response = window.confirm("Are You Sure You Want To Logout");
    if (!response) return;
    dispatch(storeUserInfo(null));
    navigate("/auth");
  };
  return (
    <div className="navbar-container">
      <p>Logo</p>
      <div className="navbar-right-side-container">
        <div className="navbar-right-link-container">
          <img
            src={
              Object.values(user).length > 0 &&
              CLOUDINARY_IMAGE_ACCESS_URL + user?.image?.length > 0
                ? CLOUDINARY_IMAGE_ACCESS_URL + user?.image
                : CLOUDINARY_IMAGE_ACCESS_URL + "DUMMY_PROFILE_LOGO"
            }
            alt="user-logo"
            className="panel-user-image"
          />
          {isHamburgerClicked ? (
            <button
              className="button hamburger-button add-animation"
              onClick={() => dispatch(toggleHamburger(false))}
              type="button"
            >
              <IoMdClose color="white" size={20} />
            </button>
          ) : (
            <button
              className="button hamburger-button add-animation"
              onClick={() => dispatch(toggleHamburger(true))}
              type="button"
            >
              <GiHamburgerMenu color="white" size={20} />
            </button>
          )}
        </div>

        {(size?.width < 700 &&
          !isHamburgerClicked &&
          Object.values(user).length > 0) || (
          <div
            className={`navbar-links-container  ${
              isHamburgerClicked && user?.user_type === "seller"
                ? "add-z-index-to-navbar"
                : ""
            }`}
          >
            {user?.user_type === "admin"
              ? navigationFunc(adminNavigationLinks, activeId)
              : user?.user_type === "buyer"
              ? navigationFunc(navigationLinks, activeId)
              : navigationFunc(sellerNavigationLinks, activeId)}

            <button
              className="button add-animation logout-button"
              onClick={() => onClickLogout()}
              type="button"
            >
              <CiLogout color="white" size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
