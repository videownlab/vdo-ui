import { request } from "../utils";

export function loginByWallet(data) {
  return request.put("/auth/login-by-wallet", { data });
}
export function applyCode(email) {
  let data = { email };
  return request.put("/auth/apply-code", { data });
}
export function loginByEmail(email, authCode) {
  let data = { email, authCode };
  return request.put("/auth/login-by-email", { data });
}

