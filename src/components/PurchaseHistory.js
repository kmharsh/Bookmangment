import React, { useState, useEffect } from "react";
import './styles/PurchaseHistory.scss';

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Retrieve purchase history from local storage
    const savedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(savedPurchases);
  }, []);

  const totalAmount = purchases.reduce((total, item) => total + item.price, 0);

  return (
    <div className="purchase-history">
      <h2>Purchase History</h2>
      {purchases.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        <>
          <ul>
            {purchases.map((purchase, index) => (
              <li key={index}>
                {purchase.title} - ${purchase.price}
              </li>
            ))}
          </ul>
          <div className="history-total">
            <strong>Total Amount Spent: ${totalAmount.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default PurchaseHistory;
