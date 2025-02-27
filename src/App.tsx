import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutPage from "./layout/layout_page";
import HomePage from "./pages/home/home_page";
import { SpecificProvider } from "./components/specific_context";
import ListSocialInsurance from "./pages/bhxh/list_bhxh_page";
import ListHealthInsurance from "./pages/bhyt/list_health_insurance_page";
import IntroductBHXH from "./pages/bhxh/introduct-bhxh";
import IntroductBHYT from "./pages/bhyt/introduct-bhyt";
import BillPayBHXHPage from "./pages/bhxh/bill_pay-bhxh";
import BillPayBHYTPage from "./pages/bhyt/bill_pay_bhyt";
import BuillDetailPage from "./pages/common/bill_detail_page";
import RegisterBHXH from "./pages/bhxh/register_bhxh";
import RegisterBHYT from "./pages/bhyt/register_bhyt_page";
import ListsHistoryPage from "./pages/bhxh/list_bhxh_history_page";
import InfoDetailBHYT from "./pages/bhyt/info_detail_bhyt_page";
import ListHistoryBHYT from "./pages/bhyt/list_history_bhyt_page";
import CheckStatusProcedure from "./pages/common/check_status_procedure";
import HistoryUnpaidPage from "./pages/common/history_unpaid_page";
import ContractPage from "./pages/common/contract_page";
import HistoryPage from "./pages/common/history_page";
import UserPage from "./pages/user/user_page";
import PrivacyPolicyPage from "./pages/common/privacy_policy";
import LuckUpBHXH from "./pages/common/luckup_bhxh";
import { useEffect, useState } from "react";
import CardNewDetailPage from "./pages/new/card_new_detail_page";
import ToolSupportPage from "./pages/tool-support/tool_support_page";
import RegisterPage from "./pages/auth/register_page";
import ForgotPasswordPage from "./pages/auth/forgot_password_page";
import { ModalLoginProvider } from "./context/auth_context";
import VerifyAccountPage from "./pages/common/verify_account_page";
import { ProfileProvider } from "./components/user_profile_context";
import ChangePasswordPage from "./pages/auth/change_password_page";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [, setUser] = useState<any>(null);

  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    setUser(null);

    // alert("You have been logged out due to inactivity.");
    window.location.reload();
  };

  useEffect(() => {
    const profile = localStorage.getItem("profile");

    if (profile) {
      setUser(JSON.parse(profile));
    }

    // Thiết lập timeout để logout sau 1 phút (1 * 60 * 1000 ms)
    const logoutTimeout = setTimeout(() => {
      handleLogout();
    }, 3 * 60 * 60 * 1000);

    // Cleanup timeout khi component bị unmount hoặc trước khi thiết lập lại
    return () => clearTimeout(logoutTimeout);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer
        style={{
          maxWidth: "380px",
          borderRadius: "20px",
          marginTop: "40px",
        }}
        toastStyle={{
          borderRadius: "7px",
        }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          element={
            <ModalLoginProvider>
              <ProfileProvider>
                <LayoutPage key="layout" />
              </ProfileProvider>
            </ModalLoginProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="contract" element={<ContractPage />} />
          <Route
            path="history"
            element={
              <HistoryPage
                onViewCollaborators={() => navigate("/collaborators")}
                onViewBHYT={() => navigate("/list-history-bhyt")}
              />
            }
          />
          <Route
            path="user"
            element={
              <UserPage
                onViewCollaborators={() => navigate("/collaborators")}
                onViewBHYT={() => navigate("/list-history-bhyt")}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="social-insurance"
            element={
              <SpecificProvider>
                <ListSocialInsurance />
              </SpecificProvider>
            }
          />
          <Route path="health-insurance" element={<ListHealthInsurance />} />
          <Route
            path="introduct-bhxh"
            element={
              <SpecificProvider>
                <IntroductBHXH />
              </SpecificProvider>
            }
          />
          <Route path="introduct-bhyt" element={<IntroductBHYT />} />
          <Route
            path="bill-pay-bhxh/:id"
            element={
              <SpecificProvider>
                <BillPayBHXHPage w={""} h={""} url={""} />
              </SpecificProvider>
            }
          />
          <Route
            path="bill-pay-bhyt/:id"
            element={
              <SpecificProvider>
                <BillPayBHYTPage />
              </SpecificProvider>
            }
          />
          <Route
            path="buill-detail/:id"
            element={
              <SpecificProvider>
                <BuillDetailPage />
              </SpecificProvider>
            }
          />
          <Route
            path="register-BHXH"
            element={
              <SpecificProvider>
                <RegisterBHXH />
              </SpecificProvider>
            }
          />
          <Route
            path="register-BHYT/"
            element={<RegisterBHYT onBack={() => navigate(-1)} />}
          />
          <Route
            path="lists-history"
            element={<ListsHistoryPage onBack={() => navigate(-1)} />}
          />
          <Route
            path="info-detail-bhyt/:id/:statusName"
            element={<InfoDetailBHYT />}
          />
          <Route
            path="list-history-bhyt"
            element={<ListHistoryBHYT onBack={() => navigate(-1)} />}
          />
          <Route
            path="check-status-procedure/:id"
            element={<CheckStatusProcedure />}
          />
          <Route
            path="history-unpaid/:id/:statusName"
            element={
              <SpecificProvider>
                <HistoryUnpaidPage />
              </SpecificProvider>
            }
          />
          <Route path="privacy_policy" element={<PrivacyPolicyPage />} />
          <Route path="luckup-bhxh" element={<LuckUpBHXH />} />
          <Route path="new-detail/:id" element={<CardNewDetailPage />} />
          <Route path="tool-support" element={<ToolSupportPage />} />
          <Route
            path="xac-thuc-tai-khoan-thanh-cong"
            element={<VerifyAccountPage />}
          />
          <Route path="/quen-mat-khau" element={<ChangePasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
