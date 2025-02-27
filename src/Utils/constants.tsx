// export const BASE_URL = "https://dev-baohiem.dion.vn"
// export const BASE_URL = "https://portal-bhxh.dnpgroup.com.vn";
export const APP_CONFIG = {
  BASE_URL: __CONFIG_APP__.VITE_BASE_URL,
  ZALO_ID: __CONFIG_APP__.VITE_ZALO_ID,
  ZALO_BHV_ID: __CONFIG_APP__.VITE_ZALO_BHV_ID,
  VIET_QR_URI: __CONFIG_APP__.VITE_VIET_QR_URI,
};

export const listEthnics = [
  { name: "Kinh" },
  { name: "Tày" },
  { name: "Thái" },
  { name: "Hoa" },
  { name: "Khơ-me" },
  { name: "Mường" },
  { name: "Nùng" },
  { name: "HMông" },
  { name: "Dao" },
  { name: "Gia-rai" },
  { name: "Ngái" },
  { name: "Ê-đê" },
  { name: "Ba na" },
  { name: "Xơ-Đăng" },
  { name: "Sán Chay" },
  { name: "Cơ-ho" },
  { name: "Chăm" },
  { name: "Sán Dìu" },
  { name: "Hrê" },
  { name: "Mnông" },
  { name: "Ra-glai" },
  { name: "Xtiêng" },
  { name: "Bru-Vân Kiều" },
  { name: "Thổ" },
  { name: "Giáy" },
  { name: "Cơ-tu" },
  { name: "Gié Triêng" },
  { name: "Mạ" },
  { name: "Khơ-mú" },
  { name: "Co" },
  { name: "Tà-ôi" },
  { name: "Chơ-ro" },
  { name: "Kháng" },
  { name: "Xinh-mun" },
  { name: "Hà Nhì" },
  { name: "Chu ru" },
  { name: "Lào" },
  { name: "La Chí" },
  { name: "La Ha" },
  { name: "Phù Lá" },
  { name: "La Hủ" },
  { name: "Lự" },
  { name: "Lô Lô" },
  { name: "Chứt" },
  { name: "Mảng" },
  { name: "Pà Thẻn" },
  { name: "Co Lao" },
  { name: "Cống" },
  { name: "Bố Y" },
  { name: "Si La" },
  { name: "Pu Péo" },
  { name: "Brâu" },
  { name: "Ơ Đu" },
];

export const formattedEthnics = [
  { value: "", label: "Chọn dân tộc" },
  { value: "Kinh", label: "Kinh" },
  { value: "Tày", label: "Tày" },
  { value: "Thái", label: "Thái" },
  { value: "Hoa", label: "Hoa" },
  { value: "Khơ-me", label: "Khơ-me" },
  { value: "Mường", label: "Mường" },
  { value: "Nùng", label: "Nùng" },
  { value: "HMông", label: "HMông" },
  { value: "Dao", label: "Dao" },
  { value: "Gia-rai", label: "Gia-rai" },
  { value: "Ngái", label: "Ngái" },
  { value: "Ê-đê", label: "Ê-đê" },
  { value: "Ba na", label: "Ba na" },
  { value: "Xơ-Đăng", label: "Xơ-Đăng" },
  { value: "Sán Chay", label: "Sán Chay" },
  { value: "Cơ-ho", label: "Cơ-ho" },
  { value: "Chăm", label: "Chăm" },
  { value: "Sán Dìu", label: "Sán Dìu" },
  { value: "Hrê", label: "Hrê" },
  { value: "Mnông", label: "Mnông" },
  { value: "Ra-glai", label: "Ra-glai" },
  { value: "Xtiêng", label: "Xtiêng" },
  { value: "Bru-Vân Kiều", label: "Bru-Vân Kiều" },
  { value: "Thổ", label: "Thổ" },
  { value: "Giáy", label: "Giáy" },
  { value: "Cơ-tu", label: "Cơ-tu" },
  { value: "Gié Triêng", label: "Gié Triêng" },
  { value: "Mạ", label: "Mạ" },
  { value: "Khơ-mú", label: "Khơ-mú" },
  { value: "Co", label: "Co" },
  { value: "Tà-ôi", label: "Tà-ôi" },
  { value: "Chơ-ro", label: "Chơ-ro" },
  { value: "Kháng", label: "Kháng" },
  { value: "Xinh-mun", label: "Xinh-mun" },
  { value: "Hà Nhì", label: "Hà Nhì" },
  { value: "Chu ru", label: "Chu ru" },
  { value: "Lào", label: "Lào" },
  { value: "La Chí", label: "La Chí" },
  { value: "La Ha", label: "La Ha" },
  { value: "Phù Lá", label: "Phù Lá" },
  { value: "La Hủ", label: "La Hủ" },
  { value: "Lự", label: "Lự" },
  { value: "Lô Lô", label: "Lô Lô" },
  { value: "Chứt", label: "Chứt" },
  { value: "Mảng", label: "Mảng" },
  { value: "Pà Thẻn", label: "Pà Thẻn" },
  { value: "Co Lao", label: "Co Lao" },
  { value: "Cống", label: "Cống" },
  { value: "Bố Y", label: "Bố Y" },
  { value: "Si La", label: "Si La" },
  { value: "Pu Péo", label: "Pu Péo" },
  { value: "Brâu", label: "Brâu" },
  { value: "Ơ Đu", label: "Ơ Đu" },
];

export const BenefitLevevlList = [
  {
    value: "1",
    label:
      "Được quỹ BHYT thanh toán 100% chi phí khám bệnh, chữa bệnh (KCB) thuộc phạm vi chi trả BHYT và không áp dụng giới hạn tỷ lệ thanh toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế về danh mục và tỷ lệ, điều kiện thanh toán dịch vụ kỹ thuật; chi phí vận chuyển người bệnh từ tuyến huyện lên tuyến trên trong trường hợp cấp cứu hoặc khi đang điều trị nội trú phải chuyển tuyến chuyên môn kỹ thuật, bao gồm các đối tượng hưởng có ký hiệu là: CC, TE",
  },
  {
    value: "2",
    label:
      "Được quỹ BHYT thanh toán 100% chi phí KCB thuộc phạm vi chi trả BHYT (có giới hạn tỷ lệ thanh toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế); chi phí vận chuyển người bệnh từ tuyến huyện lên tuyến trên trong trường hợp cấp cứu hoặc khi đang điều trị nội trú phải chuyển tuyến chuyên môn kỹ thuật, bao gồm các đối tượng hưởng có ký hiệu là: CK, CB, KC, HN, DT, DK, XD, BT, TS",
  },
  {
    value: "3",
    label:
      "Được quỹ BHYT thanh toán 95% chi phí KCB thuộc phạm vi chi trả BHYT (có giới hạn tỷ lệ thanh toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế); 100% chi phí KCB tại tuyến xã và chi phí cho một lần KCB thấp hơn 15% tháng lương cơ sở, bao gồm các đối tượng hưởng có ký hiệu là: HT, TC, CN",
  },
  {
    value: "4",
    label:
      "Được quỹ BHYT thanh toán 80% chi phí KCB thuộc phạm vi chi trả BHYT (có giới hạn tỷ lệ thanh toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế); 100% chi phí KCB tại tuyến xã và chi phí cho một lần KCB thấp hơn 15% tháng lương cơ sở, bao gồm các đối tượng hưởng có ký hiệu là: DN, HX, CH, NN, TK, HC, XK, TB, NO, CT, XB, TN, CS, XN, MS, HD, TQ, TA, TY, HG, LS, PV, HS, SV, GB, GD",
  },
  {
    value: "5",
    label:
      "Được quỹ BHYT thanh toán 100% chi phí KCB, kể cả chi phí KCB ngoài phạm vi được hưởng BHYT; chi phí vận chuyển, bao gồm các đối tượng hưởng có ký hiệu là QN, CA, CY",
  },
];

export const RoleAccount = {
  ADM: "1001",
  USER: "1002",
  CTV: "1003",
};

export const RoleName = {
  "1001": "Admin",
  "1002": "Người dùng",
  "1003": "Cộng tác viên",
};

export const RoleId = {
  Admin: 1001,
  User: 1002,
  CTV: 1003,
};

export type RoleNameKey = keyof typeof RoleName;
