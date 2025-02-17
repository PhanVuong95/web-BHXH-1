export type Widthheight = {
  w: string;
  h: string;
  p?: string;
  url: string;
};

export type Ward = {
  id: string;
  active: boolean;
  countryId: string;
  name: string;
  description: string;
};

export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export type ItemInfoProps = {
  title: string;
  value: string;
  subtitle: string;
  image: string;
};

export type CollaboratorItem = {
  id: number;
  photo: string;
  fullName: string;
  phone: string;
};

export interface User {
  fullName: string;
  phone: string;
  photo?: string;
}

export interface MyComponentProps {
  handleNext: () => void;
}

export interface HistoryPageProps {
  onViewCollaborators: () => void;
  onViewBHYT: () => void;
}

export interface ListsHistoryPageProps {
  onBack: () => void;
}

export interface ListHistoryBHYTProps {
  onBack: () => void;
}

export interface Order {
  insuranceOrderStatusId: number;
  // Add other properties of the Order type here
}

export interface Bank {
  bin: number;
  name: string;
}

export type ModalStyles = {
  content?: React.CSSProperties;
  overlay?: React.CSSProperties;
};

export interface Post {
  insuranceName: string;
  postStatusName: string;
  name: string;
  description: string;
  text: string;
  publishedTime: string;
  url: string;
  id: number;
}

export interface CardNewHomeProps {
  post: Post;
  index: number;
}

export interface PostDetails {
  status: string;
  message: string;
  data: Array<{
    insuranceName: string;
    postTypeName: string | null;
    accountName: string | null;
    postStatusName: string;
    id: number;
    active: boolean;
    postTypeId: number;
    userId: number;
    insuranceId: number;
    postStatusId: number;
    guId: string;
    photo: string;
    video: string;
    viewCount: number;
    commentCount: number;
    likeCount: number;
    url: string;
    url2: string;
    name: string;
    description: string;
    text: string;
    name2: string;
    description2: string;
    text2: string;
    publishedTime: string;
    createdTime: string;
    account: string | null;
    postType: string | null;
    insurance: string | null;
    postStatus: string | null;
  }>;
}
