import Header from "./Header";
import Footer from "./Footer";

export default function DesktopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      {/* BODY */}
      <div className="flex-1 overflow-visible bg-background text-gray-900 ">
        <main >
          {children}
        </main>
      </div>
      {/* FOOTER */}
     <Footer />
    </div>
  );
}
