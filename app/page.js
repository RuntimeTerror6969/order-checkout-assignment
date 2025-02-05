"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary from "../components/OrderSummary";
import ErrorPage from "../components/ErrorPage";
import ThemeToggle from "../components/ThemeToggle";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const validateMerchant = async () => {
      try {
        if (!params.merchantID) {
          setMerchant({ error: true });
          return;
        }

        const response = await fetch("/api/validateMerchant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ merchantID: params.merchantID }),
        });

        const data = await response.json();
        setMerchant(data.exists ? { ...params, ...data } : null);
      } catch (error) {
        console.error("Validation failed:", error);
        setMerchant({ error: true });
      } finally {
        setLoading(false);
      }
    };

    validateMerchant();
  }, [searchParams]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (merchant?.error) return <ErrorPage />;
  if (!merchant) return <ErrorPage />;

  return (
    // A container that limits width and centers content
    <div className="min-h-screen max-w-screen-md mx-auto px-4 py-8">
      <ThemeToggle />
      <OrderSummary {...merchant} />
    </div>
  );
}
