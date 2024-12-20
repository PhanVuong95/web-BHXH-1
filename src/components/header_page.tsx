import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import users from "../assets/user.png";
import imagesIocn from "../assets/icon/images";
import Modal from "react-modal";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import zalo from "../assets/zalo.png";
import { Input, Typography } from "antd";
import { EQrCodeType } from "../enums";
import { FlexBox } from "./box/FlexBox";
import { QRCodeCanvas } from "qrcode.react";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { setTimeout } from "timers/promises";

const HeaderPage = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clientId, setConnectionIds] = useState<string | null>(null);
  const [loginDeeplink, setLoginDeeplink] = useState<any>();
  const [isLoginZalo, setIsLoginZalo] = useState(false);
  const navigate = useNavigate();
  // Quản lý trạng thái đăng nhập
  const [user, setUser] = useState<any>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // đăng nhập google
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "110872706346-2usv0onovmio1n2ikh181t412923e3kl.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      const wrapper = document.getElementById("google-button-wrapper");
      if (wrapper) {
        window.google.accounts.id.renderButton(wrapper, {
          theme: "outline",
          size: "large",
        });
      } else {
        console.error("Google button wrapper not found in DOM");
      }
    } else {
      console.error("Google SDK not loaded");
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    if (!response || !response.credential) {
      Swal.fire(
        "Đăng nhập thất bại",
        "Vui lòng kiểm tra lại thông tin đăng nhập!",
        "error"
      );
      return;
    }

    const responsePayload = decodeJwtResponse(response.credential);

    const user = {
      id: responsePayload.sub,
      fullName: responsePayload.name,
      photo: responsePayload.picture,
      email: responsePayload.email,
    };

    loginWithGoogle(user);
  };

  const loginWithGoogle = async (user: any) => {
    try {
      const response = await axios.post(
        `https://baohiem.dion.vn/account/api/sign-in-google`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (responseData.status == 200 && responseData.message == "SUCCESS") {
        const data = responseData.resources;

        // Lưu token vào localStorage và cookie
        localStorage.setItem("currentUser", JSON.stringify(data));
        localStorage.setItem("accessToken", data.accessToken);
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; HttpOnly`;
        localStorage.setItem("profile", JSON.stringify(data.profile));

        Swal.fire({
          title: "Đăng nhập thành công",
          html: `Chào mừng <b>${data.fullname || ""}</b> quay trở lại.`,
          icon: "success",
        }).then(() => {
          // Chuyển trạng thái đã đăng nhập
          // updateLoginStatus(true);
          window.location.href = "/";
        });
      } else if (
        responseData.status === 400 &&
        responseData.message === "BAD_REQUEST"
      ) {
        Swal.fire("Đăng nhập thất bại", responseData.title, "warning");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Đăng nhập thất bại", "Vui lòng thử lại!", "error");
    }
  };

  const decodeJwtResponse = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`wss://baohiem.dion.vn/login-portal`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then(() => {})
      .catch((err) => console.error("Connection error:", err));

    connection.on("SendConnectionId", (ConnectionId) => {
      setConnectionIds(ConnectionId);
    });

    connection.on("SignIn", (res) => {
      if (res.status == "200" && res.message == "SUCCESS" && res.resources) {
        const { accessToken, profile } = res.resources;

        toast.success("Đăng nhập tài khoản thành công");

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", accessToken);

        // Lưu thông tin profile vào localStorage
        localStorage.setItem("profile", JSON.stringify(profile));

        // Lưu token vào cookies
        document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`;

        setUser(profile);
        setIsShowModalLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    const link = `https://zalo.me/s/3118469885204258242/login/portal?state=${btoa(
      JSON.stringify({
        data: {
          body: { clientId },
          pathname: "/my/user/login-portal",
        },
        type: EQrCodeType.LOGIN_PORTAL,
        disableCallback: true,
      })
    )}&${"env=TESTING&version=54"}`;

    setLoginDeeplink(link);
  }, [clientId]);

  const navLinks = [
    {
      labe: "Trang chủ",
      link: "/",
    },
    {
      labe: "Khai báo BHXH tự nguyện ",
      link: "/social-insurance",
    },
    {
      labe: "Mua BHYT tự nguyện",
      link: "/health-insurance",
    },
    {
      labe: "Liên hệ chúng tôi",
      link: "/#",
    },
    {
      labe: "Công cụ hỗ trợ",
      link: "/tool-support",
    },
  ];

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const profile = localStorage.getItem("profile");

    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    localStorage.removeItem("currentUser");

    setUser(null);
  };

  const formLoginAccount = () => {
    return (
      <div>
        <div className="flex flex-col gap-5">
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

          <div className="flex w-[100%]">
            <div className="cursor-pointer w-full text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-[#000] font-normal rounded-[10px]">
              Quên mật khẩu
            </div>
            <div className="cursor-pointer w-full text-center text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-normal rounded-[10px]">
              Đăng nhập
            </div>
          </div>

          <div className="text-center text-[14px] text-[#5F5F5F] font-light">
            Hoặc
          </div>
        </div>
      </div>
    );
  };

  const qrLoginZalo = () => {
    return (
      <FlexBox
        style={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <QRCodeCanvas
          size={1000}
          style={{ height: "auto", maxWidth: 220, width: "100%" }}
          value={loginDeeplink}
        />
        <Typography style={{ paddingTop: 20 }}>
          Quét QR code để đăng nhập
        </Typography>
      </FlexBox>
    );
  };

  const handleCustomGoogleClick = () => {
    // if (window.google) {
    //   window.google.accounts.id.initialize({
    //     client_id:
    //       "110872706346-2usv0onovmio1n2ikh181t412923e3kl.apps.googleusercontent.com",
    //     callback: handleCredentialResponse,
    //     ux_mode: "popup",
    //   });
    //   const wrapper = document.getElementById("google-button-wrapper");
    //   if (wrapper) {
    //     window.google.accounts.id.renderButton(wrapper, {
    //       theme: "outline",
    //       size: "large",
    //     });
    //   } else {
    //     console.error("Google button wrapper not found in DOM");
    //   }
    // } else {
    //   console.error("Google SDK not loaded");
    // }
    // setTimeout(1000, () => {
    //   const googleButtonWrapper = document.querySelector(
    //     "#google-button-wrapper > div[role='button']"
    //   );
    //   (googleButtonWrapper as HTMLElement)?.click();
    // });
  };

  const btnLoginGoogle = () => {
    return (
      <button
        onClick={handleCustomGoogleClick}
        className="flex w-full items-center justify-center bg-[#F7F6FB] py-[10px] rounded-[10px]"
      >
        <span className="mr-2">Tiếp tục với Google</span>
        <img alt="" src={google} width={20} height={20} />
      </button>
    );
  };

  const btnLoginZalo = () => {
    return (
      <button
        onClick={() => {
          setIsLoginZalo(true);
        }}
        className="flex  w-full items-center justify-center bg-[#F7F6FB]  py-[10px] rounded-[10px]"
      >
        <span className="mr-2">Tiếp tục với Zalo</span>
        <img alt="" src={zalo} width={20} height={20} />
      </button>
    );
  };

  const btnLoginByAccount = () => {
    return (
      <button
        onClick={() => {
          setIsLoginZalo(false);
        }}
        className="flex  w-full items-center justify-center bg-[#F7F6FB]  py-[10px] rounded-[10px]"
      >
        <span className="mr-2">Đăng nhập với tài khoản</span>
      </button>
    );
  };

  const ModalLogin = () => {
    return (
      <Modal
        isOpen={isShowModalLogin}
        onRequestClose={() => setIsShowModalLogin(false)}
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

            overflow: "auto",
            zIndex: 100000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <div className="flex flex-col p-8 w-[100%] h-[100%] relative bg-white gap-5">
          <div className="flex items-center justify-center">
            <img alt="" src={logo} width={60} height={60} />
            <div className="font-bold ml-4 text-[#0077D5]">Nộp BHXH</div>
          </div>

          <div className="flex items-center justify-center text-[20px] font-bold">
            Chào mừng bạn đến với Bảo hiểm Việt
          </div>

          {/* Form Login */}
          {isLoginZalo ? qrLoginZalo() : formLoginAccount()}

          {/* btn Login */}
          <div className="flex justify-between gap-[20px]">
            {btnLoginGoogle()}
            {!isLoginZalo ? btnLoginZalo() : btnLoginByAccount()}
          </div>

          <div className="flex justify-center mt-[60px]">
            <div className="mr-4">Chưa có tài khoản?</div>
            <div
              className="text-[#0077D5] underline cursor-pointer"
              onClick={() => {
                setIsShowModalLogin(false);
                navigate("/register");
              }}
            >
              Đăng ký ngay
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className=" fixed header-page border border-b-[#B9BDC1]">
      <nav className="bg-[#fff] border-gray-200 container mx-auto">
        <nav className="flex justify-between  items-center py-2 sm:py-[20px] max-w-[1280px] mx-auto">
          <div className="flex items-center gap-8">
            <section className="flex items-center gap-4">
              {/* menu */}
              <div
                onClick={() => setMenu(true)}
                className="text-3xl cursor-pointer nav-link-mobile text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.875 7.875H4.125C3.4875 7.875 3 7.3875 3 6.75C3 6.1125 3.4875 5.625 4.125 5.625H19.875C20.5125 5.625 21 6.1125 21 6.75C21 7.3875 20.5125 7.875 19.875 7.875Z"
                    fill="black"
                  />
                  <path
                    d="M19.875 13.125H4.125C3.4875 13.125 3 12.6375 3 12C3 11.3625 3.4875 10.875 4.125 10.875H19.875C20.5125 10.875 21 11.3625 21 12C21 12.6375 20.5125 13.125 19.875 13.125Z"
                    fill="black"
                  />
                  <path
                    d="M19.875 18.375H4.125C3.4875 18.375 3 17.8875 3 17.25C3 16.6125 3.4875 16.125 4.125 16.125H19.875C20.5125 16.125 21 16.6125 21 17.25C21 17.8875 20.5125 18.375 19.875 18.375Z"
                    fill="black"
                  />
                </svg>
              </div>
              {/* logo */}
              <Link
                to={"/"}
                className="text-[24px] font-semibold flex items-center gap-3 text-[#0077D5] logo"
              >
                <img src={imagesIocn.logo} alt="" className="w-20" />
              </Link>
            </section>
          </div>
          <div className="flex items-center gap-4 nav-link">
            {navLinks.map((d, i) => (
              <Link
                key={i}
                className={`block py-[10px] px-[20px] font-normal ${
                  activeLink === d.link || (activeLink === "" && d.link === "/")
                    ? "active"
                    : ""
                } rounded md:bg-transparent`}
                to={d.link}
                onClick={() => setActiveLink(d.link)}
              >
                {d.labe}
              </Link>
            ))}
          </div>
          {/* sidebar mobile menu */}
          <div
            className={clsx(
              " fixed h-full w-screen nav-link-mobile bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
              isSideMenuOpen && "translate-x-0"
            )}
          >
            <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-5 z-50 w-full max-w-[388px] flex  ">
              <div className="w-[30px] h-[30px]">
                <IoCloseOutline
                  onClick={() => setMenu(false)}
                  className="mt-0 mb-5 text-3xl cursor-pointer"
                />
              </div>

              <div className=" navbar-mobile-top py-[15px] ">
                <div className="flex items-center gap-4 user-phone">
                  <div className="user">
                    <div className="flex flex-row items-center name-user">
                      <span className="text-black font-medium">
                        {/* Xin chào, ${user.fullName} */}
                      </span>
                    </div>
                    <p className="text-[#595959] text-[14px] font-normal float-right phone-user-1">
                      0364 123 456
                    </p>
                  </div>
                  {/* avtar img */}
                  <img
                    className="rounded-full avatar-img"
                    // src="https://i.pravatar.cc/150?img=52"
                    src={user && user.photo ? user.photo : users}
                    alt="avatar-img"
                  />
                </div>

                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3916_68008)">
                      <path
                        d="M36.4844 11.8016H34.0296C31.9418 6.84424 27.3445 3.24166 22.052 2.55361C16.8071 1.85439 11.6538 3.87314 8.28242 7.93689C7.29133 9.13166 6.50516 10.4306 5.92953 11.8016H3.51562C1.57703 11.8016 0 13.3786 0 15.3172V20.0047C0 21.9433 1.57703 23.5203 3.51562 23.5203H8.3282L7.82469 21.9834C6.35867 17.5064 7.18383 12.9322 10.0872 9.43377C12.9402 5.99478 17.297 4.29307 21.7476 4.87674C26.4544 5.48986 30.5399 8.81854 32.1587 13.3591L32.1685 13.3854C32.4295 14.0789 32.6126 14.7919 32.7178 15.5255C33.0691 17.7171 32.8689 19.9383 32.1399 21.9491L32.1348 21.9631C30.3253 27.1005 25.4586 30.5516 20.0229 30.5516C18.0716 30.5516 16.4844 32.1286 16.4844 34.0672C16.4844 36.0058 18.0614 37.5828 20 37.5828C21.9386 37.5828 23.5156 36.0058 23.5156 34.0672V32.4867C28.1948 31.3745 32.1252 28.0576 34.0143 23.5203H36.4844C38.423 23.5203 40 21.9432 40 20.0046V15.3171C40 13.3785 38.423 11.8016 36.4844 11.8016Z"
                        fill="#096DD9"
                      />
                      <path
                        d="M9.45312 25.8641V28.2078H20C25.8159 28.2078 30.5469 23.4768 30.5469 17.6609C30.5469 11.8451 25.8159 7.11407 20 7.11407C14.1841 7.11407 9.45312 11.8451 9.45312 17.6609C9.45312 20.0322 10.2496 22.3233 11.7053 24.1761C11.4227 25.1637 10.5209 25.8641 9.45312 25.8641ZM23.5156 16.4891H25.8594V18.8328H23.5156V16.4891ZM18.8281 16.4891H21.1719V18.8328H18.8281V16.4891ZM14.1406 16.4891H16.4844V18.8328H14.1406V16.4891Z"
                        fill="#FA8C16"
                      />
                      <path
                        d="M23.5156 16.4891H25.8594V18.8328H23.5156V16.4891Z"
                        fill="white"
                      />
                      <path
                        d="M18.8281 16.4891H21.1719V18.8328H18.8281V16.4891Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3916_68008">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="navbar-menu-mobile">
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/social-insurance"
                >
                  Khai báo BHXH tự nguyện
                </Link>
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/health-insurance"
                >
                  Mua BHYT tự nguyện
                </Link>
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/tool-support"
                >
                  Công cụ hỗ trợ
                </Link>
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/"
                >
                  Điều chỉnh thông tin BHXH
                </Link>
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/"
                >
                  Liên hệ chúng tôi
                </Link>
                <Link
                  className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1"
                  to="/privacy_policy"
                >
                  Tài liệu BHXH
                </Link>
                <div className="relative">
                  <div
                    className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1 w-full flex flex-row items-center justify-between"
                    onClick={handleToggle}
                  >
                    Tài khoản
                    <span className="mx-2">
                      {isOpen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.475541 12.9242C0.241226 12.6899 0.241226 12.31 0.475541 12.0757L5.55128 6.99998L0.47554 1.92424C0.241226 1.68992 0.241226 1.31003 0.47554 1.07571C0.709855 0.841396 1.08975 0.841396 1.32407 1.07571L6.82407 6.57571C7.05838 6.81003 7.05838 7.18992 6.82407 7.42424L1.32407 12.9242C1.08975 13.1586 0.709855 13.1586 0.475541 12.9242Z"
                            fill="#141415"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {isOpen && (
                    <div
                      className="absolute top-full left-0 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul>
                        <li className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1 w-full">
                          <Link to="/user">Thông tin tài khoản</Link>
                        </li>
                        <li
                          onClick={handleLogout}
                          className="font-medium py-[10px] md:py-[15px] lg:py-[20px] border-bottom-1 w-full"
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
          {user ? (
            <section className="flex items-center gap-4">
              <div className="user">
                <div className="flex items-center flex-wrap gap-1 name-user justify-end">
                  <span className="text-[#0077D5] font-[400] text-[16px]">
                    Xin chào,
                  </span>
                  <span className="text-black font-medium text-lg">
                    {/* {user.username} */}
                    {user.fullName}
                  </span>
                </div>
                <p className="text-[#D1D1D6] text-[14px] font-normal float-right phone-user">
                  {user.phone}
                </p>
              </div>
              {/* avtar img */}
              <div className="relative">
                <img
                  className="rounded-full cursor-pointer w-[40px] md:w-[50px] lg:w-[60px]"
                  src={user && user.photo ? user.photo : users}
                  alt="avatar-img"
                  onClick={toggleDropdown}
                />
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[50px] bg-white rounded shadow-lg z-10 user-card overflow-hidden">
                    <div className="user-car1">
                      <Link
                        to="user"
                        className="user-car-button p-[10px] md:p-[10px] lg:p-[15px]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="border-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_6001_27196)">
                              <path
                                d="M11.9326 17.2971C11.0144 17.6227 10.0274 17.8002 8.99922 17.8002C7.97109 17.8002 6.98402 17.6227 6.06589 17.2971V15.6002C6.06589 13.9825 7.38149 12.6669 8.99922 12.6669C10.617 12.6669 11.9326 13.9825 11.9326 15.6002V17.2971ZM8.99922 5.33353C8.19035 5.33353 7.53255 5.99133 7.53255 6.8002C7.53255 7.60906 8.19035 8.26686 8.99922 8.26686C9.80809 8.26686 10.4659 7.60906 10.4659 6.8002C10.4659 5.99133 9.80809 5.33353 8.99922 5.33353ZM17.7992 9.0002C17.7992 12.2511 16.0275 15.0949 13.3992 16.6188V15.6002C13.3992 13.1736 11.4258 11.2002 8.99922 11.2002C6.57262 11.2002 4.59922 13.1736 4.59922 15.6002V16.6188C1.97095 15.0949 0.199219 12.2511 0.199219 9.0002C0.199219 4.14773 4.14675 0.200195 8.99922 0.200195C13.8517 0.200195 17.7992 4.14773 17.7992 9.0002ZM11.9326 6.8002C11.9326 5.18246 10.617 3.86686 8.99922 3.86686C7.38149 3.86686 6.06589 5.18246 6.06589 6.8002C6.06589 8.41793 7.38149 9.73353 8.99922 9.73353C10.617 9.73353 11.9326 8.41793 11.9326 6.8002Z"
                                fill="#0077D5"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_6001_27196">
                                <rect
                                  width="17.6"
                                  height="17.6"
                                  fill="#0077D5"
                                  transform="translate(0.199219 0.200195)"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        Thông tin tài khoản
                      </Link>
                      <div
                        className="user-car-button p-[10px] md:p-[10px] lg:p-[15px]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <mask id="path-1-inside-1_4546_34813" fill="white">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M32 16L31.9995 16.7426L31.9979 17.1788L31.9952 17.5446L31.9915 17.871L31.9867 18.1709L31.9808 18.4512L31.9739 18.7161L31.9659 18.9685L31.9568 19.2104L31.9467 19.4433L31.9355 19.6683L31.9232 19.8864L31.9099 20.0983L31.8955 20.3045L31.88 20.5057L31.8635 20.7021L31.8459 20.8943L31.8272 21.0824L31.8075 21.2668L31.7867 21.4476L31.7648 21.6252L31.7419 21.7996L31.7179 21.971L31.6928 22.1396L31.6667 22.3056L31.6395 22.4689L31.6112 22.6298L31.5818 22.7884L31.5514 22.9446L31.52 23.0987L31.4874 23.2506L31.4538 23.4005L31.4191 23.5484L31.3834 23.6944L31.3466 23.8384L31.3087 23.9807L31.2698 24.1212L31.2297 24.2599L31.1887 24.3969L31.1465 24.5323L31.1033 24.666L31.059 24.7981L31.0136 24.9287L30.9672 25.0577L30.9197 25.1852L30.8711 25.3113L30.8214 25.4358L30.7707 25.5589L30.7189 25.6806L30.666 25.8009L30.6121 25.9198L30.557 26.0374L30.5009 26.1536L30.4437 26.2685L30.3855 26.382L30.3261 26.4942L30.2657 26.6052L30.2042 26.7149L30.1416 26.8233L30.078 26.9304L30.0132 27.0363L29.9474 27.1409L29.8805 27.2444L29.8125 27.3466L29.7433 27.4476L29.6731 27.5473L29.6019 27.6459L29.5295 27.7433L29.456 27.8396L29.3814 27.9346L29.3057 28.0285L29.2289 28.1212L29.151 28.2128L29.072 28.3032L28.9918 28.3924L28.9106 28.4805L28.8282 28.5675L28.7447 28.6533L28.6601 28.738L28.5744 28.8216L28.4875 28.9041L28.3995 28.9854L28.3103 29.0656L28.22 29.1447L28.1285 29.2227L28.0359 29.2996L27.9421 29.3754L27.8472 29.4501L27.751 29.5237L27.6537 29.5961L27.5552 29.6675L27.4555 29.7378L27.3546 29.807L27.2525 29.8751L27.1492 29.9421L27.0447 30.008L26.9389 30.0729L26.8318 30.1366L26.7235 30.1993L26.614 30.2609L26.5031 30.3214L26.391 30.3808L26.2775 30.4391L26.1628 30.4964L26.0467 30.5526L25.9293 30.6077L25.8105 30.6618L25.6903 30.7147L25.5687 30.7666L25.4457 30.8174L25.3212 30.8672L25.1953 30.9158L25.0679 30.9634L24.939 31.01L24.8086 31.0554L24.6766 31.0998L24.543 31.1431L24.4077 31.1853L24.2709 31.2265L24.1323 31.2666L23.9919 31.3057L23.8498 31.3436L23.7059 31.3805L23.5601 31.4163L23.4124 31.4511L23.2626 31.4848L23.1109 31.5174L22.957 31.549L22.8009 31.5795L22.6425 31.6089L22.4818 31.6372L22.3187 31.6645L22.1529 31.6908L21.9845 31.7159L21.8133 31.74L21.6392 31.763L21.4619 31.785L21.2813 31.8059L21.0972 31.8257L20.9094 31.8444L20.7176 31.8621L20.5215 31.8787L20.3207 31.8943L20.1149 31.9088L19.9035 31.9222L19.6859 31.9345L19.4615 31.9458L19.2292 31.956L18.9881 31.9652L18.7366 31.9733L18.4728 31.9803L18.1939 31.9862L17.8958 31.9911L17.5718 31.9949L17.2099 31.9977L16.7816 31.9994L16.1375 32L15.2973 31.9996L14.8527 31.998L14.4828 31.9955L14.1539 31.9918L13.8522 31.9871L13.5705 31.9813L13.3045 31.9745L13.0512 31.9665L12.8085 31.9576L12.575 31.9475L12.3494 31.9364L12.1307 31.9242L11.9184 31.911L11.7117 31.8967L11.5101 31.8813L11.3133 31.8648L11.1208 31.8473L10.9324 31.8287L10.7478 31.8091L10.5666 31.7884L10.3889 31.7666L10.2142 31.7437L10.0425 31.7198L9.87368 31.6948L9.70754 31.6688L9.54397 31.6417L9.38288 31.6135L9.22416 31.5842L9.06772 31.5539L8.91349 31.5225L8.76139 31.4901L8.61134 31.4565L8.46329 31.422L8.31718 31.3863L8.17295 31.3496L8.03056 31.3118L7.88995 31.2729L7.75109 31.233L7.61394 31.192L7.47845 31.1499L7.34459 31.1068L7.21233 31.0625L7.08164 31.0173L6.9525 30.9709L6.82486 30.9235L6.69872 30.875L6.57404 30.8254L6.45081 30.7748L6.32899 30.7231L6.20858 30.6703L6.08956 30.6164L5.9719 30.5615L5.8556 30.5054L5.74063 30.4483L5.62698 30.3902L5.51464 30.3309L5.40359 30.2706L5.29382 30.2092L5.18532 30.1467L5.07808 30.0831L4.97209 30.0184L4.86734 29.9527L4.76382 29.8858L4.66152 29.8179L4.56043 29.7489L4.46055 29.6788L4.36186 29.6076L4.26436 29.5353L4.16804 29.4619L4.0729 29.3874L3.97893 29.3118L3.88612 29.2351L3.79447 29.1572L3.70398 29.0783L3.61463 28.9983L3.52643 28.9171L3.43937 28.8348L3.35344 28.7514L3.26864 28.6669L3.18497 28.5813L3.10243 28.4945L3.021 28.4065L2.9407 28.3175L2.8615 28.2272L2.78342 28.1359L2.70645 28.0433L2.63058 27.9496L2.55582 27.8548L2.48215 27.7587L2.40959 27.6615L2.33812 27.5631L2.26775 27.4635L2.19847 27.3627L2.13028 27.2607L2.06318 27.1575L1.99717 27.053L1.93225 26.9473L1.86841 26.8404L1.80565 26.7322L1.74398 26.6227L1.68339 26.512L1.62388 26.4L1.56545 26.2866L1.50809 26.172L1.45182 26.056L1.39662 25.9387L1.3425 25.82L1.28945 25.6999L1.23748 25.5784L1.18658 25.4555L1.13675 25.3312L1.088 25.2054L1.04032 25.0781L0.993706 24.9493L0.948167 24.819L0.903699 24.6871L0.860301 24.5537L0.817974 24.4186L0.776716 24.2818L0.736527 24.1434L0.697407 24.0032L0.659356 23.8612L0.622374 23.7174L0.58646 23.5718L0.551615 23.4242L0.517837 23.2746L0.485127 23.123L0.453485 22.9693L0.42291 22.8134L0.393403 22.6552L0.364963 22.4947L0.337591 22.3318L0.311285 22.1662L0.286047 21.998L0.261876 21.8271L0.238771 21.6531L0.216734 21.4761L0.195763 21.2958L0.175859 21.112L0.157022 20.9245L0.139252 20.733L0.122549 20.5373L0.106912 20.3369L0.0923421 20.1315L0.0788388 19.9205L0.0664022 19.7035L0.0550322 19.4796L0.044729 19.248L0.0354924 19.0077L0.0273225 18.7571L0.0202193 18.4943L0.0141828 18.2167L0.00921287 17.9203L0.00530965 17.5988L0.0024731 17.2406L0.000703217 16.8195L0 16.2182L0.00036345 15.3384L0.00179357 14.8846L0.00429035 14.5105L0.00785381 14.1789L0.0124839 13.8754L0.0181807 13.5923L0.0249442 13.3252L0.0327743 13.0709L0.0416711 12.8275L0.0516346 12.5933L0.0626647 12.367L0.0747615 12.1479L0.0879251 11.9351L0.102155 11.728L0.117452 11.526L0.133816 11.3288L0.151246 11.136L0.169743 10.9473L0.189307 10.7623L0.209938 10.5809L0.231636 10.4029L0.2544 10.228L0.278232 10.0561L0.30313 9.88702L0.329096 9.72066L0.356128 9.5569L0.384228 9.39561L0.413396 9.2367L0.44363 9.08009L0.474932 8.92568L0.507302 8.77341L0.540739 8.6232L0.575245 8.475L0.610819 8.32873L0.64746 8.18436L0.685171 8.04182L0.72395 7.90107L0.763798 7.76207L0.804716 7.62478L0.846703 7.48916L0.889759 7.35518L0.933887 7.22279L0.979084 7.09198L1.02535 6.96271L1.07269 6.83496L1.12111 6.7087L1.17059 6.5839L1.22115 6.46055L1.27278 6.33863L1.32548 6.21811L1.37926 6.09898L1.43412 5.98121L1.49005 5.8648L1.54706 5.74972L1.60515 5.63597L1.66432 5.52352L1.72456 5.41237L1.78589 5.3025L1.8483 5.1939L1.91179 5.08656L1.97637 4.98048L2.04204 4.87563L2.10879 4.77201L2.17663 4.66961L2.24556 4.56842L2.31559 4.46844L2.3867 4.36966L2.45892 4.27206L2.53223 4.17565L2.60665 4.08042L2.68216 3.98635L2.75878 3.89345L2.83651 3.80171L2.91535 3.71113L2.9953 3.62169L3.07637 3.5334L3.15856 3.44624L3.24187 3.36023L3.32631 3.27534L3.41187 3.19158L3.49857 3.10895L3.58641 3.02743L3.67539 2.94704L3.76552 2.86775L3.8568 2.78958L3.94924 2.71252L4.04284 2.63657L4.13761 2.56171L4.23355 2.48796L4.33067 2.41531L4.42898 2.34376L4.52848 2.2733L4.62919 2.20393L4.7311 2.13565L4.83424 2.06847L4.93859 2.00237L5.04419 1.93736L5.15103 1.87344L5.25912 1.81059L5.36848 1.74884L5.47912 1.68816L5.59105 1.62856L5.70428 1.57004L5.81883 1.51261L5.93471 1.45625L6.05194 1.40096L6.17052 1.34675L6.29049 1.29362L6.41185 1.24156L6.53463 1.19058L6.65885 1.14066L6.78452 1.09182L6.91168 1.04406L7.04034 0.997362L7.17053 0.951738L7.30229 0.907185L7.43563 0.863702L7.5706 0.821289L7.70722 0.779946L7.84553 0.739672L7.98558 0.700467L8.1274 0.662331L8.27104 0.625264L8.41654 0.589265L8.56397 0.554334L8.71337 0.520471L8.86481 0.487676L9.01836 0.455949L9.17409 0.425289L9.33207 0.395697L9.4924 0.367172L9.65516 0.339715L9.82047 0.313324L9.98844 0.288001L10.1592 0.263745L10.3329 0.240555L10.5097 0.218433L10.6897 0.197377L10.8732 0.177389L11.0604 0.158467L11.2516 0.140611L11.447 0.123823L11.647 0.108101L11.852 0.0934464L12.0625 0.0798581L12.279 0.0673366L12.5023 0.0558817L12.7332 0.0454935L12.9728 0.036172L13.2225 0.0279171L13.4842 0.020729L13.7605 0.0146075L14.0552 0.00955264L14.3744 0.00556448L14.7291 0.00264299L15.1433 0.000788159L15.7141 0L16.6191 0.000278509L17.083 0.00162369L17.4615 0.00403553L17.7958 0.00751404L18.1013 0.0120592L18.3858 0.0176711L18.6541 0.0243496L18.9092 0.0320948L19.1535 0.0409066L19.3884 0.0507852L19.6152 0.0617304L19.8349 0.0737423L20.0482 0.0868209L20.2557 0.100966L20.4581 0.116178L20.6556 0.132457L20.8488 0.149802L21.0378 0.168215L21.2231 0.187694L21.4047 0.208239L21.583 0.229852L21.7582 0.252532L21.9303 0.276278L22.0996 0.301092L22.2662 0.326972L22.4301 0.35392L22.5916 0.381935L22.7507 0.411017L22.9075 0.441167L23.0621 0.472384L23.2145 0.504669L23.3649 0.538021L23.5132 0.572442L23.6597 0.60793L23.8042 0.644487L23.9469 0.682112L24.0878 0.720806L24.2269 0.760569L24.3643 0.801402L24.5001 0.843304L24.6342 0.886275L24.7667 0.930317L24.8976 0.97543L25.027 1.02161L25.1549 1.06887L25.2813 1.11719L25.4062 1.16659L25.5296 1.21707L25.6517 1.26861L25.7723 1.32123L25.8916 1.37493L26.0094 1.4297L26.126 1.48554L26.2411 1.54247L26.355 1.60047L26.4675 1.65955L26.5788 1.71971L26.6888 1.78095L26.7975 1.84328L26.9049 1.90668L27.0111 1.97117L27.116 2.03675L27.2198 2.10342L27.3223 2.17117L27.4235 2.24002L27.5236 2.30995L27.6225 2.38099L27.7202 2.45311L27.8167 2.52634L27.912 2.60066L28.0062 2.67609L28.0992 2.75262L28.191 2.83027L28.2817 2.90902L28.3712 2.98888L28.4596 3.06986L28.5468 3.15196L28.6329 3.23518L28.7179 3.31953L28.8018 3.405L28.8845 3.49161L28.9661 3.57936L29.0466 3.66825L29.1259 3.75829L29.2042 3.84948L29.2814 3.94182L29.3574 4.03533L29.4323 4.13L29.5062 4.22585L29.5789 4.32288L29.6506 4.42109L29.7211 4.5205L29.7906 4.62111L29.8589 4.72293L29.9262 4.82596L29.9924 4.93022L30.0575 5.03572L30.1215 5.14246L30.1844 5.25045L30.2463 5.35971L30.307 5.47025L30.3667 5.58208L30.4253 5.69521L30.4828 5.80965L30.5393 5.92542L30.5946 6.04254L30.6489 6.16102L30.7022 6.28087L30.7543 6.40212L30.8054 6.52479L30.8554 6.64889L30.9043 6.77445L30.9522 6.90148L30.9989 7.03003L31.0446 7.1601L31.0893 7.29173L31.1328 7.42494L31.1753 7.55978L31.2168 7.69627L31.2571 7.83444L31.2964 7.97435L31.3346 8.11603L31.3718 8.25952L31.4079 8.40488L31.4429 8.55215L31.4768 8.70139L31.5097 8.85267L31.5415 9.00604L31.5723 9.16159L31.602 9.31939L31.6306 9.47953L31.6581 9.6421L31.6846 9.8072L31.71 9.97496L31.7343 10.1455L31.7576 10.3189L31.7798 10.4955L31.801 10.6752L31.821 10.8584L31.84 11.0453L31.858 11.2362L31.8749 11.4312L31.8907 11.6308L31.9054 11.8354L31.9191 12.0455L31.9317 12.2615L31.9432 12.4842L31.9537 12.7145L31.9631 12.9534L31.9714 13.2022L31.9787 13.4629L31.9849 13.7379L31.9901 14.0309L31.9941 14.3479L31.9971 14.6991L31.9991 15.107L31.9999 15.6536L32 16Z"
                            />
                          </mask>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32 16L31.9995 16.7426L31.9979 17.1788L31.9952 17.5446L31.9915 17.871L31.9867 18.1709L31.9808 18.4512L31.9739 18.7161L31.9659 18.9685L31.9568 19.2104L31.9467 19.4433L31.9355 19.6683L31.9232 19.8864L31.9099 20.0983L31.8955 20.3045L31.88 20.5057L31.8635 20.7021L31.8459 20.8943L31.8272 21.0824L31.8075 21.2668L31.7867 21.4476L31.7648 21.6252L31.7419 21.7996L31.7179 21.971L31.6928 22.1396L31.6667 22.3056L31.6395 22.4689L31.6112 22.6298L31.5818 22.7884L31.5514 22.9446L31.52 23.0987L31.4874 23.2506L31.4538 23.4005L31.4191 23.5484L31.3834 23.6944L31.3466 23.8384L31.3087 23.9807L31.2698 24.1212L31.2297 24.2599L31.1887 24.3969L31.1465 24.5323L31.1033 24.666L31.059 24.7981L31.0136 24.9287L30.9672 25.0577L30.9197 25.1852L30.8711 25.3113L30.8214 25.4358L30.7707 25.5589L30.7189 25.6806L30.666 25.8009L30.6121 25.9198L30.557 26.0374L30.5009 26.1536L30.4437 26.2685L30.3855 26.382L30.3261 26.4942L30.2657 26.6052L30.2042 26.7149L30.1416 26.8233L30.078 26.9304L30.0132 27.0363L29.9474 27.1409L29.8805 27.2444L29.8125 27.3466L29.7433 27.4476L29.6731 27.5473L29.6019 27.6459L29.5295 27.7433L29.456 27.8396L29.3814 27.9346L29.3057 28.0285L29.2289 28.1212L29.151 28.2128L29.072 28.3032L28.9918 28.3924L28.9106 28.4805L28.8282 28.5675L28.7447 28.6533L28.6601 28.738L28.5744 28.8216L28.4875 28.9041L28.3995 28.9854L28.3103 29.0656L28.22 29.1447L28.1285 29.2227L28.0359 29.2996L27.9421 29.3754L27.8472 29.4501L27.751 29.5237L27.6537 29.5961L27.5552 29.6675L27.4555 29.7378L27.3546 29.807L27.2525 29.8751L27.1492 29.9421L27.0447 30.008L26.9389 30.0729L26.8318 30.1366L26.7235 30.1993L26.614 30.2609L26.5031 30.3214L26.391 30.3808L26.2775 30.4391L26.1628 30.4964L26.0467 30.5526L25.9293 30.6077L25.8105 30.6618L25.6903 30.7147L25.5687 30.7666L25.4457 30.8174L25.3212 30.8672L25.1953 30.9158L25.0679 30.9634L24.939 31.01L24.8086 31.0554L24.6766 31.0998L24.543 31.1431L24.4077 31.1853L24.2709 31.2265L24.1323 31.2666L23.9919 31.3057L23.8498 31.3436L23.7059 31.3805L23.5601 31.4163L23.4124 31.4511L23.2626 31.4848L23.1109 31.5174L22.957 31.549L22.8009 31.5795L22.6425 31.6089L22.4818 31.6372L22.3187 31.6645L22.1529 31.6908L21.9845 31.7159L21.8133 31.74L21.6392 31.763L21.4619 31.785L21.2813 31.8059L21.0972 31.8257L20.9094 31.8444L20.7176 31.8621L20.5215 31.8787L20.3207 31.8943L20.1149 31.9088L19.9035 31.9222L19.6859 31.9345L19.4615 31.9458L19.2292 31.956L18.9881 31.9652L18.7366 31.9733L18.4728 31.9803L18.1939 31.9862L17.8958 31.9911L17.5718 31.9949L17.2099 31.9977L16.7816 31.9994L16.1375 32L15.2973 31.9996L14.8527 31.998L14.4828 31.9955L14.1539 31.9918L13.8522 31.9871L13.5705 31.9813L13.3045 31.9745L13.0512 31.9665L12.8085 31.9576L12.575 31.9475L12.3494 31.9364L12.1307 31.9242L11.9184 31.911L11.7117 31.8967L11.5101 31.8813L11.3133 31.8648L11.1208 31.8473L10.9324 31.8287L10.7478 31.8091L10.5666 31.7884L10.3889 31.7666L10.2142 31.7437L10.0425 31.7198L9.87368 31.6948L9.70754 31.6688L9.54397 31.6417L9.38288 31.6135L9.22416 31.5842L9.06772 31.5539L8.91349 31.5225L8.76139 31.4901L8.61134 31.4565L8.46329 31.422L8.31718 31.3863L8.17295 31.3496L8.03056 31.3118L7.88995 31.2729L7.75109 31.233L7.61394 31.192L7.47845 31.1499L7.34459 31.1068L7.21233 31.0625L7.08164 31.0173L6.9525 30.9709L6.82486 30.9235L6.69872 30.875L6.57404 30.8254L6.45081 30.7748L6.32899 30.7231L6.20858 30.6703L6.08956 30.6164L5.9719 30.5615L5.8556 30.5054L5.74063 30.4483L5.62698 30.3902L5.51464 30.3309L5.40359 30.2706L5.29382 30.2092L5.18532 30.1467L5.07808 30.0831L4.97209 30.0184L4.86734 29.9527L4.76382 29.8858L4.66152 29.8179L4.56043 29.7489L4.46055 29.6788L4.36186 29.6076L4.26436 29.5353L4.16804 29.4619L4.0729 29.3874L3.97893 29.3118L3.88612 29.2351L3.79447 29.1572L3.70398 29.0783L3.61463 28.9983L3.52643 28.9171L3.43937 28.8348L3.35344 28.7514L3.26864 28.6669L3.18497 28.5813L3.10243 28.4945L3.021 28.4065L2.9407 28.3175L2.8615 28.2272L2.78342 28.1359L2.70645 28.0433L2.63058 27.9496L2.55582 27.8548L2.48215 27.7587L2.40959 27.6615L2.33812 27.5631L2.26775 27.4635L2.19847 27.3627L2.13028 27.2607L2.06318 27.1575L1.99717 27.053L1.93225 26.9473L1.86841 26.8404L1.80565 26.7322L1.74398 26.6227L1.68339 26.512L1.62388 26.4L1.56545 26.2866L1.50809 26.172L1.45182 26.056L1.39662 25.9387L1.3425 25.82L1.28945 25.6999L1.23748 25.5784L1.18658 25.4555L1.13675 25.3312L1.088 25.2054L1.04032 25.0781L0.993706 24.9493L0.948167 24.819L0.903699 24.6871L0.860301 24.5537L0.817974 24.4186L0.776716 24.2818L0.736527 24.1434L0.697407 24.0032L0.659356 23.8612L0.622374 23.7174L0.58646 23.5718L0.551615 23.4242L0.517837 23.2746L0.485127 23.123L0.453485 22.9693L0.42291 22.8134L0.393403 22.6552L0.364963 22.4947L0.337591 22.3318L0.311285 22.1662L0.286047 21.998L0.261876 21.8271L0.238771 21.6531L0.216734 21.4761L0.195763 21.2958L0.175859 21.112L0.157022 20.9245L0.139252 20.733L0.122549 20.5373L0.106912 20.3369L0.0923421 20.1315L0.0788388 19.9205L0.0664022 19.7035L0.0550322 19.4796L0.044729 19.248L0.0354924 19.0077L0.0273225 18.7571L0.0202193 18.4943L0.0141828 18.2167L0.00921287 17.9203L0.00530965 17.5988L0.0024731 17.2406L0.000703217 16.8195L0 16.2182L0.00036345 15.3384L0.00179357 14.8846L0.00429035 14.5105L0.00785381 14.1789L0.0124839 13.8754L0.0181807 13.5923L0.0249442 13.3252L0.0327743 13.0709L0.0416711 12.8275L0.0516346 12.5933L0.0626647 12.367L0.0747615 12.1479L0.0879251 11.9351L0.102155 11.728L0.117452 11.526L0.133816 11.3288L0.151246 11.136L0.169743 10.9473L0.189307 10.7623L0.209938 10.5809L0.231636 10.4029L0.2544 10.228L0.278232 10.0561L0.30313 9.88702L0.329096 9.72066L0.356128 9.5569L0.384228 9.39561L0.413396 9.2367L0.44363 9.08009L0.474932 8.92568L0.507302 8.77341L0.540739 8.6232L0.575245 8.475L0.610819 8.32873L0.64746 8.18436L0.685171 8.04182L0.72395 7.90107L0.763798 7.76207L0.804716 7.62478L0.846703 7.48916L0.889759 7.35518L0.933887 7.22279L0.979084 7.09198L1.02535 6.96271L1.07269 6.83496L1.12111 6.7087L1.17059 6.5839L1.22115 6.46055L1.27278 6.33863L1.32548 6.21811L1.37926 6.09898L1.43412 5.98121L1.49005 5.8648L1.54706 5.74972L1.60515 5.63597L1.66432 5.52352L1.72456 5.41237L1.78589 5.3025L1.8483 5.1939L1.91179 5.08656L1.97637 4.98048L2.04204 4.87563L2.10879 4.77201L2.17663 4.66961L2.24556 4.56842L2.31559 4.46844L2.3867 4.36966L2.45892 4.27206L2.53223 4.17565L2.60665 4.08042L2.68216 3.98635L2.75878 3.89345L2.83651 3.80171L2.91535 3.71113L2.9953 3.62169L3.07637 3.5334L3.15856 3.44624L3.24187 3.36023L3.32631 3.27534L3.41187 3.19158L3.49857 3.10895L3.58641 3.02743L3.67539 2.94704L3.76552 2.86775L3.8568 2.78958L3.94924 2.71252L4.04284 2.63657L4.13761 2.56171L4.23355 2.48796L4.33067 2.41531L4.42898 2.34376L4.52848 2.2733L4.62919 2.20393L4.7311 2.13565L4.83424 2.06847L4.93859 2.00237L5.04419 1.93736L5.15103 1.87344L5.25912 1.81059L5.36848 1.74884L5.47912 1.68816L5.59105 1.62856L5.70428 1.57004L5.81883 1.51261L5.93471 1.45625L6.05194 1.40096L6.17052 1.34675L6.29049 1.29362L6.41185 1.24156L6.53463 1.19058L6.65885 1.14066L6.78452 1.09182L6.91168 1.04406L7.04034 0.997362L7.17053 0.951738L7.30229 0.907185L7.43563 0.863702L7.5706 0.821289L7.70722 0.779946L7.84553 0.739672L7.98558 0.700467L8.1274 0.662331L8.27104 0.625264L8.41654 0.589265L8.56397 0.554334L8.71337 0.520471L8.86481 0.487676L9.01836 0.455949L9.17409 0.425289L9.33207 0.395697L9.4924 0.367172L9.65516 0.339715L9.82047 0.313324L9.98844 0.288001L10.1592 0.263745L10.3329 0.240555L10.5097 0.218433L10.6897 0.197377L10.8732 0.177389L11.0604 0.158467L11.2516 0.140611L11.447 0.123823L11.647 0.108101L11.852 0.0934464L12.0625 0.0798581L12.279 0.0673366L12.5023 0.0558817L12.7332 0.0454935L12.9728 0.036172L13.2225 0.0279171L13.4842 0.020729L13.7605 0.0146075L14.0552 0.00955264L14.3744 0.00556448L14.7291 0.00264299L15.1433 0.000788159L15.7141 0L16.6191 0.000278509L17.083 0.00162369L17.4615 0.00403553L17.7958 0.00751404L18.1013 0.0120592L18.3858 0.0176711L18.6541 0.0243496L18.9092 0.0320948L19.1535 0.0409066L19.3884 0.0507852L19.6152 0.0617304L19.8349 0.0737423L20.0482 0.0868209L20.2557 0.100966L20.4581 0.116178L20.6556 0.132457L20.8488 0.149802L21.0378 0.168215L21.2231 0.187694L21.4047 0.208239L21.583 0.229852L21.7582 0.252532L21.9303 0.276278L22.0996 0.301092L22.2662 0.326972L22.4301 0.35392L22.5916 0.381935L22.7507 0.411017L22.9075 0.441167L23.0621 0.472384L23.2145 0.504669L23.3649 0.538021L23.5132 0.572442L23.6597 0.60793L23.8042 0.644487L23.9469 0.682112L24.0878 0.720806L24.2269 0.760569L24.3643 0.801402L24.5001 0.843304L24.6342 0.886275L24.7667 0.930317L24.8976 0.97543L25.027 1.02161L25.1549 1.06887L25.2813 1.11719L25.4062 1.16659L25.5296 1.21707L25.6517 1.26861L25.7723 1.32123L25.8916 1.37493L26.0094 1.4297L26.126 1.48554L26.2411 1.54247L26.355 1.60047L26.4675 1.65955L26.5788 1.71971L26.6888 1.78095L26.7975 1.84328L26.9049 1.90668L27.0111 1.97117L27.116 2.03675L27.2198 2.10342L27.3223 2.17117L27.4235 2.24002L27.5236 2.30995L27.6225 2.38099L27.7202 2.45311L27.8167 2.52634L27.912 2.60066L28.0062 2.67609L28.0992 2.75262L28.191 2.83027L28.2817 2.90902L28.3712 2.98888L28.4596 3.06986L28.5468 3.15196L28.6329 3.23518L28.7179 3.31953L28.8018 3.405L28.8845 3.49161L28.9661 3.57936L29.0466 3.66825L29.1259 3.75829L29.2042 3.84948L29.2814 3.94182L29.3574 4.03533L29.4323 4.13L29.5062 4.22585L29.5789 4.32288L29.6506 4.42109L29.7211 4.5205L29.7906 4.62111L29.8589 4.72293L29.9262 4.82596L29.9924 4.93022L30.0575 5.03572L30.1215 5.14246L30.1844 5.25045L30.2463 5.35971L30.307 5.47025L30.3667 5.58208L30.4253 5.69521L30.4828 5.80965L30.5393 5.92542L30.5946 6.04254L30.6489 6.16102L30.7022 6.28087L30.7543 6.40212L30.8054 6.52479L30.8554 6.64889L30.9043 6.77445L30.9522 6.90148L30.9989 7.03003L31.0446 7.1601L31.0893 7.29173L31.1328 7.42494L31.1753 7.55978L31.2168 7.69627L31.2571 7.83444L31.2964 7.97435L31.3346 8.11603L31.3718 8.25952L31.4079 8.40488L31.4429 8.55215L31.4768 8.70139L31.5097 8.85267L31.5415 9.00604L31.5723 9.16159L31.602 9.31939L31.6306 9.47953L31.6581 9.6421L31.6846 9.8072L31.71 9.97496L31.7343 10.1455L31.7576 10.3189L31.7798 10.4955L31.801 10.6752L31.821 10.8584L31.84 11.0453L31.858 11.2362L31.8749 11.4312L31.8907 11.6308L31.9054 11.8354L31.9191 12.0455L31.9317 12.2615L31.9432 12.4842L31.9537 12.7145L31.9631 12.9534L31.9714 13.2022L31.9787 13.4629L31.9849 13.7379L31.9901 14.0309L31.9941 14.3479L31.9971 14.6991L31.9991 15.107L31.9999 15.6536L32 16Z"
                            stroke="#0077D5"
                            strokeWidth="2"
                            mask="url(#path-1-inside-1_4546_34813)"
                          />
                          <path
                            d="M7.95517 18.6011C9.00235 18.6011 9.98671 18.5936 10.9651 18.6011C11.5126 18.6085 11.8103 18.8374 11.8672 19.2742C11.93 19.8218 11.6113 20.1898 11.0145 20.1958C9.89097 20.2092 8.77496 20.2033 7.65148 20.2033C7.32536 20.2033 7.00671 20.2167 6.68059 20.1958C6.27817 20.1748 5.88323 20.0911 5.68875 19.6752C5.49427 19.2593 5.6334 18.8853 5.89669 18.5442C6.96482 17.1859 8.03894 15.8185 9.11455 14.4602C9.17738 14.3764 9.23872 14.2941 9.30155 14.2178C9.23273 14.0996 9.1355 14.155 9.05172 14.149C8.30223 14.1415 7.54676 14.149 6.79877 14.1415C6.62524 14.1415 6.4517 14.1206 6.28565 14.0862C5.89071 13.9964 5.64836 13.6015 5.73812 13.2125C5.80095 12.9492 6.00889 12.7338 6.27218 12.671C6.43824 12.6291 6.61177 12.6081 6.78531 12.6081C8.01949 12.6007 9.26116 12.6007 10.4953 12.6081C10.7167 12.6007 10.9322 12.6291 11.1476 12.6844C11.6188 12.8445 11.8208 13.2813 11.6323 13.7391C11.4662 14.1341 11.2029 14.4736 10.9382 14.8132C10.0301 15.9711 9.12203 17.1215 8.21247 18.266C8.13468 18.3587 8.06587 18.4485 7.95517 18.6011Z"
                            fill="#0077D5"
                          />
                          <path
                            d="M16.0018 14.9547C16.1678 14.7393 16.3414 14.5388 16.6256 14.4835C17.1731 14.3727 17.6863 14.7258 17.6937 15.2808C17.7147 16.6676 17.7072 18.0544 17.6937 19.4411C17.6937 19.8017 17.4574 20.1203 17.1178 20.225C16.7707 20.3567 16.3758 20.2535 16.1469 19.9543C16.0287 19.8091 15.9808 19.7807 15.8148 19.9124C15.1835 20.4255 14.4699 20.5153 13.6995 20.2654C12.4653 19.863 11.9596 18.8996 11.8205 17.7282C11.6754 16.4596 12.0973 15.378 13.2357 14.7123C14.1782 14.1513 15.1341 14.1992 16.0018 14.9547ZM13.5469 17.4859C13.5603 17.7911 13.6576 18.0828 13.8386 18.3251C14.2126 18.8248 14.9277 18.928 15.4333 18.554C15.5171 18.4912 15.5934 18.4149 15.6622 18.3251C16.0512 17.7985 16.0512 16.9309 15.6622 16.4043C15.4677 16.1335 15.1625 15.9749 14.8364 15.9675C14.0735 15.9196 13.5394 16.509 13.5469 17.4859ZM20.8069 17.5278C20.7515 15.7461 21.9229 14.4146 23.5879 14.3653C25.3562 14.3099 26.6457 15.4962 26.7011 17.2286C26.7564 18.9834 25.6823 20.2235 24.0247 20.3911C22.2146 20.5721 20.7785 19.2616 20.8069 17.5278ZM22.5467 17.3617C22.5333 17.7088 22.6365 18.0484 22.8444 18.3326C23.2259 18.8323 23.9395 18.9295 24.4391 18.5406C24.5154 18.4852 24.5783 18.4164 24.6396 18.3461C25.042 17.8195 25.042 16.9309 24.6471 16.4043C24.4526 16.141 24.1474 15.9749 23.8213 15.9675C23.0748 15.9256 22.5467 16.4941 22.5467 17.3617ZM20.1965 16.1485C20.1965 17.2226 20.204 18.2982 20.1965 19.3723C20.204 19.8645 19.8151 20.2744 19.3229 20.2879C19.2391 20.2879 19.1493 20.2804 19.0656 20.2594C18.7185 20.1697 18.4552 19.8017 18.4552 19.3648V13.8521C18.4552 13.526 18.4477 13.2074 18.4552 12.8813C18.4627 12.3472 18.8023 12.0001 19.3154 12.0001C19.842 11.9926 20.1965 12.3397 20.1965 12.8947C20.204 13.9778 20.1965 15.0669 20.1965 16.1485Z"
                            fill="#0077D5"
                          />
                        </svg>
                        <p>Chat với chúng tôi</p>
                      </div>
                      <div
                        className="user-car-button text-white bg-[#0077D5;] p-[10px] md:p-[10px] lg:p-[15px]"
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                      >
                        <p className="text-center w-full">Đăng xuất</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <button
              onClick={() => {
                setIsShowModalLogin(!isShowModalLogin);
              }}
              className="cursor-pointer text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-bold rounded-[10px]"
            >
              Đăng nhập
            </button>
          )}

          {ModalLogin()}

          {/* <div
            id="google-button-wrapper"
            style={{ display: "none", maxWidth: "450px", width: "100%" }}
          ></div>
          <div
            id="login-with-google"
            onClick={() => {
              const googleButtonWrapper = document.querySelector(
                "#google-button-wrapper > div[role='button']"
              );
              (googleButtonWrapper as HTMLElement)?.click();
            }}
            className="custom-google-button"
          ></div> */}
        </nav>
      </nav>
    </div>
  );
};

export default HeaderPage;
