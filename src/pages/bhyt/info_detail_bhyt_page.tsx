import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets-src/logo1.png";
import { useParams } from "react-router-dom";
import {
  formatDate,
  formatMoneyVND,
  formatPhoneNumber,
  formatTime,
  isValidEmptyString,
  isValidString,
} from "../../utils/validate_string";
import { registerInfoBHYT } from "./list_health_insurance_page";
import HeaderTitle from "../../components/header_title";
import api from "../../api/api-config";

const InfoDetailBHYT: React.FunctionComponent = () => {
  const { id, statusName } = useParams();

  const [billPay, setBillPay] = useState<any>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [insuranceid, setInsuranceId] = useState(0);
  const insurance = useRef();

  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const renderBackground = (insuranceOrderStatusId: any) => {
    switch (insuranceOrderStatusId) {
      case PENDING:
        return "bg-[#FAAD14]";
      case CANCELED:
        return "bg-[#F00]";
      case DONE:
        return "bg-[#00BA00]";
      default:
        return "bg-[#FAAD14]";
    }
  };

  useEffect(() => {
    api
      .get(`/insuranceorder/api/detail-by-vm/` + id)
      .then((response) => {
        const data = response.data.data[0];

        setBillPay(data);
        setLoading(false);

        setInsuranceId(data?.insuranceId);
        registerInfoBHYT["id"] = data?.id;
        registerInfoBHYT["insuranceId"] = data?.insuranceId;
        registerInfoBHYT["accountId"] = data?.id;
        registerInfoBHYT["citizenId"] = data?.citizenId;
        registerInfoBHYT["fileUploadUrl"] = data?.fileUploadUrl;
        registerInfoBHYT["nhomLoaiDoiTuongId"] = data?.nhomLoaiDoiTuongId;
        registerInfoBHYT["loaiDoiTuongId"] = data?.loaiDoiTuongId;
        registerInfoBHYT["photoCitizenFront"] = data?.photoCitizenFront;
        registerInfoBHYT["photoCitizenBack"] = data?.photoCitizenBack;
        registerInfoBHYT["phone"] = isValidString(data?.phone);
        registerInfoBHYT["fullName"] = isValidString(data?.fullName);
        registerInfoBHYT["email"] = isValidString(data?.email);
        registerInfoBHYT["provinceId"] = data?.provinceId;
        registerInfoBHYT["districtId"] = data?.districtId;
        registerInfoBHYT["wardId"] = data?.wardId;
        registerInfoBHYT["finalPrice"] = data?.finalPrice;
        registerInfoBHYT["addressDetail"] = isValidString(data?.addressDetail);
        (registerInfoBHYT as any)["price"] = data?.price;
        (registerInfoBHYT as any)["discountPrice"] = data?.discountPrice;
        registerInfoBHYT["finalPrice"] = data?.finalPrice;
        registerInfoBHYT["houseHold"]["id"] = data?.houseHold?.id;
        registerInfoBHYT["houseHold"]["chuHoTen"] = data?.houseHold?.chuHoTen;
        registerInfoBHYT["houseHold"]["ksProvinceId"] =
          data?.houseHold?.ksProvinceId;
        registerInfoBHYT["houseHold"]["ksDistrictId"] =
          data?.houseHold?.ksDistrictId;
        registerInfoBHYT["houseHold"]["ksWardId"] = data?.houseHold?.ksWardId;
        registerInfoBHYT["houseHold"]["ksAddressDetail"] =
          data?.houseHold?.ksAddressDetail;
        registerInfoBHYT["houseHold"]["hkAddressDetail"] =
          data?.houseHold?.hkAddressDetail;
        registerInfoBHYT["houseHold"]["ttProvinceId"] =
          data?.houseHold?.ttProvinceId;
        registerInfoBHYT["houseHold"]["ttDistrictId"] =
          data?.houseHold?.ttDistrictId;
        registerInfoBHYT["houseHold"]["ttWardId"] = data?.houseHold?.ttWardId;
        registerInfoBHYT["houseHold"]["soGiayToCaNhan"] =
          data?.houseHold?.soGiayToCaNhan;

        registerInfoBHYT["houseHold"]["houseHoldPeoples"] =
          data?.houseHold?.houseHoldPeoples.map((item: any) => {
            const obj = Object.assign({}, item);
            obj["id"] = item["id"];
            obj["name"] = item["name"];
            obj["doB"] = item["doB"];
            obj["gender"] = item["gender"];
            obj["ethnicId"] = item["ethnicId"];
            obj["relationShipId"] = item["relationShipId"];
            obj["citizenId"] = item["citizenId"];
            obj["houseHoldId"] = item["houseHoldId"];
            obj["ksProvinceId"] = item["ksProvinceId"];
            obj["ksDistrictId"] = item["ksDistrictId"];
            obj["ksWardId"] = item["ksWardId"];
            obj["ksAddressDetail"] = item["ksAddressDetail"];
            return obj;
          });

        registerInfoBHYT["listInsuredPerson"] = data?.listInsuredPerson.map(
          (item: any) => {
            const obj = Object.assign({}, item);
            obj["id"] = item["id"];
            obj["insuranceProvinceId"] = item["insuranceProvinceId"];
            obj["medicalProvinceId"] = item["medicalProvinceId"];
            obj["medicalDistrictId"] = item["medicalDistrictId"];
            obj["socialInsuranceNumber"] = isValidString(
              item["socialInsuranceNumber"]
            );
            obj["healthInsuranceNumber"] = isValidString(
              item["healthInsuranceNumber"]
            );
            obj["citizenId"] = isValidString(item["citizenId"]);
            obj["photoCitizenFront"] = isValidString(item["photoCitizenFront"]);
            obj["photoCitizenBack"] = isValidString(item["photoCitizenBack"]);
            obj["fullName"] = isValidString(item["fullName"]);
            obj["doB"] = item["doB"];
            obj["gender"] = item["gender"];
            obj["wage"] = item["wage"];
            obj["monthInsured"] = formatDate(item["monthInsured"]);
            obj["newCardEndDate"] = formatDate(item["newCardEndDate"]);
            obj["newCardStartDate"] = formatDate(item["newCardStartDate"]);
            obj["oldCardEndDate"] = formatDate(item["oldCardEndDate"]);
            obj["oldCardStartDate"] = formatDate(item["oldCardStartDate"]);
            obj["price"] = formatDate(item["price"]);
            obj["hospitalId"] = item["hospitalId"];
            obj["provinceId"] = item["provinceId"];
            obj["districtId"] = item["districtId"];
            obj["wardId"] = item["wardId"];
            obj["addressDetail"] = item["addressDetail"];
            obj["ksXaPhuongMaksXaPhuongMa"] = item["ksXaPhuongMa"];
            obj["ksQuanHuyenMa"] = item["ksQuanHuyenMa"];
            obj["ksTinhThanhMa"] = item["ksTinhThanhMa"];
            obj["ksDiaChi"] = item["ksDiaChi"];
            obj["ethnicId"] = item["ethnicId"];
            obj["vungLuongToiThieuId"] = item["vungLuongToiThieuId"];
            return obj;
          }
        );
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    api
      .get(
        `/insurance/api/list-paging-viewmodel?pageIndex=1&Pageize=100&insuranceTypeId=1002`
      )
      .then((response) => {
        const data = response.data.data.filter(
          (item: any) => item.id == insuranceid
        )[0];

        insurance.current = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [insuranceid != 0]);

  const boxBuyer = () => {
    return (
      <div className=" bg-white rounded-xl flex flex-col gap-6">
        <div className="flex justify-between rounded-xl overflow-hidden">
          <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
            Mã đơn
          </h3>
          <div className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5] text-right">
            #{billPay?.id}
          </div>
        </div>

        <div className="flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden rounded-xl">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
              Người mua bảo hiểm
            </h3>

            {billPay?.insuranceOrderStatusId == PENDING && (
              <button
                onClick={() => {
                  navigate("/register-BHYT/", {
                    state: { data: insurance.current, type: "updated" },
                  });
                }}
                className="text-base font-semibold text-[#fff] w-full p-[20px] text-right bg-[#0077D5] underline"
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          <div className="flex flex-row justify-between w-full p-4">
            <div>
              <p className="text-[#646464] text-lg font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                {billPay?.fullName ? billPay?.fullName.trim() : "Đang tải"}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full p-4">
            <div>
              <p className="text-[#646464] text-lg font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                {billPay?.email ? billPay?.email.trim() : "Đang tải"}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full p-4">
            <div>
              <p className="text-[#646464] text-lg font-normal">
                Số điện thoại
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
                {billPay?.phone
                  ? formatPhoneNumber(billPay?.phone.trim())
                  : "Đang tải"}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full p-4">
            <div>
              <p className="text-[#646464] text-lg font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-lg font-semibold max-w-[280px] text-right">
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

        {loading ? (
          <div></div>
        ) : (
          billPay.listInsuredPerson.map((item: any, index: any) => {
            return boxBeneficiary(item, index);
          })
        )}
      </div>
    );
  };

  const boxBeneficiary = (item: any, index: any) => {
    return (
      <div className="bg-white rounded-xl flex flex-col border border-[#B9BDC1]">
        <div className="flex justify-between rounded-tr-xl rounded-tl-xl overflow-hidden">
          <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
            Thông tin người số {index + 1} được bảo hiểm
          </h3>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Họ và tên</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[190px] text-right">
              {!isValidEmptyString(item?.fullName)
                ? "Chưa cập nhật"
                : item?.fullName.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Ngày sinh</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[280px] text-right">
              {!isValidEmptyString(item?.doB)
                ? "Chưa cập nhật"
                : item?.doB.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Số CCCD</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[142px] text-right">
              {!isValidEmptyString(item?.citizenId)
                ? "Chưa cập nhật"
                : item?.citizenId.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Giới tính</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
              {!isValidEmptyString(item?.gender)
                ? "Chưa cập nhật"
                : item?.gender.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Mã số BHYT</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
              {!isValidEmptyString(item?.healthInsuranceNumber)
                ? "Chưa cập nhật"
                : item?.healthInsuranceNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Số tháng đóng</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
              {!isValidEmptyString(item?.monthInsured)
                ? "Chưa cập nhật"
                : item?.monthInsured}{" "}
              tháng
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">
              Bệnh viện đăng ký
            </p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
              {!isValidEmptyString(item?.hospitalName)
                ? "Chưa cập nhật"
                : item?.hospitalName}{" "}
              -
              {!isValidEmptyString(item?.medicalProvinceName)
                ? "Chưa cập nhật"
                : item?.medicalProvinceName}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full p-4">
          <div>
            <p className="text-[#646464] text-lg font-normal">Phí bảo hiểm</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-lg font-semibold max-w-[320px] text-right">
              {item?.price == 0 ? "Chưa cập nhật" : formatMoneyVND(item?.price)}{" "}
              vnđ
            </p>
          </div>
        </div>
      </div>
    );
  };

  const line = () => {
    return <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>;
  };

  const boxInfo = () => {
    return (
      <div className="max-w-[100%] lg1130:max-w-[400px] lg1130:px-0 h-full w-full overflow-hidden rounded-lg flex flex-col border border-[#B9BDC1] gap-2">
        <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
          Danh mục sản phẩm
        </h3>
        <div className="flex gap-[10px] p-4">
          <img alt="" src={logo} className="w-16 h-16" />

          <div className="title-product flex flex-col">
            <h3 className="text-[#0076B7] text-lg font-medium">
              {billPay?.insuranceOrderStatusName}
            </h3>
            <p className="text-[#646464] text-lg font-normal">
              {billPay?.listInsuredPerson.length > 0
                ? billPay?.listInsuredPerson[0].monthInsured
                : ""}{" "}
              tháng
            </p>
            <span className="text-[#0076B7] text-lg font-bold">
              {billPay?.finalPrice
                ? formatMoneyVND(billPay?.finalPrice)
                : "Đang tải"}{" "}
              vnđ
            </span>
          </div>
        </div>

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
              <p className="text-[#646464] text-sm font-normal">Ngày đăng ký</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {billPay?.createdTime
                  ? formatTime(billPay?.createdTime)
                  : "Đang tải"}
              </p>
            </div>
          </div>

          {/* <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Ngày xét duyệt
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                10:00 - 12/07/2024
              </p>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  const boxFooterPayment = () => {
    return (
      <div className="page-2 bg-white w-[100%]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {billPay?.finalPrice
                ? formatMoneyVND(billPay?.finalPrice)
                : "Đang tải"}{" "}
              VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to={`/buill-detail/${id}`}
              className="px-[20px] py-2 w-full rounded-full bg-[#0076B7] text-lg font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const lookUpAgain = () => {
    return (
      <div className="page-2 bg-white fixed bottom-0 w-[100%]">
        <div className="flex flex-col">
          <div className="flex flex-row content-center justify-center items-center">
            <button
              onClick={() => {
                navigate("/register-BHYT/", {
                  state: { data: insurance.current, type: "updated" },
                });
              }}
              className="px-[20px] py-2 w-full rounded-full bg-[#0076B7] text-lg font-normal text-white text-center"
            >
              Tra cứu lại
            </button>
          </div>
        </div>
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
            <div
              className={`${renderBackground(
                billPay?.insuranceOrderStatusId
              )}  py-[12px] px-4 flex flex-row items-center justify-between rounded-lg`}
            >
              <div className="text-white text-lg font-normal">Trạng thái</div>
              <div className="text-white text-lg font-semibold">
                {billPay?.insuranceOrderStatusName}
              </div>
            </div>

            <div className="flex flex-col md:flex-col lg:flex-row mb-4">
              <div className="">
                {boxBuyer()}
                {line()}
              </div>

              {billPay?.insuranceOrderStatusId == DONE &&
              statusName == "Thành công" ? (
                <div className="flex flex-row content-center justify-center items-center mb-[25%]">
                  <button
                    onClick={() => {
                      registerInfoBHYT.id = 0;
                      navigate("/register-BHYT/", {
                        state: { data: insurance.current, type: "register" },
                      });
                    }}
                    className="px-[24px] py-3 bg-[#e9c058] w-full rounded-full text-base font-normal text-white text-center"
                  >
                    Tái hợp đồng bảo hiểm
                  </button>
                </div>
              ) : (
                <div className="mb-0"></div>
              )}
            </div>

            {billPay?.insuranceOrderStatusId == PENDING && boxFooterPayment()}

            {billPay?.insuranceOrderStatusId == CANCELED && lookUpAgain()}

            {billPay?.insuranceOrderStatusId == DONE && (
              <div className="page-2 bg-white fixed bottom-0 w-[100%]">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row content-center justify-center items-center">
                    <Link
                      to={`/check-status-procedure/${billPay?.id}`}
                      className="px-[24px] py-3 w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
                    >
                      Kiểm tra trạng thái thủ tục
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {boxInfo()}
        </div>
      </div>
    </div>
  );
};

export default InfoDetailBHYT;
