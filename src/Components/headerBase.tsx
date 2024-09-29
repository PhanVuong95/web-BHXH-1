import backgroundHeader from "../assets-src/image_header.png";
import logo from "../assets-src/logo.png";
import back from "../assets-src/back.png";
import { useNavigate } from "react-router-dom";

interface Props {
  isHome?: boolean;
  title?: string;
  onClose?: () => void;
  onActions?: () => void;
  onBack?: () => void;
}

const HeaderBase = (props: Props) => {
  const { isHome, title, onBack } = props;
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-10 p-0 container mx-auto">
      <img src={backgroundHeader} />
      <div className="absolute z-10 top-[50%] flex left-4 right-4 justify-between items-center">
        <div className="flex">
          <div>
            {isHome ? (
              <img src={logo} className="w-7 h-7" />
            ) : (
              <button
                type="button"
                onClick={onBack ? onBack : () => navigate(-1)}
              >
                <img src={back} className="w-7 h-7" />
              </button>
            )}
          </div>
          <div className="text-[#ffffff] items-center ml-3 font-medium text-lg line-clamp-1">
            {isHome ? "Bảo hiểm Việt" : title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBase;
