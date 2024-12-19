import axios from "axios";
import { useEffect, useState } from "react";
import { ItemInfoProps } from "../../Models";
import imagesIocn from "./../../assets/icon/images";
import { Modal } from "antd";
import { formatMoneyVND } from "../../Utils/validateString";

const ListCollabrorates: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [listCollabrorates, setListCollabrorates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<CollaboratorItem | null>(null);
  const [report, setReport] = useState<any>(null);
  const [, setIsLoading] = useState(false);
  const [, setPhone] = useState("");

  const fetchCollabrorates = async () => {
    const token = localStorage.accessToken;

    try {
      const response = await axios.get(
        `https://baohiem.dion.vn/account/api/get-list-contributor`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setListCollabrorates(response.data.data[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCollabrorates();
  }, []);

  interface CollaboratorItem {
    id: string;
    phone: string;
    fullName: string; // You may also want to add this property, since you're using it in your code
    photo: string;
  }

  const openModal = (item: CollaboratorItem) => {
    setSelectedCollaborator(item);
    fectReport(item.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCollaborator(null);
    setIsModalOpen(false);
  };

  // chi tiết
  const fectReport = async (collaboratorId: string) => {
    const token = localStorage.accessToken;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://baohiem.dion.vn/report/api/report-order-contributor?accountId=${collaboratorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.status === "200" &&
        response.data.message === "SUCCESS"
      ) {
        setReport(response.data.data[0]);
        setPhone(response.data.data[0]?.phone);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabrorates();
  }, []);

  const itemCollabrotate = (item: CollaboratorItem, index: any) => {
    return (
      <div key={`${index}`} className="flex gap-4 mb-4 rounded-xl bg-white p-3">
        <img
          alt=""
          src={item?.photo}
          className="w-[60px] h-[60px] rounded-full"
        />

        <div className="flex flex-col w-[100%] justify-between p-1">
          <div className="text-[18px] font-medium">{item?.fullName}</div>

          <div
            // to={`/profile-collaborate-detail/${item?.id}`}
            onClick={() => openModal(item)}
            className="flex justify-between"
          >
            <div className="text-[16px] font-normal">
              {`${item?.phone.slice(0, 7)}***`}
            </div>
            <div className="flex ">
              <div className="text-[#0076B7]">Xem chi tiết</div>
              <img
                alt=""
                src={imagesIocn.next}
                className="w-[18px] h-[18px] ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ItemInfo = ({ title, value, subtitle, image }: ItemInfoProps) => {
    return (
      <div className="border p-2 rounded-lg border-[#0076B7]">
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
      <div className="text-[18px] text-[#0076B7] mb-3 font-medium">
        {listCollabrorates.length} Cộng tác viên
      </div>

      <div className="gap-2">
        {listCollabrorates.map((item, index) => itemCollabrotate(item, index))}
      </div>

      <button
        onClick={onBack}
        className="mt-4 border py-3 w-[100%] rounded-full border-[#FF0000]"
      >
        <div className="text-[#FF0000] font-bold text-[16px]">Quay lại</div>
      </button>

      {/* Modal chi tiết */}

      {selectedCollaborator && (
        <Modal open={isModalOpen} onClose={closeModal} className="modal-class">
          <div className="p-4">
            <div className="grid mt-4 gap-y-4 gap-x-4 grid-cols-2 ">
              {ItemInfo({
                image: imagesIocn.wallet,
                title: "Lượt mua",
                value: formatMoneyVND(report?.countSuccessOrder),
                subtitle: "Đơn thành công",
              })}

              {/* {ItemInfo({ image: share, "title": "Lượt truy cập", "value": "Đang cập nhật", "subtitle": "Lần" })} */}
              {ItemInfo({
                image: imagesIocn.money,
                title: "Doanh thu",
                value: formatMoneyVND(report?.totalSuccessOrderValue),
                subtitle: "Vnđ",
              })}
            </div>
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-red-500 text-white rounded-lg"
            >
              Đóng
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ListCollabrorates;
