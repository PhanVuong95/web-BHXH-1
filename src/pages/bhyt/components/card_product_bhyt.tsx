import { formatMoneyVND } from "../../../utils/validate_string";
import logo from "../../../assets-src/logo1.png";
import { useNavigate } from "react-router-dom";
import { useModalLogin } from "../../../context/auth_context";
import { motion } from "framer-motion";

interface InsuranceBenefit {
  name: string;
}

interface DataProps {
  name: string;
  monthDuration: number;
  price: number;
  towards: string;
  medicalSupport: string;
  ageLimit: number;
  insuranceBenefits: InsuranceBenefit[];
}

interface CardProductBHYTProps {
  url: string;
  data: DataProps;
}

const CardProductBHYT: React.FC<CardProductBHYTProps> = ({ data }) => {
  const navigate = useNavigate();
  const { setIsShowModalLogin } = useModalLogin();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-[10px] md:p-[20px] lg:p-[30px] bg-white w-full rounded-xl flex flex-col gap-4 border-[1px] border-[#D1D1D6]"
    >
      <div className="flex gap-[10px] items-center">
        <img src={logo} className="w-20 h-20" alt="Logo" />
        <div className="title-product flex flex-col gap-2">
          <h3 className="text-[#0076B7] text-lg font-medium">{data?.name}</h3>
          <span className="text-[#0076B7] text-lg font-bold  flex items-center gap-1">
            {formatMoneyVND(data?.price)} đ
            <samp className="text-[#646464] text-sm font-normal">/</samp>
            <p className="text-[#646464] text-sm font-normal">
              {data?.monthDuration} tháng
            </p>
          </span>
        </div>
      </div>
      <hr className="border-dashed border-[1px] text-[#DEE7FE] " />
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
        <div className="flex flex-col gap-4 w-[100%] md:w-[48%] lg:w-[48%]">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal w-[142px]">
                Dành cho
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold text-right">
                {data?.towards}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal w-[142px]">
                Trợ cấp khám chữa bệnh
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold text-right">
                {data?.medicalSupport}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal w-[142px]">
                Giới hạn tuổi
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold text-right">
                {data?.ageLimit === 0
                  ? "Không giới hạn"
                  : `Trên ${data?.ageLimit} tuổi`}
              </p>
            </div>
          </div>
        </div>

        <div className=" border-dashed border-r-[1px] text-[#DEE7FE] md:min-h-[130px] lg:min-h-[130px]"></div>

        <div className="flex flex-col gap-4 md:w-[48%] lg:w-[48%] mt-4 md:mt-0 lg:mt-0">
          <div>
            <p className="text-[#646464] text-sm font-normal">
              Quyền lợi nổi trội
            </p>
          </div>
          {data?.insuranceBenefits.map((item: InsuranceBenefit) => (
            <div key={item.name} className="flex flex-row w-full gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                    fill="#00BA00"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-normal">
                  {item?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-dashed border-[1px] text-[#DEE7FE] " />
      <div className="flex flex-row items-center gap-[20px] my-2 ">
        <button
          type="button"
          onClick={() => {
            navigate("/introduct-bhyt");
          }}
          className="py-3 px-[20px] md:px-[40px] lg:px-[40px] rounded-lg  text-[15px] font-medium text-[#0076B7] border-[1px] border-[#0077D5]"
        >
          Xem chi tiết
        </button>
        <button
          type="button"
          onClick={() => {
            const token = localStorage.getItem("accessToken");
            if (token) {
              navigate("/register-BHYT", {
                state: { data: data, type: "register" },
              });
            } else {
              setIsShowModalLogin(true);
            }
          }}
          className="py-3 px-[20px] md:px-[40px] lg:px-[40px] rounded-lg border-[1px] border-[#0076B7] bg-[#0076B7] text-[15px] font-medium text-[#fff]"
        >
          Mua ngay
        </button>
      </div>
    </motion.div>
  );
};

export default CardProductBHYT;
