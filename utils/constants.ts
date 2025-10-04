import { isDev } from "./helpers";

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for personal use",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_7sYbJ054DgxQ4pq0E64sE00"
      : "",
    priceId: isDev ? "price_1SDfB5BS6WjN5QH1wVwRXma5" : "",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_bJe00icx56Xg3lmbiK4sE01"
      : "",
    priceId: isDev ? "price_1SDfC6BS6WjN5QH1qKdPPp8s" : "",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 Priority support",
      "Markdown Export",
    ],
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      straggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants:any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0, // 👈 reset position
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export const buttonVariants:any = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};

export const listVariants:any = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};
