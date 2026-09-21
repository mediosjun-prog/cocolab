import { Metadata } from "next";
import Step2WorkContent from "./Step2WorkContent";

export const metadata: Metadata = {
  title: "Step 2 実践ワーク：安心のスイッチ | ここらぼ",
  description: "心身を落ち着かせるためのセルフ・スージング（安心のスイッチ）の実践と振り返りを記録する専用ワークノートです。",
};

export default function Step2WorkPage() {
  return <Step2WorkContent />;
}