import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "telecom.ac.th",
  description: "IoT-Platform control everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <Navbar />
          <div className="mt-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
