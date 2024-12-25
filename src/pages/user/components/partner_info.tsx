import { useState } from "react";
import { User } from "../../../models";
import IntroducingPartnersPage from "../../../components/ctv/introducing_partners";
import BankInfoPage from "../../../components/ctv/bank_info_page";
import ProfilePartnerDetailPage from "../../profile_partner_detail_page";
import ListCollabrorates from "../../../components/ctv/list_collabrorates";
import ReportPartnerPage from "../../../components/ctv/report_partner_page";

interface AccountInfoProps {
  user: User;
}

const TabContent1 = () => {
  return (
    <div className="w-full">
      <IntroducingPartnersPage />
    </div>
  );
};

interface TabContent2Props {
  user: User;
}
const TabContent2: React.FC<TabContent2Props> = ({ user }) => {
  const [showCollaborators1, setShowCollaborators1] = useState(false);
  return (
    <div className="w-full">
      {showCollaborators1 ? (
        <BankInfoPage onBack1={() => setShowCollaborators1(false)} />
      ) : (
        <ProfilePartnerDetailPage
          onViewCollaborators1={() => setShowCollaborators1(true)}
          user={user}
        />
      )}
    </div>
  );
};

const TabContent3 = () => {
  const [showCollaborators, setShowCollaborators] = useState(false);
  return (
    <div className="w-full">
      {showCollaborators ? (
        <ListCollabrorates onBack={() => setShowCollaborators(false)} />
      ) : (
        <ReportPartnerPage
          onViewCollaborators={() => setShowCollaborators(true)}
        />
      )}
    </div>
  );
};

const PartnerInfo: React.FC<AccountInfoProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g>
            <path
              d="M6 11.5C7.0878 11.5 8.15117 11.1774 9.05564 10.5731C9.96011 9.96874 10.6651 9.10976 11.0813 8.10476C11.4976 7.09977 11.6065 5.9939 11.3943 4.92701C11.1821 3.86011 10.6583 2.8801 9.88909 2.11092C9.1199 1.34173 8.13989 0.817902 7.073 0.605683C6.0061 0.393465 4.90024 0.502383 3.89524 0.918665C2.89025 1.33495 2.03127 2.0399 1.42692 2.94437C0.822569 3.84884 0.5 4.91221 0.5 6C0.501577 7.45821 1.08155 8.85624 2.11265 9.88735C3.14376 10.9185 4.54179 11.4984 6 11.5ZM6 2.79167C6.13598 2.79167 6.2689 2.83199 6.38195 2.90753C6.49501 2.98308 6.58313 3.09045 6.63517 3.21607C6.6872 3.3417 6.70082 3.47993 6.67429 3.61329C6.64776 3.74666 6.58228 3.86916 6.48614 3.96531C6.38999 4.06145 6.26749 4.12693 6.13413 4.15346C6.00076 4.17999 5.86253 4.16637 5.73691 4.11434C5.61128 4.0623 5.50391 3.97418 5.42836 3.86112C5.35282 3.74806 5.3125 3.61514 5.3125 3.47917C5.3125 3.29683 5.38493 3.12196 5.51386 2.99303C5.6428 2.8641 5.81766 2.79167 6 2.79167ZM5.54167 5.08334H6C6.24312 5.08334 6.47627 5.17991 6.64818 5.35182C6.82009 5.52373 6.91667 5.75689 6.91667 6V8.75C6.91667 8.87156 6.86838 8.98814 6.78242 9.07409C6.69647 9.16005 6.57989 9.20834 6.45833 9.20834C6.33678 9.20834 6.2202 9.16005 6.13424 9.07409C6.04829 8.98814 6 8.87156 6 8.75V6H5.54167C5.42011 6 5.30353 5.95171 5.21758 5.86576C5.13162 5.77981 5.08333 5.66323 5.08333 5.54167C5.08333 5.42011 5.13162 5.30353 5.21758 5.21758C5.30353 5.13162 5.42011 5.08334 5.54167 5.08334Z"
              fill="#676769"
            />
          </g>
          <defs>
            <clipPath id="clip0_4580_55490">
              <rect
                width="11"
                height="11"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "Thông tin giới thiệu",
      content: <TabContent1 />,
    },
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g>
            <path
              d="M6 6C7.51878 6 8.75 4.76878 8.75 3.25C8.75 1.73122 7.51878 0.5 6 0.5C4.48122 0.5 3.25 1.73122 3.25 3.25C3.25 4.76878 4.48122 6 6 6Z"
              fill="#676769"
            />
            <path
              d="M6 6.91699C3.72287 6.91953 1.87754 8.76486 1.875 11.042C1.875 11.2951 2.0802 11.5003 2.33333 11.5003H9.66665C9.91978 11.5003 10.125 11.2951 10.125 11.042C10.1225 8.76486 8.27713 6.91951 6 6.91699Z"
              fill="#676769"
            />
          </g>
          <defs>
            <clipPath id="clip0_4580_55502">
              <rect
                width="11"
                height="11"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "Thông tin đối tác",
      content: <TabContent2 user={user} />,
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g>
            <path
              d="M9.66797 0.5H4.16797V8.75H10.5846V1.41667C10.5846 0.910416 10.1742 0.5 9.66797 0.5Z"
              fill="#676769"
            />
            <path
              d="M2.79297 0.5C2.03358 0.5 1.41797 1.11561 1.41797 1.875V9.10063C1.66966 8.87444 1.99624 8.74953 2.33464 8.75H3.25129V0.5H2.79297Z"
              fill="#676769"
            />
            <path
              d="M10.5846 11.5003H2.33464C1.82838 11.5003 1.41797 11.0899 1.41797 10.5837C1.41797 10.0774 1.82838 9.66699 2.33464 9.66699H10.5846V11.5003Z"
              fill="#676769"
            />
          </g>
          <defs>
            <clipPath id="clip0_4580_55518">
              <rect
                width="11"
                height="11"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "Báo cáo thống kê",
      content: <TabContent3 />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-[10px] md:p-[15px] lg:p-[20px] ">
      <div className="flex border-b flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 px-[12px] py-[15px] md:py-[24px] lg:py-[24px] text-center border-b-2  font-medium text-[14px] md:text-[18px] lg:text-[18px] ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`tab-content-icon ${
                  activeTab === tab.id ? "active-icon" : ""
                } hidden md:inline-block`}
              >
                {tab.icon}
              </div>
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      <div>
        {/* Hiển thị nội dung dựa trên activeContent */}
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default PartnerInfo;
