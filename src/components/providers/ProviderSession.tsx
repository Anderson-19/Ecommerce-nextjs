'use client';

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

export const ProviderSession = ({ children }: Props) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}
