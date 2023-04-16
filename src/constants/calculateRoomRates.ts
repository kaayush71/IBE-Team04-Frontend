import { useAppSelector } from "../redux/store";

export const useCustomHook = () => {
  const { totalCostOfStay, vat, taxes, dueAtResort, dueNow } = useAppSelector(
    (state) => state.checkout
  );
  const selectedCurrency = useAppSelector((state) => state.currency.selectedCurrency);
  const selectedPromotion = useAppSelector((state) => state.checkout.selectedPromotion);

  const calculateVat = () => {
    let costWithVat = 0;
    costWithVat = totalCostOfStay * selectedPromotion.priceFactor;
    costWithVat = costWithVat * vat;
    return costWithVat * selectedCurrency.rate;
  };

  // function to calculate amount with taxes
  const calculateTaxes = () => {
    let costWithTaxes = 0;
    costWithTaxes = totalCostOfStay * selectedPromotion.priceFactor;
    let taxAmount = 0;
    for (let i = 0; i < taxes.length; i++) {
      taxAmount = taxAmount + costWithTaxes * taxes[i].value;
    }
    return taxAmount * selectedCurrency.rate;
  };

  // function to calculate amount due now
  const dueNowAmount = () => {
    let dueNowAmount = 0;
    dueNowAmount +=
      totalCostOfStay * selectedPromotion.priceFactor + calculateTaxes() + calculateVat();
    dueNowAmount = dueNowAmount * dueNow;
    return dueNowAmount * selectedCurrency.rate;
  };

  // function to calculate amount due at resort
  const dueAtResortAmount = () => {
    let dueAtResortAmount = 0;
    dueAtResortAmount +=
      totalCostOfStay * selectedPromotion.priceFactor + calculateTaxes() + calculateVat();
    dueAtResortAmount = dueAtResortAmount * dueAtResort;
    return dueAtResortAmount * selectedCurrency.rate;
  };

  const totalDueAmount = () => {
    return dueAtResortAmount() + dueNowAmount();
  };

  // Export functions
  return { calculateVat, calculateTaxes, dueNowAmount, dueAtResortAmount,totalDueAmount };
};
