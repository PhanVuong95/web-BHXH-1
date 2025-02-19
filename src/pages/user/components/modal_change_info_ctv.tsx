import { Button, Input, Modal, Select } from "antd";
import { memo, useState } from "react";
import { convertListToSelectBanks } from "../../../utils/validate_string";
import { toast } from "react-toastify";
import { modalBodyStyle, modalMaskStyle } from "../../../utils/css_common";
import api from "../../../api/api-config";

interface BankInfo {
  bankBin: number;
  bankBranch: string;
  bankOwner: string;
  bankNumber: string;
}
interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  listBanks: any[];
  bankInfo: BankInfo;
  onSuccess: () => void;
}

const ModalChangeInfoCTV = (props: Props) => {
  const { isShowModal, setIsShowModal, listBanks, bankInfo, onSuccess } = props;
  const [selectedBankCode, setSelectedBankCode] = useState(
    bankInfo.bankBin ?? 0
  );
  const [bankBranch, setBankBranch] = useState(bankInfo.bankBranch ?? "");
  const [bankOwner, setBankOwner] = useState(bankInfo.bankOwner ?? "");
  const [bankNumber, setBankNumber] = useState(bankInfo.bankNumber ?? "");

  const validate = () => {
    if (selectedBankCode == 0) {
      toast.warning("Tên ngân hàng không được để trống!");
      return false;
    }

    if (bankOwner == "") {
      toast.warning("Tên Chủ tài khoản không được để trống!");
      return false;
    }

    if (bankNumber == "") {
      toast.warning("Tên Chủ tài khoản không được để trống!");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      const bankFind = listBanks.find(
        (item: any) => item?.bin == selectedBankCode
      ) as any;

      const data = {
        BankName: bankFind?.name,
        BankBin: selectedBankCode,
        BankBranch: bankBranch,
        BankOwnerNumber: bankNumber,
        BankOwnerName: bankOwner,
      };

      try {
        const response = await api.post(`/account/api/update-bank-info`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (
          response.data.status == "200" &&
          response.data.message == "SUCCESS"
        ) {
          toast.success("Cập nhật thông tin tài khoản thành công!");
          setIsShowModal(false);
          onSuccess();
          return;
        }

        toast.warning("Cập nhật thông tin tài khoản thất bại!");
      } catch (error) {
        toast.warning("Cập nhật thông tin tài khoản thất bại!");
      }
    }
  };

  const renderBankName = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Tên ngân hàng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: "100%" }}
          placeholder={"Chọn ngân hàng"}
          showSearch
          value={selectedBankCode}
          onChange={(value: any) => {
            setSelectedBankCode(value);
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelectBanks(listBanks, "Chọn ngân hàng")}
        />
      </div>
    );
  };

  const renderBankBrach = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chi nhánh<span className="text-red-600">*</span>
        </label>
        <Input
          type="text"
          value={bankBranch}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập chi nhánh"
          onChange={(e) => {
            setBankBranch(e.target.value);
          }}
        />
      </div>
    );
  };

  const renderBankOwner = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chủ tài khoản <span className="text-red-600">*</span>
        </label>
        <Input
          type="text"
          value={bankOwner}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập chủ tài khoản"
          onChange={(e) => {
            setBankOwner(e.target.value.toLocaleUpperCase());
          }}
        />
      </div>
    );
  };

  const renderBankNumber = () => {
    return (
      <div className="w-full mb-2">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số tài khoản <span className="text-red-600">*</span>
        </label>
        <Input
          type="text"
          value={bankNumber}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập số tài khoản"
          onChange={(e) => {
            setBankNumber(e.target.value);
          }}
        />
      </div>
    );
  };

  const renderBtnEdit = () => {
    return (
      <Button
        size="large"
        type="primary"
        onClick={onSubmit}
        className=" text-white bg-[#0077D5] p-[10px] text-[18px]"
      >
        Chỉnh sửa
      </Button>
    );
  };

  return (
    <Modal
      open={isShowModal}
      onCancel={() => setIsShowModal(false)}
      footer={null}
      centered
      styles={{ mask: modalMaskStyle, body: modalBodyStyle }}
    >
      <div className="flex flex-col gap-5">
        <span className="text-md font-semibold">Thay đổi thông tin CTV</span>
        {renderBankName()}
        {renderBankBrach()}
        {renderBankOwner()}
        {renderBankNumber()}
        {renderBtnEdit()}
      </div>
    </Modal>
  );
};

export default memo(ModalChangeInfoCTV);
