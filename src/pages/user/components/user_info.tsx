import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, RoleName, RoleNameKey } from "../../../utils/constants";
import imagesIocn from "../../../assets/icon/images";
import users from "../../../assets/user.png";
import { isValidEmptyString } from "../../../utils/validate_string";

const AccountInfo: React.FC<any> = () => {
  const [userDetail, setUserDetail] = useState<any>();

  const fetchUserDetail = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}/account/api/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status == "200") {
      setUserDetail(response.data.data[0]);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <section className="rounded-[10px] overflow-hidden">
      <div className="top-account relative">
        <img
          src={imagesIocn.banner}
          alt=""
          className="h-[130px] md:h-[200px] lg:h-[200px]"
        />
        <div className="p-[20px] flex flex-row items-center gap-5 bottom-4 md:bottom-8 lg:bottom-8 absolute  left-0">
          <img
            className="rounded-full cursor-pointer border-[2px] border-white w-[50px] md:w-[60px] lg:w-[70px]"
            src={userDetail && userDetail.photo ? userDetail.photo : users}
            alt="avatar-img"
          />
          <div className="user">
            <div className="flex flex-col items-start gap-1">
              <span className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-medium ">
                {userDetail?.fullName}
              </span>
            </div>
            <p className="text-white text-[14px] font-normal float-left phone-user">
              {userDetail?.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="bot-account bg-white p-[15px] md:p-[15px] lg:p-[20px] sm:p-[40px] flex flex-col gap-[20px]">
        <h3 className="text-lg font-bold text-black">Thông tin cá nhân</h3>
        <hr className="border-t-3 border-dashed border-gray-400" />
        <div className="flex flex-row max-w-[296px]">
          <div className="w-[50%]">
            <p className="text-lg font-normal text-[#797D77]">Họ và tên</p>
          </div>
          <div className="w-[50%]">
            <p className="text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.fullName)
                ? "Chưa cập nhật"
                : userDetail?.fullName}
            </p>
          </div>
        </div>
        <div className="flex flex-row max-w-[296px]">
          <div className="w-[50%]">
            <p className="text-lg font-normal text-[#797D77]">Điện thoại</p>
          </div>
          <div className="w-[50%]">
            <p className="text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.phone)
                ? "Chưa cập nhật"
                : userDetail?.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-row max-w-[296px]">
          <div className="w-[50%]">
            <p className="text-lg font-normal text-[#797D77]">Email</p>
          </div>
          <div className="w-[50%]">
            <p className="text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.email)
                ? "Chưa cập nhật"
                : userDetail?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-row max-w-[296px]">
          <div className="w-[50%]">
            <p className="text-lg font-normal text-[#797D77]">Địa chỉ</p>
          </div>
          <div className="w-[50%]">
            <p className="text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.addressDetail)
                ? "Chưa cập nhật"
                : userDetail?.addressDetail}
            </p>
          </div>
        </div>

        <div className="flex flex-row max-w-[296px]">
          <div className="w-[50%]">
            <p className="text-lg font-normal text-[#797D77]">Loại tài khoản</p>
          </div>
          <div className="w-[50%]">
            <p className="text-lg font-normal text-black">
              {RoleName[userDetail?.roleId.toString() as RoleNameKey]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
