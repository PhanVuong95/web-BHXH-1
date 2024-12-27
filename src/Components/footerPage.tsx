import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <div className="bg-[#0077D5]">
      <div className="container mx-auto py-[60px]">
        <div className="footer-top flex items-center justify-between flex-wrap gap-[20px] max-w-[1280px] mx-auto">
          <div className="footer-top-1 footer-top-col">
            <div className="logo-footer">
              <Link
                to={"/"}
                className="text-[24px] font-semibold flex items-center gap-3 text-white logo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 51 52"
                  fill="none"
                  style={{
                    height: "108px",
                    width: "100px",
                  }}
                >
                  <g clipPath="url(#clip0_3962_33958)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.4689 0.52594C39.5422 0.52594 50.9481 11.9319 50.9481 25.9948C50.9481 40.0577 39.5422 51.4741 25.4689 51.4741C11.3956 51.4741 0 40.0681 0 25.9948C0 11.9216 11.406 0.52594 25.4689 0.52594Z"
                      fill="#0077D5"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.3427 36.6419C14.3635 36.6316 14.3842 36.6212 14.405 36.6212C16.5222 35.739 18.5356 37.5241 21.8567 36.5797C22.2615 36.4551 22.6455 36.2891 23.0088 36.0815V42.8483C24.7005 42.8483 26.195 42.8898 27.8763 42.8898V36.0192C28.1254 36.1541 28.3952 36.2683 28.6651 36.3721C31.9343 37.4515 34.0204 35.7701 36.0961 36.7353C36.1376 36.7457 36.1583 36.7561 36.1583 36.7665C36.1583 36.7457 36.1583 36.725 36.148 36.7042C36.0546 34.4209 38.4312 33.1444 38.6803 29.6987C38.7426 27.7372 38.0057 26.0766 36.6254 25.0906C38.2859 25.1114 39.8427 24.25 40.9636 22.6828C42.8629 19.7976 41.7627 17.3483 43.2261 15.5943C43.2365 15.5735 43.2573 15.5632 43.2676 15.5528C43.2676 15.5424 43.2261 15.5424 43.2054 15.5424C40.974 15.0442 40.3513 12.4288 37.082 11.2872C35.38 10.7683 33.7298 10.9551 32.4636 11.8165C32.9202 10.3013 32.5778 8.64069 31.5088 7.14618C29.3916 4.40625 26.7243 4.65534 25.5307 2.70418C25.5204 2.6938 25.51 2.67304 25.4996 2.65228C25.4892 2.67304 25.4788 2.68342 25.4685 2.70418C24.2749 4.66572 21.5973 4.40625 19.4697 7.1358C18.3903 8.63031 18.0582 10.3013 18.5252 11.8165C17.2487 10.9343 15.5881 10.7371 13.8549 11.2561C10.5961 12.3977 9.97334 15.0131 7.74196 15.5113C7.7212 15.5216 7.67969 15.5216 7.67969 15.5216C7.70044 15.532 7.71082 15.5528 7.7212 15.5632C9.19495 17.3171 8.09483 19.7665 9.9941 22.6517C11.0838 24.1877 12.6095 25.0387 14.2182 25.0595C12.9001 26.004 12.1528 27.5815 12.1321 29.46C12.2359 32.916 14.5399 34.286 14.3531 36.5693C14.3531 36.6108 14.3427 36.6316 14.3427 36.6419ZM16.4184 18.1889H19.1998C22.1473 21.3129 25.1052 24.7066 25.4373 29.1902C25.8006 24.7482 28.7377 21.3751 31.6644 18.2616H34.4563C33.5118 19.3825 32.5985 20.4826 31.5088 21.7488C29.7652 23.7622 28.0527 26.1493 27.8659 29.543V33.6425C28.5405 34.2237 29.2878 34.587 30.0246 34.5143C32.2249 34.8672 33.3873 33.8709 34.5808 34.4209C34.5912 34.4209 34.6016 34.4209 34.5912 34.4106C34.5497 33.0925 35.8989 32.3971 36.4282 30.2384C37.3415 28.5259 35.5356 25.6303 33.9062 24.2396C33.8336 24.1981 33.7609 24.1462 33.6779 24.0943C35.8159 24.0424 39.1785 22.8281 39.5106 20.877C40.4135 18.8324 39.7597 17.4521 40.6004 16.435V16.4246C40.6004 16.4246 40.6003 16.4246 40.59 16.4246C39.3134 16.134 38.9917 14.6499 37.0301 13.5809C35.5771 12.2213 32.173 13.3006 30.4398 14.5564C30.4917 14.4008 30.5539 14.2555 30.6162 14.0998C31.1351 12.0137 30.9795 8.79637 29.3189 7.91419C27.6999 6.39893 26.1742 6.57536 25.4788 5.45448C25.4685 5.4441 25.4685 5.4441 25.4685 5.45448C24.7835 6.57536 23.2682 6.39893 21.6284 7.91419C19.8952 8.83788 19.8122 12.3354 20.4141 14.3904C20.4349 14.4423 20.4556 14.4942 20.4764 14.5461C18.7328 13.2903 15.339 12.2109 13.886 13.5705C11.9245 14.6395 11.6028 16.1236 10.3262 16.4142C10.3158 16.4142 10.3055 16.4246 10.3158 16.4246C11.1565 17.4417 10.5026 18.822 11.4056 20.8666C11.7377 22.8281 15.09 24.032 17.2383 24.0839C17.2175 24.1047 17.1864 24.1254 17.1657 24.1358H17.2383C15.5155 25.4124 13.4605 28.3287 14.3219 30.1242C14.7578 32.3037 16.0759 33.0613 15.9617 34.369C15.9617 34.3794 15.9721 34.3794 15.9721 34.3794C17.1864 33.8812 18.3073 34.9191 20.5283 34.67C21.3482 34.7842 22.2096 34.3587 22.9776 33.6737V29.46C22.7804 26.0662 21.0784 23.6792 19.3348 21.6657C18.2762 20.4203 17.3525 19.3098 16.4184 18.1889ZM25.4581 18.4484C26.8592 18.4484 28.0008 19.59 28.0008 20.9911C28.0008 22.3922 26.8592 23.5339 25.4581 23.5339C24.057 23.5339 22.9154 22.3922 22.9154 20.9911C22.9154 19.59 24.057 18.4588 25.4581 18.4484Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.69201 25.7052H5.22071V27.428C5.22071 27.812 5.11692 28.1026 4.90935 28.2894C4.7433 28.4347 4.53573 28.5074 4.31778 28.5074C4.13096 28.5178 3.94415 28.4659 3.79885 28.3517C3.71582 28.2791 3.64317 28.1856 3.60166 28.0715C3.53939 28.2583 3.41485 28.414 3.23841 28.5074C3.08273 28.5904 2.91668 28.6215 2.74024 28.6215C2.60532 28.6215 2.46002 28.5904 2.33548 28.5385C2.21094 28.4866 2.09677 28.414 2.00337 28.3102C1.89958 28.2064 1.81655 28.0819 1.77504 27.9469C1.70239 27.6979 1.67125 27.4488 1.68163 27.1893L1.69201 25.7052ZM3.24879 26.4109H2.29397V27.3139C2.28359 27.4695 2.3251 27.6148 2.41851 27.7394C2.52229 27.8432 2.66759 27.895 2.81289 27.8847C2.93743 27.895 3.0516 27.8328 3.12425 27.7394C3.1969 27.6252 3.23841 27.4903 3.23841 27.3554L3.24879 26.4109ZM4.60838 26.4109H3.84037V27.2827C3.82999 27.4073 3.86112 27.5318 3.92339 27.646C3.99604 27.7497 4.11021 27.8016 4.23475 27.7913C4.34891 27.8016 4.46308 27.7497 4.52535 27.6563C4.58762 27.5318 4.61875 27.3969 4.60838 27.2516V26.4109ZM2.78176 29.9189L2.02412 29.7943L1.90996 29.0367L5.58396 29.732L5.71888 30.5727L2.42889 32.3371L2.30434 31.5483L2.98933 31.2162L2.78176 29.9189ZM3.41485 30.0226L3.56015 30.9152L4.86784 30.2613L3.41485 30.0226ZM5.73963 29.5037L5.96796 29.4414C6.00948 29.4311 6.04061 29.4311 6.08213 29.4518C6.13402 29.4622 6.17553 29.4726 6.22742 29.4933C6.26894 29.5245 6.31045 29.5452 6.36235 29.5556C6.41424 29.566 6.46613 29.566 6.50764 29.5452C6.55954 29.5245 6.61143 29.4933 6.63219 29.4414C6.66332 29.3999 6.6737 29.348 6.65294 29.2961C6.63219 29.2339 6.59067 29.1716 6.53878 29.1301C6.49727 29.0886 6.435 29.0678 6.37272 29.0782L6.30007 28.8187L6.33121 28.8084C6.45575 28.7772 6.58029 28.798 6.68408 28.8706C6.80862 28.964 6.90203 29.099 6.93316 29.2546C6.97468 29.3896 6.97468 29.5349 6.92278 29.6698C6.87089 29.7839 6.77749 29.867 6.66332 29.8981C6.60105 29.9189 6.53878 29.9292 6.46613 29.9292C6.39348 29.9292 6.32083 29.8981 6.25856 29.8462C6.22742 29.8255 6.18591 29.8151 6.16515 29.7839C6.1444 29.7736 6.11326 29.7632 6.08213 29.7424C6.05099 29.732 6.00948 29.7217 5.96796 29.732C5.92645 29.732 5.88493 29.7424 5.84342 29.7528L5.82266 29.7632L5.73963 29.5037ZM4.20361 32.1918C4.67065 31.9946 5.07541 31.9323 5.44904 32.0257C5.73963 32.0983 6.00948 32.254 6.20667 32.472C6.36235 32.638 6.48689 32.8248 6.56992 33.022C6.65294 33.2192 6.70484 33.4372 6.71521 33.6551C6.73597 33.9561 6.66332 34.2571 6.50764 34.5269C6.31045 34.8487 5.97834 35.1081 5.51131 35.3053C5.04427 35.5025 4.63951 35.5648 4.26588 35.4817C3.97529 35.4091 3.70544 35.2534 3.49787 35.0355C3.3422 34.8798 3.22803 34.693 3.13463 34.4854C3.0516 34.2778 2.99971 34.0599 2.98933 33.8419C2.96857 33.541 3.04122 33.24 3.1969 32.9805C3.40447 32.6588 3.73658 32.3889 4.20361 32.1918ZM4.49421 32.8767C4.07907 33.0428 3.81961 33.2815 3.70544 33.5617C3.61204 33.7797 3.62242 34.0288 3.7262 34.2363C3.80923 34.4543 3.97529 34.6203 4.19323 34.7137C4.47345 34.8279 4.82632 34.8071 5.24147 34.6307C5.65661 34.4543 5.90569 34.2259 6.00948 33.9457C6.10288 33.7278 6.0925 33.4891 5.98872 33.2711C5.90569 33.0532 5.72926 32.8871 5.52169 32.7937C5.24147 32.6692 4.89897 32.7003 4.49421 32.8767ZM7.61815 39.052L6.91241 37.8792L5.5632 38.6887L5.17919 38.0556L8.19934 36.2394L8.58335 36.8725L7.44171 37.5574L8.14745 38.7406L9.28909 38.0556L9.67309 38.6783L6.64257 40.4946L6.26894 39.8615L7.61815 39.052ZM10.6279 40.1002L7.81534 42.2278L7.37944 41.6362L10.192 39.519L10.6279 40.1002ZM13.3367 42.2797L12.9216 42.7363L11.5412 41.4909L11.0327 42.041L12.3092 43.193L11.8941 43.66L10.6279 42.508L10.0156 43.1826L11.4686 44.4799L11.0534 44.947L9.05038 43.1515L11.4167 40.5257L13.3367 42.2797ZM13.1707 40.5465L13.2641 41.4494L12.797 41.1588L12.7451 40.6502L12.2677 40.8267L11.8007 40.5465L12.6517 40.2351L13.1707 40.5465ZM13.4094 40.889L13.5235 40.6918C13.5443 40.6606 13.5754 40.6399 13.6169 40.6191C13.6688 40.5984 13.7103 40.5776 13.7519 40.5568C13.8037 40.5568 13.8556 40.5465 13.8971 40.5153C13.9387 40.4842 13.9698 40.4531 14.0009 40.4115C14.0321 40.37 14.0424 40.3078 14.0321 40.2559C14.0217 40.204 13.9906 40.1521 13.949 40.1313C13.8971 40.1002 13.8245 40.0794 13.7622 40.0898C13.7 40.0794 13.6377 40.1106 13.5962 40.1521L13.3678 40.0068L13.3782 39.986C13.4405 39.8719 13.565 39.8096 13.6896 39.7992C13.8453 39.7888 14.0009 39.82 14.1255 39.9134C14.2604 39.986 14.3538 40.1002 14.4057 40.2455C14.4472 40.3596 14.4265 40.4842 14.3642 40.5776C14.333 40.6399 14.2915 40.6918 14.25 40.7333C14.1877 40.7852 14.1151 40.8059 14.0424 40.8163C14.0009 40.8267 13.9698 40.8267 13.9283 40.8371C13.8971 40.8371 13.866 40.8474 13.8349 40.8578C13.8037 40.8682 13.7726 40.889 13.7415 40.9201C13.7103 40.9616 13.6896 40.9824 13.6688 41.0135L13.6584 41.0343L13.4094 40.889ZM16.6786 44.3658L15.018 47.4793L14.4161 47.1576L15.7964 44.5526L13.8245 46.8358L13.181 46.4934L14.0009 43.5977L12.6102 46.1924L12.0083 45.8706L13.6584 42.7571L14.6029 43.2553L13.866 46.0159L15.7341 43.8676L16.6786 44.3658ZM19.8544 47.417L20.5186 49.4824L19.6469 49.254L19.2836 47.9256L18.308 48.9219L17.4674 48.7144L19.0138 47.2302L18.3807 45.3102L19.2317 45.5178L19.5638 46.7736L20.4668 45.8291L21.2867 46.0263L19.8544 47.417ZM21.8263 48.9012L21.5254 49.6069L20.747 49.5446L22.3141 46.1405L23.1652 46.2131L24.0889 49.8352L23.2897 49.7626L23.134 49.0257L21.8263 48.9012ZM22.0754 48.3096L22.968 48.3822L22.6566 46.95L22.0754 48.3096ZM23.5077 44.9573L23.8294 44.9677C23.8086 45.0507 23.7879 45.1441 23.7464 45.2272C23.6737 45.4244 23.4765 45.5593 23.269 45.5489C23.2171 45.5489 23.1548 45.5385 23.1029 45.5282C23.0302 45.5074 22.968 45.4866 22.9057 45.4659C22.8227 45.4347 22.7396 45.4036 22.667 45.3725C22.6359 45.3621 22.5943 45.3517 22.5632 45.3517C22.4906 45.3413 22.4179 45.3725 22.3764 45.4244C22.3453 45.4659 22.3349 45.5074 22.3141 45.5489L22.0028 45.5385C22.0235 45.4659 22.0443 45.4036 22.065 45.3413C22.0962 45.2791 22.1377 45.2168 22.1792 45.1545C22.2311 45.0923 22.283 45.0404 22.3556 45.0092C22.4387 44.9677 22.5321 44.947 22.6359 44.947C22.7604 44.9677 22.8746 45.0092 22.9887 45.0611C23.0821 45.1026 23.1859 45.1338 23.2897 45.1545C23.352 45.1649 23.4039 45.1441 23.4454 45.1026C23.4661 45.0611 23.4973 45.0092 23.5077 44.9573ZM28.9668 47.9152L27.6072 48.1124L27.8251 49.6796L27.0986 49.773L26.6005 46.2858L27.3373 46.182L27.5241 47.5001L28.8837 47.3133L28.6969 45.9952L29.4234 45.8914L29.9216 49.3786L29.1951 49.4824L28.9668 47.9152ZM30.5962 47.2925C30.4509 46.8047 30.4509 46.3896 30.5858 46.0263C30.6896 45.7461 30.8764 45.497 31.1255 45.331C31.3123 45.196 31.5095 45.1026 31.7274 45.03C31.935 44.9677 32.1633 44.947 32.3813 44.9677C32.6823 44.9781 32.9729 45.0923 33.2116 45.2791C33.5126 45.5074 33.7305 45.8706 33.8654 46.3584C34.0107 46.8358 34.0107 47.2614 33.8758 47.6246C33.772 47.9048 33.5852 48.1539 33.3361 48.3304C33.1597 48.4653 32.9625 48.5587 32.7549 48.6209C32.5473 48.6832 32.319 48.704 32.1011 48.6832C31.8001 48.6728 31.5095 48.5587 31.2708 48.3719C30.9594 48.1332 30.7311 47.7803 30.5962 47.2925ZM31.3019 47.0953C31.4265 47.5208 31.6237 47.801 31.8935 47.9567C32.1011 48.0709 32.3502 48.0916 32.5681 48.019C32.7964 47.9671 32.9936 47.8114 33.1078 47.6142C33.2531 47.3444 33.2738 46.9915 33.1493 46.566C33.0248 46.1405 32.8276 45.8603 32.5577 45.715C32.3502 45.6008 32.1115 45.58 31.8935 45.6527C31.6652 45.715 31.468 45.8603 31.3538 46.0678C31.2085 46.3169 31.1878 46.6594 31.3019 47.0953ZM31.3123 44.262L32.1218 44.6771L31.6237 44.9054L31.167 44.6771L31.0528 45.1753L30.5547 45.4036L30.7519 44.5111L31.3123 44.262ZM33.3673 48.6936L33.606 49.2125L33.0455 49.472L32.8068 48.9531L33.3673 48.6936ZM34.6542 43.7223L36.3044 46.8358L35.6505 47.1783L34.0003 44.0648L34.6542 43.7223ZM38.6395 41.5843L39.2622 41.138L40.3624 44.6979L39.7916 45.113L36.761 42.9543L37.3941 42.4976L39.5736 44.2101L38.6395 41.5843ZM40.0406 40.1625L42.5315 42.6533L42.0126 43.1722L39.5217 40.6814L40.0406 40.1625ZM42.0956 37.5159L42.6145 37.8584L41.5974 39.4152L42.2201 39.82L43.1646 38.3774L43.6835 38.7198L42.7494 40.1521L43.5071 40.6502L44.5761 39.0104L45.095 39.3426L43.642 41.5947L40.6841 39.6954L42.0956 37.5159ZM40.4973 37.9311L41.3898 37.7546L41.1304 38.2528L40.6322 38.3462L40.8502 38.8132L40.6011 39.301L40.2067 38.4811L40.4973 37.9311ZM44.8563 40.1625L45.3648 40.4115L45.0846 40.9616L44.5761 40.7021L44.8563 40.1625ZM43.9533 35.4817L46.5272 36.8517L46.1743 37.5056L43.6005 36.1252L43.1023 37.0697L42.5522 36.7687L43.9014 34.2363L44.4515 34.5269L43.9533 35.4817ZM45.2299 30.5416L45.4167 29.8773L48.8001 30.8322L48.6029 31.5379L45.7903 32.2229L48.1982 32.9286L48.0113 33.5825L44.6176 32.6173L44.8355 31.87L47.5754 31.2162L45.2299 30.5416ZM48.3123 29.0678L49.0181 29.3688L48.9662 30.1368L45.5413 28.6319L45.6035 27.7705L49.2049 26.7949L49.153 27.5837L48.4057 27.7601L48.3123 29.0678ZM47.7311 28.8291L47.7934 27.9366L46.3715 28.2791L47.7311 28.8291ZM45.479 22.7265L48.9869 22.4256L49.0492 23.1106L46.1121 23.3596L49.1115 23.7748L49.1737 24.5013L46.2885 25.3834L49.2256 25.1344L49.2879 25.8193L45.78 26.1307L45.6866 25.0617L48.4057 24.1899L45.5724 23.7955L45.479 22.7265Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3962_33958">
                      <rect
                        width="250.9481"
                        height="250.9481"
                        fill="white"
                        transform="translate(0 0.52594)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
            <div className="logo-content max-w-[370px] w-full"></div>
          </div>
          <div className="footer-top-2 footer-top-col flex flex-col gap-4">
            <h3 className="text-[20px] text-white font-bold">
              Đăng ký nhận tin
            </h3>
            <div className="input-email">
              <p className="text-[16px] font-light text-white pb-2 w-full max-w-[375px]">
                Gửi Email của bạn để nhận được những thông tin mới nhất từ chúng
                tôi
              </p>
              <div className="email-input mt-3">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full max-w-[375px] px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Email"
                  />
                  <button className="absolute button-footer bg-[#004FA5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-top-3 footer-top-col flex flex-col gap-4">
            <h3 className="text-[20px] text-white font-semibold">
              Đăng ký nhận tin
            </h3>
            <div className="icons-contact">
              <div className=" text-white flex flex-col gap-1">
                <Link to="/" className="flex items-start justify-center">
                  <div className="mr-1 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3962_34603)">
                        <path
                          d="M9.25628 0C7.32157 0.0021837 5.46671 0.793061 4.09866 2.19911C2.73061 3.60516 1.96111 5.51155 1.95898 7.5C1.95898 11.4615 8.08871 16.8997 8.78488 17.5072L9.25628 17.9167L9.72769 17.5072C10.4239 16.8997 16.5536 11.4615 16.5536 7.5C16.5515 5.51155 15.782 3.60516 14.4139 2.19911C13.0459 0.793061 11.191 0.0021837 9.25628 0ZM9.25628 11.25C8.53465 11.25 7.82922 11.0301 7.2292 10.618C6.62918 10.206 6.16153 9.62029 5.88537 8.93506C5.60921 8.24984 5.53696 7.49584 5.67774 6.76841C5.81852 6.04098 6.16603 5.3728 6.6763 4.84835C7.18657 4.3239 7.8367 3.96675 8.54447 3.82206C9.25223 3.67736 9.98586 3.75162 10.6526 4.03545C11.3193 4.31928 11.8891 4.79993 12.29 5.41661C12.6909 6.0333 12.9049 6.75832 12.9049 7.5C12.9038 8.4942 12.519 9.44733 11.835 10.1503C11.151 10.8533 10.2236 11.2488 9.25628 11.25Z"
                          fill="white"
                        />
                        <path
                          d="M9.25755 9.75C10.4666 9.75 11.4467 8.74264 11.4467 7.5C11.4467 6.25736 10.4666 5.25 9.25755 5.25C8.04849 5.25 7.06836 6.25736 7.06836 7.5C7.06836 8.74264 8.04849 9.75 9.25755 9.75Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3962_34603">
                          <rect
                            width="17.5135"
                            height="18"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div>
                    <p className="text-[16px] font-light text-white pb-2 w-full max-w-[375px]">
                      Địa chỉ: D27 Dreamland - 107 Xuân La,
                    </p>
                    <p className="text-[16px] font-light text-white pb-2 w-full max-w-[375px]">
                      Phường Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội
                    </p>
                  </div>
                </Link>

                <Link
                  to="phone:info@audi.vn"
                  className="flex flex-row gap-1 items-center mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3962_34608)">
                      <path
                        d="M9.5 0.5C4.53725 0.5 0.5 4.53725 0.5 9.5C0.5 14.4628 4.53725 18.5 9.5 18.5C14.4628 18.5 18.5 14.4628 18.5 9.5C18.5 4.53725 14.4628 0.5 9.5 0.5ZM13.7488 12.9403L13.3573 13.3903C12.944 13.8042 12.3995 14 11.8573 14C9.07175 14 5 10.1427 5 7.14275C5 6.6005 5.19575 6.056 5.60975 5.64275L6.05975 5.25125C6.39425 4.91675 6.93725 4.91675 7.27175 5.25125L8.02175 6.22775C8.35625 6.56225 8.35625 7.10525 8.02175 7.43975L7.3835 8.2415C8.05925 9.9245 9.20525 11.024 10.7585 11.6165L11.5602 10.9782C11.8947 10.6438 12.4378 10.6438 12.7723 10.9782L13.7488 11.7282C14.0833 12.0627 14.0833 12.6058 13.7488 12.9403Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3962_34608">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[16px] font-light text-white w-full max-w-[375px]">
                    Hotline: 190088807
                  </span>
                </Link>

                <Link
                  to="mailto:info@baohiem.app"
                  className="flex flex-row gap-1 items-center mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3962_34612)">
                      <path
                        d="M6.875 6.5525C6.995 6.521 7.11875 6.49925 7.2485 6.49925L11.7432 6.4955H11.7448C11.8798 6.4955 12.0095 6.5195 12.1363 6.55325L10.247 8.4425C9.85175 8.83775 9.161 8.83775 8.765 8.4425L6.87425 6.55175L6.875 6.5525ZM11.3075 9.50375C10.8267 9.98525 10.187 10.25 9.50675 10.25C8.8265 10.25 8.186 9.9845 7.70525 9.50375L5.80925 7.607C5.77475 7.733 5.75075 7.86275 5.75075 7.99925V10.2485C5.75075 10.6497 5.90675 11.0262 6.19025 11.3097C6.47375 11.5933 6.85025 11.7485 7.25075 11.7485L11.7455 11.7463C12.5728 11.7463 13.2448 11.0728 13.2448 10.2463V7.99625C13.2448 7.86725 13.223 7.742 13.1915 7.6205L11.3075 9.50375ZM18.5 9.5C18.5 14.4628 14.4628 18.5 9.5 18.5C4.53725 18.5 0.5 14.4628 0.5 9.5C0.5 4.53725 4.53725 0.5 9.5 0.5C14.4628 0.5 18.5 4.53725 18.5 9.5ZM14.7448 7.9955C14.7448 7.19375 14.432 6.44 13.865 5.873C13.298 5.3075 12.545 4.9955 11.7448 4.9955H11.7418L7.247 4.99925C5.59475 5.00075 4.25 6.34625 4.25 7.99925V10.2485C4.25 11.0503 4.562 11.804 5.129 12.3702C5.696 12.9365 6.449 13.2485 7.25 13.2485H7.25225L11.747 13.2463C13.4 13.2455 14.7448 11.8993 14.7448 10.2463V7.9955Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3962_34612">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[16px] items-center font-light text-white w-full max-w-[375px]">
                    Email: info@baohiem.app
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bot bg-black text-center p-3">
        <p className="text-[#fffff] font-extralight">
          <span>©</span> CÔNG TY CỔ PHẦN PHÁT TRIỂN CÔNG NGHỆ SỐ DNP. Powered by
          <a target="_blank" rel="noopener noreferrer" href="https://dion.vn/">
            {" "}
            Dion.vn
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterPage;
