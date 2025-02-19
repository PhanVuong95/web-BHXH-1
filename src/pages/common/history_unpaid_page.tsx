import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { formatDate } from "../../utils/validate_string";
import { SpecificContext } from "../../components/specific_context";
import logo from "../../assets-src/logo1.png";
import HeaderTitle from "../../components/header_title";
import api from "../../api/api-config";

const HistoryUnpaidPage: React.FunctionComponent = () => {
  const { id, statusName } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [insuredPerson, setInsuredPerson] = useState<any>();
  const [orderStatusId, setOrderStatusId] = useState<number>(0);
  const specificContext = useContext<any>(SpecificContext);
  const { insuranceOrder, setInsuranceOrder } = specificContext;

  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  console.log(insuranceOrder);

  useEffect(() => {
    api
      .get(`/insuranceorder/api/Detail-By-VM/` + id)
      .then((response) => {
        setOrderDetail(response.data.data[0]);
        setInsuredPerson(response.data.data[0].listInsuredPerson[0]);

        const result = response.data.data[0];
        const storeage = JSON.parse(JSON.stringify(result));
        delete storeage.price;
        delete storeage.discountPrice;
        delete storeage.fileUploadUrl;
        storeage.citizenId = 0;

        delete storeage.insuranceOrderPaymentStatusName;
        delete storeage.provinceName;
        delete storeage.wardName;
        delete storeage.insuranceName;
        delete storeage.districtName;
        delete storeage.insurancePrice;
        delete storeage.insuranceOrderStatusId;
        delete storeage.insuranceOrderStatusName;
        delete storeage.createdTime;

        delete storeage.listInsuredPerson[0].ethnic;
        delete storeage.listInsuredPerson[0].oldCardStartDate;
        delete storeage.listInsuredPerson[0].oldCardEndDate;
        delete storeage.listInsuredPerson[0].newCardStartDate;
        delete storeage.listInsuredPerson[0].newCardEndDate;
        delete storeage.listInsuredPerson[0].price;
        delete storeage.listInsuredPerson[0].insuredPersonId;
        delete storeage.listInsuredPerson[0].healthInsuranceNumber;
        delete storeage.listInsuredPerson[0].hospitalName;
        storeage.listInsuredPerson[0].doB = formatDate(
          storeage.listInsuredPerson[0].doB
        );
        delete storeage.listInsuredPerson[0].medicalProvinceName;

        if (storeage.houseHold != null) {
          storeage.houseHold.houseHoldPeoples.map((item: any) => {
            delete item.createdTime;
            return item;
          });
        } else {
          storeage.houseHold = {
            id: 0,
            chuHoTen: "",
            ksProvinceId: 0,
            ksDistrictId: 0,
            ksWardId: 0,
            ksAddressDetail: "",
            hkAddressDetail: "",
            soGiayToCaNhan: "",
            ttProvinceId: 0,
            ttDistrictId: 0,
            ttWardId: 0,
            houseHoldPeoples: [
              {
                id: 0,
                name: "",
                doB: "",
                gender: "",
                ethnicId: 0,
                relationShipId: "",
                citizenId: "",
                ksProvinceId: 0,
                ksDistrictId: 0,
                ksWardId: 0,
                ksAddressDetail: "",
              },
            ],
          };
        }

        setInsuranceOrder(storeage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    api
      .get(`/insuranceorder/api/check-order-status/` + id)
      .then((response) => {
        setOrderStatusId(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  function formatDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }

  if (!orderDetail || !insuredPerson || !orderStatusId) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const renderBackground = () => {
    switch (orderStatusId) {
      case PENDING:
        return `#FAAD14`;
      case CANCELED:
        return `#F00`;
      case DONE:
        return `#00BA00`;
      default:
        return `#FAAD14`;
    }
  };

  const headerStatus = () => {
    return (
      <div
        style={{ backgroundColor: renderBackground() }}
        className={` py-[12px] px-4 flex flex-row items-center justify-between rounded-lg`}
      >
        <p className="text-white text-lg font-normal">Trạng thái</p>
        <p className="text-white text-lg font-semibold">
          {orderDetail.insuranceOrderStatusName}
        </p>
      </div>
    );
  };

  return (
    <div className="pt-6">
      <HeaderTitle
        links={[
          { title: "Tài khoản" },
          { title: "Hoạt động" },
          { title: "Chi tiết lịch sử hoạt động bảo hiểm" },
        ]}
      />
      <div className="py-[20px] md:py-[20px] lg:py-[60px] relative max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-col lg:flex-row flex-row-1 gap-[40px] mb-4 px-2">
          <div className="w-full flex flex-col flex-wrap gap-4 xl:gap-6">
            {headerStatus()}

            <div className="bg-white rounded-xl flex flex-col gap-6">
              <div className="flex justify-between rounded-xl overflow-hidden">
                <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                  Mã đơn
                </h3>
                <div className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5] text-right">
                  #{orderDetail?.id}
                </div>
              </div>

              <div className="flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                    Người mua bảo hiểm
                  </h3>
                  {orderStatusId == PENDING ? (
                    <button
                      onClick={() => {
                        navigate("/register-BHXH");
                      }}
                      className="text-base font-semibold text-[#fff] w-full p-[20px] text-right bg-[#0077D5] underline"
                    >
                      Chỉnh sửa
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Họ và tên
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                      {orderDetail.fullName}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">Email</p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[280px] text-right">
                      {orderDetail.email}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số điện thoại
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
                      {orderDetail.phone}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Địa chỉ
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
                      {orderDetail.addressDetail}, {orderDetail.wardName},{" "}
                      {orderDetail.districtName}, {orderDetail.provinceName}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
              </div>

              <div className="flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden rounded-xl">
                {/* --------------------------------------------- */}
                <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                  Thông tin người được bảo hiểm
                </h3>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Họ và tên
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                      {insuredPerson.fullName}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số CCCD
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.citizenId}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số BHXH
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
                      {insuredPerson.socialInsuranceNumber}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Ngày sinh
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.doB}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Giới tính
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.gender}
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Mức lương
                    </p>
                  </div>
                  <div>
                    <p className="text-[#0076B7] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.wage.toLocaleString("vi-VN")} vnđ
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Ngân sách hỗ trợ
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.supportBudget.toLocaleString("vi-VN")} vnđ
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số tháng đóng
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuredPerson.monthInsured} tháng
                    </p>
                  </div>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-row justify-between w-full p-4">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Phí bảo hiểm
                    </p>
                  </div>
                  <div>
                    <p className="text-[#0076B7] text-lg font-semibold max-w-[180px] text-right">
                      {orderDetail.finalPrice.toLocaleString("vi-VN")} vnđ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {orderStatusId == DONE && statusName == "Thành công" ? (
              <div className="flex flex-row content-center justify-center items-center">
                <button
                  onClick={() => {
                    setInsuranceOrder((prevOrder: any) => ({
                      ...prevOrder,
                      id: 0,
                    }));
                    setTimeout(() => {
                      navigate("/register-BHXH");
                    }, 500);
                  }}
                  className="px-[24px] py-3 bg-[#e9c058] w-full rounded-full text-base font-normal text-white text-center"
                >
                  Tái hợp đồng bảo hiểm
                </button>
              </div>
            ) : (
              <div className="mb-0"></div>
            )}

            {!(orderStatusId == CANCELED || orderStatusId == DONE) && (
              <div className=" bg-white w-[100%]">
                <div className="flex flex-row justify-between gap-3">
                  <div className="flex flex-col gap-1 content-center justify-between w-[49%]">
                    <p className="block text-lg font-normal text-gray-900">
                      Tổng thanh toán:
                    </p>
                    <h3 className="text-base font-medium text-[#0076B7]">
                      {orderDetail.finalPrice.toLocaleString("vi-VN")} VND
                    </h3>
                  </div>
                  <div className="flex flex-row content-center justify-center items-center  w-[49%]">
                    <Link
                      to={"/buill-detail/" + id}
                      className="px-[24px] py-3 bg-[#0076B7] w-full rounded-lg text-base font-normal text-white text-center"
                    >
                      Tiếp tục
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {orderStatusId == CANCELED && (
              <div className=" bg-white w-[100%]">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row content-center justify-center items-center">
                    <Link
                      to={"/register-BHXH"}
                      className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full  text-base font-normal text-white text-center"
                    >
                      Tra cứu lại
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {orderStatusId == DONE && (
              <div className=" bg-white w-[100%]">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row content-center justify-center items-center">
                    <Link
                      to={`/check-status-procedure/${orderDetail.id}`}
                      className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full text-base font-normal text-white text-center"
                    >
                      Kiểm tra trạng thái thủ tục
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --------------------------------------------- */}
          <div className="max-w-[100%] lg1130:max-w-[400px] lg1130:px-0 h-full w-full overflow-hidden rounded-lg flex flex-col border border-[#B9BDC1] gap-4">
            <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
              Danh mục sản phẩm
            </h3>
            <div className="flex gap-[10px] p-4">
              <img alt="Img logo" src={logo} className="w-16 h-16" />

              <div className="title-product flex flex-col">
                <h3 className="text-[#0076B7] text-lg font-medium">
                  BH Xã Hội Tự nguyện
                </h3>
                <p className="text-[#646464] text-lg font-normal">Theo tháng</p>
                <span className="text-[#0076B7] text-lg font-bold">
                  22
                  <samp className="text-[#646464] text-lg font-normal">%</samp>
                </span>
              </div>
            </div>

            <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-[#646464] text-lg font-normal">
                    Phương thức thanh toán
                  </p>
                </div>
                <div>
                  <p className="text-[#2E2E2E] text-lg font-normal max-w-[180px] text-right">
                    Thanh toán VNPAY (Powered ChaiPay)
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-[#646464] text-lg font-normal">
                    Ngày đăng ký
                  </p>
                </div>
                <div>
                  <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                    {formatDateTime(orderDetail.createdTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryUnpaidPage;
