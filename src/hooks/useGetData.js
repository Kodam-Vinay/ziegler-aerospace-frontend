import { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetHeaders from "./useGetHeaders";

const useGetData = ({
  setUsersData,
  setIsError,
  setError,
  apiUrl,
  setApiCallComplete,
}) => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const checkProductCreateResponse = useSelector(
    (store) => store?.product?.isProductCreatedResponseSuccess
  );
  const headers = useGetHeaders();
  const checkProductEdited = useSelector(
    (store) => store?.product?.isProductEdited
  );

  useEffect(() => {
    getData();
  }, [
    user?.user_type === "seller" && checkProductCreateResponse,
    user?.user_type === "seller" && checkProductEdited,
    user?.user_type === "buyer",
  ]);
  const getData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          ...headers,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setError(data?.message);
        setApiCallComplete(true);
      } else {
        setIsError(false);
        setUsersData(data);
        setApiCallComplete(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGetData;
