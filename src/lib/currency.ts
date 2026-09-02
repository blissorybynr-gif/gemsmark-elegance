import { USD_TO_PKR } from "@/data/site";

export const usd = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const pkr = (usdValue: number) =>
  `PKR ${Math.round(usdValue * USD_TO_PKR).toLocaleString("en-US")}`;

export const toPkr = (usdValue: number) => Math.round(usdValue * USD_TO_PKR);
