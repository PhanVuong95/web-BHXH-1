import { Button, Carousel, Input } from "antd";
import HeaderTitle from "../../components/header_title";
import slider from "../../assets/slider_register.png";
import slider1 from "../../assets/slider_register1.png";
import slider2 from "../../assets/slider_register2.png";
import { useState } from "react";
import close from "../../assets/close.png";
import Modal from "react-modal";
import type { GetProps } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import {
  isValidEmptyString,
  isValidPassword,
} from "../../utils/validate_string";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../../utils/constants";
type OTPProps = GetProps<typeof Input.OTP>;

const ForgotPasswordPage = () => {
  const listImageSlider = [slider, slider1, slider2];
  const [isShowModalOTP, setIsShowModalOTP] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoadingSendOTP, setIsLoadingSendOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoadingCheckOTP, setIsLoadingCheckOTP] = useState(false);
  const [isValidateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  const onSendOTP = async () => {
    try {
      setIsLoadingSendOTP(true);

      const response = await axios.post(
        `${APP_CONFIG.BASE_URL}/account/api/send-forgot-password?value=${userName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      switch (response.data.status) {
        case "204":
          toast.info("OTP đã được gửi");
          break;
        case "404":
          toast.info("Email hoặc số điện thoại không hợp lệ");
          break;
        case "003":
          toast.info("Email không tồn tại");
          break;
        case "002":
          toast.info("Số điện thoại không tồn tại");
          break;
        case "001":
          toast.info("Gửi SMS thất bại");
          break;
        case "200":
          if (response.data.data[0] == "SEND_SMS_SUCCESS") {
            toast.success("Gửi SMS OTP thành công");
            setIsShowModalOTP(true);
          }
          if (response.data.data[0] == "SEND_EMAIL_SUCCESS") {
            toast.success("Gửi Email OTP thành công");
          }
          break;

        default:
          toast.info("Gửi SMS thất bại");
          break;
      }

      setIsLoadingSendOTP(false);
    } catch (error) {
      setIsLoadingSendOTP(false);
    }
  };

  const checkOTP = async () => {
    if (otp.length == 6) {
      try {
        setIsLoadingCheckOTP(true);

        const response = await axios.post(
          `${APP_CONFIG.BASE_URL}/Account/api/check-otp?value=${otp}&phone=${userName}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status != "200") {
          setOtp("");
        }

        switch (response.data.status) {
          case "200":
            toast.success(
              "Xác thực OTP thành công, Vui lòng thay đổi mật khẩu bên dưới"
            );
            setIsShowModalOTP(false);
            setValidateOTPSuccess(true);
            break;
          case "099":
            toast.info("Nhập sai OTP quá nhiều lần");

            break;
          case "098":
            toast.info("OTP không chính xác");
            break;
          case "003":
            toast.info("Số điện thoại không tồn tài");
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

        setIsLoadingCheckOTP(false);
      } catch (error) {}
    } else {
      setOtp("");
      toast.info("Vui lòng nhập đầy đủ OTP");
      setIsLoadingCheckOTP(false);
    }
  };

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
    const response = await axios.post(
      `${APP_CONFIG.BASE_URL}/Account/api/reset-password?newPassword=${password}&value=${otp}`,
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
  };

  const renderModalOTP = () => {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={isShowModalOTP}
        onRequestClose={() => setIsShowModalOTP(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "none",
            padding: 0,
            width: "600px",
            height: "300px",
            overflow: "auto",
            zIndex: 100,
            boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.1)",
          },
          overlay: {
            zIndex: 99,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
          },
        }}
      >
        <div className="p-4 w-[100%] h-[100%]  bg-white flex flex-col gap-4 items-center relative">
          <img
            onClick={() => {
              setIsShowModalOTP(false);
            }}
            alt=""
            className="cursor-pointer absolute top-4 right-4"
            src={close}
          />
          <div className="text-[20px] font-bold mt-6">Xác thực tài khoản</div>
          <div className="text-[16px] text-[#5F5F5F] font-light">
            Nhập mã xác thực đã được gửi đến số điện thoại của bạn
          </div>
          <Input.OTP
            variant="filled"
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
            style={{ width: "100%", height: "80px" }}
            value={otp}
            onChange={(e) => {
              setOtp(e);
            }}
          />

          <Button
            loading={isLoadingCheckOTP}
            onClick={() => {
              checkOTP();
            }}
            className="cursor-pointer h-[44px] text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
          >
            Xác thực
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Quên mật khẩu" }]} />

      <div className="container flex flex-col md:flex-col lg:flex-row gap-8 mx-auto py-[0px] md:py-[30px] lg:py-[40px] max-w-[1280px]">
        <div className="flex-[6] hidden md:hidden lg:block flex-col w-[50%] h-[300px] pt-[100px]">
          <Carousel infinite draggable className="custom-carousel h-[300px]">
            {listImageSlider.map((item) => {
              return (
                <div className="flex justify-center items-center h-full">
                  <img
                    alt=""
                    className="mx-auto"
                    src={item}
                    width={300}
                    height={345}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="flex-[6] flex flex-col gap-[20px] m-4 p-[15px] md:p-[20px] lg:p-[40px] bg-[white] rounded-[8px]"
          style={{
            boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-center text-[18px] md:text-[20px] lg:text-[20px] font-bold leading-6">
            Quên mật khẩu
          </h2>

          {!isValidateOTPSuccess ? (
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label className="block text-sm font-light text-gray-900 pb-3">
                  Email hoặc số điện thoại đăng ký{" "}
                  <samp className="text-red-600">*</samp>
                </label>
                <Input
                  type="text"
                  className="text-gray-900 h-[48px] text-sm rounded-lg block w-full p-3 custom-input"
                  style={{
                    border: 0,
                    backgroundColor: "#F7F6FB",
                  }}
                  placeholder="Nhập email của bạn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <Button
                loading={isLoadingSendOTP}
                onClick={() => {
                  if (userName == "") {
                    toast.warning("Vui lòng nhập Email hoặc số điện thoại");
                    return;
                  }
                  // Gửi yêu cầu
                  onSendOTP();
                }}
                className="w-[180px] h-[44px] py-2 px-[15px] md:px-[15px] lg:px-[15px] rounded-lg  text-[15px] font-medium text-[#0076B7] border-[1px] border-[#0077D5]"
              >
                Xác thực
              </Button>
            </div>
          ) : (
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

              <button
                onClick={() => {
                  if (validateFormChangePassword()) {
                    onSubmitChangePassword();
                  }
                }}
                className="cursor-pointer text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
              >
                Hoàn tất
              </button>
            </div>
          )}

          <div className="flex flex-col flex-grow justify-end mt-20">
            <div className="flex items-center justify-center">
              <div className="text-[16px] font-normal">
                Bạn đã có tài khoản?
              </div>
              <button className="text-[16px] cursor-pointer text-[#2a65c7] font-normal ml-3 underline">
                Đăng nhập
              </button>
            </div>
          </div>

          {renderModalOTP()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
