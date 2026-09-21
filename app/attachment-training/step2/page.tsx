import { Metadata } from "next";
import Step2Content from "./Step2Content";

export const metadata: Metadata = {
  title: "Step 2：安心の基地を心の中に作る | ここらぼ実践トレーニング",
  description: "獲得安定型を手に入れるための第二歩。インナーチャイルドの癒やや内なる安心感を育み、心の中に安全な基地を作る方法を解説します。",
};

export default function Step2Page() {
  return <Step2Content />;
}