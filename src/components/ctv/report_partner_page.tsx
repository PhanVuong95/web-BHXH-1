import { useEffect, useState } from "react";
import imagesIocn from "../../assets/icon/images";
import axios from "axios";
import { ItemInfoProps } from "../../models";
import { formatMoneyVND } from "../../utils/validate_string";
import { BASE_URL } from "../../utils/constants";

const ReportPartnerPage: React.FC<{ onViewCollaborators: () => void }> = ({
  onViewCollaborators,
}) => {
  const [report, setReport] = useState<any>();

  const fetchReport = async () => {
    const token = localStorage.accessToken;

    try {
      const response = await axios.get(
        `${BASE_URL}/report/api/report-overview`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setReport(response.data.data[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const ItemInfo = ({ title, value, subtitle, image }: ItemInfoProps) => {
    return (
      <div className="border p-4 rounded-lg border-[#0076B7]">
        <div className="flex items-center">
          <img alt="" src={image} className="w-7 h-7" />
          <div className="text-[16px] ml-2">{title}</div>
        </div>

        <div className="mt-2 font-bold text-[17px]">{value}</div>

        <div className="mt-2 text-[16px]">{subtitle}</div>
      </div>
    );
  };
  return (
    <div className="w-full">
      <div className="rounded-xl bg-white">
        <div className="text-[#0076B7] font-medium text-[18px]">
          Báo cáo thống kê cá nhân
        </div>

        <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">
          {ItemInfo({
            image: imagesIocn.wallet,
            title: "Lượt mua",
            value: formatMoneyVND(report?.personalTotalOrderSuccess),
            subtitle: "Đơn thành công",
          })}

          {ItemInfo({
            image: imagesIocn.add,
            title: "Lượt tạo",
            value: formatMoneyVND(report?.personalTotalOrder),
            subtitle: "Tạo thành công",
          })}
        </div>

        <div className="mt-4">
          {ItemInfo({
            image: imagesIocn.money,
            title: "Doanh thu",
            value: formatMoneyVND(report?.personalTotalOrderSuccessValue),
            subtitle: "Vnđ",
          })}
        </div>
      </div>

      <div className="rounded-xl bg-white mt-4">
        <div className="text-[#0076B7] font-medium text-[18px]">
          Báo cáo của cộng tác viên
        </div>
        <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">
          {ItemInfo({
            image: imagesIocn.group,
            title: "Cộng tác viên",
            value: formatMoneyVND(report?.totalContributors),
            subtitle: "Số tài khoản",
          })}

          {ItemInfo({
            image: imagesIocn.wallet,
            title: "Lượt mua",
            value: formatMoneyVND(report?.contributorTotalOrderSuccess),
            subtitle: "Đơn hàng",
          })}

          {/* {ItemInfo({ image: money, "title": "Lượt truy cập", "value": 'Đang cập nhật', "subtitle": "Lần" })} */}
        </div>

        <div className="mt-4">
          {ItemInfo({
            image: imagesIocn.money,
            title: "Doanh số",
            value: formatMoneyVND(report?.contributorTotalOrderSuccessValue),
            subtitle: "Vnđ",
          })}
        </div>

        <button
          onClick={onViewCollaborators}
          className="mt-4 border py-3 w-[100%] rounded-full border-[#0544E8]"
        >
          <div className="text-[#0076B7] font-bold text-[16px]">
            Xem danh sách cộng tác viên
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReportPartnerPage;
