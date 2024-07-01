import React, { useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

axios.defaults.withCredentials = true;

export default function Pay() {
  const createOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8080/createOrder");
      const order = response.data;
      console.log(response.data);

      const options = {
        key: "rzp_test_XEpO7zQzzsnXb3",
        amount: order.amount_due.toString(),
        currency: "INR",
        name: "Tune Hub",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: "Your Name",
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again later.");
    }
  };

  const verifyPayment = async (orderId, paymentId, signature) => {
    try {
      const response = await axios.post("http://localhost:8080/verify", {
        orderId: orderId,
        paymentId: paymentId,
        signature: signature,
      });
      const isValid = response.data;
      console.log(isValid);
      if (isValid) {
        alert("Payment successful");
        const paymentSuccessful = async () => {
          const response = await axios.get(
            "http://localhost:8080/payment-success"
          );
          console.log(response.data);
          window.location.href = "/customerhome";
        };
        paymentSuccessful();
      } else {
        alert("Payment failed");
        const paymentUnsuccessful = async () => {
          const response = await axios.get(
            "http://localhost:8080/payment-failure"
          );
          console.log(response.data);
        };
        paymentUnsuccessful();
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error while verifying payment. Please contact support.");
    }
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://checkout.razorpay.com/v1/checkout.js";
    script1.async = true;
    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script1);
    };
  }, []);

  const handleBuyButtonClick = (e) => {
    e.preventDefault();
    createOrder();
  };

  return (
    <div>
      <Helmet>
        <title>View Course</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      </Helmet>
      <h1>Why premium?</h1>
      <p>text...................</p>
      <form id="payment-form">
        <button
          type="submit"
          className="buy-button"
          onClick={handleBuyButtonClick}
        >
          BUY
        </button>
      </form>
    </div>
  );
}
