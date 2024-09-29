import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./Layout/layoutPage";
import HomePage from "./Page/homePage";
import { SpecificProvider } from "./Components/specificContext";
import ListSocialInsurance from "./Page/list_social_insurance";
import ListHealthInsurance from "./Page/BHYT/list_health_insurance";
import ProductDetailPage from "./Components/product_detail";
import ProductDetailPage1 from "./Components/product_detail_1";
import BillPayPage from "./Components/bill_pay";
import BillPayBHYTPage from "./Components/bill_pay_bhyt";
import BuillDetailPage from "./Page/bill_detail";
import RegisterBHXH from "./Components/register_bhxh";
import RegisterBHYT from "./Page/BHYT/register_bhyt";
import ListsHistoryPage from "./Page/lists_history_page";
import InfoDetailBHYT from "./Page/BHYT/info_detail_bhyt";
import ListHistoryBHYT from "./Page/BHYT/list_history_bhyt";
import CheckStatusProcedure from "./Page/check_status_procedure";
import HistoryUnpaidPage from "./Components/history_unpaid";
import ContractPage from "./Page/contract_page";
import HistoryPage from "./Page/history_page";
import UserPage from "./Page/user";

function App() {
  return (
    <>
      <ToastContainer
        style={{
          width: "80%",
          borderRadius: "20px",
          marginTop: "40px",
          marginLeft: "10%",
          marginRight: "10%",
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
        <Route path="/" element={<LayoutPage key="layout" />}>
          <Route index element={<HomePage />} />
          <Route path="contract" element={<ContractPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route
          path="/social-insurance"
          element={
            <SpecificProvider>
              <ListSocialInsurance />
            </SpecificProvider>
          }
        />
        <Route path="/health-insurance" element={<ListHealthInsurance />} />
        <Route
          path="/product-detail/:id"
          element={
            <SpecificProvider>
              <ProductDetailPage />
            </SpecificProvider>
          }
        />
        <Route path="/product-detail-1/:id" element={<ProductDetailPage1 />} />
        <Route
          path="/buill-pay/:id"
          element={
            <SpecificProvider>
              <BillPayPage w={""} h={""} url={""} />
            </SpecificProvider>
          }
        />
        <Route
          path="/bill-pay-bhyt/:id"
          element={<BillPayBHYTPage w={""} h={""} url={""} />}
        />
        <Route
          path="/buill-detail/:id"
          element={
            <SpecificProvider>
              <BuillDetailPage />
            </SpecificProvider>
          }
        />
        <Route
          path="/register-BHXH"
          element={
            <SpecificProvider>
              <RegisterBHXH />
            </SpecificProvider>
          }
        />
        <Route path="/register-BHYT/" element={<RegisterBHYT />} />
        <Route
          path="/lists-history"
          element={<ListsHistoryPage w={""} h={""} url={""} />}
        />
        <Route path="/info-detail-bhyt/:id" element={<InfoDetailBHYT />} />
        <Route path="/list-history-bhyt" element={<ListHistoryBHYT />} />
        <Route
          path="/check-status-procedure/:id"
          element={<CheckStatusProcedure />}
        />
        <Route
          path="/history-unpaid/:id"
          element={
            <SpecificProvider>
              <HistoryUnpaidPage />
            </SpecificProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
