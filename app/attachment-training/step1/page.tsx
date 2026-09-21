import { Metadata } from "next";
import Step1Content from "./Step1Content";

export const metadata: Metadata = {
  title: "Step 1：自分の「愛着の癖」に気づく | ここらぼ実践トレーニング",
  description: "獲得安定型を手に入れるための第一歩。無意識の愛着の癖やトリガーに気づき、客観的に観察するための実践アプローチを解説します。",
};

export default function Step1Page() {
  return <Step1Content />;
}