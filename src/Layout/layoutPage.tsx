import { Outlet } from "react-router-dom";
import HeaderPage from "./../Components/headerPage";
import FooterPage from "../Components/footerPage";

const LayoutPage = () => {
  return (
    <div>
      <header>
        <HeaderPage />
      </header>
      <main className="pt-[51px] ms:pt-[60px]">
        <Outlet />
      </main>
      <footer>
        <FooterPage />
      </footer>
    </div>
  );
};

export default LayoutPage;
