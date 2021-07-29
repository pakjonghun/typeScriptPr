export class CommonOutput {
  ok: boolean;
  error?: string;
  data?: object;
}

export const commonErrorOutput = {
  ok: false,
  error: '알수없는 오류가 발생했습니다. 관리자에게 문의하세요.',
};

export const commonInputOutput = {
  ok: false,
  error: '올바른 값을 입력하세요.',
};
