"use client";
import "../../styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="header">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
