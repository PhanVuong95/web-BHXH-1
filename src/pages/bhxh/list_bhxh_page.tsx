import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpecificContext } from "../../components/specific_context";
import logo from "../../assets-src/logo1.png";
import HeaderTitle from "../../components/header_title";
import { useModalLogin } from "../../context/auth_context";
import { motion } from "framer-motion";
import { APP_CONFIG } from "../../utils/constants";

interface Insurance {
  name: string;
  discount: number;
  towards: string;
  supportDiscount: string;
  ageLimit: number;
  insuranceBenefits: { name: string }[];
}

const ListSocialInsurance = () => {
  const specificContext = useContext<any>(SpecificContext);
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const { setInsuranceOrder } = specificContext;
  const navigate = useNavigate();
  const { setIsShowModalLogin } = useModalLogin();

  useEffect(() => {
    axios
      .get(`${APP_CONFIG.BASE_URL}/insurance/api/detail-viewmodel?id=1001`)
      .then((response) => {
        setInsurance(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setInsuranceOrder(() => ({
      id: 0,
      insuranceId: 0,
      accountId: 0,
      citizenId: 0,
      photoCitizenFront: "",
      photoCitizenBack: "",
      phone: "",
      fullName: "",
      email: "",
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      finalPrice: 0,
      addressDetail: "",
      listInsuredPerson: [
        {
          id: 0,
          insuranceProvinceId: 0,
          socialInsuranceNumber: "",
          citizenId: "",
          photoCitizenFront: "",
          photoCitizenBack: "",
          fullName: "",
          doB: "",
          gender: "",
          supportBudget: 0.0,
          wage: 0,
          monthInsured: 0,
          provinceId: 0,
          districtId: 0,
          wardId: 0,
          addressDetail: "",
          ksXaPhuongMa: 0,
          ksQuanHuyenMa: 0,
          ksTinhThanhMa: 0,
          ksDiaChi: "",
          ethnicId: 0,
          medicalProvinceId: 0,
          medicalDistrictId: 0,
          hospitalId: 0,
          vungLuongToiThieuId: 0,
          benefitLevel: "",
        },
      ],
      houseHold: {
        id: 0,
        chuHoTen: "",
        ksProvinceId: 0,
        ksDistrictId: 0,
        ksWardId: 0,
        ksAddressDetail: "",
        hkAddressDetail: "",
        soGiayToCaNhan: "",
        ttProvinceId: 0,
        ttDistrictId: 0,
        ttWardId: 0,
        houseHoldPeoples: [
          {
            id: 0,
            name: "",
            doB: "",
            gender: "",
            ethnicId: 0,
            relationShipId: "",
            citizenId: "",
            ksProvinceId: 0,
            ksDistrictId: 0,
            ksWardId: 0,
            ksAddressDetail: "",
          },
        ],
      },
    }));
  }, [setInsuranceOrder]);

  return (
    <div className="md:pt-6 lg:pt-6">
      <HeaderTitle links={[{ title: "Mua BHXH tự nguyện" }]} />
      <div className="container py-[0px] md:py-[20px] lg:py-[40px] max-w-[1280px] mx-auto">
        <h3 className="title-top-header">Mua BHXH tự nguyện</h3>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col box-shadow-product product-items border-[1px] border-[#D1D1D6]"
        >
          <div className="flex flex-col gap-8">
            <div className="p-4 md:p-5 lg:p-8 bg-white w-full rounded-xl flex flex-col gap-[20px]">
              <div className="flex gap-[10px]">
                <img
                  alt="image logo"
                  src={logo}
                  className="w-[70px] h-[70px]"
                />
                <div className="title-product flex flex-col">
                  <h3 className="text-[#0076B7] text-lg font-medium">
                    {insurance?.name}
                  </h3>
                  <p className="text-[#646464] text-sm font-normal">
                    Theo tháng
                  </p>
                  <span className="text-[#0076B7] text-lg font-bold">
                    {insurance?.discount}
                    <samp className="text-[#646464] text-sm font-normal">
                      %
                    </samp>
                  </span>
                </div>
              </div>

              <hr className="border-dashed border-[1px] text-[#DEE7FE] " />

              <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
                <div className="flex flex-col gap-4 w-[100%] md:w-[48%] lg:w-[48%]">
                  <div className="flex flex-row justify-between w-full">
                    <div>
                      <p className="text-[#646464] text-sm font-normal w-[140px] md:w-[160px] lg:w-[160px] ">
                        Dành cho
                      </p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E] text-sm font-semibold w-[100%] text-right">
                        {insurance?.towards}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between w-full">
                    <div>
                      <p className="text-[#646464] text-sm font-normal w-[140px] md:w-[160px] lg:w-[160px]">
                        Hỗ trợ mức đóng
                      </p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E] text-sm font-semibold w-[100%] text-right">
                        {insurance?.supportDiscount}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between w-full">
                    <div>
                      <p className="text-[#646464] text-sm font-normal w-[140px] md:w-[160px] lg:w-[160px]">
                        Giới hạn tuổi
                      </p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E] text-sm font-semibold w-[100%] text-right">
                        Trên {insurance?.ageLimit} tuổi
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-dashed border-r-[1px] mb-4 md:mb-0 lg:mb-0 md:min-h-[130px] lg:min-h-[130px] text-[#DEE7FE]"></div>
                <div className="flex flex-col gap-4 w-[100%] md:w-[48%] lg:w-[48%]">
                  <div>
                    <p className="text-[#646464] text-sm font-normal">
                      Quyền lợi nổi trội
                    </p>
                  </div>
                  {insurance?.insuranceBenefits.map((item, index) => (
                    <div key={index} className="flex flex-row w-full gap-4">
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
                        <p className="text-[#2E2E2E] text-sm font-normal ">
                          {item.name}
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
                    navigate("/introduct-bhxh");
                  }}
                  className="py-3 px-[15px] md:px-[20px] lg:px-[40px] rounded-lg  text-[15px] font-medium text-[#0076B7] border-[1px] border-[#0077D5]"
                >
                  Xem chi tiết
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const token = localStorage.getItem("accessToken");
                    if (token) {
                      navigate("/register-BHXH");
                    } else {
                      setIsShowModalLogin(true);
                    }
                  }}
                  className="py-3 px-[40px] rounded-lg border-[1px] border-[#0076B7] bg-[#0076B7] text-[15px] font-medium text-[#fff]"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ListSocialInsurance;
