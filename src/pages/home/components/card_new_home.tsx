import { Link } from "react-router-dom";
import imgSlider from "../../../assets-src/image-1002.png";
import { CardNewHomeProps } from "../../../models";
import slugify from "react-slugify";
import { isValidEmptyString } from "../../../utils/validate_string";

const CardNewHome: React.FC<CardNewHomeProps> = ({ post }) => {
  const link = isValidEmptyString(post.slug)
    ? `${slugify(post.slug)}`
    : post.id;

  return (
    <div
      className="card_new_page"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    >
      <img
        className="h-[200px] w-[100%] object-cover"
        src={(post as any).photo ? (post as any).photo : imgSlider}
        alt="img-slider"
      />
      <div className="title-card-new flex justify-between items-center w-full p-[15px]">
        <div className="title-new">
          <h3
            className="line-clamp-3 overflow-hidden text-ellipsis"
            title={post.name}
          >
            {post.name}
          </h3>
          <p
            className="line-clamp-3 overflow-hidden text-ellipsis"
            title={post.description}
          >
            {post.description}
          </p>
          <Link to={`/new-detail/${link}`} className="link-button">
            <p className="text-[16px] text-[#0076B7]">Xem thêm</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                opacity="0.5"
                d="M5.20663 4.16672C5.20654 4.03892 5.24563 3.91416 5.31863 3.80926C5.39163 3.70436 5.49504 3.62436 5.61491 3.58004C5.73478 3.53572 5.86536 3.52922 5.98905 3.56141C6.11273 3.5936 6.22357 3.66293 6.30663 3.76006L11.3066 9.59339C11.4037 9.70666 11.457 9.8509 11.457 10.0001C11.457 10.1492 11.4037 10.2935 11.3066 10.4067L6.30663 16.2401C6.22357 16.3372 6.11273 16.4065 5.98905 16.4387C5.86536 16.4709 5.73478 16.4644 5.61491 16.4201C5.49504 16.3758 5.39163 16.2958 5.31863 16.1909C5.24563 16.086 5.20654 15.9612 5.20663 15.8334L5.20663 4.16672Z"
                fill="#0076B7"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.76174 3.69177C8.69939 3.74521 8.64818 3.81041 8.61103 3.88366C8.57389 3.9569 8.55155 4.03674 8.54528 4.11862C8.53901 4.2005 8.54894 4.28281 8.5745 4.36085C8.60006 4.43889 8.64075 4.51113 8.69424 4.57344L13.3451 10.0001L8.69424 15.4268C8.63765 15.4886 8.59407 15.5611 8.56608 15.6401C8.53809 15.7191 8.52626 15.8028 8.5313 15.8865C8.53635 15.9701 8.55815 16.0519 8.59543 16.1269C8.63271 16.202 8.68469 16.2687 8.74829 16.3233C8.81189 16.3778 8.88581 16.419 8.96565 16.4444C9.04549 16.4698 9.12963 16.4789 9.21306 16.4712C9.29648 16.4634 9.3775 16.439 9.45128 16.3993C9.52507 16.3596 9.59012 16.3054 9.64257 16.2401L14.6426 10.4068C14.7396 10.2935 14.793 10.1493 14.793 10.0001C14.793 9.85095 14.7396 9.7067 14.6426 9.59344L9.64257 3.76011C9.53467 3.63443 9.38129 3.55672 9.21612 3.54406C9.05096 3.53141 8.88753 3.58483 8.76174 3.69261L8.76174 3.69177Z"
                fill="#0076B7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardNewHome;
