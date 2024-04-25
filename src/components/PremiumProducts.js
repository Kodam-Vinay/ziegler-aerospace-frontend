import ProductInfo from "./ProductInfo";

const PremiumProducts = ({ products }) => {
  return (
    <div className="buyer-page-products-container">
      {products?.map((each) => (
        <ProductInfo key={each?.product_id} details={each} />
      ))}
    </div>
  );
};

export default PremiumProducts;
