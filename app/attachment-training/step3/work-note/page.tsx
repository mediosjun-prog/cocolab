import { Metadata } from "next";
import Step3WorkContent from "./Step3WorkContent";

export const metadata: Metadata = {
  title: "Step 3 実践ワーク：素直な気持ちの言語化 | ここらぼ",
  description: "人間関係でモヤモヤしたときのIメッセージやリクエストの整理を記録する専用ワークノートです。",
};

export default function Step3WorkPage() {
  return <Step3WorkContent />;
}