import HeaderTitle from "../../components/header_title";
import PensionCalculation from "./components/pension_calculation";
import iconWithdraw from "../../assets/icon/ic_withdraw.svg";
import iconWithdrawBlue from "../../assets/icon/ic_withdraw_blue.svg";
import iconCloseRate from "../../assets/icon/ic_close_rate.svg";
import iconCloseRateBlue from "../../assets/icon/ic_close_rate_blue.svg";
import iconCalculate from "../../assets/icon/ic_calculate.svg";
import iconCalculateBlue from "../../assets/icon/ic_calculate_blue.svg";
import { useState } from "react";
import "../../locale/vi";
import WithdrawBHXH from "./components/withdraw_bhxh";
import CloseRateBXH from "./components/close_rate_bhxh";

interface itemProps {
  icon: string;
  iconActive: string;
  index: number;
  indexSelected: number;
  title: string;
}

const ToolSupportPage = () => {
  const [indexSelected, setIndexSelected] = useState(0);

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
      <div className="flex-[4] drop-shadow mx-2">
        <div className="text-[16px] md:text-[18px] lg:text-[18px] text-[white] bg-[#0077D5] leading[24px] font-normal p-[15px] md:p-[20px] lg:p-[20px] rounded-tr-[10px] rounded-tl-[10px]">
          Công cụ hỗ trợ
        </div>
        <div className="p-2 md:p-3 lg:p-4 bg-[white] rounded-br-[10px] rounded-bl-[10px]">
          <ItemMenu
            icon={iconCalculate}
            iconActive={iconCalculateBlue}
            indexSelected={0}
            index={0}
            title="Tính toán lương hưu"
          />

          <div className="h-[2px] my-3 md:my-3 lg:my-4 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

          <ItemMenu
            icon={iconWithdraw}
            iconActive={iconWithdrawBlue}
            indexSelected={1}
            index={1}
            title="Rút BHXH một lần"
          />

          <div className="h-[2px] my-3 md:my-3 lg:my-4 w-[100%] border-b-[2px] border-dashed border-[#D1D1D6]"></div>

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

  return (
    <div className="pt-3 md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Công cụ hỗ trợ" }]} />
      <div className="container mx-auto py-[0px] md:py-[30px] lg:py-[40px] max-w-[1280px]">
        <div className="layoutToolSupport  gap-4 md:gap-6 lg:gap-10 ">
          {/* Bên trái */}
          {menu()}

          {/* Trái phải */}
          <div
            className="flex-[8] mx-2"
            style={{ display: indexSelected === 0 ? "block" : "none" }}
          >
            <PensionCalculation />
          </div>
          <div
            className="flex-[8] mx-2"
            style={{ display: indexSelected === 1 ? "block" : "none" }}
          >
            <WithdrawBHXH />
          </div>
          <div
            className="flex-[8] mx-2"
            style={{ display: indexSelected === 2 ? "block" : "none" }}
          >
            <CloseRateBXH />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSupportPage;
