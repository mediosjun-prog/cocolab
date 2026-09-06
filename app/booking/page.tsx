import type { Metadata } from 'next';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'カウンセリングご予約 | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼの専門カウンセラーのオンライン面談・ご予約はこちらのフォームからお手続きいただけます。',
};

export default function BookingPage() {
  return <BookingContent />;
}