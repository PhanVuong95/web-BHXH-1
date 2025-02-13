import imageSuccess from "../../assets-src/image_succes.png";
import { useModalLogin } from "../../context/auth_context";

const VerifyAccountPage = () => {
  const { isShowModalLogin, setIsShowModalLogin } = useModalLogin();

  return (
    <div className="pt-3 md:pt-6 lg:pt-6">
      <div className="container flex flex-col gap-5 justify-center items-center py-[0px] md:py-[20px] lg:py-[40px] max-w-[1280px] mx-auto h-[500px]">
        <img alt="" src={imageSuccess} width={150} height={150} />

        <div className="text-[20px]">Xác thực tài khoản thành công</div>

        <button
          onClick={() => {
            setIsShowModalLogin(!isShowModalLogin);
          }}
          className="cursor-pointer text-[12px] sm:text-[15px] p-[10px] sm:px-[40px] sm:py-[12px] text-white bg-[#0077D5] font-bold rounded-[10px]"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
