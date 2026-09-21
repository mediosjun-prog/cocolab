import { Metadata } from "next";
import Step3Content from "./Step3Content";

export const metadata: Metadata = {
  title: "Step 3：安全なパートナーシップを体験する | ここらぼ実践トレーニング",
  description: "獲得安定型を手に入れるための第三歩。安心感のある人間関係の築き方や、Iメッセージ、お互いの境界線を尊重するコミュニケーションを解説します。",
};

export default function Step3Page() {
  return <Step3Content />;
}