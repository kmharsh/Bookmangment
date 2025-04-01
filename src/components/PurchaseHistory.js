import React, { useEffect, useState } from "react";
import "./styles/PurchaseHistory.scss";

function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("purchaseHistory"));
    setPurchaseHistory(history);
  }, []);

  const handleRazorpayPayment = (amount) => {
    if (isPaymentInProgress) return; 
    setIsPaymentInProgress(true); 

    console.log("Razorpay Payment Handler Called");

 
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded properly.");
      setIsPaymentInProgress(false);
      return;
    }

    const options = {
      key: "rzp_test_1DpqOq9IzdwDi6", 
      amount: amount * 1, 
      currency: "INR",
      handler: function (response) {
        console.log("Payment successful", response);
        setIsPaymentInProgress(false);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    console.log("Razorpay options:", options);

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePaymentClick = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentOptionSelect = (method) => {
    setPaymentMethod(method);
    if (method === "Razorpay" && purchaseHistory) {
      handleRazorpayPayment(purchaseHistory.totalAmount);
    }
    setShowPaymentOptions(false);
  };

  if (!purchaseHistory) {
    return <p>No purchase history available.</p>;
  }

  return (
    <div className="purchase-history-container">
      <div className="purchase-history-card">
        <h2 className="title">Your Purchase History</h2>
        <ul className="purchase-list">
          {purchaseHistory.cart.map((item, index) => (
            <li key={index} className="purchase-item">
              <div className="item-details">
                <span className="item-title">{item.title}</span>
                <span className="item-quantity">
                  {item.quantity} x ${item.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-amount">
          <h3>Total Amount: ${purchaseHistory.totalAmount}</h3>
        </div>
        <button className="payment-button" onClick={handlePaymentClick}>
          Proceed to Payment
        </button>

        {showPaymentOptions && (
          <div className="payment-options-overlay">
            <div className="payment-options-modal">
              <h3>Select Payment Method</h3>
              <button onClick={() => handlePaymentOptionSelect("Credit Card")}>
                Credit Card
              </button>
              <button onClick={() => handlePaymentOptionSelect("PayPal")}>
                PayPal
              </button>
              <button onClick={() => handlePaymentOptionSelect("Debit Card")}>
                Debit Card
              </button>
              <button onClick={() => handlePaymentOptionSelect("Cash on Delivery")}>
                Cash on Delivery
              </button>
              <button onClick={() => handlePaymentOptionSelect("Razorpay")}>
                Razorpay
              </button>
              <button
                className="close-modal"
                onClick={() => setShowPaymentOptions(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseHistory;
