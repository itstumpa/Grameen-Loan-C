import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({})

  console.log("Payment successful, session ID:", sessionId);

  useEffect(() => {
    if (sessionId) {
   axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
   .then((response) => {
      console.log("Payment success recorded:", response.data);
setPaymentInfo({
       transactionId: response.data.transactionId,
       trackingId: response.data.trackingId,
})
 }).catch((error) => {
    console.error("Error recording payment success:", error);
    
 });
  }
}, [sessionId, axiosSecure]);

  return (
    <div>
      <h2>payment successful</h2>
      <p>Your Transection Id: {paymentInfo?.transactionId}</p>
      <p>Your Parcel Tracking Id: {paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
