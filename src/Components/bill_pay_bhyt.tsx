import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatMoneyVND, formatPhoneNumber } from "../Utils/validateString";
import HeaderTitle from "./HeaderTitle";
import { Input } from "antd";

const BillPayBHYTPage: React.FunctionComponent = () => {
  const { id } = useParams();
  const [billPay, setBillPay] = useState<any>();
  const [loading, setLoading] = useState(true);

  // const [provinceName, setProvinceName] = useState("");
  // const [districtName, setDistrictName] = useState("");
  // const [wardeName, setWardeName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  // const navigate = useNavigate();

  const handleCheckboxChange = (value: any) => {
    setSelectedCheckbox(value);
  };

  useEffect(() => {
    axios
      .get("  https://baohiem.dion.vn/insuranceorder/api/detail-by-vm/" + id)
      .then((response) => {
        setBillPay(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [referrerCode, setReferrerCode] = useState("");
  const handleCheck = async () => {
    const token = localStorage.getItem("accessToken");
    const url = `https://baohiemxahoi.dion.vn/insuranceOrder/api/create-payment?orderId=${id}&referrerCode=${referrerCode}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const boxBuyer = () => {
    return (
      <div className=" bg-white rounded-xl flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden">
        <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
          Người mua bảo hiểm
        </h3>

        <div className="p-[40px] flex flex-row flex-wrap justify-between w-full gap-[20px]">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                {billPay?.fullName ? billPay?.fullName.trim() : "Đang tải"}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                {billPay?.email ? billPay?.email.trim() : ""}
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
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[342px] text-right">
                {billPay?.phone
                  ? formatPhoneNumber(billPay?.phone.trim())
                  : "Đang tải"}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[342px] text-right">
                {`${
                  billPay?.addressDetail ? billPay?.addressDetail.trim() : ""
                }, ${billPay?.wardName ? billPay?.wardName.trim() : ""}, ${
                  billPay?.districtName ? billPay?.districtName.trim() : ""
                } ,${
                  billPay?.provinceName ? billPay?.provinceName.trim() : ""
                }`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const boxBeneficiary = (item: any, index: any) => {
    return (
      <div className=" bg-white rounded-xl flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden mt-[40px]">
        <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
          Thông tin người số {index + 1} được bảo hiểm
        </h3>

        <div className="p-[40px] flex flex-row flex-wrap justify-between w-full gap-[20px]">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                {item?.fullName.trim() == ""
                  ? "Chưa cập nhật"
                  : item?.fullName.trim()}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Ngày sinh</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                {item?.doB.trim() == "" ? "Chưa cập nhật" : item?.doB.trim()}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Số CCCD</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                {item?.citizenId.trim() == ""
                  ? "Chưa cập nhật"
                  : item?.citizenId.trim()}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Giới tính</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[180px] text-right">
                {item?.gender.trim() == ""
                  ? "Chưa cập nhật"
                  : item?.gender.trim()}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Mã số BHYT</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
                {item?.healthInsuranceNumber == ""
                  ? "Chưa cập nhật"
                  : item?.healthInsuranceNumber}
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
                {item?.monthInsured == 0 ? "Chưa cập nhật" : item?.monthInsured}{" "}
                tháng
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">
                Bệnh viện đăng ký
              </p>
            </div>
            <div>
              <p className="text-[#0076B7] text-lg font-semibold max-w-[360px] text-right">
                {item?.hospitalName == 0 ? "Chưa cập nhật" : item?.hospitalName}{" "}
                -
                {item?.medicalProvinceName == 0
                  ? "Chưa cập nhật"
                  : item?.medicalProvinceName}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-lg font-normal">Phí bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-lg font-semibold max-w-[180px] text-right">
                {item?.price == 0
                  ? "Chưa cập nhật"
                  : formatMoneyVND(item?.price)}{" "}
                vnđ
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const line = () => {
    return (
      <hr className="border-dashed border-[1px] text-[#DEE7FE] w-full"></hr>
    );
  };

  return (
    <div className="pt-6">
      <HeaderTitle
        links={[
          { title: "Khai báo BHYT tự nguyện" },
          { title: "Đăng ký BHYT Tự nguyện" },
          { title: "Xác nhận đăng ký BHYT tự nguyện" },
        ]}
      />
      <div className="container mx-auto max-w-[1280px]">
        <h3 className="py-[40px] mx-4 text-[42px] text-black font-bold">
          Xác nhận đăng ký BHXH Tự nguyện
        </h3>
        <div className="flex flex-row flex-row-2 gap-4 mb-4">
          <div className="">
            {boxBuyer()}
            {/* {line()} */}
            {loading ? (
              <div></div>
            ) : (
              billPay.listInsuredPerson.map((item: any, index: any) => {
                return boxBeneficiary(item, index);
              })
            )}
          </div>
          <div className=" bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3 min-w-[370px] h-full w-full overflow-hidden">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Phương thức thanh toán
              </h3>
              {/* <div className="flex gap-3">
              <input
                type="checkbox"
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
                checked={selectedCheckbox === "vietqr"}
                onChange={() => handleCheckboxChange("vietqr")}
                id="vietqr-checkbox"
              />
              <label
                htmlFor="vietqr-checkbox"
                className="text-lg font-normal text-[#000] w-[96%]"
              >
                VietQR (Chuyển khoản ngân hàng, MOMO, Zalopay, Viettelpay)
              </label>
            </div> */}

              <div className="flex gap-3 p-[20px]">
                <input
                  type="checkbox"
                  className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
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

              <div className="flex gap-3 px-[20px] w-full">{line()}</div>

              <div className="flex flex-col gap-3 p-[20px]">
                <h3 className="text-lg text-[#0076B7] font-bold">
                  Mã giới thiệu
                </h3>
                <div className="w-full">
                  <label className="block text-sm font-normal text-gray-900 pb-2">
                    Mã giới thiệu ctv
                  </label>
                  <Input
                    type="text"
                    value={referrerCode}
                    onChange={(e) => setReferrerCode(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 "
                    placeholder="Nhập mã giới thiệu"
                  />
                </div>

                <button className="kiem-tra">Kiểm tra</button>
              </div>

              {/* <div className="flex gap-3">
              <input
                type="checkbox"
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
                checked={selectedCheckbox === "khac"}
                onChange={() => handleCheckboxChange("khac")}
                id="khac-checkbox"
              />
              <label
                htmlFor="khac-checkbox"
                className="text-lg font-normal text-[#000] w-[96%]"
              >
                Khác
              </label>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white max-w-[1280px] mx-auto pb-[30px]">
        <div className="flex flex-row justify-between gap-3">
          <div className="flex flex-col content-center gap-1">
            <p className="block text-lg font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-[30px] font-medium text-[#0076B7]">
              {billPay?.finalPrice
                ? formatMoneyVND(billPay?.finalPrice)
                : "Đang tải"}{" "}
              VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to={`/buill-detail/${id}`}
              onClick={handleCheck}
              className="px-[40px] py-3 bg-[#0076B7] w-full rounded-[10px]  text-base font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayBHYTPage;
