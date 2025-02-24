import { NextApiRequest, NextApiResponse } from "next";
import { DescPriceModel } from "../../../models/descprice";
import { ConnectDB } from "../../../config/db";

type PricingPlan = {
  id: number,
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outlined" | "contained";
  popular: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Community",
    price: "0",
    period: "/month",
    description: "For casual video creators",
    features: [
      "Up to 5 videos per month",
      "720p video quality",
      "Basic templates",
      "Standard support",
    ],
    buttonText: "Get Started",
    buttonVariant: "outlined",
    popular: false,
  },
  {
    id: 2,
    name: "Premium",
    price: "79",
    period: "/year",
    description: "For professional creators",
    features: [
      "Unlimited videos",
      "1080p video quality",
      "Premium templates",
      "Priority support",
      "Custom branding",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "contained",
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Premium",
      "4K video quality",
      "Custom templates",
      "Dedicated support",
      "Advanced analytics",
      "API access",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outlined",
    popular: false,
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await ConnectDB()

  const { isAnnual } = req.query;

  const period = isAnnual === "true" ? "/year" : "/month";

  // const plans = pricingPlans.map((plan) => ({
  //   ...plan,
  //   price: plan.price === "0" ? "0" : `${plan.price}${period}`,
  // }));
  const plans = await DescPriceModel.find();

  return res.status(200).json({
    data: plans,
  });
};


// export default handler;
