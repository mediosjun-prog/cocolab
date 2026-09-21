import { Metadata } from "next";
import TrainingContent from "./TrainingContent";

export const metadata: Metadata = {
  title: "「獲得安定型」を育む実践トレーニング | ここらぼ",
  description: "大人になってからも安心できるパートナーシップや自己理解を通じて、後天的に安定した愛着（獲得安定型）を手に入れるためのトレーニング方法を解説します。",
};

export default function TrainingPage() {
  return <TrainingContent />;
}