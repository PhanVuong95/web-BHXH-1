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
  handleNext: () => void; // Define the type for handleNext
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
