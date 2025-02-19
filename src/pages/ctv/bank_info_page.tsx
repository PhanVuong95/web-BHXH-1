import { Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { convertListToSelectBanks } from "../../utils/validate_string";
import { toast } from "react-toastify";
import { APP_CONFIG } from "../../utils/constants";
import api from "../../api/api-config";

interface BankInfoPageProps {
  onBack1: () => void;
}

const BankInfoPage: React.FC<BankInfoPageProps> = ({ onBack1 }) => {
  const [listBanks, setListBanks] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankOwner, setBankOwner] = useState("");
  const [bankNumber, setBankNumber] = useState("");

  useEffect(() => {
    axios
      .get(`${APP_CONFIG.VIET_QR_URI}`)
      .then((response) => {
        setListBanks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchBankInfo = async () => {
    try {
      const response = await api.get(`/account/api/get-bank-info`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        const data = response.data.data[0];
        setSelectedBankCode(data?.bankBin);
        setBankBranch(data?.bankBranch);
        setBankOwner(data?.bankOwnerName);
        setBankNumber(data?.bankOwnerNumber);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  const renderBankName = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên ngân hàng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownStyle={{ maxWidth: "300px" }}
          placeholder="Chọn ngân hàng"
          value={selectedBankCode}
          onChange={(value: any) => {
            setSelectedBankCode(value);
          }}
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectBanks(listBanks, "Chọn ngân hàng")}
        />
      </div>
    );
  };

  const renderBankBranch = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chi nhánh
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

  const inputFullName = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tên chủ tài khoản <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          value={bankOwner}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập tên"
          onChange={(e) => {
            setBankOwner(e.target.value);
          }}
        />
      </div>
    );
  };

  const inputBankNumber = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số tài khoản <samp className="text-red-600">*</samp>
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

  const validate = () => {
    if (selectedBankCode == "") {
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
          return;
        }

        toast.warning("Cập nhật thông tin tài khoản thất bại!");
      } catch (error) {
        toast.warning("Cập nhật thông tin tài khoản thất bại!");
      }
    }
  };

  const boxFooter = () => {
    return (
      <div className="py-4 flex flex-row gap-3 bg-white w-[100%]">
        <button
          onClick={() => {
            onSubmit();
          }}
          className="px-[20px] py-2 bg-[#0076B7] w-[30%] rounded-[10px] text-lg font-normal text-white text-center"
        >
          Lưu lại
        </button>

        <button
          onClick={onBack1}
          className="border py-2 w-[30%] rounded-[10px] border-[#FF0000]"
        >
          <div className="text-[#FF0000] font-bold text-[16px]">Quay lại</div>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="w-full">
        <div className="rounded-xl bg-white flex flex-wrap gap-3">
          {renderBankName()}
          {renderBankBranch()}
          {inputFullName()}
          {inputBankNumber()}
        </div>
      </div>
      {boxFooter()}
    </div>
  );
};

export default BankInfoPage;
