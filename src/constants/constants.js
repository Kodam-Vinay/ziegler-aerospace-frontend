import NavigationLink from "../components/NavigationLink";

export const API_URL =
  "https://ziegler-aerospace-assignment-production.up.railway.app/api/";

export const CLOUDINARY_IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
export const CLOUDINARY_IMAGE_ACCESS_URL =
  process.env.REACT_APP_CLOUDINARY_IMAGE_ACCESS_URL;

export const navigationFunc = function (navigationLinks, activeId) {
  return navigationLinks?.map((each) => (
    <NavigationLink
      key={each?.id}
      data={each}
      isActive={activeId === each?.id}
    />
  ));
};
