import { Metadata } from "next";
import Step1WorkContent from "./Step1WorkContent";

export const metadata: Metadata = {
  title: "Step 1 実践ワーク：トリガー・ノート | ここらぼ",
  description: "日常の中で湧き上がった愛着のトリガー（不安やざわつき）を記録し、客観的に観察するための専用ワークノートです。",
};

export default function Step1WorkPage() {
  return <Step1WorkContent />;
}