import HeaderTitle from "../../components/header_title";
import { Button, Carousel, Input } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slider from "../../assets/slider_register.png";
import slider1 from "../../assets/slider_register1.png";
import slider2 from "../../assets/slider_register2.png";
import { useState } from "react";
import Modal from "react-modal";
import close from "../../assets/close.png";
import { toast } from "react-toastify";
import {
  isValidEmail,
  isValidEmptyString,
  isValidFullName,
  isValidPassword,
  isValidPhone,
  isValidUserName,
} from "../../utils/validate_string";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const RegisterPage = () => {
  const [isShowModalOTP, setIsShowModalOTP] = useState(false);
  const listImageSlider = [slider, slider1, slider2];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState(0);
  const [otp, setOtp] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);

  const resetFormRegister = () => {
    setFullName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
  };

  const validate = () => {
    if (!isValidEmptyString(fullName)) {
      toast.warning("Tên không được để trống");
      return false;
    }

    if (!isValidFullName(fullName)) {
      toast.warning("Tên không hợp lệ");
      return false;
    }

    if (!isValidEmptyString(userName)) {
      toast.warning("Tên đăng nhập không hợp lệ");
      return false;
    }

    if (!isValidUserName(userName)) {
      toast.warning("Tên đăng nhập không hợp lệ");
      return false;
    }

    if (!isValidEmptyString(email)) {
      toast.warning("Email không được để trống");
      return false;
    }

    if (!isValidEmail(email)) {
      toast.warning("Email không hợp lệ");
      return false;
    }

    if (!isValidEmptyString(phone)) {
      toast.warning("Số điện thoại không được để trống");
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return false;
    }

    if (!isValidEmptyString(password)) {
      toast.warning("Mật khẩu không được để trống");
      return false;
    }

    if (!isValidPassword(password)) {
      toast.warning("Mật phải ít nhất 8 ký tự, chữ in hoa, chữ thường, số");
      return false;
    }

    if (confirmPassword != password) {
      toast.warning("Mật khẩu không trùng khớp");
      return false;
    }

    return true;
  };

  const onSubmitRegister = async () => {
    try {
      setLoadingLogin(true);
      const data = {
        fullName: fullName,
        email: email,
        userName: userName,
        password: password,
        phone: phone,
      };

      const response = await axios.post(
        `${BASE_URL}/account/api/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //reset mã otp
      setOtp("");

      if (response.data.status == "201") {
        toast.info("Vui lòng nhập OTP");

        setUserId(response.data.data[0].id);
        setIsShowModalOTP(true);
      }

      if (response.data.status == "202") {
        toast.info("Email đã tồn tại, hãy thử email khác");
      }

      if (response.data.status == "203") {
        toast.info("Tên đăng nhập đã tồn tại");
      }

      if (response.data.status == "204") {
        toast.info("Số điện thoại đã tồn tại, hãy thử số điện thoại khác");
      }

      if (response.data.status == "400") {
        toast.info("Đăng ký thất bại \n Vui lòng thử lại sau");
      }

      setLoadingLogin(false);
    } catch (error) {
      setLoadingLogin(false);
      toast.error(`Đăng ký thất bại \n Vui lòng thử lại sau`);
    }
  };

  const sendOtp = async () => {
    if (otp.length == 6) {
      try {
        setLoadingSendOtp(true);
        const response = await axios.post(
          `${BASE_URL}/account/api/verify-register-otp?accountId=${userId}&OTPCode=${otp}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        switch (response.data.status) {
          case "200":
            setIsShowModalOTP(false);
            resetFormRegister();
            toast.success("Xác thực OTP thành công, vui lòng xác thực Email!");
            break;
          case "099":
            toast.info("OTP không hợp lệ");
            break;
          case "002":
            toast.info("OTP không tồn tại");
            break;
          case "003":
            toast.info("Tài khoản không tồn tại");
            break;
          case "004":
            toast.info("Tài khoản đã được xác thực");
            break;
          case "005":
            toast.info("OTP hết hạn");
            break;
          case "006":
            toast.info("Bạn đã nhập sai quá nhiều lần");
            break;
          case "007":
            toast.info("Nhập sai OTP");
            break;
          case "008":
            toast.info("Gửi Email thất bại");
            break;
          default:
            toast.info("Gửi OTP thất bại");
            break;
        }

        setLoadingSendOtp(false);
      } catch (error) {
        setLoadingSendOtp(false);

        toast.info("Gửi OTP thất bại");
      }
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
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            padding: 0,
            width: "600px",
            height: "300px",
            overflow: "auto",
            zIndex: 100,
            boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.5)",
          },
          overlay: {
            zIndex: 99,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="p-4 z-20 w-[100%] h-[100%]  bg-white flex flex-col gap-4 items-center relative">
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
            value={otp}
            onChange={(e) => setOtp(e)}
            variant="filled"
            formatter={(str) => str.toUpperCase()}
            style={{ width: "100%", height: "80px" }}
          />

          <Button
            id="btnTesting"
            type="primary"
            className="h-[50px] text-[16px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] bg-[#0077D5] font-normal rounded-[10px]"
            onClick={() => {
              sendOtp();
            }}
            loading={loadingSendOtp}
            disabled={loadingSendOtp}
          >
            Xác thực
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Đăng ký" }]} />

      <div className="container flex flex-col md:flex-col lg:flex-row gap-8 mx-auto py-[0px] md:py-[30px] lg:py-[40px] max-w-[1280px]">
        <div className="flex-[6] hidden md:hidden lg:block  flex flex-col w-[50%] h-[700px] pt-[100px]">
          <Carousel infinite draggable className="custom-carousel h-[500px]">
            {listImageSlider.map((item, index) => {
              return (
                <div className="flex justify-center items-center h-full">
                  <img
                    key={`slider_${index}`}
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
              value={fullName}
              onChange={(e) => {
                setUserId(0);
                setFullName(e.target.value);
              }}
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-light text-gray-900 pb-3">
              Tên đăng nhập <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              className="text-gray-900 h-[48px] text-sm rounded-lg block w-full p-3 custom-input"
              style={{
                border: 0,
                backgroundColor: "#F7F6FB",
              }}
              value={userName}
              onChange={(e) => {
                setUserId(0);
                setUserName(e.target.value);
              }}
              placeholder="Nhập tên đăng nhập"
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
              value={email}
              onChange={(e) => {
                setUserId(0);
                setEmail(e.target.value);
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
              value={phone}
              onChange={(e) => {
                setUserId(0);
                setPhone(e.target.value);
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
              value={password}
              onChange={(e) => {
                setUserId(0);
                setPassword(e.target.value);
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
              value={confirmPassword}
              onChange={(e) => {
                setUserId(0);
                setConfirmPassword(e.target.value);
              }}
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <Button
            id="btnTesting"
            type="primary"
            className="h-[48px] text-[16px] font-normal rounded-[10px] bg-[#0077D5]"
            onClick={() => {
              if (userId == 0) {
                if (validate()) {
                  onSubmitRegister();
                }
              } else {
                setIsShowModalOTP(true);
              }
            }}
            loading={loadingLogin}
            disabled={loadingLogin}
          >
            Đăng ký
          </Button>

          {renderModalOTP()}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
