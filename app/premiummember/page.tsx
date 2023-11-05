"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import amexImage from "../../public/americanexpress.png";
import dinersImage from "../../public/diners.png";
import discoverImage from "../../public/discover.png";
import mastercardImage from "../../public/mastercard.png";
import Shield from "../../public/shield.png";
import unionPayImage from "../../public/union-pay.png";
import visaImage from "../../public/visa.png";
import PremiumDetail from "./detail";
import { detectCardType, PostApiResponse } from "./helper";
import AmexExplanationModal from "./amexexplanationModal";
import NonAmexModalComponent from "./nonAmexExplanationModa";
// import { useSetStateMutation } from '../api/baseApi';
const GoPremium = () => {
  const [step, setStep] = useState(1);
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [cardType, setCardType] = useState("");
  const [creditCardData, setCreditCardData] = useState({
    holder_name: "",
    number: creditCardNumber,
    expiration_date: "",
    cvc: '',
    network: ''
  });
  const [isInputValid, setInputValid] = useState(false);
  const [fill] = useState<string>("#ccc");
  const [isAmexModalOpen, setIsAmexModalOpen] = useState(false);
  const [isNonAmexModalOpen, setIsNonAmexModalOpen] = useState(false);
  const [maxSecurityCode, setMaxSecurityCode] = useState(3);

  const cardNumberInputRef = useRef<HTMLInputElement | null>(null);
  const expirationInputRef = useRef<HTMLInputElement | null>(null);
  const securityCodeInputRef = useRef<HTMLInputElement | null>(null);

  const openAmexModal = () => {
    setIsAmexModalOpen(true);
  };
  const openNonAmexModal = () => {
    setIsNonAmexModalOpen(true);
  };
  const closeAmexModal = () => {
    setIsAmexModalOpen(false);
  };
  const closeNonAmexModal = () => {
    setIsNonAmexModalOpen(false);
  };
  const handleNextStep = () => {
    const isValid = true;
    setInputValid(false);
    if (isValid) {
      setStep(step + 1);
    }
  };

 
  useEffect(() => {
    switch (step) {
      case 2:
        if (cardNumberInputRef.current) {
          cardNumberInputRef.current.focus();
        }
        break;
      case 3:
        if (expirationInputRef.current) {
          expirationInputRef.current.focus();
        }
        break;
      case 4:
        if (securityCodeInputRef.current) {
          securityCodeInputRef.current.focus();
        }
        break;
      default:
        break;
    }
  }, [step]);

  const inputStyles = {
    base: "font-medium flex-1 h-[5vw] sm:h-[2vw] outline-none pl-[4vw] sm:px-[16px] text-[3.45vw] sm:text-[0.859375vw] font-sofia",
    placeholder: fill === "#333" ? "placeholder:text-[#333]" : "placeholder:text-[#ccc]",
  };
  const renderCardImage = () => {
    if (cardType === "Visa") {
      return (
        <div className={`w-[56px]`}>
          {" "}
          <Image
            src={visaImage}
            alt="Visa"
            className="w-[39px] h-[14px]"
          />{" "}
        </div>
      );
    } else if (cardType === "Mastercard") {
      return (
        <div className={`w-[52px]`}>
          <Image
            src={mastercardImage}
            alt="Mastercard"
            className="w-[35px] h-[27px]"
          />{" "}
        </div>
      );
    } else if (cardType === "American Express") {
      return (
        <div className={`w-[70px]`}>
          {" "}
          <Image
            src={amexImage}
            alt="American Express"
            className="w-[60px] h-[33px]"
          />{" "}
        </div>
      );
    } else if (cardType === "Discover") {
      return (
        <div className={`w-[62px]`}>
          {" "}
          <Image
            src={discoverImage}
            alt="Discover"
            className="w-[48px] h-[27px]"
          />{" "}
        </div>
      );
    } else if (cardType === "Diners") {
      return (
        <div className={`w-[50px]`}>
          {" "}
          <Image
            src={dinersImage}
            alt="Diners"
            className="w-[40px] h-[26px]"
          />{" "}
        </div>
      );
    } else if (cardType === "UnionPay") {
      return (
        <div className={`w-[42px]`}>
          {" "}
          <Image
            src={unionPayImage}
            alt="UnionPay"
            className="w-[25px] h-[11px]"
          />{" "}
        </div>
      );
    } else {
      return null;
    }
  };
  const handleNameInputChange = (e: any) => {
    e.stopPropagation();
    const inputValue = e.target.value;
    setCreditCardData({ ...creditCardData, holder_name: inputValue });
    setInputValid(inputValue.trim() !== "");
  };
  const handleCardNumberChange = (e: any) => {
    let input = e.target.value.replace(/\D/g, ""); 
     setCreditCardNumber(input)
    const cardNumberPattern = /^[0-9]*$/;
    let formattedInput = ''
    if (cardNumberPattern.test(input)) {
      const maxInputLengths: Record<string, number> = {
        Visa: 19,
        "American Express": 17,
        Discover: 16,
        Diners: 16,
        UnionPay: 23,
        Unknown: 19,
      };

      const detectedType = detectCardType(input);
      const maxInputLength = maxInputLengths[detectedType] || 19;
      let formattedInput = "";
      let numericInput = input.replace(/\s/g, "");

      if (detectedType === "American Express") {
        setMaxSecurityCode(4)
        for (let i = 0; i < numericInput.length; i++) {
          if (i === 4 || i === 10) {
            formattedInput += " ";
          }
          formattedInput += numericInput[i];
        }
      } else if (detectedType === "Diners") {
        for (let i = 0; i < numericInput.length; i++) {
          if (i === 4 || i === 10) {
            formattedInput += " ";
          }
          formattedInput += numericInput[i];
        }
      } else if (detectedType === "Visa") {
        for (let i = 0; i < numericInput.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedInput += " ";
          }
          formattedInput += numericInput[i];
        }
      } else {
        for (let i = 0; i < numericInput.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedInput += " ";
          }
          formattedInput += numericInput[i];
        }
      }
      formattedInput = formattedInput.slice(0, maxInputLength);
      setCreditCardData({ ...creditCardData, number: formattedInput, network: detectedType, });
      setCardType(detectedType);
      setInputValid(
        numericInput.length >=
          (detectedType === "Diners"
            ? 14
            : detectedType === "UnionPay"
            ? 16
            : detectedType === "Visa"
            ? 13
            : 15) && numericInput.length <= maxInputLength
      );
    
      const detectType: "Visa" | "Mastercard" | "American Express" | "Discover" | "Diners" | "UnionPay" | "Unknown" = detectCardType(input); // Specify the type

      if (detectType === "Visa" || detectType === "Mastercard") {
        formattedInput = formatCardNumber(input, 4); // Format with a space every 4 characters
      } else {
        formattedInput = input; // Default formatting for other card types
      }

      // Check if cardNumberInputRef.current is not null
      if (cardNumberInputRef.current) {
        // Set the formatted value back to the input field
        cardNumberInputRef.current.value = formattedInput; // Update the input field with the formatted input
      }
    }
    
  };
  function formatCardNumber(cardNumber:any, chunkSize:any) {
    const chunks = [];
    for (let i = 0; i < cardNumber.length; i += chunkSize) {
      chunks.push(cardNumber.substr(i, chunkSize));
    }
    return chunks.join(' ');
  }
  const handleExpiryChange = (e: any) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedInput = "";

    for (let i = 0; i < input.length; i++) {
      if (i === 2 && input.length > 2) {
        formattedInput += "/";
      }
      if (i >= 4) {
        break;
      }
      formattedInput += input[i];
    }
    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const isValid = expirationPattern.test(formattedInput);
    setCreditCardData({ ...creditCardData, expiration_date: formattedInput });
    setInputValid(isValid);
  };
  const handleSecurityCodeChange = (e: any) => {
    const input = e.target.value.replace(/\D/g, "").substring(0, maxSecurityCode);
    setCreditCardData({ ...creditCardData, cvc: input });

  };
  // const [setSubscriptionAttempt] = useSetStateMutation();
  const baseUrl = process.env.BASE_API_URL
  const [accessToken, setAccessToken ] = useState('');
  useEffect(() => {
    const url = window.location.href;
    const decodedUrl = decodeURIComponent(url)
    const decodedUrlObject = new URL(decodedUrl)
      const accessToken =  decodedUrlObject.searchParams.get('accessToken');
      if (accessToken) {
        setAccessToken(accessToken)
      } else {
        console.log("Token not found in the URL");
      }
  }, [accessToken])
  const handleSubmit = () => {
    fetch(`${baseUrl}card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(creditCardData),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching data:', error));
  };
  return (
    <div className="titlePT">
      <section>
        <div className="mx-[auto] px-[10px] ">
          <PremiumDetail />
          <div
            className="parent-div flex flex-col justify-between"
          >
            <div className="">
              <h5 className="text-[18px] px-[25px]  text-[#333333] capitalize pt-[20px] pb-[5px]">
                Enter credit/debit card information
              </h5>
              {step === 1 && (
                <div className="my-[0px] mt-[2.65625vw] shadow-sm rounded-[5.34vw] bg-[#fff] h-[12.54vw] sm:h-[3.421875vw] mx-auto flex items-center border-solid border-[1px]  px-[.78125vw]">
                  <input
                    className={`${inputStyles.base} ${inputStyles.placeholder}`}
                    type="text"
                    onChange={handleNameInputChange}
                    placeholder="Name on card"
                    value={creditCardData.holder_name}
                  />
                </div>
              )}
              {step === 2 && (
                <div className="my-[0px] mt-[2.65625vw] shadow-sm rounded-[5.34vw] bg-[#fff] h-[12.54vw] sm:h-[3.421875vw] mx-auto flex items-center border-solid border-[1px]  px-[.78125vw]">
                  <input
                   className={`${inputStyles.base} ${inputStyles.placeholder}`}
                    ref={cardNumberInputRef}
                    type="tel"
                    placeholder="Card number"
                    value={creditCardData.number}
                    onInput={handleCardNumberChange}
                    inputMode="numeric"
                    pattern="\d*"
                  />
                  {renderCardImage()}
                </div>
              )}
              {step === 3 && (
                <div className="my-[0px] mt-[2.65625vw] shadow-sm rounded-[5.34vw] bg-[#fff] h-[12.54vw] sm:h-[3.421875vw] mx-auto flex items-center border-solid border-[1px]  px-[.78125vw]">
                  <input
                    className={`${inputStyles.base} ${inputStyles.placeholder}`}
                    ref={expirationInputRef}
                    type="text"
                    placeholder="Expiration date (MM/YY)"
                    value={creditCardData.expiration_date}
                    onChange={handleExpiryChange}
                    inputMode="numeric"
                  />
                </div>
              )}
              {step === 4 && (
                <div className="my-[0px] mt-[2.65625vw] shadow-sm rounded-[5.34vw] bg-[#fff] h-[12.54vw] sm:h-[3.421875vw] mx-auto flex items-center border-solid border-[1px]  px-[.78125vw]">
                  <input
                    className={`${inputStyles.base} ${inputStyles.placeholder}`}
                    ref={securityCodeInputRef}
                    placeholder="Security code (CVV)"
                    value={creditCardData.cvc}
                    onChange={handleSecurityCodeChange}
                    inputMode="numeric"
                  />
                </div>
              )}
              {step === 4 && cardType == "American Express" && (
                <div>
                  {creditCardData.cvc.toString().length < 4 && (
                    <p
                      className="text-[#11AAFF] cursor-pointer button text-sm font-medium text-center block mx-auto my-4"
                      onClick={openAmexModal} 
                    >
                      Explanation
                    </p>
                  )}
                  {creditCardData.cvc.toString().length >= 4 && (
                    <p
                      className="text-[#11AAFF] cursor-pointer button text-sm font-medium text-center block mx-auto my-4"
                      onClick={handleSubmit}
                    >
                      Submit
                    </p>
                  )}
                </div>
              )}
              {step === 4 && cardType !== "American Express" && (
                <div>
                  {creditCardData.cvc.toString().length < 3 && (
                    <p
                      className="text-[#11AAFF] cursor-pointer button text-sm font-medium text-center block mx-auto my-4"
                      onClick={openNonAmexModal}
                    >
                      Explanation
                    </p>
                  )}
                  {creditCardData.cvc.toString().length >= 3 && (
                    <p
                      className="text-[#11AAFF] cursor-pointer button text-sm font-medium text-center block mx-auto my-4"
                      onClick={handleSubmit}
                    >
                      Submit
                    </p>
                  )}
                </div>
              )}
              {isInputValid && (
                <p
                  className="text-[#11AAFF] cursor-pointer button text-sm font-medium text-center block mx-auto my-4"
                  onClick={handleNextStep}
                >
                  Next
                </p>
              )}
            </div>
            <div
              className={`bottom-section fixed bottom-0 left-0 w-full overflow-hidden`}
            >
              <div className="text-center">
                <button className="text-center text-[11px] px-[10px] text-[#333333]">
                  No commitment. Cancel anytime on Gro’s website before each
                  renewal date. Plan automatically renews unless cancelled.
                </button>
              </div>
              <div className="text-center pb-[5px] pt-[0px]">
                <button className="text-center text-[11px] px-[10px] text-[#333333]">
                  Gro uses SSL encryption to secure your data
                  <Image
                    src={Shield}
                    alt="Credit Card"
                    className="w-[15px] h-[15px] ml-1 inline"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isAmexModalOpen && <AmexExplanationModal closeModal={closeAmexModal} />}
      {isNonAmexModalOpen && <NonAmexModalComponent closeModal={closeNonAmexModal} /> }
    </div>
  );
};

export default GoPremium;