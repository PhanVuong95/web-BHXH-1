import { Button, Input, Modal } from "antd";
import { memo, useState } from "react";
import { modalBodyStyle, modalMaskStyle } from "../../../utils/css_common";
import {
  isValidEmptyString,
  isValidPhone,
} from "../../../utils/validate_string";
import { toast } from "react-toastify";
import api from "../../../api/api-config";

interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  setIsShowModalVerifyOTPPhone: (isShowModal: boolean) => void;
  phoneValue: string;
}

const ModalChangePhone = (props: Props) => {
  const {
    isShowModal,
    setIsShowModal,
    setIsShowModalVerifyOTPPhone,
    phoneValue,
  } = props;
  const [phone, setPhone] = useState(phoneValue);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);

  const validateSendOTP = () => {
    if (!isValidEmptyString(phone)) {
      toast.warning("Số điện thoại không được để trống.");
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.warning("Số điện thoại không hợp lệ.");
      return false;
    }

    return true;
  };

  const onSubmitSendOTP = async () => {
    setLoadingSendOtp(true);
    const data = {
      phoneNumber: phone,
    };

    try {
      const response = await api.post(`/account/api/update-phone`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        toast.success("Đã gửi OTP, vui lòng kiểm tra số điện thoại");
        setIsShowModal(false);
        setIsShowModalVerifyOTPPhone(true);
      } else {
        toast.error(response.data.data[0]);
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!\nVui lòng thử lại sau");
    }
    setLoadingSendOtp(false);
  };

  const onClickBtnSendOTP = () => {
    if (validateSendOTP()) {
      onSubmitSendOTP();
    }
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
        <span className="text-md font-semibold">Thay đổi email</span>
        <div className="w-full mb-2">
          <label className="block text-sm font-normal pb-2 text-gray-900">
            Số điện thoại <samp className="text-red-600">*</samp>
          </label>
          <Input
            type="text"
            value={phone}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <Button
          size="large"
          className="text-white bg-[#0077D5] p-[10px]  text-[16px] "
          onClick={onClickBtnSendOTP}
          type="primary"
          loading={loadingSendOtp}
          disabled={loadingSendOtp}
        >
          Chỉnh sửa
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ModalChangePhone);
