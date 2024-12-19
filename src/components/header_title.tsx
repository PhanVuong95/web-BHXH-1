interface BreadcrumbProps {
  links: { title: string; path?: string }[];
}

const HeaderTitle: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <div className="bg-[#0077D5;] py-5 header-title-container">
      <div className="container max-w-[1280px] mx-auto flex items-center gap-3">
        <a href="/">
          <h3 className="text-white text-base font-normal">Trang chủ</h3>
        </a>
        {links.map((link, index) => {
          const isLast = index === links.length - 1; // Kiểm tra nếu là phần tử cuối cùng
          return (
            <div key={index} className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="6"
                viewBox="0 0 21 6"
                fill="none"
              >
                <path
                  d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM21 3L16 0.113249V5.88675L21 3ZM1 3.5H16.5V2.5H1V3.5Z"
                  fill="white"
                />
              </svg>
              {isLast ? (
                <h3 className="text-white text-base font-normal">
                  {link.title}
                </h3>
              ) : (
                <a
                  href={link.path}
                  className="text-white text-base font-normal hover:underline"
                >
                  {link.title}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderTitle;
