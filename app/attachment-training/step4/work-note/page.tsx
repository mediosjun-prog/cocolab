import { Metadata } from "next";
import Step4WorkContent from "./Step4WorkContent";

export const metadata: Metadata = {
  title: "Step 4 実践ワーク：セルフ・コンパッション・ブレイク | ここらぼ",
  description: "自己批判を手放し、自分へ優しさを向けるためのセルフ・コンパッションの実践を記録する専用ワークノートです。",
};

export default function Step4WorkPage() {
  return <Step4WorkContent />;
}