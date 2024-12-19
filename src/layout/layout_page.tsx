import { Outlet } from "react-router-dom";
import HeaderPage from "../components/header_page";
import FooterPage from "../components/footerPage";

const LayoutPage = () => {
  return (
    <div>
      <header className="">
        <HeaderPage />
      </header>
      <main className="pt-[92px] ms:pt-[60px] bg-[#fff] min-h-[66vh]">
        <Outlet />
      </main>
      <footer>
        <FooterPage />
      </footer>
    </div>
  );
};

export default LayoutPage;
