import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { registerInfoBHYT } from "../pages/bhyt/list_health_insurance_page";
import {
  convertListToSelectObjectTypeGroup,
  convertListToSelectObjectTypeGroupList,
} from "../utils/validate_string";
import { APP_CONFIG } from "../utils/constants";

interface Props {
  refs?: any;
}

const CardObject = (props: Props) => {
  const { refs } = props;

  const [objectTypeGroupList, setObjectTypeGroupList] = useState<any>([]);
  const [objectTypeGroup, setObjectTypeGroup] = useState<any>([]);

  const [selectedObjectTypeGroupList, setSelectedObjectTypeGroupList] =
    useState(registerInfoBHYT.nhomLoaiDoiTuongId);
  const [selectedObjectTypeGroup, setSelectedObjectTypeGroup] = useState(
    registerInfoBHYT.loaiDoiTuongId
  );

  useEffect(() => {
    axios
      .get(`${APP_CONFIG.BASE_URL}/nhomloaidoituong/api/list`)
      .then((response) => {
        setObjectTypeGroupList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchObjectTypeGroup();
  }, [selectedObjectTypeGroupList]);

  const fetchObjectTypeGroup = () => {
    if (selectedObjectTypeGroup !== 0) {
      axios
        .get(
          `${APP_CONFIG.BASE_URL}/loaidoituong/api/listbynhomloaidoituongid?nhomloaidoituongid=${selectedObjectTypeGroupList}`
        )
        .then((response) => {
          setObjectTypeGroup(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderTextHeader = () => {
    return (
      <h3 className="text-base font-semibold text-[#fff] w-full p-[20px] bg-[#0077D5]">
        Thông tin đối tượng tham gia
      </h3>
    );
  };

  const renderObjectTypeGroupList = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Nhóm loại đối tượng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.nhomLoaiDoiTuongId}
          dropdownStyle={{ maxWidth: "300px" }}
          // // // dropdownMatchSelectWidth={false}
          placeholder="Chọn loại đối tượng"
          value={selectedObjectTypeGroupList}
          key={selectedObjectTypeGroupList}
          onChange={(value: any) => {
            setSelectedObjectTypeGroupList(value);

            setSelectedObjectTypeGroup(null);

            registerInfoBHYT.nhomLoaiDoiTuongId = value;

            registerInfoBHYT.loaiDoiTuongId = null;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelectObjectTypeGroupList(objectTypeGroupList)}
        />
      </div>
    );
  };

  const renderObjectTypeGroup = () => {
    return (
      <div className="w-full lg1130:w-[49%]">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Loại đối tượng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.loaiDoiTuongId}
          dropdownStyle={{ maxWidth: "300px" }}
          // // // dropdownMatchSelectWidth={false}
          placeholder="Chọn loại đối tượng"
          value={selectedObjectTypeGroup}
          key={selectedObjectTypeGroup}
          onChange={(value: any) => {
            setSelectedObjectTypeGroup(value);

            registerInfoBHYT.loaiDoiTuongId = value;
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelectObjectTypeGroup(objectTypeGroup)}
        />
      </div>
    );
  };

  return (
    <div className="rounded-xl flex flex-col flex-wrap border border-[#B9BDC1] overflow-hidden">
      {renderTextHeader()}

      <div className="flex flex-row justify-between flex-wrap p-[15px] md:p-[20px] lg:p-[40px]">
        {renderObjectTypeGroupList()}

        {renderObjectTypeGroup()}
      </div>
    </div>
  );
};

export default CardObject;
