import { request } from "../utils";
import store from "../utils/store";
import webconfig from "../webconfig";

export function loginByWallet(data) {
  return request.put("/auth/login-by-dot", { data });
}
export function applyCode(email) {
  let data = { email };
  return request.put("/auth/apply-code", { data });
}
export function loginByEmail(email, authCode) {
  let data = { email, authCode };
  return request.put("/auth/login-by-email", { data });
}
export function loginByEvm(ethAddress, dotAddress, timestamp, sign) {
  let data = { ethAddress, dotAddress, timestamp, sign };
  return request.put("/auth/login-by-eth", { data });
}
export async function getConfig() {
  console.log('get config')
  let res = await request.get("/config");
  if (!res || !res.ok) {
    return null;
  }
  let config = {
    videoApiUrl: webconfig.videoApiUrl,
    apiUrl: webconfig.apiUrl,
    nodeURLs: res.ok.chainRpcUrls,
    contractAddress: res.ok.contractAddress,
    gatewayAddr: res.ok.authorizedAddress,
    ss58Format: res.ok.chainId,
    cats: res.ok.nftCatelogs,
  }
  store.set('webconfig', config);
  return config;
}
