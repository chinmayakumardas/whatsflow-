import { Providers } from "@/store/providers";
import "../globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProtectedLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" cz-shortcut-listen="true">
        <Providers>
        <AdminLayout>
          {children}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </AdminLayout>
        </Providers>
          
      </body>
    </html>
  );
}
