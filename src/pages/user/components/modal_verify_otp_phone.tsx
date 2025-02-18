import { Button, Input, Modal } from "antd";
import { modalBodyStyle, modalMaskStyle } from "../../../utils/css_common";
import { useState } from "react";
import { isValidEmptyString } from "../../../utils/validate_string";
import { toast } from "react-toastify";
import { APP_CONFIG } from "../../../utils/constants";
import axios from "axios";

interface Props {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  onSuccess: () => void;
}

const ModalVerifyOTPPhone = (props: Props) => {
  const { isShowModal, setIsShowModal, onSuccess } = props;
  const [otp, setOtp] = useState("");
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);

  const validateVerifyOTP = () => {
    if (!isValidEmptyString(otp)) {
      toast.warning("OTP không được để trống.");
      return false;
    }

    return true;
  };

  const onSubmitVerifyOTP = async () => {
    setLoadingVerifyOtp(true);
    const token = localStorage.getItem("accessToken");
    const data = {
      otpCode: otp,
    };

    try {
      const response = await axios.post(
        `${APP_CONFIG.BASE_URL}/account/api/verify-phone-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        switch (response.data.status) {
          case "200":
            toast.success("Đổi số điện thoại thành công");
            setIsShowModal(false);
            onSuccess();
            break;
          case "099":
            toast.info("Nhập sai OTP quá nhiều lần");
            break;
          case "098":
            toast.info("OTP không chính xác");
            break;
          case "003":
            toast.info("Số điện thoại không tồn tại");
            break;
          case "006":
            toast.info("Nhập sai OTP quá nhiều lần");
            break;
          case "005":
            toast.info("OTP đã hết hạn");
            break;
          case "004":
            toast.info("OTP không chính xác");
            break;
          default:
            toast.info("Xác thực OTP thất bại");
            break;
        }
      } else {
        toast.error(response.data.data[0]);
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!\nVui lòng thử lại sau");
    }
    setLoadingVerifyOtp(false);
  };

  const onClickBtnVerifyOTP = () => {
    if (validateVerifyOTP()) {
      onSubmitVerifyOTP();
    }
  };

  return (
    <Modal
      open={isShowModal}
      onCancel={() => setIsShowModal(false)}
      centered
      footer={null}
      styles={{ mask: modalMaskStyle, body: modalBodyStyle }}
    >
      <div className="p-4 z-20 w-[100%] h-[100%]  bg-white flex flex-col gap-4 items-center">
        <div className="text-[20px] font-bold mt-2">Xác thực OTP</div>
        <div className="text-[16px] text-[#5F5F5F] font-light">
          {` Nhập OTP đã được gửi đến số điện thoại của bạn`}
        </div>
        <Input.OTP
          value={otp}
          onChange={(e) => setOtp(e)}
          variant="filled"
          formatter={(str) => str.toUpperCase()}
          style={{ width: "100%", height: "80px" }}
        />

        <Button
          type="primary"
          className="h-[50px] text-[16px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] bg-[#0077D5] font-normal rounded-[10px]"
          onClick={onClickBtnVerifyOTP}
          loading={loadingVerifyOtp}
          disabled={loadingVerifyOtp}
        >
          Xác thực
        </Button>
      </div>
    </Modal>
  );
};

export default ModalVerifyOTPPhone;
