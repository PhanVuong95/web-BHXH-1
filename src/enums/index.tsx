export enum EBank {
  BIDV = "BIDV",
}

export enum ETransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum EQrCodeType {
  CALL_API = "CALL_API",
  REFER = "REFER",
  LOGIN_PORTAL = "LOGIN_PORTAL",
}

// export const EQrCodeType = createEnum({
//   CALL_API: "CALL_API",
//   REFER: "REFER",
//   LOGIN_PORTAL: "LOGIN_PORTAL",
// });

export enum EWsEvent {
  APP_LOGIN_PORTAL = "APP_LOGIN_PORTAL",
  ERROR = "ERROR",
}
