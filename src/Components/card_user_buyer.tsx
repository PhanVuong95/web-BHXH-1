import axios from "axios";
import { useEffect, useState } from "react";
import { registerInfoBHYT } from "../pages/bhyt/list_health_insurance_page";
import { Input, Select } from "antd";
import { convertListToSelect } from "../utils/validate_string";
import { APP_CONFIG } from "../utils/constants";

interface Props {
  data: any;
  refs: any;
}

const UserBuyerPage = (props: Props) => {
  const { refs } = props;
  const [phone, setPhone] = useState(registerInfoBHYT["phone"]);
  const [fullName, setFullName] = useState(registerInfoBHYT["fullName"]);
  const [email, setEmail] = useState(registerInfoBHYT["email"]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    registerInfoBHYT["districtId"]
  );
  const [selectedProvince, setSelectedProvince] = useState(
    registerInfoBHYT["provinceId"]
  );
  const [selectedWard, setSelectedWard] = useState(registerInfoBHYT["wardId"]);
  const [wards, setWards] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [addressDetail, setAddressDetail] = useState(
    registerInfoBHYT["addressDetail"]
  );

  useEffect(() => {
    axios
      .get(`${APP_CONFIG.BASE_URL}/province/api/list`)
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
    if (selectedProvince !== 0) {
      axios
        .get(
          `${APP_CONFIG.BASE_URL}/district/api/list-by-provinceId?provinceId=${selectedProvince}`
        )
        .then((response) => {
          setDistricts(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    setWards([]);
    if (selectedDistrict !== 0) {
      axios
        .get(
          `${APP_CONFIG.BASE_URL}/ward/api/list-by-districtId?districtId=${selectedDistrict}`
        )
        .then((response) => {
          setWards(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (value: any) => {
    const id = parseInt(value, 10);
    setSelectedProvince(id);
    setSelectedDistrict(0);
    setSelectedWard(0);
    registerInfoBHYT["provinceId"] = id;
  };

  const handleDistrictChange = (value: any) => {
    const id = parseInt(value, 10);
    setSelectedDistrict(id);
    setSelectedWard(0);
    registerInfoBHYT["districtId"] = id;
  };

  const handlEwardChange = (value: any) => {
    const id = parseInt(value, 10);
    setSelectedWard(id);
    registerInfoBHYT["wardId"] = id;
  };

  const renderTextHeader = () => {
    return (
      <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
        Thông tin người mua
      </h3>
    );
  };

  const renderInputPhone = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số điện thoại <samp className="text-red-600">*</samp>
        </label>

        <Input
          type="text"
          id="phone"
          ref={refs.phone}
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            registerInfoBHYT["phone"] = e.target.value;
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Số điện thoại"
          required
        />
      </div>
    );
  };

  const renderFullName = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="name"
          ref={refs.fullName}
          maxLength={35}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            registerInfoBHYT["fullName"] = e.target.value;
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập tên của bạn"
          required
        />
      </div>
    );
  };

  const renderEmail = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Email
        </label>
        <Input
          type="email"
          id="email"
          ref={refs.email}
          value={email}
          maxLength={35}
          onChange={(e) => {
            setEmail(e.target.value);
            registerInfoBHYT["email"] = e.target.value;
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="Nhập email của bạn"
          required
        />
      </div>
    );
  };

  const renderProvince = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Tỉnh thành phố <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: "300px" }}
          showSearch
          ref={refs.provinceId}
          placeholder="Chọn tỉnh thành phố"
          value={selectedProvince}
          // // // dropdownMatchSelectWidth={false}
          onChange={handleProvinceChange}
          key={selectedProvince}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, "Chọn tỉnh thành phố")}
        />
      </div>
    );
  };

  const renderDistrict = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: "300px" }}
          showSearch
          ref={refs.districtId}
          placeholder="Chọn quận huyện"
          value={selectedDistrict}
          // // // dropdownMatchSelectWidth={false}
          onChange={handleDistrictChange}
          key={selectedDistrict}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(districts, "Chọn quận huyện")}
        />
      </div>
    );
  };

  const renderWard = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: "300px" }}
          showSearch
          ref={refs.wardId}
          placeholder="Chọn phường xã"
          value={selectedWard}
          onChange={handlEwardChange}
          key={selectedWard}
          // // // dropdownMatchSelectWidth={false}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(wards, "Chọn phường xã")}
        />
      </div>
    );
  };

  const renderAddressDetail = () => {
    return (
      <div className="w-full ">
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          ref={refs.addressDetail}
          value={addressDetail}
          maxLength={200}
          onChange={(e) => {
            setAddressDetail(e.target.value);
            registerInfoBHYT["addressDetail"] = e.target.value;
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             "
          placeholder="VD: Số nhà, số đường,...."
          required
        />
      </div>
    );
  };

  return (
    <div className=" bg-white rounded-xl flex flex-row flex-wrap border border-[#B9BDC1] overflow-hidden">
      {renderTextHeader()}
      <div className="p-[15px] md:p-[20px] lg:p-[40px] flex flex-row flex-wrap justify-between w-full gap-2">
        {renderFullName()}

        {renderInputPhone()}

        {renderEmail()}

        {renderProvince()}

        {renderDistrict()}

        {renderWard()}

        {renderAddressDetail()}
      </div>
    </div>
  );
};

export default UserBuyerPage;
