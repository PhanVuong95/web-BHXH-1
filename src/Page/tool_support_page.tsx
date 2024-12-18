import { DatePicker, Input, Select } from "antd";
import HeaderTitle from "../Components/HeaderTitle";
// import iconCalculate from "../assets/icon/ic_calculate.png";
import iconWithdraw from "../assets/icon/ic_withdraw.svg";
import iconWithdrawBlue from "../assets/icon/ic_withdraw_blue.svg";
import iconCloseRate from "../assets/icon/ic_close_rate.svg";
import iconCloseRateBlue from "../assets/icon/ic_close_rate_blue.svg";
import iconCalculate from "../assets/icon/ic_calculate.svg";
import iconCalculateBlue from "../assets/icon/ic_calculate_blue.svg";
import iconPlush from "../assets/icon/ic_plush.svg";
import iconSearch from "../assets/icon/ic_search.svg";
import iconRefresh from "../assets/icon/ic_refresh.svg";
import { useState } from "react";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "../locale/vi";
import {
  compareTwoDateString,
  formatMoneyVND,
  isValidEmptyString,
} from "../Utils/validateString";
import { toast } from "react-toastify";
import axios from "axios";

interface itemProps {
  icon: string;
  iconActive: string;
  index: number;
  indexSelected: number;
  title: string;
}

const ToolSupportPage = () => {
  const [indexSelected, setIndexSelected] = useState(0);
  const [gender, setGender] = useState("");
  const [insurancePaymentPeriod, setInsurancePaymentPeriod] = useState([
    {
      FromDate: "",
      ToDate: "",
      PaymentValue: "",
    },
  ]);
  const dateFormat = "MM/YYYY";
  const [salary, setSalary] = useState<any>();

  const validateForm = () => {
    if (!isValidEmptyString(gender)) {
      toast.warn("Giới tính không được để trống");
      return false;
    }
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

  const ItemMenu = (item: itemProps) => {
    return (
      <div
        onClick={() => {
          setIndexSelected(item.indexSelected);
        }}
        className={`flex flex-row bg-[${
          indexSelected == item.index ? "#0077D5" : "white"
        }] p-[12px] gap-[10px] items-center rounded-md cursor-pointer`}
      >
        <img
          alt="Icon tính toán lương"
          src={indexSelected == item.index ? item.icon : item.iconActive}
          width={32}
          height={32}
        />
        <div
          className={`text-[18px] font-light text-[${
            indexSelected == item.index ? "white" : "#000000"
          }]`}
        >
          {item.title}
        </div>
      </div>
    );
  };

  const menu = () => {
    return (
      <div className="flex-[4] drop-shadow">
        <div className="text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Công cụ hỗ trợ
        </div>
        <div className="p-6 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <ItemMenu
            icon={iconCalculate}
            iconActive={iconCalculateBlue}
            indexSelected={0}
            index={0}
            title="Tính toán lương hưu"
          />

          <div className="h-[2px] my-6 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

          <ItemMenu
            icon={iconWithdraw}
            iconActive={iconWithdrawBlue}
            indexSelected={1}
            index={1}
            title="Rút BHXH một lần"
          />

          <div className="h-[2px] my-6 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

          <ItemMenu
            icon={iconCloseRate}
            iconActive={iconCloseRateBlue}
            indexSelected={2}
            index={2}
            title="Mức đóng BHXH còn thiếu"
          />
        </div>
      </div>
    );
  };

  const CalculateContent = () => {
    return (
      <div className="flex-[8] drop-shadow">
        <div className="text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Tính toán lương hưu
        </div>
        <div className="p-5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-2">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              placeholder="Chọn giới tính"
              value={gender}
              onChange={(value) => {
                setGender(value);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "", label: "Chọn giới tính" },
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
            />
          </div>

          <div className="text-[16px] mt-5 mb-5">
            Quá trình đóng bảo hiểm xã hội
          </div>

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

                    <div className="absolute inset-y-0 start-[82%] top-0 flex items-center">
                      <p className="text-base font-normal text-[#0077D5]">
                        Vnđ
                      </p>
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
                  const insurancePayment = insurancePaymentPeriod.map(
                    (item) => ({
                      ...item,
                      PaymentValue: parseInt(
                        item.PaymentValue.replace(/\D/g, "")
                      ),
                    })
                  );

                  const data = {
                    PensionRate: {
                      Gender: gender == "Nam" ? 1 : 0,
                    },
                    InsurancePaymentPeriod: insurancePayment,
                  };

                  const response = await axios.post(
                    "https://baohiem.dion.vn/insurance/api/calculate-monthly-pension",
                    data,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  console.log(response.data.status);
                  if (response.data.status == "400") {
                    toast.warn(response.data.data[0][0]);
                    return;
                  }

                  if (response.data.status == "200") {
                    toast.success("Tra cứu thành công");
                    setSalary(response.data.data[0].monthlyPensionValue);
                    return;
                  }
                }
              }}
              className="rounded-[10px] cursor-pointer bg-[#0077D5] py-[10px] px-[20px] flex items-center w-[140px] border-[1.5px] border-solid border-[#0077D5]"
            >
              <img alt="Icon search" src={iconSearch} width={23} height={23} />
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
              className="rounded-[10px] cursor-pointer py-[10px] px-[20px] flex items-center w-[202px]"
            >
              <img
                alt="Icon refresh"
                src={iconRefresh}
                width={23}
                height={23}
              />
              <div className="pl-[10px] text-[#797D77]">Làm mới</div>
            </div>
          </div>

          {salary != null && (
            <div className="mt-5">
              <div className="text-[16px] mb-5">
                Lương hưu nhận được trong 1 tháng:
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

  const WithdrawContent = () => {
    return (
      <div className="flex-[8] drop-shadow">
        <div className="text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Rút BHXH một lần
        </div>
        <div className="p-5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <div className="text-[16px] mb-5">Giai đoạn đóng bảo hiểm xã hội</div>

          <div className="rounded-[10px] py-[10px] px-[20px] flex items-center w-[202px] mb-5 border-[1.5px] border-solid border-[#0077D5]">
            <img
              alt="Icon tính toán lương"
              src={iconPlush}
              width={25}
              height={25}
            />
            <div className="pl-[10px] text-[#0077D5]">Thêm quá trình</div>
          </div>

          <div className="flex flex-row gap-10">
            <div className="flex-[4]">
              <div className="w-full">
                <label className="block text-sm font-light text-gray-900 pb-2">
                  Từ <samp className="text-red-600">*</samp>
                </label>
                <Select
                  size="large"
                  className="w-[100%]"
                  placeholder="Chọn thời gian"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-[4]">
              <div className="w-full">
                <label className="block text-sm font-light text-gray-900 pb-2">
                  Đến <samp className="text-red-600">*</samp>
                </label>
                <Select
                  size="large"
                  className="w-[100%]"
                  placeholder="Chọn thời gian"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-[4]">
              <label className="block text-sm font-normal pb-2 text-gray-900">
                Số BHXH
              </label>
              <div className="relative">
                <Input
                  type="text"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
                  placeholder="Nhập mức lương đóng"
                  required
                />

                <div
                  onClick={() => {}}
                  className="absolute inset-y-0 start-[82%] top-0 flex items-center"
                >
                  <p className="text-base font-normal text-[#0077D5]">Vnđ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-5">
            <div className="rounded-[10px] bg-[#0077D5] py-[10px] px-[20px] flex items-center w-[140px] mb-5 border-[1.5px] border-solid border-[#0077D5]">
              <img alt="Icon search" src={iconSearch} width={23} height={23} />
              <div className="pl-[10px] text-[white]">Tra cứu</div>
            </div>

            <div className="rounded-[10px] py-[10px] px-[20px] flex items-center w-[202px] mb-5">
              <img
                alt="Icon refresh"
                src={iconRefresh}
                width={23}
                height={23}
              />
              <div className="pl-[10px] text-[#797D77]">Làm mới</div>
            </div>
          </div>

          <div className="text-[16px] mb-5">
            Lương hưu nhận được trong 1 tháng:
          </div>

          <div className="text-[#0077D5]">
            <span>1.000.000</span>
            <span className="pl-3">Vnđ</span>
          </div>
        </div>
      </div>
    );
  };

  const CloseRateContent = () => {
    return (
      <div className="flex-[8] drop-shadow">
        <div className="text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Mức đóng BHXH còn thiếu
        </div>
        <div className="p-5 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <div className="w-full">
            <label className="block text-sm font-light pb-2 text-gray-900">
              Mức lương làm cơ sở đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <Input
                type="text"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5              "
                placeholder="Nhập mức lương đóng"
                required
              />

              <div
                onClick={() => {}}
                className="absolute inset-y-0 start-[94%] top-0 flex items-center"
              >
                <p className="text-base font-normal text-[#0077D5]">Vnđ</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-5">
            <label className="block text-sm font-light text-gray-900 pb-2">
              Số tháng còn thiếu <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              placeholder="Chọn thời gian"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
            />
          </div>

          <div className="flex mt-5">
            <div className="rounded-[10px] bg-[#0077D5] py-[10px] px-[20px] flex items-center w-[140px] mb-5 border-[1.5px] border-solid border-[#0077D5]">
              <img alt="Icon search" src={iconSearch} width={23} height={23} />
              <div className="pl-[10px] text-[white]">Tra cứu</div>
            </div>

            <div className="rounded-[10px] py-[10px] px-[20px] flex items-center w-[202px] mb-5">
              <img
                alt="Icon refresh"
                src={iconRefresh}
                width={23}
                height={23}
              />
              <div className="pl-[10px] text-[#797D77]">Làm mới</div>
            </div>
          </div>

          <div className="text-[16px] mb-5">
            Lương hưu nhận được trong 1 tháng:
          </div>

          <div className="text-[#0077D5]">
            <span></span>
            <span className="pl-3">Vnđ</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-6">
      <HeaderTitle links={[{ title: "Công cụ hỗ trợ" }]} />
      <div className="container mx-auto py-[40px] max-w-[1280px] mx-auto ">
        <div className="flex flex-row gap-10 ">
          {/* Bên trái */}
          {menu()}

          {/* Trái phải */}

          {indexSelected == 0 && CalculateContent()}
          {indexSelected == 1 && WithdrawContent()}
          {indexSelected == 2 && CloseRateContent()}
        </div>
      </div>
    </div>
  );
};

export default ToolSupportPage;
