import React, { useEffect, useState } from "react";
import { Card, Button, Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react"; // Import useSession
import { usePostUserPricing } from "@/services/pricingservice"; // Import the custom hook
import { useRouter } from "next/router";

const Page = () => {
  const { data: session, update } = useSession(); // Get the user session
  const [isAnnual, setIsAnnual] = useState(true);
  const [dataPrice, setDataPrice] = useState<Array<any>>([]);

  const { mutateAsync: updatePricing, isSuccess, error, isPending } = usePostUserPricing({
    onSuccess: () => {
      alert("Success Updated !")
    },
  })
  const router = useRouter();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `/api/price?isAnnual=${isAnnual}`
        );

        if (resp) {
          setDataPrice(resp.data.data);
        }

      } catch (error) {
        console.log("failed fetching price data: ", error);
      }
    };

    fetchData();

  }, [isAnnual, session, isSuccess]);



  const handlePlanSelection = async (priceId: number): Promise<void> => {


    if (session?.user) {
      const dataPriceDesc = await updatePricing({ email: session?.user?.email, priceId: priceId });

      if (dataPriceDesc) {

        const priceName = dataPriceDesc && dataPriceDesc.priceName;

        update({ user: { ...session, priceName: priceName } });

        setTimeout(() => {
          router.push({ pathname: "/app/dashboard" });

        }, 500);

        // window.location.href = '/app/dashboard';
      }

    }
  };

  return (
    <div className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Pricing Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Select the perfect plan for your video creation needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4">
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                  color="primary"
                />
              }
              label=""
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataPrice.length > 0 &&
            dataPrice.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-8 ${plan.popular ? "border-2 border-blue-500" : ""
                  }`}
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-end mb-4">
                    {plan.price === "Custom" ? (
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">$</span>
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {plan.period}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.buttonVariant}
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2,
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    ...(plan.popular && {
                      backgroundColor: "rgb(59, 130, 246)",
                      "&:hover": {
                        backgroundColor: "rgb(29, 78, 216)",
                      },
                    }),
                  }}
                  onClick={() => handlePlanSelection(plan._id)}
                >
                  {isPending ? 'Processing...' : plan.buttonText}
                </Button>
              </Card>
            ))}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
