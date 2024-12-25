import { useNavigate, useSearchParams } from "react-router-dom";
import HeaderTitle from "../../components/header_title";
import { Button, Input } from "antd";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import {
  isValidEmptyString,
  isValidPassword,
} from "../../utils/validate_string";
import axios from "axios";

const ChangePasswordPage = () => {
  const [searchParams] = useSearchParams();

  const hashCode = searchParams.get("value");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);

  const navigate = useNavigate();
  const validateFormChangePassword = () => {
    if (!isValidEmptyString(password)) {
      toast.info("Mật khẩu không được để trống");
      return false;
    }

    if (!isValidPassword(password)) {
      toast.warning(
        "Mật khẩu phải ít nhất 8 ký tự, chữ in hoa, chữ thường, số"
      );
      return false;
    }

    if (confirmPassword != password) {
      toast.warning("Mật khẩu không trùng khớp");
      return false;
    }

    return true;
  };

  const onSubmitChangePassword = async () => {
    try {
      setIsLoadingChangePassword(true);

      const response = await axios.post(
        `${BASE_URL}/Account/api/reset-password?newPassword=${password}&value=${hashCode}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "200") {
        toast.success("Đổi mật khẩu thành công");
        navigate("/");
      }

      if (response.data.status != "200") {
        toast.success("Đổi mật khẩu thất bại, vui lòng thử lại sau");
      }

      setIsLoadingChangePassword(false);
    } catch (error) {
      setIsLoadingChangePassword(false);
    }
  };

  return (
    <section className="md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Đổi mật khẩu" }]} />

      <div className="container flex flex-col items-center gap-8 mx-auto py-[0px] md:py-[30px] lg:py-[40px] max-w-[1280px]">
        {hashCode ? (
          <div
            className="flex flex-col w-[700px] gap-[20px] m-4 p-[15px] md:p-[20px] lg:p-[40px] bg-[white] rounded-[8px]"
            style={{
              boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-center text-[18px] md:text-[20px] lg:text-[20px] font-bold leading-6">
              Đổi mật khẩu
            </h2>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label className="block text-sm font-light text-gray-900 pb-3">
                  Mật khẩu <span className="text-red-600">*</span>
                </label>
                <Input.Password
                  className="text-gray-900 h-[48px] text-sm rounded-lg  w-full p-3 custom-input"
                  style={{
                    border: "none",
                    backgroundColor: "#F7F6FB",
                    borderRadius: "8px",
                  }}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  if (validateFormChangePassword()) {
                    onSubmitChangePassword();
                  }
                }}
                className="cursor-pointer h-[46px] text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
              >
                Hoàn tất
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[500px]">Không tìm thấy dữ liệu</div>
        )}
      </div>
    </section>
  );
};

export default ChangePasswordPage;
