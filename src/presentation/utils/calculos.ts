export const calculateDiscount = (
  price: number,
  discountPercentage: number
) => {
  return price / (1 + discountPercentage / 100);
};

export const calculateTotal = (price: number, quantity: number) => {
  return price * quantity;
};

export const calculateTotalWithDiscount = (
  price: number,
  discountPercentage: number,
  quantity: number
) => {
  const discountedPrice = calculateDiscount(price, discountPercentage);
  return discountedPrice * quantity;
};
