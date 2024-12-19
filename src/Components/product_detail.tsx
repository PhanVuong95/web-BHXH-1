import axios from "axios";
import React, { useState, useEffect } from "react";
import HeaderTitle from "./HeaderTitle";

const ProductDetailPage: React.FunctionComponent = () => {
  const [insurance, setInsurance] = useState<any>();
  const [detailSrcs, setDetailSrcs] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insurance/api/detail-viewmodel?id=1001")
      .then((response) => {
        setInsurance(response.data.data[0]);
        setDetailSrcs(response.data.data[0].info);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="pt-6">
      <HeaderTitle
        links={[
          { title: "Khai báo BHXH tự nguyện" },
          { title: "Giới thiệu BHXH Tự nguyện" },
        ]}
      />
      <div className="relative min-h-screen flex flex-col max-w-[1280px] mx-auto">
        <h3 className="py-8 title-top-header">Giới thiệu BHXH Tự nguyện</h3>
        <div className="p-4 !pt-4 flex-grow pb-20">
          <div className="bg-white flex flex-wrap items-center justify-center min-h-[95vh]">
            {detailSrcs ? (
              <div dangerouslySetInnerHTML={{ __html: detailSrcs }} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="86"
                height="86"
                fill="currentColor"
                className="bi bi-filetype-svg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM0 14.841a1.13 1.13 0 0 0 .401.823q.194.162.478.252.285.091.665.091.507 0 .858-.158.355-.158.54-.44a1.17 1.17 0 0 0 .187-.656q0-.336-.135-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.565-.21l-.621-.144a1 1 0 0 1-.405-.176.37.37 0 0 1-.143-.299q0-.234.184-.384.187-.152.513-.152.214 0 .37.068a.6.6 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.199-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.44 0-.776.15-.337.149-.528.421-.19.273-.19.639 0 .302.123.524t.351.367q.229.143.54.213l.618.144q.31.073.462.193a.39.39 0 0 1 .153.326.5.5 0 0 1-.085.29.56.56 0 0 1-.256.193q-.167.07-.413.07-.176 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zm4.575 1.09h.952l1.327-3.999h-.879l-.887 3.138H5.05l-.897-3.138h-.917zm5.483-3.293q.114.228.14.492h-.776a.8.8 0 0 0-.096-.249.7.7 0 0 0-.17-.19.7.7 0 0 0-.237-.126 1 1 0 0 0-.3-.044q-.427 0-.664.302-.235.3-.235.85v.497q0 .352.097.616a.9.9 0 0 0 .305.413.87.87 0 0 0 .518.146 1 1 0 0 0 .457-.097.67.67 0 0 0 .273-.263q.09-.164.09-.364v-.254h-.823v-.59h1.576v.798q0 .29-.096.55a1.3 1.3 0 0 1-.293.457 1.4 1.4 0 0 1-.495.314q-.296.111-.698.111a2 2 0 0 1-.752-.132 1.45 1.45 0 0 1-.534-.377 1.6 1.6 0 0 1-.319-.58 2.5 2.5 0 0 1-.105-.745v-.507q0-.54.199-.949.202-.406.583-.633.383-.228.926-.228.357 0 .635.1.282.1.48.275.2.176.314.407"
                />
              </svg>
            )}
          </div>
        </div>
        {/* <footer className="bg-white fixed bottom-0 left-0 w-full py-3 ">
          <div className="flex justify-center w-[90%] mx-auto max-w-[1280px] ">
            <Link
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center mb-3"
              type="submit"
              to="/register-BHXH"
            >
              Mua ngay
            </Link>
          </div>
        </footer> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;