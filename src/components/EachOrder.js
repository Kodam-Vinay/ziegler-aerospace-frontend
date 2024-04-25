import { CLOUDINARY_IMAGE_ACCESS_URL } from "../constants/constants";
import "../css/Table.css";
import useTotalPriceCalucation from "../hooks/useTotalPriceCalucation";
const EachOrder = ({ details }) => {
  const timeAndDate = new Date(details?.createdAt);
  const totalPrice = useTotalPriceCalucation({
    list: details,
    count_item: "order_count",
  });
  const convertedTimeAndDate = `${timeAndDate.getDate()}/${
    timeAndDate.getMonth() + 1
  }/${timeAndDate.getFullYear()}  ${timeAndDate.getHours()}:${timeAndDate.getMinutes()}`;
  return (
    <tr className="each-row-container">
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.product_name}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.product_price}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.category}</span>
      </td>

      <td className="each-row-container table-data">
        <img
          className="product-image product-table-image"
          src={
            CLOUDINARY_IMAGE_ACCESS_URL.replace(
              "e-commerce/",
              "e-commerce-products/"
            ) + details?.product_image
          }
          alt="product"
        />
      </td>

      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.buyer_id}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.ordered_count}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{totalPrice}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{convertedTimeAndDate}</span>
      </td>
    </tr>
  );
};

export default EachOrder;
