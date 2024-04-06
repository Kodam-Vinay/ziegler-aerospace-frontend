import { useSelector } from "react-redux";
const useGetHeaders = () => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.jwtToken}`,
  };
};

export default useGetHeaders;
