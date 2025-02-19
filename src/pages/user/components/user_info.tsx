import { useEffect, useState } from "react";
import axios from "axios";
import { RoleAccount, RoleName, RoleNameKey } from "../../../utils/constants";
import imagesIcon from "../../../assets/icon/images";
import users from "../../../assets/user.png";
import {
  formatDate2,
  isValidEmptyString,
  validUrlImage,
} from "../../../utils/validate_string";
import { useProfile } from "../../../components/user_profile_context";
import iconEdit from "../../../assets/icon/ic_edit.png";
import ModalChangeInfoProfile from "./modal_change_info_profile";
import ModalChangeInfoCTV from "./modal_change_info_ctv";
import ModalChangeEmail from "./modal_change_email";
import ModalChangePhone from "./modal_change_phone";
import ModalVerifyOTPEmail from "./modal_verify_otp_email";
import ModalVerifyOTPPhone from "./modal_verify_otp_phone";
import api from "../../../api/api-config";

const AccountInfo: React.FC<any> = () => {
  const [userDetail, setUserDetail] = useState<any>();
  const { userProfile } = useProfile();

  const [isOpenModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [isOpenModalEditCTV, setOpenModalEditCTV] = useState(false);
  const [isOpenModalEditEmail, setOpenModalEditEmail] = useState(false);
  const [isOpenModalEditPhone, setOpenModalEditPhone] = useState(false);
  const [isOpenModalVerifyOTPEmail, setOpenModalVerifyOTPEmail] =
    useState(false);
  const [isOpenModalVerifyOTPPhone, setOpenModalVerifyOTPPhone] =
    useState(false);

  const [listBanks, setListBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Thông tin cá nhân
  const fetchUserDetail = async () => {
    setIsLoading(true);

    const response = await api.get(`/account/api/get-profile`);

    if (response.data.status == "200") {
      setUserDetail(response.data.data[0]);
      setIsLoading(false);
    }
  };

  // Danh sách ngân hàng
  const fetchListBanks = async () => {
    const response = await axios.get(`https://api.vietqr.io/v2/banks`);
    if (response.data.code == "00") {
      setListBanks(response.data.data);
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchListBanks();
  }, []);

  const contractInfo = () => {
    return (
      <div className="flex flex-col gap-[15px] md:gap-[15px] lg:gap-[20px]">
        <div className="flex justify-between">
          <h3 className="text-md md:text-lg lg:text-lg font-bold text-black">
            Thông tin liên hệ
          </h3>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Email
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.email)
                ? "Chưa cập nhật"
                : userDetail?.email}
            </p>
          </div>

          <button
            onClick={() => {
              setOpenModalEditEmail(true);
            }}
          >
            <img src={iconEdit} width={30} height={30} alt="iconEdit" />
          </button>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Số điện thoại
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.phone)
                ? "Chưa cập nhật"
                : userDetail?.phone}
            </p>
          </div>

          <button
            onClick={() => {
              setOpenModalEditPhone(true);
            }}
          >
            <img src={iconEdit} width={30} height={30} alt="iconEdit" />
          </button>
        </div>

        {/* Modal */}
        {!isLoading && (
          <div>
            {/* Change Email */}
            <ModalChangeEmail
              isShowModal={isOpenModalEditEmail}
              setIsShowModal={(value) => {
                setOpenModalEditEmail(value);
              }}
              setIsShowModalVerifyOTPEmail={(value) => {
                setOpenModalVerifyOTPEmail(value);
              }}
              emailValue={userDetail?.email}
            />

            <ModalVerifyOTPEmail
              isShowModal={isOpenModalVerifyOTPEmail}
              setIsShowModal={(value) => {
                setOpenModalVerifyOTPEmail(value);
              }}
              onSuccess={fetchUserDetail}
            />

            {/* Change Phone */}
            <ModalChangePhone
              isShowModal={isOpenModalEditPhone}
              setIsShowModal={(value) => {
                setOpenModalEditPhone(value);
              }}
              setIsShowModalVerifyOTPPhone={(value) => {
                setOpenModalVerifyOTPPhone(value);
              }}
              phoneValue={userDetail?.phone}
            />

            <ModalVerifyOTPPhone
              isShowModal={isOpenModalVerifyOTPPhone}
              setIsShowModal={(value) => {
                setOpenModalVerifyOTPPhone(value);
              }}
              onSuccess={fetchUserDetail}
            />
          </div>
        )}
      </div>
    );
  };

  const profileInfo = () => {
    return (
      <div className="flex flex-col gap-[15px] md:gap-[15px] lg:gap-[20px] mt-8">
        <div className="flex justify-between">
          <h3 className="text-md md:text-lg lg:text-lg font-bold text-black">
            Thông tin cá nhân
          </h3>

          <button
            onClick={() => {
              setOpenModalEditProfile(true);
            }}
          >
            <img src={iconEdit} width={30} height={30} alt="iconEdit" />
          </button>
        </div>

        <hr className="border-t-3 border-dashed border-gray-400" />
        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Họ và tên
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.fullName)
                ? "Chưa cập nhật"
                : userDetail?.fullName}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Ngày sinh
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.dob)
                ? "Chưa cập nhật"
                : formatDate2(new Date(userDetail.dob))}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              CCCD
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.citizenId)
                ? "Chưa cập nhật"
                : userDetail?.citizenId}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Địa chỉ
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.addressDetail)
                ? "Chưa cập nhật"
                : userDetail?.addressDetail}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Loại tài khoản
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {RoleName[userDetail?.roleId.toString() as RoleNameKey]}
            </p>
          </div>
        </div>

        {!isLoading && (
          <ModalChangeInfoProfile
            isShowModal={isOpenModalEditProfile}
            setIsShowModal={(value) => {
              setOpenModalEditProfile(value);
            }}
            profile={{
              dob: userDetail?.dob,
              addressDetail: userDetail?.addressDetail,
              citizenId: userDetail?.citizenId,
            }}
            onSuccess={fetchUserDetail}
          />
        )}
      </div>
    );
  };

  const infoCTV = () => {
    return (
      <div className="flex flex-col gap-[15px] md:gap-[15px] lg:gap-[20px] mt-8">
        <div className="flex justify-between">
          <h3 className="text-md md:text-lg lg:text-lg font-bold text-black">
            Thông tin CTV
          </h3>

          <button
            onClick={() => {
              setOpenModalEditCTV(true);
            }}
          >
            <img src={iconEdit} width={30} height={30} alt="iconEdit" />
          </button>
        </div>

        <hr className="border-t-3 border-dashed border-gray-400" />

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Tên ngân hàng
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.bankName)
                ? "Chưa cập nhật"
                : userDetail?.bankName}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Chi nhánh
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.bankBranch)
                ? "Chưa cập nhật"
                : userDetail?.bankBranch}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Chủ tài khoản
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.bankOwnerName)
                ? "Chưa cập nhật"
                : userDetail?.bankOwnerName}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-[4] md:flex-[3] lg:flex-[3]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-[#797D77]">
              Số tài khoản
            </p>
          </div>
          <div className="flex-[8] md:flex-[9] lg:flex-[9]">
            <p className="text-[18px] md:text-lg lg:text-lg font-normal text-black">
              {!isValidEmptyString(userDetail?.bankOwnerNumber)
                ? "Chưa cập nhật"
                : userDetail?.bankOwnerNumber}
            </p>
          </div>
        </div>

        {!isLoading && (
          <ModalChangeInfoCTV
            isShowModal={isOpenModalEditCTV}
            listBanks={listBanks}
            setIsShowModal={(value) => {
              setOpenModalEditCTV(value);
            }}
            bankInfo={{
              bankBin: userDetail?.bankBin,
              bankBranch: userDetail?.bankBranch,
              bankNumber: userDetail?.bankOwnerNumber,
              bankOwner: userDetail?.bankOwnerName,
            }}
            onSuccess={fetchUserDetail}
          />
        )}
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <div className="top-account relative">
        <img
          src={imagesIcon.banner}
          alt=""
          className="h-[130px] md:h-[200px] lg:h-[200px]"
        />
        <div className="p-[20px] flex flex-row items-center gap-5 bottom-4 md:bottom-8 lg:bottom-8 absolute  left-0">
          <img
            className="rounded-full cursor-pointer border-[2px] border-white w-[50px] h-[50px] md:w-[60px]  md:h-[60px] lg:w-[70px] lg:h-[70px]"
            src={
              userProfile && userProfile.photo
                ? validUrlImage(userProfile.photo)
                : users
            }
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
    );
  };

  return (
    <section className="rounded-[10px] overflow-hidden">
      {renderBackground()}
      <div className="bot-account bg-white p-[15px] md:p-[15px] lg:p-[20px] sm:p-[40px] ">
        {contractInfo()}
        {profileInfo()}
        {userProfile.roleId == RoleAccount["CTV"] && infoCTV()}
      </div>
    </section>
  );
};

export default AccountInfo;
