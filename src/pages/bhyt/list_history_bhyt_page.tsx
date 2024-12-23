import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { PulseLoader } from "react-spinners";
import { formatMoneyVND } from "../../utils/validate_string";
import logo from "../../assets-src/logo1.png";
import { ListsHistoryPageProps, Order } from "../../models";

const ListHistoryBHYT: React.FunctionComponent<ListsHistoryPageProps> = ({
  onBack,
}) => {
  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const [openTab, setOpenTab] = useState(1);
  const [listOrder, setListOrder] = useState<any>([]);
  const token = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/insuranceorder/api/list-by-insuranceId?insuranceId=1002",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const fillteredOrders: Order[] = [];
        response.data.data.forEach((item: Order) => {
          if (item.insuranceOrderStatusId === DONE && openTab === 2) {
            fillteredOrders.push(item);
          } else if (
            (item.insuranceOrderStatusId === PENDING && openTab === 1) ||
            (item.insuranceOrderStatusId === CANCELED && openTab === 1)
          ) {
            fillteredOrders.push(item);
          }
        });
        setListOrder(fillteredOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setListOrder([]);
        setLoading(false);
      });
  }, [openTab]);

  function formatDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        {/* <HeaderBase
          isHome={false}
          onBack={() => navigate("/history")}
          title={"Lịch sử đăng ký BHYT TN"}
        /> */}
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const switchColor = (insuranceOrderStatusId: any) => {
    switch (insuranceOrderStatusId) {
      case PENDING:
        return "#FAAD14";
      case DONE:
        return "#00BA00";
      case CANCELED:
        return "#F00";
      default:
        break;
    }
  };

  return (
    <>
      <div className="">
        <div className="mx-auto p-4">
          <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md border border-[#B9BDC1] overflow-hidden">
            <button
              onClick={() => setOpenTab(1)}
              className={`flex-1 py-3 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                openTab === 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              Đang mua
            </button>
            <button
              onClick={() => setOpenTab(2)}
              className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                openTab === 2 ? "bg-blue-600 text-white" : ""
              }`}
            >
              Đã mua
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {listOrder.length == 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>Không có dữ liệu!</div>
              </div>
            ) : null}

            {listOrder?.map((item: any, index: any) => {
              return (
                <Link
                  to={
                    "/info-detail-bhyt/" +
                    item.id +
                    "/" +
                    item.insuranceOrderStatusName
                  }
                  key={index}
                >
                  <div className="p-4 bg-white h-full w-full rounded-xl flex flex-row items-center gap-4 border border-[#B9BDC1] overflow-hidden">
                    <div className="flex gap-[10px]">
                      <img alt="" src={logo} className="w-16 h-16" />
                      <div className="title-product flex flex-col">
                        <h3 className="text-[#0076B7] text-lg font-medium">
                          {item?.insuranceName}
                        </h3>
                        <p className="text-[#646464] text-sm font-normal">
                          {item.monthInsured} tháng
                        </p>
                        <span className="text-[#0076B7] text-lg font-bold">
                          {formatMoneyVND(item.finalPrice)} VND
                        </span>
                      </div>
                    </div>

                    <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Mã đơn
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-black text-sm font-semibold max-w-[142px] text-right`}
                          >
                            #{item.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Trạng thái
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-[${switchColor(
                              item.insuranceOrderStatusId
                            )}] text-sm font-semibold max-w-[142px] text-right`}
                          >
                            {item.insuranceOrderStatusName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Ngày đăng ký
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {formatDateTime(item.createdTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Người mua
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {item.fullName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className="m-4 border py-3 w-[30%] rounded-xl border-[#FF0000]"
        onClick={onBack}
      >
        <div className="text-[#FF0000] font-bold text-[16px]">Quay lại</div>
      </button>
    </>
  );
};

export default ListHistoryBHYT;
