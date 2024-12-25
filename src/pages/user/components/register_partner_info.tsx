import RegisterPartnerInfoPage from "../../../components/ctv/register_partnerInfo";
import { MyComponentProps } from "../../../models";

const RegisterPartnerInfo: React.FC<MyComponentProps> = ({ handleNext }) => {
  return <RegisterPartnerInfoPage handleNext={handleNext} />;
};

export default RegisterPartnerInfo;
