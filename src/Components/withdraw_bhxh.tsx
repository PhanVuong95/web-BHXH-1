import { useState } from "react";
import iconPlush from "../assets/icon/ic_plush.svg";
import { DatePicker, Input } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import {
  compareTwoDateString,
  formatMoneyVND,
  isValidEmptyString,
} from "../Utils/validateString";
import { toast } from "react-toastify";
import axios from "axios";
import iconSearch from "../assets/icon/ic_search.svg";
import iconRefresh from "../assets/icon/ic_refresh.svg";

const WithdrawBHXH = () => {
  const [insurancePaymentPeriod, setInsurancePaymentPeriod] = useState([
    {
      FromDate: "",
      ToDate: "",
      PaymentValue: "",
    },
  ]);
  const [salary, setSalary] = useState<any>();

  const dateFormat = "MM/YYYY";

  const validateForm = () => {
    for (let index = 0; index < insurancePaymentPeriod.length; index++) {
      const element = insurancePaymentPeriod[index];
      if (!isValidEmptyString(element.FromDate)) {
        toast.warn("Ngày bắt đầu không được để trống");
        return false;
      }
      if (!isValidEmptyString(element.FromDate)) {
        toast.warn("Ngày kết thúc không được để trống");
        return false;
      }
      if (compareTwoDateString(element.FromDate, element.ToDate) != 1) {
        toast.warn("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return false;
      }
      if (!isValidEmptyString(element.PaymentValue)) {
        toast.warn("Mức lương đóng không được để trống");
        return false;
      }
    }

    return true;
  };

  return (
    <div className="flex-[8] drop-shadow">
      <div className="text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
        Rút BHXH một lần
      </div>
      <div className="p-5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
        <div className="text-[16px] mb-5">Giai đoạn đóng bảo hiểm xã hội</div>

        <div
          onClick={() => {
            setInsurancePaymentPeriod([
              ...insurancePaymentPeriod,
              {
                FromDate: "",
                ToDate: "",
                PaymentValue: "",
              },
            ]);
          }}
          className="rounded-[10px] cursor-pointer py-[10px] px-[20px] flex items-center w-[202px] mb-5 border-[1.5px] border-solid border-[#0077D5]"
        >
          <img
            alt="Icon tính toán lương"
            src={iconPlush}
            width={25}
            height={25}
          />
          <div className="pl-[10px] text-[#0077D5]">Thêm quá trình</div>
        </div>

        {insurancePaymentPeriod.map((_item, index) => {
          return (
            <div className="flex flex-row gap-10 mb-5">
              <div className="flex-[4]">
                <div className="w-full">
                  <label className="block text-sm font-light text-gray-900 pb-2">
                    Từ <samp className="text-red-600">*</samp>
                  </label>
                  <DatePicker
                    type="date"
                    size="large"
                    locale={locale}
                    className="w-[100%]"
                    picker="month"
                    value={
                      _item.FromDate
                        ? dayjs(_item.FromDate, "DD/MM/YYYY")
                        : null
                    }
                    placeholder="mm/yyyy"
                    onChange={(value) => {
                      try {
                        const dateObject = dayjs(value.toString());
                        const FromDate = `${"01"}/${(dateObject.month() + 1)
                          .toString()
                          .padStart(2, "0")}/${dateObject.year()}`;
                        setInsurancePaymentPeriod((prevState) =>
                          prevState.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  FromDate: FromDate,
                                }
                              : item
                          )
                        );
                      } catch (error) {
                        setInsurancePaymentPeriod((prevState) =>
                          prevState.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  FromDate: "",
                                }
                              : item
                          )
                        );
                      }
                    }}
                    format={dateFormat}
                    // minDate={dayjs(formatDate3(new Date()), dateFormat)}
                  />
                </div>
              </div>
              <div className="flex-[4]">
                <div className="w-full">
                  <label className="block text-sm font-light text-gray-900 pb-2">
                    Đến <samp className="text-red-600">*</samp>
                  </label>
                  <DatePicker
                    type="date"
                    size="large"
                    locale={locale}
                    className="w-[100%]"
                    picker="month"
                    value={
                      _item.ToDate ? dayjs(_item.ToDate, "DD/MM/YYYY") : null
                    }
                    placeholder="mm/yyyy"
                    onChange={(value) => {
                      try {
                        const dateObject = dayjs(value.toString());
                        const ToDate = `${"01"}/${(dateObject.month() + 1)
                          .toString()
                          .padStart(2, "0")}/${dateObject.year()}`;

                        setInsurancePaymentPeriod((prevState) =>
                          prevState.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  ToDate: ToDate,
                                }
                              : item
                          )
                        );
                      } catch (error) {
                        setInsurancePaymentPeriod((prevState) =>
                          prevState.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  ToDate: "",
                                }
                              : item
                          )
                        );
                      }
                    }}
                    format={dateFormat}
                    // minDate={dayjs(formatDate3(new Date()), dateFormat)}
                  />
                </div>
              </div>
              <div className="flex-[4]">
                <label className="block text-sm font-normal pb-2 text-gray-900">
                  Mức lương đóng <samp className="text-red-600">*</samp>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={insurancePaymentPeriod[index].PaymentValue}
                    onChange={(e) => {
                      const numbers = e!.target.value.replace(/\D/g, "");

                      const numbersString = formatMoneyVND(Number(numbers));
                      setInsurancePaymentPeriod((prevState) =>
                        prevState.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                PaymentValue: numbersString,
                              }
                            : item
                        )
                      );
                    }}
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
                    placeholder="Nhập mức lương đóng"
                    required
                  />

                  <div className="absolute inset-y-0 right-[5%] top-0 flex items-center">
                    <p className="text-base font-normal text-[#0077D5]">Vnđ</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex mt-5">
          <div
            onClick={async () => {
              if (validateForm()) {
                const insurancePayment = insurancePaymentPeriod.map((item) => ({
                  ...item,
                  PaymentValue: parseInt(item.PaymentValue.replace(/\D/g, "")),
                }));

                const data = {
                  InsurancePaymentPeriod: insurancePayment,
                };

                const response = await axios.post(
                  "https://baohiem.dion.vn/insurance/api/calculate-insurance-one-time",
                  data,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (response.data.status == "400") {
                  toast.warn(response.data.data[0][0]);
                  return;
                }

                if (response.data.status == "200") {
                  toast.success("Tra cứu thành công");

                  setSalary(response.data.data[0].oneTimeValue);
                  return;
                }
              }
            }}
            className="rounded-[10px] cursor-pointer  bg-[#0077D5] py-[10px] px-[20px] flex items-center w-[140px] mb-5 border-[1.5px] border-solid border-[#0077D5]"
          >
            <img alt="Icon search" src={iconSearch} width={22} height={22} />
            <div className="pl-[10px] text-[white]">Tra cứu</div>
          </div>

          <div
            onClick={() => {
              setSalary(null);
              setInsurancePaymentPeriod([
                {
                  FromDate: "",
                  ToDate: "",
                  PaymentValue: "",
                },
              ]);
            }}
            className="rounded-[10px] cursor-pointer  py-[10px] px-[20px] flex items-center w-[202px] mb-5"
          >
            <img alt="Icon refresh" src={iconRefresh} width={22} height={22} />
            <div className="pl-[10px] text-[#797D77]">Làm mới</div>
          </div>
        </div>

        {salary != null && (
          <div className="mt-5">
            <div className="text-[16px] mb-5">
              Số tiền nhận được khi rút BHXH 1 lần:
            </div>
            <div className="text-[#0077D5]">
              <span>{formatMoneyVND(salary)}</span>
              <span className="pl-1">Vnđ</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawBHXH;
