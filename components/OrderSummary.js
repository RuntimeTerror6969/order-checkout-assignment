import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import styles from "../public/styles/OrderSummary.module.css";

export default function OrderSummary({
  logo,
  orderID,
  item,
  currency,
  totalAmount,
}) {
  const { theme } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Choose payment methods based on currency
  const paymentMethods =
    currency === "INR₹"
      ? [
          { id: "rupay", label: "RuPay", icon: "/payment-icons/rupay.svg" },
          { id: "paytm", label: "Paytm", icon: "/payment-icons/paytm.svg" },
          {
            id: "phonepe",
            label: "PhonePe",
            icon: "/payment-icons/phonepe.svg",
          },
        ]
      : [
          { id: "visa", label: "Visa", icon: "/payment-icons/visa.svg" },
          {
            id: "mastercard",
            label: "Mastercard",
            icon: "/payment-icons/mastercard.svg",
          },
          {
            id: "amex",
            label: "American Express",
            icon: "/payment-icons/amex.svg",
          },
        ];

  return (
    <div className={styles.orderSummary}>
      {logo && (
        <div className={styles.merchantInfo}>
          <Image
            src={`data:image/png;base64,${logo}`}
            alt="Merchant Logo"
            width={300} // Increased width (approximately 2x wider)
            height={160} // Adjusted height to preserve aspect ratio
            className={styles.logo}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <h1
        style={{
          textAlign: "center",
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        Order Summary
      </h1>

      <div className={styles.orderDetails}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #000",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Order ID:</span>
          <span>{orderID}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 0",
            borderBottom: "1px solid #000",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Item:</span>
          <span>{item}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
        }}
      >
        <span>Total Amount:</span>{" "}
        <span>
          {currency} {totalAmount}
        </span>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Select Payment Method
        </h2>
        <div className={styles.paymentIcons}>
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "0.75rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                transition: "background-color 0.2s",
                backgroundColor:
                  selectedMethod === method.id
                    ? theme === "dark"
                      ? "#1e40af"
                      : "#bfdbfe"
                    : theme === "dark"
                    ? "#374151"
                    : "#fff",
                marginBottom: "1rem",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                style={{ marginRight: "0.75rem" }}
              />
              <Image
                src={method.icon}
                alt={method.label}
                width={80}
                height={50}
                style={{ objectFit: "contain", marginRight: "1rem" }}
              />
              <span style={{ color: theme === "dark" ? "#f5f5f5" : "#333" }}>
                {method.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
