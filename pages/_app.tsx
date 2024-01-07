import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app-main-container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>
      <div className="app-container flex justify-center mt-20">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
