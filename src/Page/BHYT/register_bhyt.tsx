import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ListHistoryBHYTProps, Province } from "../../Models";
import { registerInfoBHYT } from "./list_health_insurance";
import {
  formatMoneyVND,
  isValidCitizenId,
  isValidEmail,
  isValidEmptyString,
  isValidFullName,
  isValidHealthInsuranceNumber,
  isValidPhone,
  isValidSocialInsuranceNumber,
} from "../../Utils/validateString";
import UserBeneficiaryBHYTPage from "../../Components/card_user_beneficiary_bhyt";
import UserBuyerPage from "../../Components/card_user_buyer";
import { FadeLoader } from "react-spinners";
import Modal from "react-modal";
import CardHouseHold from "../../Components/card_house_hold";
import CardMembersHouseHold from "../../Components/card_members_house_hold";
import CardObject from "../../Components/card_object";
import HeaderTitle from "../../Components/HeaderTitle";

const RegisterBHYT: React.FunctionComponent<ListHistoryBHYTProps> = ({
  onBack,
}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const fileUploadUrl = useRef<HTMLInputElement>(null);
  const [isLoadingFileUploadUrl, setLoadingFileUploadUrl] = useState(false);
  const [fileUpload, setFileUpload] = useState(
    registerInfoBHYT["fileUploadUrl"]
  );
  const [windowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(onBack);

  const ObjectTypeRefs = {
    nhomLoaiDoiTuongId: useRef<any>(null),
    loaiDoiTuongId: useRef<any>(null),
  };

  const houseHoldRefs = {
    fullNamHouseHoldParticipant: useRef<any>(null),
    cccdHouseHoldParticipant: useRef<any>(null),
    selectedHouseholdProvince: useRef<any>(null),
    selectedHouseholdDistrict: useRef<any>(null),
    selectedHouseholdWard: useRef<any>(null),
    addressDetailHouseHoldParticipant: useRef<any>(null),
    selectedTTHouseholdProvince: useRef<any>(null),
    selectedTTHouseholdDistrict: useRef<any>(null),
    selectedTTHouseholdWard: useRef<any>(null),
    addressDetailHKHouseHoldParticipant: useRef<any>(null),
  };

  const createNewBeneficiary = () => ({
    socialInsuranceNumber: React.createRef(),
    healthInsuranceNumber: React.createRef(),
    citizenId: React.createRef(),
    photoCitizenFront: React.createRef(),
    photoCitizenBack: React.createRef(),
    fullName: React.createRef(),
    dob: React.createRef(),
    gender: React.createRef(),
    ethnic: React.createRef(),
    oldCardStartDate: React.createRef(),
    oldCardEndDate: React.createRef(),
    newCardEndDate: React.createRef(),
    newCardStartDate: React.createRef(),
    insuranceProvinceId: React.createRef(),
    medicalProvinceId: React.createRef(),
    medicalDistrictId: React.createRef(),
    hospitalId: React.createRef(),
    vungLuongToiThieuId: React.createRef(),
    ttAddressDetail: React.createRef(),
    selectedTTWard: React.createRef(),
    selectedTTDistrict: React.createRef(),
    selectedTTProvince: React.createRef(),
    ksAddressDetail: React.createRef(),
    selectedKSWard: React.createRef(),
    selectedKSDistrict: React.createRef(),
    selectedKSProvince: React.createRef(),
    benefitLevel: React.createRef(),
  });

  const createNewMember = () => ({
    citizenId: React.createRef(),
    doB: React.createRef(),
    ethnicId: React.createRef(),
    gender: React.createRef(),
    name: React.createRef(),
    relationShipId: React.createRef(),
    ksProvinceId: React.createRef(),
    ksDistrictId: React.createRef(),
    ksWardId: React.createRef(),
    ksAddressDetail: React.createRef(),
  });

  const userBuyerPageRefs = {
    phone: useRef<any>(null),
    fullName: useRef<any>(null),
    email: useRef<any>(null),
    provinceId: useRef<any>(null),
    districtId: useRef<any>(null),
    wardId: useRef<any>(null),
    addressDetail: useRef<any>(null),
  };

  const policyTerm2 = useRef(false);

  const [beneficiaries, setBeneficiaries] = useState(
    Array.from({ length: registerInfoBHYT["listInsuredPerson"].length }, () =>
      createNewBeneficiary()
    )
  );
  const [members, setMembers] = useState<any>(
    Array.from(
      { length: registerInfoBHYT["houseHold"]["houseHoldPeoples"].length },
      () => createNewMember()
    )
  );
  const [ethnicLists, setEthnicLists] = useState([]);

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, createNewBeneficiary()]);

    const itemBeneficiary = {
      id: 0,
      insuranceProvinceId: 0,
      medicalProvinceId: 0,
      medicalDistrictId: 0,
      socialInsuranceNumber: "",
      healthInsuranceNumber: "",
      citizenId: "",
      photoCitizenFront: "",
      photoCitizenBack: "",
      fullName: "",
      doB: "",
      gender: "",
      supportBudget: 0,
      wage: 0,
      monthInsured: 0,
      ethnic: "",
      oldCardStartDate: "",
      oldCardEndDate: "",
      newCardEndDate: "",
      newCardStartDate: "",
      price: 0,
      hospitalId: 0,
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      addressDetail: "",
      ksXaPhuongMa: 0,
      ksQuanHuyenMa: 0,
      ksTinhThanhMa: 0,
      ksDiaChi: "",
      ethnicId: 0,
      vungLuongToiThieuId: 0,
      benefitLevel: "",
    };

    registerInfoBHYT["listInsuredPerson"].push(itemBeneficiary);
  };

  const addMember = () => {
    setMembers([...members, createNewMember()]);

    const itemMember = {
      id: 0,
      name: "",
      doB: "",
      gender: "",
      ethnicId: 0,
      relationShipId: "",
      citizenId: "",
      ksProvinceId: 0,
      ksDistrictId: 0,
      ksWardId: 0,
      ksAddressDetail: "",
    };

    registerInfoBHYT["houseHold"]["houseHoldPeoples"].push(itemMember);
  };

  useEffect(() => {
    axios
      .get(`https://baohiem.dion.vn/ethnic/api/list`)
      .then((response) => {
        setEthnicLists(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const scrollToElement = (input: any, boxNumber: any) => {
    switch (boxNumber) {
      case 1:
        (userBuyerPageRefs as any)[input].current?.focus();
        break;
      case 2:
        input.current.focus();
        break;
      default:
        break;
    }
  };

  const calculatePrice = () => {
    let finalPrice = 0;
    const BHYTprice = state.data.price;

    for (let index = 0; index < beneficiaries.length; index++) {
      let price = 0;
      switch (index) {
        case 0:
          price = BHYTprice;
          break;
        case 1:
          price = BHYTprice * 0.7;
          break;
        case 2:
          price = BHYTprice * 0.6;
          break;
        case 3:
          price = BHYTprice * 0.5;
          break;
        case 4:
          price = BHYTprice * 0.4;
          break;
        default:
          price = BHYTprice * 0.4;
          break;
      }
      finalPrice += price;
    }
    return finalPrice;
  };

  const calculateInsuredPersonPrice = (index: any) => {
    const BHYTprice = state.data.price;

    switch (index) {
      case 0:
        return BHYTprice;
      case 1:
        return BHYTprice * 0.7;
      case 2:
        return BHYTprice * 0.6;
      case 3:
        return BHYTprice * 0.5;
      case 4:
        return BHYTprice * 0.4;
      default:
        return BHYTprice * 0.4;
    }
  };

  const validateForm = () => {
    registerInfoBHYT["finalPrice"] = calculatePrice();
    registerInfoBHYT["insuranceId"] = state.data.insuranceTypeId;

    if (registerInfoBHYT.nhomLoaiDoiTuongId == null) {
      toast.warn("Nhóm loại đối tượng không được để trống");
      scrollToElement(ObjectTypeRefs.nhomLoaiDoiTuongId, 2);
      return false;
    }

    if (registerInfoBHYT.loaiDoiTuongId == null) {
      toast.warn("Loại đối tượng không được để trống");
      scrollToElement(ObjectTypeRefs.loaiDoiTuongId, 2);
      return false;
    }

    // Thông tin hộ gia đình
    if (registerInfoBHYT.houseHold.chuHoTen == "") {
      toast.warn("Tên chủ hộ không được để trống");
      scrollToElement(houseHoldRefs.fullNamHouseHoldParticipant, 2);
      return false;
    }

    // Thông tin hộ gia đình
    if (registerInfoBHYT.houseHold.soGiayToCaNhan == "") {
      toast.warn("Số CCCD không được để trống");
      scrollToElement(houseHoldRefs.cccdHouseHoldParticipant, 2);
      return false;
    }

    if (!isValidCitizenId(registerInfoBHYT.houseHold.soGiayToCaNhan)) {
      toast.warn("Số căn cước công dân phải là 12 chữ số");
      scrollToElement(houseHoldRefs.cccdHouseHoldParticipant, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ksProvinceId == 0) {
      toast.warn("Thành phố khai sinh không được để trống");
      scrollToElement(houseHoldRefs.selectedHouseholdProvince, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ksDistrictId == 0) {
      toast.warn("Quận huyện khai sinh không được để trống");
      scrollToElement(houseHoldRefs.selectedHouseholdDistrict, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ksWardId == 0) {
      toast.warn("Phường xã khai sinh không được để trống");
      scrollToElement(houseHoldRefs.selectedHouseholdWard, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ksAddressDetail == "") {
      toast.warn("Địa chỉ cụ thể khai sinh không được để trống");
      scrollToElement(houseHoldRefs.addressDetailHouseHoldParticipant, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ttProvinceId == 0) {
      toast.warn("Thành phố thường trú không được để trống");
      scrollToElement(houseHoldRefs.selectedTTHouseholdProvince, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ttDistrictId == 0) {
      toast.warn("Quận huyện thường trú không được để trống");
      scrollToElement(houseHoldRefs.selectedTTHouseholdDistrict, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.ttWardId == 0) {
      toast.warn("Phường xã thường trú không được để trống");
      scrollToElement(houseHoldRefs.selectedTTHouseholdWard, 2);
      return false;
    }

    if (registerInfoBHYT.houseHold.hkAddressDetail == "") {
      toast.warn("Địa chỉ hộ khẩu không được để trống");
      scrollToElement(houseHoldRefs.addressDetailHKHouseHoldParticipant, 2);
      return false;
    }

    for (
      let index = 0;
      index < registerInfoBHYT["houseHold"]["houseHoldPeoples"].length;
      index++
    ) {
      const item = registerInfoBHYT["houseHold"]["houseHoldPeoples"][index];

      if (item.name == "") {
        toast.warn("Tên thành viên không được để trống");
        scrollToElement(members[index].name, 2);
        return false;
      }

      if (item.citizenId == "") {
        toast.warn("Số CCCD của thành viên không được để trống");
        scrollToElement(members[index].citizenId, 2);
        return false;
      }

      if (!isValidCitizenId(item.citizenId)) {
        toast.warn("Số căn cước công dân phải là 12 chữ số");
        scrollToElement(members[index].citizenId, 2);
        return false;
      }

      if (item.ethnicId == 0) {
        toast.warn("Vui lòng chọn dân tộc");
        scrollToElement(members[index].ethnicId, 2);
        return false;
      }

      if (item.gender == "") {
        toast.warn("Giới tính không được để trống");
        scrollToElement(members[index].gender, 2);
        return false;
      }

      if (item.relationShipId == "") {
        toast.warn("Mối quan hệ với chủ hộ không được để trống");
        scrollToElement(members[index].relationShipId, 2);
        return false;
      }

      if (item.doB == "") {
        toast.warn("Ngày sinh không được để trống");
        scrollToElement(members[index].doB, 2);
        return false;
      }

      if (item.ksProvinceId == 0) {
        toast.warn("Tỉnh thành phố khai sinh không được để trống");
        scrollToElement(members[index].ksProvinceId, 2);
        return false;
      }

      if (item.ksDistrictId == 0) {
        toast.warn("Quận huyện khai sinh không được để trống");
        scrollToElement(members[index].ksDistrictId, 2);
        return false;
      }

      if (item.ksWardId == 0) {
        toast.warn("Địa chỉ cụ thể khai sinh không được để trống");
        scrollToElement(members[index].ksWardId, 2);
        return false;
      }
    }

    // Thông tin người tham gia
    for (
      let index = 0;
      index < registerInfoBHYT["listInsuredPerson"].length;
      index++
    ) {
      // Update thông tin còn thiếu
      registerInfoBHYT["listInsuredPerson"][index].supportBudget = 0;
      registerInfoBHYT["listInsuredPerson"][index].wage = 0;
      registerInfoBHYT["listInsuredPerson"][index].monthInsured =
        state.data.monthDuration;
      registerInfoBHYT["listInsuredPerson"][index].price =
        calculateInsuredPersonPrice(index);

      if (
        registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber !=
          "" &&
        !isValidSocialInsuranceNumber(
          registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber
        )
      ) {
        toast.warn("Số BHYT không hợp lệ");
        scrollToElement(beneficiaries[index].socialInsuranceNumber, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].citizenId == "") {
        toast.warn("Số căn cước công dân không được để trống");
        scrollToElement(beneficiaries[index].citizenId, 2);
        return false;
      }

      if (
        !isValidCitizenId(
          registerInfoBHYT["listInsuredPerson"][index].citizenId
        )
      ) {
        toast.warn("Số căn cước công dân phải là 12 chữ số");
        scrollToElement(beneficiaries[index].citizenId, 2);
        return false;
      }

      if (
        registerInfoBHYT["listInsuredPerson"][index].citizenId != "" &&
        registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront == ""
      ) {
        toast.warn("Bạn cần tải CCCD mặt trước");
        (
          beneficiaries[index].photoCitizenFront.current as HTMLDivElement
        ).scrollIntoView({
          behavior: "smooth",
        });
        return false;
      }

      if (
        registerInfoBHYT["listInsuredPerson"][index].citizenId != "" &&
        registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack == ""
      ) {
        toast.warn("Bạn cần tải CCCD mặt sau");
        (
          beneficiaries[index].photoCitizenBack.current as HTMLDivElement
        ).scrollIntoView({
          behavior: "smooth",
        });
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].fullName == "") {
        toast.warn("Họ và tên không được để trống");
        scrollToElement(beneficiaries[index].fullName, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].doB == "") {
        toast.warn("Ngày sinh không được để trống");
        scrollToElement(beneficiaries[index].dob, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].gender == "") {
        toast.warn("Giới tính không được để trống");
        scrollToElement(beneficiaries[index].gender, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].ethnicId == 0) {
        toast.warn("Dân tộc không được để trống");
        scrollToElement(beneficiaries[index].ethnic, 2);
        return false;
      }

      if (
        registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber != ""
      ) {
        if (
          !isValidHealthInsuranceNumber(
            registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber
          )
        ) {
          toast.warn("Mã BHYT 10-15 ký tự bao gồm chữ và số");
          scrollToElement(beneficiaries[index].healthInsuranceNumber, 2);
          return false;
        }
      }

      if (registerInfoBHYT["listInsuredPerson"][index].newCardStartDate == "") {
        toast.warn("Ngày hiệu lực của thẻ mới không được để trống");
        scrollToElement(beneficiaries[index].newCardStartDate, 2);
        return false;
      }

      // if (registerInfoBHYT['listInsuredPerson'][index].insuranceProvinceId == 0) {
      //   toast.warn(
      //     "Tỉnh / Thành phố nơi tham gia BHYT",
      //   );
      //   scrollToElement(beneficiaries[index].insuranceProvinceId, 2)
      //   return false;
      // }

      if (registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId == 0) {
        toast.warn("Thành phố khám chữa bệnh không được để trống");
        scrollToElement(beneficiaries[index].medicalProvinceId, 2);
        return false;
      }

      // if (registerInfoBHYT['listInsuredPerson'][index].medicalDistrictId == 0) {
      //   toast.warn(
      //     "Quận huyện khám chữa bệnh không được để trống",
      //   );
      //   scrollToElement(beneficiaries[index].medicalDistrictId, 2)
      //   return false;
      // }

      if (registerInfoBHYT["listInsuredPerson"][index].hospitalId == 0) {
        toast.warn("Bệnh viện đăng ký khám chữa bệnh không được để trống");
        scrollToElement(beneficiaries[index].hospitalId, 2);
        return false;
      }

      if (
        registerInfoBHYT["listInsuredPerson"][index].vungLuongToiThieuId == 0
      ) {
        toast.warn("Vui lòng chọn vùng lương tối thiểu");
        scrollToElement(beneficiaries[index].vungLuongToiThieuId, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].benefitLevel == "") {
        toast.warn("Mức hưởng không được để trống");
        scrollToElement(beneficiaries[index].benefitLevel, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].ksTinhThanhMa == 0) {
        toast.warn("Tỉnh thành khai sinh không được để trống");
        scrollToElement(beneficiaries[index].selectedKSProvince, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].ksQuanHuyenMa == 0) {
        toast.warn("Quận huyện khai sinh không được để trống");
        scrollToElement(beneficiaries[index].selectedKSDistrict, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].ksXaPhuongMa == 0) {
        toast.warn("Phường xã khai sinh không được để trống");
        scrollToElement(beneficiaries[index].selectedKSWard, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].ksDiaChi == "") {
        toast.warn("Chi tiết địa chỉ khai sinh không được để trống");
        scrollToElement(beneficiaries[index].ksAddressDetail, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].provinceId == 0) {
        toast.warn("Tỉnh thành thường trú không được để trống");
        scrollToElement(beneficiaries[index].selectedTTProvince, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].districtId == 0) {
        toast.warn("Quận huyện thường trú không được để trống");
        scrollToElement(beneficiaries[index].selectedTTDistrict, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].wardId == 0) {
        toast.warn("Phường xã thường trú không được để trống");
        scrollToElement(beneficiaries[index].selectedTTWard, 2);
        return false;
      }

      if (registerInfoBHYT["listInsuredPerson"][index].addressDetail == "") {
        toast.warn("Địa chỉ cụ thể thường trú không được để trống");
        scrollToElement(beneficiaries[index].ttAddressDetail, 2);
        return false;
      }
    }

    // Thông tin người mua

    // Validate họ và tên
    if (!isValidEmptyString(registerInfoBHYT["fullName"])) {
      toast.warn("Họ và tên không được để trống");
      scrollToElement("fullName", 1);
      return false;
    }

    // Validate số điện thoại
    if (!isValidEmptyString(registerInfoBHYT["phone"])) {
      toast.warn("Số điện thoại không được để trống");
      scrollToElement("phone", 1);

      return false;
    }
    if (!isValidPhone(registerInfoBHYT["phone"])) {
      toast.warn("Số điện thoại không hợp lệ");
      scrollToElement("phone", 1);
      return false;
    }

    if (!isValidFullName(registerInfoBHYT["fullName"])) {
      toast.warn("Họ và tên không hợp lệ");
      scrollToElement("fullName", 1);
      return false;
    }

    // Validate email
    if (isValidEmptyString(registerInfoBHYT["email"])) {
      if (!isValidEmail(registerInfoBHYT["email"])) {
        toast.warn("Email không hợp lệ");
        scrollToElement("email", 1);
        return false;
      }
    }

    // Validate địa chỉ
    if (registerInfoBHYT["provinceId"] == 0) {
      toast.warn("Vui lòng lựa chọn Thành phố");
      scrollToElement("provinceId", 1);
      return false;
    }

    if (registerInfoBHYT["districtId"] == 0) {
      toast.warn("Vui lòng lựa chọn Quận huyện");
      scrollToElement("districtId", 1);
      return false;
    }

    if (registerInfoBHYT["wardId"] == 0) {
      toast.warn("Vui lòng lựa chọn Phường xã");
      scrollToElement("wardId", 1);
      return false;
    }

    if (!isValidEmptyString(registerInfoBHYT["addressDetail"])) {
      toast.warn("Địa chỉ cụ thể không được để trống");
      scrollToElement("addressDetail", 1);
      return false;
    }

    if (!policyTerm2.current) {
      toast.warn("Bạn cần chấp nhận điều khoản của chúng tôi");
      return false;
    }

    return true;
  };

  // const renderHeader = () => {
  //   return (
  //     <HeaderBase
  //       isHome={false}
  //       title={
  //         state.type == "register"
  //           ? "Đăng ký BHYT tự nguyện"
  //           : "Cập nhật BHYT tự nguyện"
  //       }
  //     />
  //   );
  // };

  const renderAddUserBeneficiary = () => {
    return (
      <button
        className="p-4 max-w-[296px] bg-[#0077D5] rounded-xl flex flex-row items-center justify-center gap-2 border border-[#B9BDC1]"
        onClick={addBeneficiary}
      >
        <p className="text-base font-semibold text-[#fff]">
          Thêm người được bảo hiểm
        </p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M1.25122 12C1.25122 6.08579 6.08701 1.25 12.0012 1.25C17.9154 1.25 22.7512 6.08579 22.7512 12C22.7512 17.9142 17.9154 22.75 12.0012 22.75C6.08701 22.75 1.25122 17.9142 1.25122 12ZM12.0012 2.75C6.91543 2.75 2.75122 6.91421 2.75122 12C2.75122 17.0858 6.91543 21.25 12.0012 21.25C17.087 21.25 21.2512 17.0858 21.2512 12C21.2512 6.91421 17.087 2.75 12.0012 2.75ZM7.25122 12C7.25122 11.5858 7.58701 11.25 8.00122 11.25H11.2512V8C11.2512 7.58579 11.587 7.25 12.0012 7.25C12.4154 7.25 12.7512 7.58579 12.7512 8V11.25H16.0012C16.4154 11.25 16.7512 11.5858 16.7512 12C16.7512 12.4142 16.4154 12.75 16.0012 12.75H12.7512V16C12.7512 16.4142 12.4154 16.75 12.0012 16.75C11.587 16.75 11.2512 16.4142 11.2512 16V12.75H8.00122C7.58701 12.75 7.25122 12.4142 7.25122 12Z"
              fill="#fff"
            />
          </svg>
        </div>
      </button>
    );
  };

  const handleUploadFileClick = (
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFileUpload: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const token = localStorage.getItem("accessToken");
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://baohiem.dion.vn/account/api/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFileUpload(response.data.data[0]);
        return response.data.data[0];
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoadingFileUploadUrl(false);
      }
    } else {
      setLoadingFileUploadUrl(false);
    }
  };

  const updateFile = (file: any) => {
    setFileUpload(file);
    registerInfoBHYT["fileUploadUrl"] = file;
    setLoadingFileUploadUrl(false);
  };

  const renderAttachedFiles = () => {
    return (
      <div className="flex flex-col gap-2 mb-[32px]">
        <div className="bg-white rounded-xl flex flex-col border border-[#B9BDC1] overflow-hidden">
          <div>
            <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
              File đính kèm
            </h3>
            <div className="p-[20px]">
              {!fileUpload && (
                <button
                  className="button-add w-[100%] mt-3"
                  onClick={() => handleUploadFileClick(fileUploadUrl)}
                >
                  <div className="flex flex-row justify-center items-center gap-3">
                    <p className="text-[#0076B7] text-base font-semibold">
                      Upload hình ảnh liên quan
                    </p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.75134 12.7915C1.75134 6.87729 6.58713 2.0415 12.5013 2.0415C18.4156 2.0415 23.2513 6.87729 23.2513 12.7915C23.2513 18.7057 18.4156 23.5415 12.5013 23.5415C6.58713 23.5415 1.75134 18.7057 1.75134 12.7915ZM12.5013 3.5415C7.41556 3.5415 3.25134 7.70572 3.25134 12.7915C3.25134 17.8773 7.41556 22.0415 12.5013 22.0415C17.5871 22.0415 21.7513 17.8773 21.7513 12.7915C21.7513 7.70572 17.5871 3.5415 12.5013 3.5415ZM7.75134 12.7915C7.75134 12.3773 8.08713 12.0415 8.50134 12.0415H11.7513V8.7915C11.7513 8.37729 12.0871 8.0415 12.5013 8.0415C12.9156 8.0415 13.2513 8.37729 13.2513 8.7915V12.0415H16.5013C16.9156 12.0415 17.2513 12.3773 17.2513 12.7915C17.2513 13.2057 16.9156 13.5415 16.5013 13.5415H13.2513V16.7915C13.2513 17.2057 12.9156 17.5415 12.5013 17.5415C12.0871 17.5415 11.7513 17.2057 11.7513 16.7915V13.5415H8.50134C8.08713 13.5415 7.75134 13.2057 7.75134 12.7915Z"
                        fill="#0076B7"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileUploadUrl}
            style={{ display: "none" }}
            onChange={(event) => {
              setLoadingFileUploadUrl(true);
              handleFileUpload(event, updateFile);
            }}
          />

          {fileUpload && (
            <div className="flex items-center">
              <img
                src={`https://baohiem.dion.vn${fileUpload}`}
                alt="Ảnh "
                className="w-[100%] object-center rounded-lg"
                onClick={() => handleUploadFileClick(fileUploadUrl)}
              />
            </div>
          )}

          <div className="gap-2 flex flex-col">
            <p className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
              Quy tắc giảm phí cùng hộ gia đình:
            </p>

            <ul className="list-disc px-[35px] md:px-[40px] lg:px-[40px] py-[15px] md:py-[20px] lg:py-[20px]">
              <li>
                <p className="text-sm font-normal">
                  Cung cấp toàn bộ thẻ CCCD gắn chip điện tử những người tham
                  gia BHYT hộ gia đình
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Tất cả thành viên trong gia đình phải có cùng địa chỉ trên thẻ
                  CCCD để được giảm phí
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Trường hợp quan hệ với chủ hộ là “ở nhờ”, “ ở trọ” thì không
                  thuộc đối tượng được giảm phí
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const onCreate = async (token: any) => {
    const response = await axios.post(
      "https://baohiem.dion.vn/insuranceorder/api/add-order",
      registerInfoBHYT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.message == "CREATED" && response.data.status == "201") {
      const result = response.data.data[0];
      registerInfoBHYT["id"] = result.id;
      registerInfoBHYT["insuranceId"] = result.insuranceId;
      registerInfoBHYT["accountId"] = result.accountId;

      result.houseHold.houseHoldPeoples.map((item: any) => {
        delete item.createdTime;
        return item;
      });

      registerInfoBHYT["houseHold"] = result.houseHold;
    }

    toast.success("Đăng ký BBHYT tự nguyện thành công");

    navigate(`/bill-pay-bhyt/${registerInfoBHYT["id"]}`);
  };

  const onUpdate = async (token: any) => {
    const response = await axios.post(
      "https://baohiem.dion.vn/insuranceorder/api/update-insuranceOrder",
      registerInfoBHYT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.message == "CREATED" && response.data.status == "201") {
      registerInfoBHYT["id"] = response.data.data[0];
    }

    toast.success("Cập nhật thành công");

    navigate(`/bill-pay-bhyt/${registerInfoBHYT["id"]}`);
  };

  const onSubmitFormData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      if (registerInfoBHYT["id"] == 0) {
        onCreate(token);
      } else {
        onUpdate(token);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Đăng ký bBHYT tự nguyện thất bại, vui lòng thử lại sau");
    }
  };

  const renderFooter = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {formatMoneyVND(calculatePrice())} VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <button
              type="button"
              onClick={() => {
                if (validateForm()) {
                  onSubmitFormData();
                }
              }}
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    );
  };

  const styleModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      border: "none",
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  const modalLoading = () => {
    return (
      <>
        <Modal isOpen={isLoadingFileUploadUrl} style={styleModal}>
          <div className="w-[400px] h-[750px] relative flex justify-center items-center">
            <FadeLoader height={10} width={3} loading={true} color="#ffffff" />
          </div>
        </Modal>
      </>
    );
  };

  const renderAddMember = () => {
    return (
      <button
        className="p-2 bg-white border border-gray-300 rounded-xl flex flex-row items-center justify-center gap-2"
        onClick={addMember}
      >
        <p className="text-base font-semibold text-[#0076B7]">
          Thêm thành viên
        </p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M1.25122 12C1.25122 6.08579 6.08701 1.25 12.0012 1.25C17.9154 1.25 22.7512 6.08579 22.7512 12C22.7512 17.9142 17.9154 22.75 12.0012 22.75C6.08701 22.75 1.25122 17.9142 1.25122 12ZM12.0012 2.75C6.91543 2.75 2.75122 6.91421 2.75122 12C2.75122 17.0858 6.91543 21.25 12.0012 21.25C17.087 21.25 21.2512 17.0858 21.2512 12C21.2512 6.91421 17.087 2.75 12.0012 2.75ZM7.25122 12C7.25122 11.5858 7.58701 11.25 8.00122 11.25H11.2512V8C11.2512 7.58579 11.587 7.25 12.0012 7.25C12.4154 7.25 12.7512 7.58579 12.7512 8V11.25H16.0012C16.4154 11.25 16.7512 11.5858 16.7512 12C16.7512 12.4142 16.4154 12.75 16.0012 12.75H12.7512V16C12.7512 16.4142 12.4154 16.75 12.0012 16.75C11.587 16.75 11.2512 16.4142 11.2512 16V12.75H8.00122C7.58701 12.75 7.25122 12.4142 7.25122 12Z"
              fill="#0076B7"
            />
          </svg>
        </div>
      </button>
    );
  };

  return (
    <div className="pt-6">
      <HeaderTitle links={[{ title: "Khai báo BHYT tự nguyện" }]} />
      <div className="max-w-[1280px] mx-auto md:pt-[20px] lg:pt-[40px]">
        <h3 className="title-top-header lg1130:px-0 px-[20px]">
          Khai báo BHYT tự nguyện
        </h3>
        <div className="flex flex-row gap-[40px] flex-wrap">
          <div className="flex flex-col gap-4 max-w-[100%] lg1130:px-0 px-[20px] lg1130:max-w-[840px] w-full">
            <div className=" bg-white rounded-xl flex flex-col gap-6">
              <CardObject refs={ObjectTypeRefs} />
            </div>

            <div className=" bg-white rounded-xl flex flex-col gap-6">
              <CardHouseHold refs={houseHoldRefs} />

              {members.map((member: any, index: any) => (
                <CardMembersHouseHold
                  key={`${index}`}
                  item={member}
                  index={index}
                  members={members}
                  ethnicLists={ethnicLists}
                  provinces={provinces}
                  onClose={(index) => {
                    members.splice(index, 1);
                    setMembers([...members]);

                    registerInfoBHYT["houseHold"]["houseHoldPeoples"].splice(
                      index,
                      1
                    );
                  }}
                  refs={member}
                />
              ))}

              {renderAddMember()}
            </div>

            {beneficiaries.map((beneficiary, index) => (
              <UserBeneficiaryBHYTPage
                key={`${index}`}
                index={index}
                price={state?.data?.price}
                onClose={(index) => {
                  beneficiaries.splice(index, 1);
                  setBeneficiaries([...beneficiaries]);

                  registerInfoBHYT["listInsuredPerson"].splice(index, 1);
                }}
                windowSize={windowSize}
                provinces={provinces}
                refs={beneficiary}
                ethnicLists={ethnicLists}
              />
            ))}

            {renderAddUserBeneficiary()}

            <div>
              <UserBuyerPage data={state.data} refs={userBuyerPageRefs} />
            </div>

            <div className="flex flex-col flex-wrap border border-[#B9BDC1] overflow-hidden rounded-xl ">
              <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
                Thông tin thẻ BHYT
              </h3>
              <div className="pt-[20px] md:pt-[40px] lg:pt-[40px] px-[15px] md:px-[40px] lg:px-[40px]">
                <p className="text-sm font-normal text-[#000]">
                  Thông tin BHXH sẽ được cập nhật trên ứng dụng{" "}
                  <strong className="text-[#0076B7] font-bold">VSSID </strong>
                  trong 15 ngày làm việc.
                </p>
              </div>
              <div className="flex gap-2 p-[15px] md:p-[40px] lg:p-[40px]">
                <input
                  type="checkbox"
                  onChange={() => {
                    policyTerm2.current = !policyTerm2.current;
                  }}
                  className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
                  id="unchecked-circular-checkbox"
                />
                <label
                  htmlFor="unchecked-circular-checkbox"
                  className="text-sm font-normal text-[#000] w-[96%]"
                >
                  Tôi cam đoan rằng tất cả những lời khai trên là đúng và đã
                  hiểu rõ
                  <strong className="text-[#0076B7] font-bold">
                    {" "}
                    Chính sách và điều khoản
                  </strong>
                </label>
              </div>
            </div>
          </div>
          <div className="max-w-[100%] lg1130:max-w-[400px] lg1130:px-0 px-[20px] w-full">
            {renderAttachedFiles()}
          </div>
        </div>

        {renderFooter()}

        {modalLoading()}
      </div>
    </div>
  );
};

export default RegisterBHYT;
