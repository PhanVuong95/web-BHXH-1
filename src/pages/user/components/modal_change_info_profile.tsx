import { Input, Modal } from "antd";

interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
}

const ModalChangeInfoProfile = (props: Props) => {
  const { isShowModal, setIsShowModal } = props;

  return (
    <Modal
      open={isShowModal}
      onCancel={() => setIsShowModal(false)}
      footer={null}
      centered
      bodyStyle={{
        backgroundColor: "#fff",
        borderRadius: "15px",
        padding: 0,
        width: "100%",
        overflow: "auto",
      }}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex flex-col gap-5">
        <span className="text-md font-semibold">
          Chỉnh sửa thông tin cá nhân
        </span>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Ngày sinh
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Chọn ngày sinh"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            CCCD
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập CCCD"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Số điện thoại
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Email
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập email"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Địa chỉ
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập địa chỉ"
          />
        </div>

        <button className=" text-white bg-[#0077D5] p-[10px] rounded-sm text-[18px]">
          <p className="text-center w-full">Chỉnh sửa</p>
        </button>
      </div>
    </Modal>
  );
};

export default ModalChangeInfoProfile;
