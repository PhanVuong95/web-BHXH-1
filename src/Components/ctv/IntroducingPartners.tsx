import { useEffect, useRef, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import imagesIocn from "../../assets/icon/images";

const IntroducingPartnersPage = () => {
  const [linkQRCode, setLinkQRCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const getQrIntroduction = async () => {
    const token = localStorage.accessToken;
    try {
      const response = await axios.get(
        `https://baohiem.dion.vn/account/api/get-contributor-code?type=web`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLinkQRCode(response.data.resources.url);
      setCode(response.data.resources.referrerCode);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setLinkQRCode("400");
    }
  };

  console.log(linkQRCode);

  useEffect(() => {
    getQrIntroduction();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  const handleDownload = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "QRCode.png";
      link.click();
    }
  };

  //   const onDownloadingQRCode = async () => {
  //     setLoadingDownload(true);

  //     html2canvas(qrCodeRef.current as HTMLElement, {
  //       allowTaint: true,
  //       useCORS: true,
  //     }).then((canvas) => {
  //       // Convert canvas to image
  //       const imageURL = canvas.toDataURL("image/png"); // Change "imagepng" to "image/png"
  //       // Save the image to gallery

  //       saveImageToGallery({
  //         imageUrl: imageURL,
  //         success: () => {
  //           setLoadingDownload(false);
  //           toast.success("Lưu ảnh QR Code thành công!");
  //         },
  //         fail: (error) => {
  //           // Handle failur
  //           toast.warn(
  //             "Lưu ảnh không thành công. Vui lòng chụp ảnh màn hình đơn!"
  //           );
  //         },
  //       });
  //     });
  //   };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold">Mã Cộng tác viên Zalo min app</h3>

        <input
          type="text"
          value={code}
          className="ant-input css-dev-only-do-not-override-qnu6hi ant-input-outlined border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darks:bg-gray-700 darks:border-gray-600 darks:placeholder-gray-400 darks:text-white darks:focus:ring-blue-500 darks:focus:border-blue-500"
        />

        <div className="flex w-full justify-between gap-10">
          <div
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast.success("Coppy đường dẫn thành công!");
            }}
            className="flex justify-center items-center gap-2 p-2 bg-white rounded-lg w-[100%] border-[1px] border-[#D1D1D6]"
          >
            <div className="w-[33px] h-[33px] flex items-center justify-center border-[1px] border-[#0077d5] rounded-xl">
              <img src={imagesIocn.coppy} className="w-[18px]" alt="" />
            </div>
            <div>Copy Mã Cộng tác viên</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold">Mã Cộng tác viên Zalo min app</h3>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="rounded-lg p-8 bg-[#EFEFEF] items-center justify-center flex">
            {linkQRCode != "400" ? (
              <div className="items-center w-full flex flex-col justify-center">
                <div ref={qrCodeRef}>
                  <QRCode
                    size={360}
                    className="w-[300px] h-[300px]"
                    value={linkQRCode}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            ) : (
              <div className="text-[17px] font-medium">
                Không lấy được QR code!
              </div>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Tải xuống QR Code
          </button>
        </div>

        <div className="flex w-full justify-between gap-10">
          <div
            onClick={() => {
              navigator.clipboard.writeText(linkQRCode);
              toast.success("Coppy đường dẫn thành công!");
            }}
            className="flex justify-center items-center gap-2 p-2 bg-white rounded-lg w-[100%] border-[1px] border-[#D1D1D6]"
          >
            <div className="w-[33px] h-[33px] flex items-center justify-center border-[1px] border-[#0077d5] rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <g>
                  <path
                    d="M11.6016 9.07812C10.7911 9.07812 10.0768 9.47682 9.62825 10.0831L5.74973 8.09714C5.81412 7.87765 5.85938 7.65018 5.85938 7.41016C5.85938 7.0846 5.79263 6.7751 5.67732 6.49042L9.73636 4.04786C10.1881 4.578 10.852 4.92188 11.6016 4.92188C12.9586 4.92188 14.0625 3.81798 14.0625 2.46094C14.0625 1.10389 12.9586 0 11.6016 0C10.2445 0 9.14062 1.10389 9.14062 2.46094C9.14062 2.77367 9.20502 3.07032 9.31185 3.34573L5.24072 5.79545C4.78939 5.28106 4.135 4.94922 3.39844 4.94922C2.04139 4.94922 0.9375 6.05311 0.9375 7.41016C0.9375 8.7672 2.04139 9.87109 3.39844 9.87109C4.2223 9.87109 4.94858 9.46069 5.39549 8.83734L9.26124 10.8169C9.19004 11.0467 9.14062 11.2861 9.14062 11.5391C9.14062 12.8961 10.2445 14 11.6016 14C12.9586 14 14.0625 12.8961 14.0625 11.5391C14.0625 10.182 12.9586 9.07812 11.6016 9.07812Z"
                    fill="#0076B7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4580_55475">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>Copy link</div>
          </div>

          <div className="flex justify-center items-center gap-2 p-2 bg-white rounded-lg w-[100%] border-[1px] border-[#D1D1D6]">
            <div className="w-[33px] h-[33px] flex items-center justify-center border-[1px] border-[#0077d5] rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="10"
                viewBox="0 0 21 10"
                fill="none"
              >
                <path
                  d="M2.34604 7.38534C3.38813 7.38534 4.36769 7.37789 5.3413 7.38534C5.88617 7.39278 6.18242 7.62055 6.23899 8.05525C6.30152 8.60012 5.98442 8.96634 5.39043 8.9723C4.27242 8.98569 3.16184 8.97974 2.04383 8.97974C1.71929 8.97974 1.4022 8.99314 1.07766 8.9723C0.6772 8.95145 0.284183 8.86809 0.0906516 8.45423C-0.10288 8.04037 0.035569 7.66819 0.297581 7.32877C1.36051 5.97703 2.4294 4.61635 3.49978 3.26461C3.5623 3.18124 3.62334 3.09937 3.68587 3.02344C3.61739 2.90583 3.52062 2.96092 3.43725 2.95496C2.69141 2.94752 1.93962 2.95496 1.19527 2.94752C1.02258 2.94752 0.849889 2.92668 0.684643 2.89244C0.291626 2.80311 0.0504564 2.4101 0.139779 2.02303C0.202304 1.76102 0.409234 1.54665 0.671245 1.48412C0.836491 1.44244 1.00918 1.4216 1.18187 1.4216C2.41005 1.41415 3.64567 1.41415 4.87385 1.4216C5.09418 1.41415 5.30855 1.44244 5.52293 1.49752C5.99187 1.65681 6.19284 2.09151 6.00526 2.54706C5.84002 2.94007 5.57801 3.27801 5.31451 3.61595C4.41086 4.7682 3.50722 5.91301 2.60209 7.05187C2.52468 7.14417 2.4562 7.23349 2.34604 7.38534Z"
                  fill="#0076B7"
                />
                <path
                  d="M10.3524 3.75671C10.5176 3.54234 10.6903 3.34285 10.9732 3.28777C11.5181 3.17761 12.0287 3.52894 12.0361 4.08125C12.057 5.46127 12.0495 6.8413 12.0361 8.22133C12.0361 8.58011 11.8009 8.8972 11.463 9.00141C11.1176 9.13241 10.7246 9.02969 10.4968 8.73195C10.3792 8.58755 10.3316 8.55926 10.1663 8.69027C9.53808 9.2009 8.82797 9.29022 8.06129 9.0416C6.83311 8.64114 6.32993 7.68242 6.19148 6.51677C6.04707 5.25435 6.46689 4.17801 7.59979 3.51554C8.53767 2.95728 9.48895 3.00492 10.3524 3.75671ZM7.90944 6.27559C7.92284 6.57929 8.0196 6.86959 8.19974 7.11076C8.57191 7.60798 9.28351 7.7107 9.78669 7.33853C9.87006 7.276 9.94598 7.20008 10.0145 7.11076C10.4015 6.58673 10.4015 5.72329 10.0145 5.19926C9.82093 4.92981 9.51724 4.77201 9.1927 4.76456C8.43346 4.71692 7.902 5.30347 7.90944 6.27559ZM15.1341 6.31728C15.079 4.54423 16.2447 3.21929 17.9016 3.17016C19.6613 3.11508 20.9445 4.29562 20.9996 6.01954C21.0547 7.76579 19.9858 8.99992 18.3363 9.16665C16.535 9.34679 15.1058 8.04268 15.1341 6.31728ZM16.8655 6.15203C16.8521 6.49741 16.9548 6.83535 17.1617 7.1182C17.5413 7.61543 18.2515 7.71219 18.7487 7.32513C18.8246 7.27005 18.8871 7.20157 18.9482 7.1316C19.3486 6.60757 19.3486 5.72329 18.9556 5.19926C18.7621 4.93725 18.4584 4.77201 18.1338 4.76456C17.391 4.72288 16.8655 5.28859 16.8655 6.15203ZM14.5267 4.94469C14.5267 6.01358 14.5342 7.08396 14.5267 8.15285C14.5342 8.64263 14.1471 9.05054 13.6573 9.06393C13.574 9.06393 13.4846 9.05649 13.4013 9.03565C13.0559 8.94633 12.7939 8.5801 12.7939 8.1454V2.65954C12.7939 2.335 12.7864 2.01791 12.7939 1.69337C12.8013 1.1619 13.1392 0.816524 13.6499 0.816524C14.1739 0.809081 14.5267 1.15446 14.5267 1.70677C14.5342 2.78459 14.5267 3.86836 14.5267 4.94469Z"
                  fill="#0076B7"
                />
              </svg>
            </div>
            <div>Chia sẻ Zalo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducingPartnersPage;
