"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

  const paymentMethods =
    currency === "INR₹"
      ? [
          { id: "rupay", name: "RuPay", icon: "/payment-icons/rupay.svg" },
          { id: "paytm", name: "PayTM", icon: "/payment-icons/paytm.svg" },
          {
            id: "phonepe",
            name: "PhonePe",
            icon: "/payment-icons/phonepe.svg",
          },
        ]
      : [
          { id: "visa", name: "Visa", icon: "/payment-icons/visa.svg" },
          {
            id: "mastercard",
            name: "Mastercard",
            icon: "/payment-icons/mastercard.svg",
          },
          {
            id: "amex",
            name: "American Express",
            icon: "/payment-icons/amex.svg",
          },
        ];

  return (
    <Card
      className={`w-full max-w-md mx-auto ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-lg`}
    >
      <CardHeader
        className={`border-b p-4 ${
          theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100"
        } rounded-t-lg`}
      >
        <div className="flex items-center space-x-2">
          {logo && (
            <div className="max-w-xs min-h-[3rem] aspect-auto">
              {" "}
              {/* Changed container styling */}
              <Image
                src={`data:image/png;base64,${logo}`}
                alt="Merchant Logo"
                width={0} // Let the image determine width
                height={0} // Let the image determine height
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "3rem",
                }}
                className="object-scale-down" // Changed from object-contain
              />
            </div>
          )}
          <h1
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Complete your Payment
          </h1>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div
          className={`space-y-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <div className="flex justify-between text-sm">
            <span>Order ID</span>
            <span className="font-medium">{orderID}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Item</span>
            <span className="font-medium">{item}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span>
              {currency} {totalAmount}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2
            className={`text-sm font-medium ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Choose Payment Provider
          </h2>
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="space-y-3"
          >
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  className={theme === "dark" ? "text-white" : ""}
                />
                <Image
                  src={method.icon}
                  alt={method.name}
                  width={40}
                  height={25}
                  className="object-contain"
                />
                <Label
                  htmlFor={method.id}
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  {method.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
