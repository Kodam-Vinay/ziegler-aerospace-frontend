const useTotalPriceCalucation = ({ list, count_item }) => {
  let TotalPrice = 0;
  if (Array.isArray(list)) {
    list?.map((each) => {
      if (each?.product_price) {
        TotalPrice += each?.product_price * each?.[count_item];
      } else {
        TotalPrice += 5000 * each?.[count_item];
      }
      return TotalPrice;
    });
  } else {
    TotalPrice = list?.product_price * list?.ordered_count;
  }
  return TotalPrice;
};
export default useTotalPriceCalucation;
