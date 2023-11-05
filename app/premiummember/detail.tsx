import React, { useEffect, useState } from "react";
import ModalComponent from "./modalComponent";
import { Data } from "./helper";
import { extractTokenFromUrl } from "../comman/utils";
const PremiumDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const [details, setDetails] = useState<Data>({
    subscription_price: "",
    subscription_duration: "",
    email: "",
    phone_number: null,
    is_trial_displayed: null,
    is_trial_offered: false,
    trial_starts_at: null,
    trial_ends_at: null,
    is_later_and_delayed_offered: true,
    trial_status_message: null,
    subscription_status_message: "",
  });
  const [accessToken, setAccessToken] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const baseUrl = process.env.BASE_API_URL;

  useEffect(() => {
    const url = window.location.href;
    const decodedUrl = decodeURIComponent(url);
    const decodedUrlObject = new URL(decodedUrl);
    const accessToken = decodedUrlObject.searchParams.get('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
      // Make the API call here after setting the accessToken
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      fetch(`${baseUrl}subscription_attempt/latest`, {
        method: 'GET',
        headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          setDetails(result.data);

          if (result.data && result.data.subscription_duration) {
            if (result.data.subscription_duration === "yearly") {
              setSubscriptionPeriod("per year");
            } else if (result.data.subscription_duration === "monthly") {
              setSubscriptionPeriod("per month");
            }
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.log("Token not found in the URL");
    }
  }, [baseUrl]);

  
  return (
    <div className="titlePT">
      <section>
        <div className="mx-[auto]">
          <div className="px-[25px]">
            <h5 className="text-[18px] text-[#333333] my-0">
              Premium membership
            </h5>
            <p className="text-[14px] text-[#333333] mb-[5px]">
              Account: 
              {details.email}
            </p>
            {details.is_trial_displayed && (
              <>
                <h6 className="text-[15px] text-[#333333] my-0">
                  1-week free trial
                </h6>
                <p>
                  <span className="text-[#d3d3d3]">Starting today</span>
                </p>
              </>
             )} 
            <h6 className="text-[#333333]">
              {details.subscription_price} {subscriptionPeriod}
              
            </h6>

            {details.is_later_and_delayed_offered ? (
              <>
                <p>
                  <span className="text-[#d3d3d3]">
                    Starting after the trial or later
                  </span>
                </p>
                <p
                  className="text-[15px] button cursor-pointer text-center bg-transparent border-none outline-none focus:outline-none text-[#11AAFF] font-sofia mx-auto mt-[5px] font-medium"
                  onClick={openModal}
                >
                  More about delayed charges
                </p>
              </>
              ) : ( 
              <p>
                <span className="text-[#d3d3d3]">Starting after the trial</span>
              </p>
             )} 
            {isModalOpen && <ModalComponent closeModal={closeModal} />}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default PremiumDetail;