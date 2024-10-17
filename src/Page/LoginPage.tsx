import { Tabs, Typography } from "antd";
import { EQrCodeType } from "../enums";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../Components/box/FlexBox";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const ACCESS_TOKEN_KEY = "accessToken";

const LoginPage = () => {
  const [clientId, setConnectionIds] = useState<string | null>(null);
  // let loginDeeplink = "";
  const [loginDeeplink, setLoginDeeplink] = useState<any>();

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
      console.log(res);
      if (res.status === "200" && res.message === "SUCCESS" && res.resources) {
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
    )}&${"env=DEVELOPMENT&version=zdev-0eea1ef1"}`;

    setLoginDeeplink(link);
  }, [clientId]);

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
        <Tabs centered style={{ height: "100%", width: 400 }}>
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
          <Tabs.TabPane tab="Đăng nhập bằng tài khoản" key="1">
            <FlexBox
              style={{
                alignItems: "center",
                flexDirection: "column",
                marginTop: 100,
              }}
            ></FlexBox>
          </Tabs.TabPane>
        </Tabs>
      </FlexBox>
    </div>
  );
};

export default LoginPage;
