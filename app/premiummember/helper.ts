export const detectCardType = (cardNumber: string) => {
  const visaPattern = /^4/;
  const mastercardPattern =
    /^(5[1-5]|222[1-9]|22[3-7]\d|2[3-6]\d{2}|27[0-1]\d|2720)/;
  const AmericanExpress = /^3[47]/;
  const discoverPattern = /^6011|^64[4-9]|^65/;
  const dinersPattern = /^36/;
  const unionPayPattern =
    /^(31|62|622(1(2[6-9]|[3-8]\d|92[0-5])|[3-8]\d{2}|9[0-1]\d))/;
  const unionPayPattern2 = /^(31|62\d)/;

  if (visaPattern.test(cardNumber)) {
    return "Visa";
  } else if (mastercardPattern.test(cardNumber)) {
    return "Mastercard";
  } else if (AmericanExpress.test(cardNumber)) {
    return "American Express";
  } else if (discoverPattern.test(cardNumber)) {
    return "Discover";
  } else if (dinersPattern.test(cardNumber)) {
    return "Diners";
  } else if (
    unionPayPattern.test(cardNumber) ||
    unionPayPattern2.test(cardNumber)
  ) {
    return "UnionPay";
  } else {
    return "Unknown";
  }
};

export interface Data {
  subscription_price: string;
  subscription_duration: string;
  email: string;
  phone_number: string | null;
  is_trial_displayed: boolean | null;
  is_trial_offered: boolean;
  trial_starts_at: string | null;
  trial_ends_at: string | null;
  is_later_and_delayed_offered: boolean;
  trial_status_message: string | null;
  subscription_status_message: string;
};
export interface PostApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  timestamp: string;
  path: string;
  method: string;
}