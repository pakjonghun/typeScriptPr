export const commonMessages = {
  commonFail: (value) => ({
    ok: false,
    error: `${value}가 실패했습니다 관리자에게 문의하세요.`,
  }),
  commonNotFuond: (value) => ({
    ok: false,
    error: `${value} 찾을수 없습니다.`,
  }),
  commonExist: (value) => ({
    ok: false,
    error: `${value}이미 존재합니다.`,
  }),
  commonUnAuth: (value) => ({
    ok: false,
    error: `${value} 권한이 없습니다.`,
  }),
};
