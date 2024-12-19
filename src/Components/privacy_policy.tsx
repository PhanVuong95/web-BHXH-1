import image1 from "../assets-src/dieukhoan/image1.jpg";
import image2 from "../assets-src/dieukhoan/image2.jpg";
import image3 from "../assets-src/dieukhoan/image3.jpg";
import image4 from "../assets-src/dieukhoan/image4.jpg";
import image5 from "../assets-src/dieukhoan/image5.jpg";
import image6 from "../assets-src/dieukhoan/image6.jpg";
import image7 from "../assets-src/dieukhoan/image7.jpg";
import image8 from "../assets-src/dieukhoan/image8.jpg";
import HeaderTitle from "./header_title";
const PrivacyPolicyPage: React.FunctionComponent = () => {
  return (
    <div>
      <HeaderTitle links={[{ title: "Tài liệu Bảo hiểm Xã hội" }]} />
      <div className="mx-3 max-w-[1280px] xl:mx-auto flex flex-col gap-8 my-8 border border-[#B9BDC1] overflow-hidden rounded-lg p-[20px]">
        <img alt="" src={image1} className="w-full" />
        <img alt="" src={image2} className="w-full" />
        <img alt="" src={image3} className="w-full" />
        <img alt="" src={image4} className="w-full" />
        <img alt="" src={image5} className="w-full" />
        <img alt="" src={image6} className="w-full" />
        <img alt="" src={image7} className="w-full" />
        <img alt="" src={image8} className="w-full" />
      </div>
    </div>
  );
};
export default PrivacyPolicyPage;
