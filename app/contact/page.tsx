import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'お問い合わせ | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼへのお問い合わせ・ご質問、専門家へのご相談はこちらのフォームからお気軽にご連絡ください。',
};

export default function ContactPage() {
  return <ContactContent />;
}