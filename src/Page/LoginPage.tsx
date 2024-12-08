import { Tabs, Typography } from "antd";
import { EQrCodeType } from "../enums";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../Components/box/FlexBox";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import Swal from "sweetalert2";
import axios from "axios";

export const ACCESS_TOKEN_KEY = "accessToken";

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage = () => {
  const [clientId, setConnectionIds] = useState<string | null>(null);
  // let loginDeeplink = "";
  const [loginDeeplink, setLoginDeeplink] = useState<any>();
  const [loginGoogle, setLoginGoogle] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`wss://baohiem.dion.vn/login-portal`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR Connected.");
        console.log("connection:", connection);
      })
      .catch((err) => console.error("Connection error:", err));

    connection.on("SendConnectionId", (ConnectionId) => {
      setConnectionIds(ConnectionId);
    });

    connection.on("SignIn", (res) => {
      if (res.status == "200" && res.message == "SUCCESS" && res.resources) {
        console.log("SignIn successful:", res);

        const { accessToken, profile } = res.resources;

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", accessToken);

        // Lưu thông tin profile vào localStorage
        localStorage.setItem("profile", JSON.stringify(profile));

        // Lưu token vào cookies
        document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`;

        console.log("Token and profile saved to localStorage and cookies.");

        navigate("/");

        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(clientId);

    const link = `https://zalo.me/s/3118469885204258242/login/portal?state=${btoa(
      JSON.stringify({
        data: {
          body: { clientId },
          pathname: "/my/user/login-portal",
        },
        type: EQrCodeType.LOGIN_PORTAL,
        disableCallback: true,
      })
    )}&${"env=TESTING&version=34"}`;

    setLoginDeeplink(link);
  }, [clientId]);

  // đăng nhập google
  useEffect(() => {
    if (window.google) {
      console.log("Google SDK loaded");
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

      setLoginGoogle(response);

      console.log(loginGoogle);

      const responseData = response.data;

      if (responseData.status == 200 && responseData.message == "SUCCESS") {
        const data = responseData.resources;

        console.log(loginGoogle);

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
          updateLoginStatus(true);
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

  // Hàm cập nhật trạng thái đã đăng nhập
  const updateLoginStatus = (isLoggedIn: boolean) => {
    // Gọi các hàm hoặc thay đổi trạng thái trong ứng dụng
    console.log("User login status:", isLoggedIn);
  };

  return (
    <div className="container mx-auto">
      <FlexBox
        className="login-page"
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          paddingTop: 56,
          paddingBottom: 50,
        }}
      >
        <Tabs
          centered
          style={{ height: "100%", width: "100%", maxWidth: "400px" }}
        >
          <Tabs.TabPane tab="Đăng nhập bằng tài khoản" key="1">
            <FlexBox
              style={{
                alignItems: "center",
                flexDirection: "column",
                marginTop: 100,
              }}
            >
              <div>
                <div
                  id="google-button-wrapper"
                  style={{ display: "block" }}
                ></div>
                <button
                  id="login-with-google"
                  onClick={() => {
                    const googleButtonWrapper = document.querySelector(
                      "#google-button-wrapper > div[role='button']"
                    );
                    (googleButtonWrapper as HTMLElement)?.click();
                  }}
                  className="custom-google-button"
                ></button>
              </div>
            </FlexBox>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng nhập bằng ứng dụng" key="2">
            <FlexBox
              style={{
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <QRCodeCanvas
                size={1000}
                style={{ height: "auto", maxWidth: 300, width: "100%" }}
                value={loginDeeplink}
              />
              <Typography style={{ paddingTop: 20 }}>
                Quét QR code để đăng nhập
              </Typography>
            </FlexBox>
          </Tabs.TabPane>
        </Tabs>
      </FlexBox>
    </div>
  );
};

export default LoginPage;
