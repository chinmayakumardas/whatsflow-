import { Providers } from "@/store/providers";
import "../globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: "Metaflow Admin Pannel",
  description: "Welcome to metaFlow a complete whatsapp automation Platform!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased" cz-shortcut-listen="true"
      >
        <Providers>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        {children}
        </Providers>
      </body>
    </html>
  );
}
