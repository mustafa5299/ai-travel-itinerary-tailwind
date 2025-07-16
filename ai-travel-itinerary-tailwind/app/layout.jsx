import './globals.css';

export const metadata = {
  title: 'AI Travel Itinerary Generator',
  description: 'Plan your day trip using AI-powered itineraries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
