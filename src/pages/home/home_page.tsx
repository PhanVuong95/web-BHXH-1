import { Link } from "react-router-dom";
import banner from "@/assets/banner-2.png";
import { toast } from "react-toastify";
import CardNewHome from "./components/card_new_home";
import { useEffect, useState } from "react";
import { Post } from "../../models";
import { APP_CONFIG } from "../../utils/constants";

console.log(__CONFIG_APP__);

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${APP_CONFIG.BASE_URL}/post/api/listPaging-post?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        const jsonData = await response.json();

        const data = jsonData.data?.[0] || [];
        setPosts(data);

        // Giả sử API trả về số tổng trang
        setTotalPages(5); // Cập nhật số trang giả lập (nếu API không trả về, sửa lại)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [pageIndex]);

  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex > 0 && newPageIndex <= totalPages) {
      setPageIndex(newPageIndex);
    }
  };

  return (
    <div className=" bg-white">
      <div className="home-page bg-white">
        <div className="banner-top  h-full relative">
          <img alt="" src={banner} />
          <div className="flex justify-between items-center user-home mx-auto container absolute top-[40%] md:top-[52%] lg:top-[40%] ">
            <div
              className="flex flex-col gap-4 lg:gap-8 items-start"
              data-aos="zoom-in"
            >
              <p className="text-white font-semibold text-md md:text-lg lg:text-2xl">
                Tham gia <br /> bảo hiểm xã hội tự nguyện
              </p>
              <p className="text-white font-light text-sm md:text-sm lg:text-lg md:w-[50%] ">
                DNP Điểm Thu BHXH là nền tảng hỗ trợ nộp bảo hiểm xã hội tự
                nguyện, bảo hiểm y tế trực tuyến, giúp bạn dễ dàng quản lý và
                đóng BHXH, BHYT mọi lúc, mọi nơi. Chúng tôi cam kết mang đến sự
                tiện lợi, minh bạch và an toàn trong từng giao dịch. Đồng hành
                cùng bạn trong việc xây dựng tương lai bền vững.
              </p>
              <button className="flex px-[15px] md:px-[18px] py-[10px] md:py-[12px] text-sm md:text-md justify-center items-center gap-[10px] rounded-[10px] border-[1px] border-[solid] border-[#0076b7] bg-[#fff]">
                Xem ngay
              </button>
            </div>
          </div>
        </div>
        <div className="main-category-home">
          <div className="container flex flex-col justify-between items-center category-home gap-y-[30px] md:gap-y-[40px] lg:gap-y-[60px]  py-[30px] md:py-[40px] lg:py-[60px]  px-[15px] max-w-[1280px] mx-auto">
            <div className="title">
              <div className="text-[#2B2B2B] text-[24px] md:text-[28px] lg:text-[32px] font-semibold md:font-bold lg:font-extrabold">
                Tính năng nổi bật
              </div>
            </div>
            <div
              data-aos="zoom-out-down"
              className="flex flex-wrap items-center w-full gap-[20px] justify-evenly md:justify-center lg:justify-between"
            >
              <Link to="/social-insurance">
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="42"
                        viewBox="0 0 35 42"
                        fill="none"
                      >
                        <path
                          d="M32.6664 0H11.6166C11.1988 0 10.8118 0.174154 10.54 0.445312C10.5395 0.445801 10.5389 0.446208 10.5384 0.446696L0.59904 10.3863C0.598551 10.3868 0.598145 10.3873 0.597656 10.3879C0.309163 10.677 0.152344 11.0742 0.152344 11.4645V40.1423C0.152344 40.9842 0.834879 41.6667 1.67676 41.6667H32.6665C33.5084 41.6667 34.1909 40.9842 34.1909 40.1423V1.52441C34.1908 0.682536 33.5083 0 32.6664 0ZM10.698 16.2824H23.6449C24.4868 16.2824 25.1694 16.9649 25.1694 17.8068C25.1694 18.6487 24.4868 19.3312 23.6449 19.3312H10.698C9.85612 19.3312 9.17358 18.6487 9.17358 17.8068C9.17358 16.9649 9.85612 16.2824 10.698 16.2824ZM10.0922 5.20459V9.94002H5.35677L10.0922 5.20459ZM26.0723 32.3001H8.27067C7.42879 32.3001 6.74626 31.6176 6.74626 30.7757C6.74626 29.9338 7.42879 29.2513 8.27067 29.2513H26.0723C26.9141 29.2513 27.5967 29.9338 27.5967 30.7757C27.5967 31.6176 26.9141 32.3001 26.0723 32.3001ZM26.0723 26.9609H8.27067C7.42879 26.9609 6.74626 26.2783 6.74626 25.4364C6.74626 24.5946 7.42879 23.912 8.27067 23.912H26.0723C26.9141 23.912 27.5967 24.5946 27.5967 25.4364C27.5967 26.2783 26.9141 26.9609 26.0723 26.9609Z"
                          fill="#0077D5"
                        />
                      </svg>
                    </div>
                    <p className="content">
                      Khai báo Bảo hiểm Xã hội tự nguyện
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/health-insurance">
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="42"
                        viewBox="0 0 40 42"
                        fill="none"
                      >
                        <path
                          d="M36.8578 0.00012207H10.1374C8.6589 0.00012207 7.44922 1.2098 7.44922 2.68829V38.9786C7.44922 40.4571 8.6589 41.6668 10.1374 41.6668H36.8578C38.3363 41.6668 39.546 40.4571 39.546 38.9786V2.68829C39.546 1.2098 38.3498 0.00012207 36.8578 0.00012207ZM13.5245 15.9679C14.3712 15.5915 15.3659 15.9947 15.7288 16.8415C16.0111 17.4867 16.6562 17.863 17.3551 17.8093C17.8793 17.7286 18.0137 17.4329 18.054 17.191C18.0809 17.0431 18.1078 16.5727 17.6239 16.3173L14.8954 14.906C13.2422 14.0593 12.3686 12.2582 12.718 10.4302C13.0137 8.83076 14.1427 7.62108 15.6481 7.21786V6.96248C15.6481 6.03506 16.4008 5.28237 17.3282 5.28237C18.2556 5.28237 19.0083 6.03506 19.0083 6.96248V7.58077C20.0567 8.09152 20.917 8.93829 21.4008 10.0539C21.7772 10.9007 21.3874 11.8953 20.5271 12.2716C19.6804 12.6345 18.6858 12.2582 18.3094 11.398C18.0272 10.7528 17.3686 10.3765 16.6831 10.4302C16.1723 10.484 16.0379 10.8469 15.9976 11.0485C15.9573 11.2232 15.9438 11.6802 16.4142 11.9222L19.1427 13.3335C20.7691 14.1668 21.6428 15.9007 21.3471 17.7152C21.1186 19.1399 20.2315 20.2555 18.9815 20.8066V21.1695C18.9815 22.0969 18.2288 22.8496 17.3014 22.8496C16.3739 22.8496 15.6212 22.0969 15.6212 21.1695V20.9141C14.304 20.484 13.2019 19.5028 12.6239 18.1856C12.2745 17.3254 12.6643 16.3308 13.5245 15.9679ZM24.7476 36.3845H14.667C13.7395 36.3845 12.9868 35.6319 12.9868 34.7044C12.9868 33.777 13.7395 33.0243 14.667 33.0243H24.7476C25.675 33.0243 26.4277 33.777 26.4277 34.7044C26.4277 35.6319 25.675 36.3845 24.7476 36.3845ZM32.8121 29.6641H14.667C13.7395 29.6641 12.9868 28.9114 12.9868 27.984C12.9868 27.0566 13.7395 26.3039 14.667 26.3039H32.8121C33.7395 26.3039 34.4922 27.0566 34.4922 27.984C34.4922 28.9114 33.7395 29.6641 32.8121 29.6641ZM32.8121 22.863H26.2664C25.339 22.863 24.5863 22.1103 24.5863 21.1829C24.5863 20.2555 25.339 19.5028 26.2664 19.5028H32.8121C33.7395 19.5028 34.4922 20.2555 34.4922 21.1829C34.4922 22.1103 33.7395 22.863 32.8121 22.863ZM32.8121 16.2233H26.2664C25.339 16.2233 24.5863 15.4706 24.5863 14.5431C24.5863 13.6157 25.339 12.863 26.2664 12.863H32.8121C33.7395 12.863 34.4922 13.6157 34.4922 14.5431C34.4922 15.4706 33.7395 16.2233 32.8121 16.2233ZM32.8121 9.50282H26.2664C25.339 9.50282 24.5863 8.75013 24.5863 7.82271C24.5863 6.89529 25.339 6.14261 26.2664 6.14261H32.8121C33.7395 6.14261 34.4922 6.89529 34.4922 7.82271C34.4922 8.75013 33.7395 9.50282 32.8121 9.50282Z"
                          fill="#0077D5"
                        />
                        <path
                          d="M2.54339 3.34741C1.61597 3.34741 0.863281 4.1001 0.863281 5.02752V36.6404C0.863281 37.5678 1.61597 38.3205 2.54339 38.3205C3.47081 38.3205 4.2235 37.5678 4.2235 36.6404V5.02752C4.2235 4.1001 3.47081 3.34741 2.54339 3.34741Z"
                          fill="#0077D5"
                        />
                      </svg>
                    </div>
                    <p className="content">Mua Bảo hiểm Y tế tự nguyện</p>
                  </div>
                </div>
              </Link>

              <Link to="luckup-bhxh">
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_4436_39802)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.7445 0.575684C6.25499 0.575684 0.183594 6.64708 0.183594 14.1366C0.183594 21.6261 6.25499 27.6974 13.7445 27.6974C21.234 27.6974 27.3054 21.6261 27.3054 14.1366C27.3054 6.64708 21.234 0.575684 13.7445 0.575684ZM31.583 31.8412C30.8285 32.6091 29.5872 32.62 28.8193 31.8655L23.3987 26.539C24.4299 25.7351 25.358 24.8054 26.1605 23.773L31.5588 29.0775C32.3267 29.832 32.3376 31.0733 31.583 31.8412ZM13.7445 4.35139C19.1487 4.35139 23.5296 8.73236 23.5296 14.1365C23.5296 19.5406 19.1486 23.9216 13.7445 23.9216C8.34027 23.9216 3.95936 19.5406 3.95936 14.1365C3.95936 8.73236 8.34033 4.35139 13.7445 4.35139Z"
                            fill="#0077D5"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4436_39802">
                            <rect
                              width="31.9583"
                              height="31.9583"
                              fill="white"
                              transform="translate(0.183594 0.520874)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="content">Tra cứu Bảo hiểm Xã hội</p>
                  </div>
                </div>
              </Link>

              <Link
                to=""
                onClick={async () => {
                  // await openUrlInWebview()
                  toast.info("Tính năng này đang phát triển");
                }}
                // onClick={handleClick}
              >
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="42"
                        viewBox="0 0 43 42"
                        fill="none"
                      >
                        <path
                          d="M13.5398 26.8884C13.4561 26.6371 13.2287 26.4696 12.9654 26.4696H10.0337C4.85227 26.4696 0.664062 30.6697 0.664062 35.8392V40.0035C0.664062 40.7693 1.28631 41.4035 2.06412 41.4035H17.4528C17.8596 41.4035 18.1468 41.0086 18.0272 40.6257L13.5398 26.8884ZM32.9492 26.4815H30.0294C29.7661 26.4815 29.5387 26.6491 29.455 26.9004L24.9796 40.6257C24.848 41.0086 25.1471 41.4035 25.554 41.4035H40.9307C41.6965 41.4035 42.3307 40.7813 42.3307 40.0035V35.8392C42.3188 30.6697 38.1306 26.4815 32.9492 26.4815ZM32.997 11.4997C32.997 5.14563 27.8515 0.00012207 21.4974 0.00012207C15.1433 0.00012207 9.99778 5.14563 9.99778 11.4997C9.99778 17.8538 15.1433 22.9994 21.4974 22.9994C27.8515 22.9874 32.997 17.8419 32.997 11.4997Z"
                          fill="#0077D5"
                        />
                        <path
                          d="M21.4981 26.8049C20.5049 26.8049 19.7031 27.6067 19.7031 28.5999V38.1729C19.7031 39.1661 20.5049 39.9679 21.4981 39.9679C22.4913 39.9679 23.293 39.1661 23.293 38.1729V28.5999C23.293 27.6067 22.4913 26.8049 21.4981 26.8049Z"
                          fill="#0077D5"
                        />
                      </svg>
                    </div>
                    <p className="content">Điều chỉnh Bảo hiểm Xã hội</p>
                  </div>
                </div>
              </Link>

              <Link
                to=""
                onClick={async () => {
                  // await openUrlInWebview()
                  toast.info("Tính năng này đang phát triển");
                }}
              >
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="34"
                        viewBox="0 0 42 34"
                        fill="none"
                      >
                        <path
                          d="M34.1121 19.427L31.6466 16.527C30.0609 14.6589 30.2998 13.1275 30.365 10.6946C30.3759 10.195 30.05 9.74971 29.5722 9.60851L26.7157 8.79393C26.1292 8.63101 25.5101 8.96771 25.3689 9.55421C24.891 11.6178 23.1858 13.5728 21.1548 13.5728C19.1129 13.5728 17.4077 11.6504 16.9407 9.60851C16.8103 9.02201 16.1913 8.68532 15.6156 8.83737L12.7266 9.60851C12.2378 9.73885 11.9011 10.195 11.9228 10.6946C11.988 12.9537 12.1944 14.7024 10.6412 16.5379L8.1649 19.4704C7.02448 20.8172 6.39453 22.5332 6.39453 24.3036V30.4618C6.39453 32.167 7.78476 33.5573 9.48995 33.5573H32.7653C34.5139 33.5573 35.9368 32.1345 35.9368 30.3858V24.3796C35.9368 22.5767 35.2851 20.8172 34.1121 19.427ZM21.1656 28.1267C18.2223 28.1267 15.8328 25.7373 15.8328 22.7939C15.8328 19.8505 18.2223 17.4611 21.1656 17.4611C24.109 17.4611 26.4985 19.8505 26.4985 22.7939C26.4985 25.7373 24.109 28.1267 21.1656 28.1267Z"
                          fill="#0077D5"
                        />
                        <path
                          d="M40.3999 6.00287C36.3922 2.66851 28.9523 0.333374 21.1649 0.333374C13.3775 0.333374 5.92673 2.66851 1.92984 6.00287C0.561341 7.14329 -0.30754 10.7818 0.919765 13.1821C1.81038 14.9198 2.87476 15.6584 4.76459 15.0828L7.91432 13.7903C9.15249 13.4753 9.45659 12.6716 9.19593 11.2814C8.62029 8.20768 9.47832 7.23018 12.237 6.52421C14.8111 5.87254 18.3844 5.79651 21.154 5.79651C23.9236 5.79651 27.4969 5.87254 30.071 6.52421C32.8297 7.23018 33.6877 8.20768 33.1121 11.2814C32.8514 12.6825 33.1664 13.4753 34.3937 13.7903L37.5434 15.0828C39.4333 15.6584 40.4868 14.9198 41.3883 13.1821C42.6482 10.7926 41.7793 7.14329 40.3999 6.00287Z"
                          fill="#0077D5"
                        />
                      </svg>
                    </div>
                    <p className="content">Liên hệ với chúng tôi</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/privacy_policy"
                // onClick={() => {
                //   toast.info("Tính năng này đang phát triển");
                // }}
              >
                <div className="items-icon">
                  <div className="items-icon-in">
                    <div className="icon-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="33"
                        viewBox="0 0 42 33"
                        fill="none"
                      >
                        <path
                          d="M2.1606 10.0726C0.970121 10.0726 -0.00390625 11.0467 -0.00390625 12.2371V30.6354C-0.00390625 31.8259 0.970121 32.7999 2.1606 32.7999C3.35108 32.7999 4.3251 31.8259 4.3251 30.6354V12.2371C4.3251 11.0467 3.35108 10.0726 2.1606 10.0726Z"
                          fill="#0077D5"
                        />
                        <path
                          d="M39.4988 0.333374H9.19575C8.00528 0.333374 7.03125 1.33988 7.03125 2.57364V32.8009H37.3343C39.7261 32.8009 41.6633 30.7988 41.6633 28.3204V2.57364C41.6633 1.33988 40.6893 0.333374 39.4988 0.333374ZM26.5118 6.82689C26.5118 6.23165 26.9988 5.74463 27.594 5.74463H34.0876C34.6828 5.74463 35.1698 6.23165 35.1698 6.82689V13.3204C35.1698 13.9156 34.6828 14.4027 34.0876 14.4027H27.594C26.9988 14.4027 26.5118 13.9156 26.5118 13.3204V6.82689ZM14.0659 7.09745H20.5594C21.3062 7.09745 21.9122 7.70351 21.9122 8.45027C21.9122 9.19702 21.3062 9.80308 20.5594 9.80308H14.0659C13.3191 9.80308 12.7131 9.19702 12.7131 8.45027C12.7131 7.70351 13.3191 7.09745 14.0659 7.09745ZM14.0659 12.5087H20.5594C21.3062 12.5087 21.9122 13.1148 21.9122 13.8615C21.9122 14.6083 21.3062 15.2143 20.5594 15.2143H14.0659C13.3191 15.2143 12.7131 14.6083 12.7131 13.8615C12.7131 13.1148 13.3191 12.5087 14.0659 12.5087ZM34.6287 26.0369H14.0659C13.3191 26.0369 12.7131 25.4308 12.7131 24.684C12.7131 23.9373 13.3191 23.3312 14.0659 23.3312H34.6287C35.3754 23.3312 35.9815 23.9373 35.9815 24.684C35.9815 25.4308 35.3754 26.0369 34.6287 26.0369ZM34.6287 20.6256H14.0659C13.3191 20.6256 12.7131 20.0195 12.7131 19.2728C12.7131 18.526 13.3191 17.92 14.0659 17.92H34.6287C35.3754 17.92 35.9815 18.526 35.9815 19.2728C35.9815 20.0195 35.3754 20.6256 34.6287 20.6256Z"
                          fill="#0077D5"
                        />
                      </svg>
                    </div>
                    <p className="content">Tài liệu Bảo hiểm Xã hội</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-10 px-[15px] slider-items-products max-w-[1280px] mx-auto container">
          <div className="slider-items">
            <h3 className="text-base sm:text-[32px] font-bold">
              Tin tức mới nhất
            </h3>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[25px]">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <CardNewHome
                    key={`CardNewPages_${index}`}
                    post={post}
                    index={index + 1}
                  />
                ))
              ) : (
                <p>Không có bài đăng nào.</p>
              )}
            </div>
            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                gap: "20px",
              }}
            >
              <button
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={pageIndex === 1}
                style={{ margin: "0 5px" }}
              >
                {"<"}
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    fontSize: "14px",
                    fontWeight: "lighter",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pageIndex === i + 1 ? "#0077D5" : "white",
                    color: pageIndex === i + 1 ? "white" : "black",
                    cursor: "pointer",
                    borderRadius: "32px",
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={pageIndex === totalPages}
                style={{ margin: "0 5px" }}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
