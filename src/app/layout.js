"use client";
import "../../styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cinzel.className}>
      <body className="header">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
