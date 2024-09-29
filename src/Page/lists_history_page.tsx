import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Widthheight } from "../Models";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import HeaderBase from "../Components/headerBase";
import logo from "../assets-src/logo1.png";

// Define an interface for the order item
interface OrderItem {
  id: string;
  insuranceName: string;
  monthInsured: number;
  finalPrice: number;
  insuranceOrderStatusId: number;
  insuranceOrderStatusName: string;
  createdTime: string; // Assuming this is a string; change if necessary
  fullName: string;
  statusColor?: string; // Optional property
}

const ListsHistoryPage: React.FC<Widthheight> = () => {
  const navigate = useNavigate();

  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const [openTab, setOpenTab] = useState<number>(1);
  const [listOrder, setListOrder] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.token;

  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/insuranceorder/api/list-by-insuranceId?insuranceId=1001",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        let filteredOrders: OrderItem[] = [];
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
        <HeaderBase
          isHome={false}
          onBack={() => navigate("/history")}
          title={"Lịch sử đăng ký BHXH TN"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderBase
        isHome={false}
        onBack={() => navigate("/history")}
        title={"Lịch sử đăng ký BHXH TN"}
      />
      <div className="page-1 !pb-2 !pt-24">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex space-x-4 p-1 bg-white rounded-lg shadow-md">
            <button
              onClick={() => {
                setListOrder([]);
                setLoading(true);
                setOpenTab(1);
              }}
              className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
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

          <div className="flex flex-col gap-4">
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
                  <Link to={"/history-unpaid/" + item.id} key={index}>
                    <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                      <div className="flex gap-[10px]">
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

                      <hr className="border-dashed border-[1px] text-[#DEE7FE] " />

                      <div className="flex flex-col gap-4">
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
      </div>
    </>
  );
};

export default ListsHistoryPage;
