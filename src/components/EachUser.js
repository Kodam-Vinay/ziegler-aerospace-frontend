import "../css/AllUsers.css";
import { MdDeleteOutline } from "react-icons/md";

const EachUser = ({ details, removeUserFromDb }) => {
  const onClickDelete = (id) => {
    removeUserFromDb(id);
  };
  return (
    <tr className="each-row-container">
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.name}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.user_type}</span>
      </td>
      <td className="each-row-container">
        <button
          className="button add-animation logout-button delete-button each-value-container"
          onClick={() => onClickDelete(details?.user_id)}
          type="button"
        >
          <MdDeleteOutline color="white" size={25} />
        </button>
      </td>
    </tr>
  );
};

export default EachUser;
