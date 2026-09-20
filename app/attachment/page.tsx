import { Metadata } from "next";
import AttachmentContent from "./AttachmentContent";

export const metadata: Metadata = {
  title: "愛着について | ここらぼ",
  description: "人間関係やパートナーシップの土台となる「愛着スタイル」の基礎知識と、大人の愛着をより安定させていくためのヒントを解説します。",
};

export default function AttachmentPage() {
  return <AttachmentContent />;
}