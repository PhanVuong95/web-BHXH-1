import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Widthheight } from "../models";
import { SpecificContext } from "./specific_context";
import { Link } from "react-router-dom";
import HeaderTitle from "./header_title";
import { Input } from "antd";

const BillPayPage: React.FC<Widthheight> = () => {
  const specificContext = useContext<any>(SpecificContext);
  const { insuranceOrder } = specificContext;
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardeName, setWardeName] = useState("");
  const [, setSelectedCheckbox] = useState("");

  const handleCheckboxChange = (value: any) => {
    setSelectedCheckbox(value);
  };

  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/province/api/detail/" +
          insuranceOrder.provinceId
      )
      .then((response) => {
        setProvinceName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        "https://baohiem.dion.vn/district/api/detail/" +
          insuranceOrder.districtId
      )
      .then((response) => {
        setDistrictName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("https://baohiem.dion.vn/ward/api/detail/" + insuranceOrder.wardId)
      .then((response) => {
        setWardeName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [referrerCode, setReferrerCode] = useState("");
  const handleCheck = async () => {
    const token = localStorage.getItem("accessToken");
    const url = `https://baohiemxahoi.dion.vn/insuranceOrder/api/create-payment?orderId=${insuranceOrder.wardId}&referrerCode=${referrerCode}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="pt-6">
      <HeaderTitle
        links={[
          { title: "Khai báo BHXH tự nguyện" },
          { title: "Xác nhận đăng ký BHXH tự nguyện" },
        ]}
      />
      <div className="container mx-auto flex flex-col max-w-[1280px]">
        <h2 className="pt-[60px] pb-[40px] text-[42px] font-bold">
          Xác nhận đăng ký BHXH tự nguyện
        </h2>
        <div className="flex flex-row gap-[40px] flex-wrap">
          <div className=" flex flex-col gap-4 max-w-[100%] lg1130:px-0 px-[20px] lg1130:max-w-[840px] w-full">
            <div className="flex flex-row flex-wrap border rounded-[10px] border-[#B9BDC1] overflow-hidden">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Người mua bảo hiểm
              </h3>
              <div className="p-[40px] flex flex-row flex-wrap justify-between w-full gap-[20px]">
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Họ và tên
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                      {insuranceOrder.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">Email</p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số điện thoại
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
                      {insuranceOrder.phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Địa chỉ
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.addressDetail}, {wardeName},{" "}
                      {districtName}, {provinceName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap border rounded-[10px] border-[#B9BDC1] overflow-hidden">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Thông tin người được bảo hiểm
              </h3>
              <div className="p-[40px] flex flex-row flex-wrap justify-between w-full gap-[20px]">
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Họ và tên
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                      {insuranceOrder.listInsuredPerson[0].fullName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số CCCD
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].citizenId}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số BHXH
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
                      {
                        insuranceOrder.listInsuredPerson[0]
                          .socialInsuranceNumber
                      }
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Ngày sinh
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].doB}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Giới tính
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].gender}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Mức lương
                    </p>
                  </div>
                  <div>
                    <p className="text-[#0076B7] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].wage.toLocaleString(
                        "vi-VN"
                      )}{" "}
                      vnđ
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Ngân sách hỗ trợ
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].supportBudget.toLocaleString(
                        "vi-VN"
                      )}{" "}
                      vnđ
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Số tháng đóng
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.listInsuredPerson[0].monthInsured} tháng
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <div>
                    <p className="text-[#646464] text-lg font-normal">
                      Phí bảo hiểm
                    </p>
                  </div>
                  <div>
                    <p className="text-[#0076B7] text-lg font-semibold max-w-[180px] text-right">
                      {insuranceOrder.finalPrice.toLocaleString("vi-VN")} vnđ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[100%] lg1130:max-w-[400px] lg1130:px-0 px-[20px] w-full">
            <div className="bg-white rounded-xl flex flex-col border border-[#B9BDC1] overflow-hidden mb-5">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Phương thức thanh toán
              </h3>

              {/* {selectedCheckbox === "vnpay" && ( */}
              <div className="flex gap-3 p-[20px]">
                <input
                  type="checkbox"
                  className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
                  checked={true}
                  onChange={() => handleCheckboxChange("vnpay")}
                  id="vnpay-checkbox"
                />
                <label
                  htmlFor="vnpay-checkbox"
                  className="text-lg font-normal text-[#000] w-[96%]"
                >
                  Thanh toán VNPAY (Powered ChaiPay)
                </label>
              </div>
              {/* )} */}
            </div>

            <div className="bg-white rounded-xl flex flex-col border border-[#B9BDC1] overflow-hidden">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Mã giới thiệu
              </h3>

              {/* {selectedCheckbox === "vnpay" && ( */}
              <div className="flex flex-col gap-3 p-[20px]">
                <div className="w-full">
                  <label className="block text-sm font-normal text-gray-900 pb-2">
                    Mã giới thiệu ctv
                  </label>
                  <Input
                    type="text"
                    value={referrerCode}
                    onChange={(e) => setReferrerCode(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nhập mã giới thiệu"
                  />
                </div>

                <button className="kiem-tra">Kiểm tra</button>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="page-2 bg-white container mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-lg font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {insuranceOrder.finalPrice.toLocaleString("vi-VN")} VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to={"/buill-detail/" + insuranceOrder.id}
              onClick={handleCheck}
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayPage;
