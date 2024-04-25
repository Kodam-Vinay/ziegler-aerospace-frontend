import NavigationLink from "../components/NavigationLink";

export const API_URL = "https://assignments.vinay.kodam.in/ziegler/api/";
// "http://localhost:8000/api/"

export const CLOUDINARY_IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
export const CLOUDINARY_IMAGE_ACCESS_URL = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1712231181/${process.env.REACT_APP_CLOUDINARY_PRESET}/`;

export const navigationFunc = function (navigationLinks, activeId) {
  return navigationLinks?.map((each) => (
    <NavigationLink
      key={each?.id}
      data={each}
      isActive={activeId === each?.id}
    />
  ));
};

export const filterCartItemsList = (cartItemsList, user) => {
  let list = [];
  if (Object.keys(cartItemsList).length > 0) {
    const findUser = Object.keys(cartItemsList)?.find(
      (each) => each === user?.user_id
    );
    if (findUser === undefined) {
      list = [];
    } else {
      list = cartItemsList[findUser];
    }
  }
  return list;
};
export const filterPremiumProducts = (products) => {
  const data = products.filter((each) => each?.is_premium_product);
  return data;
};
export const filterNotPremiumProducts = (products) => {
  const data = products.filter((each) => !each?.is_premium_product);
  return data;
};
