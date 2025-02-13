import { Input, Modal, Select } from "antd";

interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
}

const ModalChangeInfoCTV = (props: Props) => {
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
        <span className="text-md font-semibold">Chỉnh sửa thông tin CTV</span>
        <div className="w-full">
          <label className="block text-sm font-normal pb-2 text-gray-900">
            Tên ngân hàng <samp className="text-red-600">*</samp>
          </label>
          <Select
            size="large"
            className="w-[100%]"
            dropdownStyle={{ maxWidth: "100%" }}
            showSearch
            placeholder="Chọn ngân hàng"
            onChange={(value) => {}}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Tên chi nhánh<span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập chi nhánh"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Tên chủ tài khoản <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập chủ tài khoản"
          />
        </div>

        <div className="w-full mb-2">
          <label className="block text-sm font-normal text-gray-900 pb-2">
            Số tài khoản <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            defaultValue={""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập số tài khoản"
          />
        </div>

        <button className=" text-white bg-[#0077D5] p-[10px] rounded-sm text-[18px]">
          <p className="text-center w-full">Chỉnh sửa</p>
        </button>
      </div>
    </Modal>
  );
};

export default ModalChangeInfoCTV;
