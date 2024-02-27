import type { Metadata } from "next";
import "./globals.css";
import { ProviderSession } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s | Teslo Shop',
    default: 'Home | Teslo Shop'
  },
  description: "Virtual shop of products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProviderSession>
          {children}
        </ProviderSession>
      </body>
    </html>
  );
}
