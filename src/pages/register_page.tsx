import HeaderTitle from "../components/header_title";
import { Carousel, Input } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slider from "../assets/slider_register.png";
import { useState } from "react";
import Modal from "react-modal";
import close from "../assets/close.png";
import type { GetProps } from "antd";
type OTPProps = GetProps<typeof Input.OTP>;

const RegisterPage = () => {
  const [isShowModalOTP, setIsShowModalOTP] = useState(false);

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

  const ModalLogin = () => {
    return (
      <Modal
        isOpen={isShowModalOTP}
        onRequestClose={() => setIsShowModalOTP(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "none",
            padding: 0,
            width: "600px",
            height: "300px",
            overflow: "auto",
            zIndex: 100000,
            boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.1)",
          },
          overlay: {
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
          />

          <div
            onClick={() => {
              setIsShowModalOTP(false);
            }}
            className="cursor-pointer text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]"
          >
            Xác thực
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="pt-3 md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Đăng ký" }]} />

      <div className="container flex gap-8 mx-auto py-[0px] md:py-[30px] lg:py-[40px] max-w-[1280px]">
        <div className="flex-[6] flex flex-col w-[50%] h-[700px] pt-[100px]">
          <Carousel infinite draggable className="custom-carousel h-[500px]">
            <div className="flex justify-center items-center h-full">
              <img
                alt=""
                className="mx-auto"
                src={slider}
                width={350}
                height={345}
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                alt=""
                className="mx-auto"
                src={slider}
                width={350}
                height={345}
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                alt=""
                className="mx-auto"
                src={slider}
                width={350}
                height={345}
              />
            </div>
          </Carousel>
        </div>
        <div
          className="flex-[6] flex flex-col gap-[20px] p-[40px] bg-[white] rounded-[8px]"
          style={{
            boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-center text-[20px] font-bold leading-6">
            Đăng ký tài khoản
          </h2>
          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-3">
              Tên của bạn <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              className="text-gray-900 h-[48px] text-sm rounded-lg block w-full p-3 custom-input"
              style={{
                border: 0,
                backgroundColor: "#F7F6FB",
              }}
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-3">
              Email <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              className="text-gray-900 h-[48px] text-sm rounded-lg block w-full p-3 custom-input"
              style={{
                border: 0,
                backgroundColor: "#F7F6FB",
              }}
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-3">
              Số điện thoại <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              className="text-gray-900 h-[48px] text-sm rounded-lg block w-full p-3 custom-input"
              style={{
                border: 0,
                backgroundColor: "#F7F6FB",
              }}
              placeholder="Nhập số điện thoại của bạn"
            />
          </div>
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
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-3">
              Xác nhận mật khẩu <samp className="text-red-600">*</samp>
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
          </div>

          <div className="cursor-pointer text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]">
            Đăng ký
          </div>

          <div
            onClick={() => {
              setIsShowModalOTP(true);
            }}
            className="flex justify-center mt-4"
          >
            <div className="text-[16px] font-normal">Bạn đã có tài khoản?</div>
            <div className="text-[16px] cursor-pointer text-[#2a65c7] font-normal ml-3 underline">
              Đăng nhập
            </div>
          </div>

          {ModalLogin()}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
