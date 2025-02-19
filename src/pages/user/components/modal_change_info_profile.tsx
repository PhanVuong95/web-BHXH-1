import { DatePicker, Input, Modal } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import {
  formatDate2,
  isValidCitizenId,
  isValidEmptyString,
} from "../../../utils/validate_string";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { modalBodyStyle, modalMaskStyle } from "../../../utils/css_common";
import api from "../../../api/api-config";

interface profileProps {
  dob: Date;
  citizenId: string;
  addressDetail: string;
}

interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  profile: profileProps;
  onSuccess: () => void;
}

const ModalChangeInfoProfile = (props: Props) => {
  const { isShowModal, setIsShowModal, profile, onSuccess } = props;
  const dateFormat = "DD/MM/YYYY";

  const [dob, setDob] = useState<any>(
    profile.dob ? dayjs(formatDate2(new Date(profile.dob)), dateFormat) : null
  );
  const [citizenId, setCitizenId] = useState<string>(profile.citizenId);
  const [addressDetail, setAddressDetail] = useState<string>(
    profile.addressDetail
  );

  const validateForm = () => {
    if (dob == null) {
      toast.warn("Ngày sinh không được để trống");
      return false;
    }

    if (!isValidEmptyString(citizenId)) {
      toast.warn("CCCD không được để trống");
      return false;
    }

    if (!isValidCitizenId(citizenId)) {
      toast.warn("Số căn cước công dân phải là 12 chữ số");
      return false;
    }

    if (!isValidEmptyString(addressDetail)) {
      toast.warn("Địa chi không được để trống");
      return false;
    }
    return true;
  };

  const onSubmitForm = async () => {
    const data = {
      addressDetail: addressDetail,
      dob: `${dob.year()}-${(dob.month() + 1).toString().padStart(2, "0")}-${dob
        .date()
        .toString()
        .padStart(2, "0")}`,
      citizenId: citizenId,
    };

    try {
      const response = await api.post(
        `/account/api/update-personal-info`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        toast.success("Cập nhật thông tin thành công");
        setIsShowModal(false);
        onSuccess();
      } else {
        toast.error(response.data.data[0]);
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!\nVui lòng thử lại sau");
    }
  };

  const onClickSubmit = () => {
    if (validateForm()) {
      onSubmitForm();
    }
  };

  const renderInputDob = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <span className="text-[red]">*</span>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          className="w-[100%]"
          placeholder="dd/mm/yyyy"
          defaultValue={dob}
          onChange={(value) => {
            const dateObject = dayjs(value.toString());

            const dateStr = `${dateObject
              .date()
              .toString()
              .padStart(2, "0")}/${(dateObject.month() + 1)
              .toString()
              .padStart(2, "0")}/${dateObject.year()}`;

            setDob(dayjs(dateStr, dateFormat));
          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    );
  };

  const renderInputCCCD = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          CCCD <span className="text-[red]">*</span>
        </label>
        <Input
          type="text"
          defaultValue={citizenId}
          maxLength={12}
          onChange={(e) => {
            setCitizenId(e.target.value);
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập CCCD"
        />
      </div>
    );
  };

  const renderInputAddress = () => {
    return (
      <div className="w-full">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ <span className="text-[red]">*</span>
        </label>
        <Input
          type="text"
          defaultValue={addressDetail}
          maxLength={100}
          onChange={(e) => {
            setAddressDetail(e.target.value);
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập địa chỉ"
        />
      </div>
    );
  };

  const renderBtnSubmit = () => {
    return (
      <button
        className=" text-white bg-[#0077D5] p-[10px] rounded-sm text-[18px]"
        onClick={onClickSubmit}
      >
        <p className="text-center w-full">Chỉnh sửa</p>
      </button>
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
        <span className="text-md font-semibold">
          Thay đổi thông tin cá nhân
        </span>

        {renderInputDob()}
        {renderInputCCCD()}
        {renderInputAddress()}
        {renderBtnSubmit()}
      </div>
    </Modal>
  );
};

export default memo(ModalChangeInfoProfile);
