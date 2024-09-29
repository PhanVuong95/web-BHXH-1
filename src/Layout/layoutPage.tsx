import { Outlet } from "react-router-dom";
import HeaderPage from "./../Components/headerPage";
import FooterPage from "../Components/footerPage";
import axios from "axios";

export let logged = false;

const LayoutPage = () => {
  const login = async () => {
    try {
      logged = true;

      const userId = "3368637342326461234";

      const { data } = await axios.post(
        `https://baohiem.dion.vn/account/api/login-mini-app`,
        {
          Username: userId,
        }
      );

      // Saving token to cookies
      document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

      // Saving token to local storage
      localStorage.setItem("token", data.resources.accessToken);
      localStorage.setItem("profile", JSON.stringify(data.resources.profile));

      console.log("Đăng nhập - đăng ký thành công!!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!logged) {
    login();
  }

  return (
    <div className="bg-[#cfc8c8]">
      <header>
        <HeaderPage />
      </header>
      <main className="pb-[66px]">
        <Outlet />
      </main>
      <footer>
        <FooterPage />
      </footer>
    </div>
  );
};

export default LayoutPage;
