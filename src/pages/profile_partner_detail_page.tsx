import axios from "axios";
import { useEffect, useState } from "react";
import users from "../assets/user.png";
import imagesIocn from "../assets/icon/images";
import { User } from "../models";
interface ProfilePartnerDetailPageProps {
  user: User;
  onViewCollaborators1: () => void;
}
const ProfilePartnerDetailPage: React.FC<ProfilePartnerDetailPageProps> = ({
  user,
  onViewCollaborators1,
}) => {
  const [bankInfo, setBankInfo] = useState<any>();

  const fetchBankInfo = async () => {
    const token = localStorage.accessToken;

    try {
      const response = await axios.get(
        `https://baohiem.dion.vn/account/api/get-bank-info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setBankInfo(response.data.data[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);
  return (
    <div className="user-car-button-2">
      <div className="top-account min-h-[200px] relative">
        <img
          src={imagesIocn.banner}
          alt=""
          className="w-full h-full  min-h-[200px]"
        />
        <div className="p-[20px] flex flex-row items-center gap-2 absolute bottom-0 left-0">
          <img
            className="rounded-full avatar-img cursor-pointer border-[2px] border-white"
            src={user && user.photo ? user.photo : users}
            alt="avatar-img"
          />
          <div className="user">
            <div className="flex flex-col items-center gap-1 name-user">
              <span className="text-white font-medium ">{user?.fullName}</span>
            </div>
            <p className="text-[#D1D1D6] text-[14px] font-normal float-right phone-user">
              {user?.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white p-4 rounded-xl mt-5">
          <div className="text-lg font-medium">Thông tin cá nhân</div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] font-normal text-[#797D77]">
              Điện thoại
            </div>
            <div className="ml-4">{user?.phone ? user?.phone : "Chưa rõ"}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl mt-5">
          <div className="text-lg font-medium">Thông tin ngân hàng</div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[230px] font-normal text-[#797D77]">
              Tên ngân hàng
            </div>
            <div className="">
              {bankInfo?.bankName ? bankInfo?.bankName : "Chưa rõ"}
            </div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[120px] font-normal text-[#797D77]">
              Chi nhánh
            </div>
            <div className="">
              {bankInfo?.bankBranch ? bankInfo?.bankBranch : "Chưa rõ"}
            </div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px]  w-[120px] font-normal text-[#797D77] w-30">
              Tên chủ TK
            </div>
            <div className="">
              {bankInfo?.bankOwnerName ? bankInfo?.bankOwnerName : "Chưa rõ"}
            </div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <div className="text-[17px] font-normal mt-5 flex">
            <div className="text-[17px] w-[120px] font-normal text-[#797D77] w-30">
              Số tài khoản
            </div>
            <div className="">
              {bankInfo?.bankOwnerNumber
                ? bankInfo?.bankOwnerNumber
                : "Chưa rõ"}
            </div>
          </div>

          <div className="h-[1px] w-[100%] bg-[#D1D1D6] mt-4"></div>

          <button
            onClick={onViewCollaborators1}
            className="mt-4 border py-3 w-[100%] rounded-full border-[#0544E8]"
          >
            <div className="text-[#0076B7] font-bold text-[16px]">
              Chỉnh sửa
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePartnerDetailPage;
