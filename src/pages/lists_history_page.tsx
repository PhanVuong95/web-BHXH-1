import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListsHistoryPageProps } from "../models";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import logo from "../assets-src/logo1.png";
import { APP_CONFIG } from "../utils/constants";
interface OrderItem {
  id: string;
  insuranceName: string;
  monthInsured: number;
  finalPrice: number;
  insuranceOrderStatusId: number;
  insuranceOrderStatusName: string;
  createdTime: string;
  fullName: string;
  statusColor?: string;
}

const ListsHistoryPage: React.FC<ListsHistoryPageProps> = ({ onBack }) => {
  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const [openTab, setOpenTab] = useState<number>(1);
  const [listOrder, setListOrder] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(
        `${APP_CONFIG.BASE_URL}/insuranceorder/api/list-by-insuranceId?insuranceId=1001`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const filteredOrders: OrderItem[] = [];
        response.data.data.forEach((item: OrderItem) => {
          if (item.insuranceOrderStatusId === DONE && openTab === 2) {
            filteredOrders.push(item);
          } else if (
            (item.insuranceOrderStatusId === PENDING && openTab === 1) ||
            (item.insuranceOrderStatusId === CANCELED && openTab === 1)
          ) {
            filteredOrders.push(item);
          }
        });
        setListOrder(filteredOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setListOrder([]);
        setLoading(false);
      });
  }, [openTab, token]);

  function formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
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

  return (
    <>
      <div className="">
        <div className="mx-auto p-4">
          <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md border border-[#B9BDC1] overflow-hidden">
            <button
              onClick={() => {
                setListOrder([]);
                setLoading(true);
                setOpenTab(1);
              }}
              className={`flex-1 py-3 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                openTab === 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              Đang mua
            </button>
            <button
              onClick={() => {
                setListOrder([]);
                setLoading(true);
                setOpenTab(2);
              }}
              className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                openTab === 2 ? "bg-blue-600 text-white" : ""
              }`}
            >
              Đã mua
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {listOrder.length === 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>Không có dữ liệu!</p>
              </div>
            ) : (
              listOrder.map((item, index) => {
                return (
                  <Link
                    to={
                      "/history-unpaid/" +
                      item.id +
                      "/" +
                      item.insuranceOrderStatusName
                    }
                    key={index}
                  >
                    <div className="p-4 bg-white h-full w-full rounded-xl flex flex-row items-center border border-[#B9BDC1] overflow-hidden">
                      <div className="flex gap-[10px] w-[47%]">
                        <img src={logo} className="w-16 h-16" alt="Logo" />
                        <div className="title-product flex flex-col">
                          <h3 className="text-[#0076B7] text-lg font-medium">
                            {item.insuranceName}
                          </h3>
                          <p className="text-[#646464] text-sm font-normal">
                            {item.monthInsured} tháng
                          </p>
                          <span className="text-[#0076B7] text-lg font-bold">
                            {item.finalPrice.toLocaleString("vi-VN")} VND
                          </span>
                        </div>
                      </div>

                      <div className="border-dashed w-[1px] h-[124px] border-[1px] text-[#DEE7FE]" />

                      <div className="flex flex-col gap-4 w-[47%]">
                        <div className="flex flex-row justify-between w-full">
                          <div>
                            <p className="text-[#646464] text-sm font-normal">
                              Mã đơn
                            </p>
                          </div>
                          <div>
                            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                              #{item.id}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-row justify-between w-full">
                          <div>
                            <p className="text-[#646464] text-sm font-normal">
                              Trạng thái
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-[${
                                item.statusColor || "#FAAD14"
                              }] text-sm font-semibold max-w-[142px] text-right`}
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
              })
            )}
          </div>
        </div>
        <button
          className="m-4 border py-3 w-[30%] rounded-xl border-[#FF0000]"
          onClick={onBack}
        >
          <div className="text-[#FF0000] font-bold text-[16px]">Quay lại</div>
        </button>
      </div>
    </>
  );
};

export default ListsHistoryPage;
