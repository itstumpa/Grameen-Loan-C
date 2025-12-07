import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
console.log(parcel)

// const handlePayment =async () => {
//   const paymentInfo = {
//     parcelId: parcel._id,
//     parcelName: parcel.parcelName,
//     cost: parcel.cost,
//     senderEmail: parcel.senderEmail,
//   };
//   const response = await
//   axiosSecure
//     .post("/create-checkout-session", paymentInfo)
//     .then((response) => {
//       if (response.data.url) {
//         window.location.href = response.data.url;
//       }
//     })
//     .catch((error) => {
//       console.error("Error creating checkout session:", error);
//     });
//   };  

  if (isLoading) {
    <div>
      <span className="loading loading-ring loading-lg"></span>
    </div>;
  }
  return (
    <div>
      <h2>Please Pay ${parcel?.cost} for : {parcel?.parcelName}</h2>
{/* <button onClick={handlePayment} className="btn btn-primary">Pay</button> */}

    </div>
  );
};

export default Payment;
