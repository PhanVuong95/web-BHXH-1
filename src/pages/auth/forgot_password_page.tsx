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
import { BASE_URL } from "../../utils/constants";
type OTPProps = GetProps<typeof Input.OTP>;

const ForgotPasswordPage = () => {
  const listImageSlider = [slider, slider1, slider2];
  const [isShowModalOTP, setIsShowModalOTP] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoadingSendOTP, setIsLoadingSendOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoadingcheckOTP, setIsLoadingCheckOTP] = useState(false);

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
    setIsLoadingSendOTP(true);
    const response = await axios.post(
      `${BASE_URL}/account/api/send-forgot-password?value=${userName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status == "204") {
      toast.info("OTP đã được gửi");
    } else if (response.data.status == "003") {
      toast.info("Email không tồn tại");
    } else if (response.data.status == "002") {
      toast.info("Số điện thoại không tồn tại");
    } else if (response.data.status == "001") {
      toast.info("Gửi SMS thất bại");
    } else if (
      response.data.status == "200" &&
      response.data.data[0] == "SEND_SMS_SUCCESS"
    ) {
      toast.info("Gửi SMS OTP thành công");
      setIsShowModalOTP(true);
    } else if (
      response.data.status == "200" &&
      response.data.data[0] == "SEND_EMAIL_SUCCESS"
    ) {
      toast.info("Gửi Email OTP thành công");
    }

    setIsLoadingSendOTP(false);
  };

  const checkOTP = () => {
    if (otp.length == 6) {
      try {
      } catch (error) {}
    } else {
      toast.info("Vui lòng nhập đầy đủ OTP");
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
            onClick={() => {
              setIsShowModalOTP(false);
            }}
            className="cursor-pointer text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
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
        <div className="flex-[6] hidden md:hidden lg:block  flex flex-col w-[50%] h-[700px] pt-[100px]">
          <Carousel infinite draggable className="custom-carousel h-[500px]">
            {listImageSlider.map((item) => {
              return (
                <div className="flex justify-center items-center h-full">
                  <img
                    alt=""
                    className="mx-auto"
                    src={item}
                    width={448}
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

          {/* <div className="w-full">
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
            />
          </div> */}

          {/* <button
            onClick={() => {
              setIsShowModalOTP(true);
            }}
            className="cursor-pointer text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
          >
            Hoàn tất
          </button> */}

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
