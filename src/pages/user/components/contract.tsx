import imagesIocn from "../../../assets/icon/images";

const Contract = () => (
  <div className="flex flex-col items-center justify-center gap-4 w-full p-[40px]">
    <div>
      <img src={imagesIocn.lienhe} alt="" />
    </div>
    <h2 className="text-black text-[20px] font-bold">Chat với chúng tôi</h2>
    <p className="text-black text-[18px] font-normal text-center">
      Kết nối với chúng tôi qua <br />
      Zalo: 1900123456
    </p>
  </div>
);

export default Contract;
