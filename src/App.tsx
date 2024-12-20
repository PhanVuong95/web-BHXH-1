import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutPage from "./layout/layout_page";
import HomePage from "./pages/home_page";
import { SpecificProvider } from "./components/specific_context";
import ListSocialInsurance from "./pages/list_social_insurance_page";
import ListHealthInsurance from "./pages/bhyt/list_health_insurance_page";
import ProductDetailPage from "./components/product_detail";
import ProductDetailPage1 from "./components/product_detail_1";
import BillPayPage from "./components/bill_pay";
import BillPayBHYTPage from "./components/bill_pay_bhyt";
import BuillDetailPage from "./pages/bill_detail_page";
import RegisterBHXH from "./components/register_bhxh";
import RegisterBHYT from "./pages/bhyt/register_bhyt_page";
import ListsHistoryPage from "./pages/lists_history_page";
import InfoDetailBHYT from "./pages/bhyt/info_detail_bhyt_page";
import ListHistoryBHYT from "./pages/bhyt/list_history_bhyt_page";
import CheckStatusProcedure from "./pages/check_status_procedure";
import HistoryUnpaidPage from "./components/history_unpaid";
import ContractPage from "./pages/contract_page";
import HistoryPage from "./pages/history_page";
import UserPage from "./pages/user_page";
import LoginPage from "./pages/login_page";
import PrivacyPolicyPage from "./components/privacy_policy";
import LuckUpBHXH from "./pages/luckup_bhxh";
import { useEffect, useState } from "react";
import CardNewDetailPages from "./components/CardNewDetailPages";
import ToolSupportPage from "./pages/tool_support_page";
import RegisterPage from "./pages/register_page";

function App() {
  const [, setUser] = useState<any>(null);

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
          width: "25%",
          borderRadius: "20px",
          marginTop: "40px",
          marginLeft: "10%",
        }}
        toastStyle={{
          borderRadius: "7px",
        }}
        position="top-right"
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
        <Route path="/" element={<LayoutPage key="layout" />}>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
            path="product-detail/:id"
            element={
              <SpecificProvider>
                <ProductDetailPage />
              </SpecificProvider>
            }
          />
          <Route path="product-detail-1/:id" element={<ProductDetailPage1 />} />
          <Route
            path="buill-pay/:id"
            element={
              <SpecificProvider>
                <BillPayPage w={""} h={""} url={""} />
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
          <Route path="new-detail/:id" element={<CardNewDetailPages />} />
          <Route path="tool-support" element={<ToolSupportPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
