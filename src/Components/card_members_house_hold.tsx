import { DatePicker, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import iconClose from "../assets-src/close_1.png";
import { registerInfoBHYT } from "../Page/BHYT/list_health_insurance";
import "../locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import { convertListToSelect, formatDate2 } from "../Utils/validateString";
import axios from "axios";

interface Props {
  item: any;
  index: number;
  members: any;
  ethnicLists: any;
  onClose: (index: any) => void;
  refs: any;
  provinces: any;
}

const CardMembersHouseHold = (props: Props) => {
  const { index, ethnicLists, onClose, refs, provinces } = props;

  // const memberProvinces = useRef([]);
  const memberDistricts = useRef([]);
  const memberWards = useRef([]);

  const [selectedMemberProvince, setSelectedMemberProvince] = useState(
    registerInfoBHYT.houseHold.houseHoldPeoples[index].ksProvinceId
  );
  const [selectedMemberDistrict, setSelectedMemberDistrict] = useState(
    registerInfoBHYT.houseHold.houseHoldPeoples[index].ksDistrictId
  );
  const [selectedMemberWard, setSelectedMemberWard] = useState(
    registerInfoBHYT.houseHold.houseHoldPeoples[index].ksWardId
  );
  const [addressDetailMember, setAddressDetailMember] = useState<string>(
    registerInfoBHYT.houseHold.houseHoldPeoples[index].ksAddressDetail
  );

  const [temp, setTemp] = useState(0);

  // Cập nhập danh sách quận huyện hộ gia đình
  useEffect(() => {
    fetchMemberProvinces();
  }, [selectedMemberProvince]);

  console.log(temp);

  const fetchMemberProvinces = () => {
    if (selectedMemberProvince !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedMemberProvince}`
        )
        .then((response) => {
          memberDistricts.current = response.data.data;
          memberWards.current = [];
          setTemp(Math.random());
        })
        .catch((error) => {
          memberDistricts.current = [];
          setTemp(Math.random());
          console.error(error);
        });
    }
  };

  // Cập nhập danh sách phường xã hộ gia đình
  useEffect(() => {
    fetchMemberWards();
  }, [selectedMemberDistrict]);

  const fetchMemberWards = () => {
    if (selectedMemberDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedMemberDistrict}`
        )
        .then((response) => {
          memberWards.current = response.data.data;
          setTemp(Math.random());
        })
        .catch((error) => {
          memberWards.current = [];
          setTemp(Math.random());
          console.error(error);
        });
    }
  };

  const dateFormat = "DD/MM/YYYY";

  const inputProvinceMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành phố khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.ksProvinceId}
          // // // dropdownMatchSelectWidth={false}
          placeholder="Thành phố"
          value={selectedMemberProvince}
          key={selectedMemberProvince}
          onChange={(value: any) => {
            setSelectedMemberProvince(value);

            memberDistricts.current = [];
            memberWards.current = [];

            setSelectedMemberDistrict(0);
            setSelectedMemberWard(0);

            registerInfoBHYT.houseHold.houseHoldPeoples[index].ksProvinceId =
              value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, "Thành phố")}
        />
      </div>
    );
  };

  const inputDistrictMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          // // // dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          ref={refs.ksDistrictId}
          value={selectedMemberDistrict}
          key={selectedMemberDistrict}
          onChange={(value: any) => {
            setSelectedMemberDistrict(value);

            memberWards.current = [];
            setSelectedMemberWard(0);

            registerInfoBHYT.houseHold.houseHoldPeoples[index].ksDistrictId =
              value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(memberDistricts.current, "Quận huyện")}
        />
      </div>
    );
  };

  const inputWardMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã khai sinh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.ksWardId}
          // // // dropdownMatchSelectWidth={false}
          placeholder="Phường xã"
          value={selectedMemberWard}
          key={selectedMemberWard}
          onChange={(value: any) => {
            setSelectedMemberWard(value);

            registerInfoBHYT.houseHold.houseHoldPeoples[index].ksWardId = value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(memberWards.current, "Phường xã")}
        />
      </div>
    );
  };

  const inputAddressDetailMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể khai sinh
        </label>
        <Input
          type="text"
          id="address"
          ref={refs.ksAddressDetail}
          value={addressDetailMember}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailMember(e.target.value);

            registerInfoBHYT.houseHold.houseHoldPeoples[index].ksAddressDetail =
              e.target.value;
          }}
        />
      </div>
    );
  };

  const inputFullNameMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={refs.name}
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].name}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Họ và tên"
          onChange={(e) => {
            registerInfoBHYT.houseHold.houseHoldPeoples[index].name =
              e.target.value;
          }}
        />
      </div>
    );
  };

  const inputRelationshipMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mối quan hệ <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.relationShipId}
          placeholder="Chọn mối quan hệ"
          defaultValue={
            registerInfoBHYT.houseHold.houseHoldPeoples[index].relationShipId
          }
          // // // dropdownMatchSelectWidth={false}
          onChange={(value) => {
            registerInfoBHYT.houseHold.houseHoldPeoples[index].relationShipId =
              value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mối quan hệ" },
            { value: "00", label: "Chủ hộ" },
            { value: "01", label: "Vợ" },
            { value: "02", label: "Chồng" },
            { value: "03", label: "Bố" },
            { value: "04", label: "Mẹ" },
            { value: "05", label: "Em" },
            { value: "06", label: "Anh" },
            { value: "07", label: "Chị" },
            { value: "08", label: "Con" },
            { value: "09", label: "Cháu" },
            { value: "10", label: "Ông" },
            { value: "11", label: "Bà" },
            { value: "12", label: "Cô" },
            { value: "13", label: "Dì" },
            { value: "14", label: "Chú" },
            { value: "15", label: "Thím" },
            { value: "16", label: "Bác" },
            { value: "17", label: "Cậu" },
            { value: "18", label: "Mợ" },
            { value: "19", label: "Con dâu" },
            { value: "20", label: "Con rể" },
            { value: "21", label: "Chắt" },
            { value: "99", label: "Khác" },
          ]}
        />
      </div>
    );
  };

  const inputCCCDMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          maxLength={12}
          ref={refs.citizenId}
          defaultValue={
            registerInfoBHYT.houseHold.houseHoldPeoples[index].citizenId
          }
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập CCCD"
          onChange={(e) => {
            registerInfoBHYT.houseHold.houseHoldPeoples[index].citizenId =
              e.target.value;
          }}
        />
      </div>
    );
  };

  const inputGenderMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          ref={refs.gender}
          placeholder="Chọn giới tính"
          defaultValue={
            registerInfoBHYT.houseHold.houseHoldPeoples[index].gender
          }
          // // // dropdownMatchSelectWidth={false}
          onChange={(value) => {
            registerInfoBHYT.houseHold.houseHoldPeoples[index].gender = value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn giới tính" },
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
        />
      </div>
    );
  };

  const inputEthnicMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: "300px" }}
          showSearch
          ref={refs.ethnicId}
          defaultValue={
            registerInfoBHYT.houseHold.houseHoldPeoples[index].ethnicId
          }
          placeholder="Chọn dân tộc"
          onChange={(value) => {
            registerInfoBHYT.houseHold.houseHoldPeoples[index].ethnicId = value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(ethnicLists, "Chọn dân tộc")}
        />
      </div>
    );
  };

  const inputDobMember = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          ref={refs.doB}
          className="w-[100%]"
          defaultValue={
            registerInfoBHYT.houseHold.houseHoldPeoples[index].doB == ""
              ? ""
              : dayjs(
                  registerInfoBHYT.houseHold.houseHoldPeoples[index].doB,
                  dateFormat
                )
          }
          placeholder="dd/mm/yyyy"
          onChange={(value) => {
            const dateObject = dayjs(value.toString());
            const dateStr = `${dateObject
              .date()
              .toString()
              .padStart(2, "0")}/${(dateObject.month() + 1)
              .toString()
              .padStart(2, "0")}/${dateObject.year()}`;

            registerInfoBHYT.houseHold.houseHoldPeoples[index].doB = dateStr;
          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    );
  };

  return (
    <div className="rounded-xl flex flex-col flex-wrap border border-[#B9BDC1] overflow-hidden">
      <div className="flex  bg-[#0077D5] p-[20px]">
        <div className="text-base font-semibold text-[#fff] w-full ">
          Thông tin thành viên số {index + 1}
        </div>
        {index != 0 ? (
          <button
            type="button"
            onClick={() => {
              onClose(index);
            }}
          >
            <img alt="icon close" src={iconClose} className="w-3 h-3" />
          </button>
        ) : null}
      </div>

      <div className="p-[40px] flex flex-row flex-wrap justify-between w-full gap-2">
        {/* Họ tên */}
        {inputFullNameMember()}

        {/* Số CCCD thành viên  */}
        {inputCCCDMember()}

        {/* Dân tộc */}
        {inputEthnicMember()}

        {/* Giới tính thành viên */}
        {inputGenderMember()}

        {/* Mối quan hệ */}
        {inputRelationshipMember()}

        {/* Ngày sinh */}
        {inputDobMember()}

        {/* Thành phố khai sinh */}
        {inputProvinceMember()}

        {/* Quận huyện khai sinh */}
        {inputDistrictMember()}

        {/* Phường xã khai sinh */}
        {inputWardMember()}

        {/* Địa chỉ cụ thể khai sinh */}
        {inputAddressDetailMember()}
      </div>
    </div>
  );
};

export default CardMembersHouseHold;
