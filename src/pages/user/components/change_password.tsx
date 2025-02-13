import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidEmptyString,
  isValidPassword,
} from "../../../utils/validate_string";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input } from "antd";
import { APP_CONFIG } from "../../../utils/constants";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);

  const validateForm = () => {
    if (!isValidEmptyString(oldPassword)) {
      toast.warning("Mật khẩu cũ không được để trống");
      return false;
    }

    if (!isValidPassword(oldPassword)) {
      toast.warning(
        "Mật khẩu phải ít nhất 8 ký tự, chữ in hoa, chữ thường, số"
      );
      return false;
    }

    if (!isValidEmptyString(newPassword)) {
      toast.warning("Mật khẩu mới không được để trống");
      return false;
    }

    if (!isValidPassword(newPassword)) {
      toast.warning(
        "Mật khẩu mới phải ít nhất 8 ký tự, chữ in hoa, chữ thường, số"
      );
      return false;
    }

    // if (oldPassword == newPassword) {
    //   toast.warning("Mật khẩu mới không được trùng với mật khẩu cũ");
    //   return false;
    // }

    if (confirmPassword != newPassword) {
      toast.warning("Mật khẩu không trùng khớp");
      return false;
    }
    return true;
  };

  const onSubmitChangePassword = async () => {
    try {
      setIsLoadingChangePassword(true);

      const token = localStorage.getItem("accessToken");

      const data = {
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ReNewPassword: confirmPassword,
      };

      const response = await axios.post(
        `${APP_CONFIG.BASE_URL}/account/api/change-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200") {
        toast.success("Đổi mật khẩu thành công");
        navigate("/");
      }

      if (response.data.status == "001") {
        toast.warning("Không tìm thấy tài khoản");
      }

      if (response.data.status == "002") {
        toast.warning("Mật khẩu không chính xác");
      }

      if (response.data.status == "003") {
        toast.warning("Mật khẩu không trùng khớp");
      }

      if (response.data.status == "004") {
        toast.warning(
          "Mật khẩu mới phải ít nhất 8 ký tự, chữ in hoa, chữ thường, số"
        );
      }

      setIsLoadingChangePassword(false);
    } catch (error) {
      setIsLoadingChangePassword(false);
      toast.info("Đổi mật khẩu thất bại, vui lòng thử lại sau");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 w-full p-[40px]">
      <h2 className="text-center text-[18px] md:text-[20px] lg:text-[20px] font-bold leading-6">
        Đổi mật khẩu
      </h2>

      <div className="flex flex-col gap-4">
        <div className="w-full">
          <label className="block text-sm font-light text-gray-900 pb-3">
            Mật khẩu cũ <span className="text-red-600">*</span>
          </label>
          <Input.Password
            className="text-gray-900 h-[48px] text-sm rounded-lg  w-full p-3 custom-input"
            style={{
              border: "none",
              backgroundColor: "#F7F6FB",
              borderRadius: "8px",
            }}
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-light text-gray-900 pb-3">
            Mật khẩu mới <span className="text-red-600">*</span>
          </label>
          <Input.Password
            className="text-gray-900 h-[48px] text-sm rounded-lg  w-full p-3 custom-input"
            style={{
              border: "none",
              backgroundColor: "#F7F6FB",
              borderRadius: "8px",
            }}
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-light text-gray-900 pb-3">
            Xác nhận mật khẩu mới <samp className="text-red-600">*</samp>
          </label>
          <Input.Password
            className="text-gray-900 h-[48px] text-sm rounded-lg w-full p-3 custom-input"
            style={{
              border: 0,
              backgroundColor: "#F7F6FB",
              borderRadius: "8px",
            }}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          loading={isLoadingChangePassword}
          onClick={() => {
            if (validateForm()) {
              onSubmitChangePassword();
            }
          }}
          className="cursor-pointer h-[46px] text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
        >
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
