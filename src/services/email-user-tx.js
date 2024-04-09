import { getCessSdk, getAPI } from "../utils/init-polkadot-api";
import { message } from "antd";
import { request } from "../utils";
import store from "../utils/store";

let bucket = null;
let space2 = null;
let authorizeHandle = null;
let fileHandle = null;
let common = null;

async function init() {
    if (bucket) return;
    let sdk = await getCessSdk();
    bucket = sdk.bucket;
    space2 = sdk.space;
    authorizeHandle = sdk.authorize;
    fileHandle = sdk.file;
    common = sdk.common;
}

export {
    submitExtrinsic,
    authorize,
    buySpace,
    renewalSpace,
};

async function submitExtrinsic(extrinsic) {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
    await init();
    let data = { walletAddress: acc.address, extrinsic };
    let ret = await request.put("/auth/sign-tx", { data });
    console.log({ ret });
    if (!ret.ok) {
        ret.msg = 'error';
        return ret;
    }
    ret = await common.submitTransaction(ret.ok);
    let result = { msg: 'ok', data: ret };
    return result;
}
function getAccount() {
    let acc = store.get("account");
    return acc;
}
async function buySpace(gibCount) {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
    await init();
    let api =await getAPI();
    let result = await space2.userOwnedSpace(acc.address);
    let extrinsic;
    if (result.data?.totalSpace) {
        extrinsic = api.tx.storageHandler.expansionSpace(gibCount);
    } else {
        extrinsic = api.tx.storageHandler.buySpace(gibCount);
    }
    result = await submitExtrinsic(extrinsic);
    return result;
}
async function renewalSpace(days) {
    await init();
    let api =await getAPI();
    return submitExtrinsic(api.tx.storageHandler.renewalSpace(days));
}
async function authorize() {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
    await init();
    let api =await getAPI();
    return submitExtrinsic(api.tx.oss.authorize(acc.address));
}