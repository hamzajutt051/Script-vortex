export const currencyFormatter = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const currencyFormatterAED = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AED",
  }).format(value);
};
