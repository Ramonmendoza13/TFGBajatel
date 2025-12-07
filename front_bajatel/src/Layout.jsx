import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      
      <FooterComponent />
    </div>
  );
};

export default Layout;