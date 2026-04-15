import "./globals.css";

import { ReactNode } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: Props) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>

            <Header />

            {children}

            <Footer />

            {modal}

          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}