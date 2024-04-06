import "../css/Table.css";
import PopupForAddProduct from "./PopupForAddProduct";
import EachProduct from "./EachProduct";
import { CirclesWithBar } from "react-loader-spinner";

const ProductTable = ({
  products,
  setError,
  error,
  isError,
  setIsError,
  deleteProduct,
  isApiCallComplete,
}) => {
  return (
    <div className={`product-table-container`}>
      <PopupForAddProduct
        setError={setError}
        error={error}
        isError={isError}
        setIsError={setIsError}
      />
      {/* Table container class */}
      {isApiCallComplete && products?.length > 0 && !isError ? (
        <table className="product-table">
          <tbody>
            <tr className="each-row-container">
              <th className="each-row-container tabel-head">Name</th>
              <th className="each-row-container tabel-head">Price</th>
              <th className="each-row-container tabel-head">Category</th>
              <th className="each-row-container tabel-head">Specifications</th>
              <th className="each-row-container tabel-head">Image</th>
              <th className="each-row-container tabel-head">Rating</th>
              <th className="each-row-container tabel-head">Actions</th>
            </tr>
            {products?.map((each) => (
              <EachProduct
                deleteProduct={deleteProduct}
                details={each}
                key={each?.product_id}
                setError={setError}
                error={error}
                isError={isError}
                setIsError={setIsError}
              />
            ))}
          </tbody>
        </table>
      ) : !isApiCallComplete && products?.length === 0 && !isError ? (
        <div className="sign-in-loader">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <p className="no-products-found-text">No Products Found</p>
      )}
    </div>
  );
};

export default ProductTable;
