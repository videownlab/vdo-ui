import { Space as Space2, Bucket, Common, Authorize, File } from "cess-js-sdk";
import { getAPI } from "../utils/init-polkadot-api";
import { formatBalance, formatterSize } from "../utils/formatter";
import { getItem, setItem } from "../utils/cache";
import { message } from "antd";
import { request } from "../utils";

getAPI();
const bucket = new Bucket(window.api, window.keyring, true);
const space2 = new Space2(window.api, window.keyring, true);
const authorizeHandle = new Authorize(window.api, window.keyring, true);
const fileHandle = new File(window.api, window.keyring, true);
const common = new Common(window.api, window.keyring, true);

export {
    //   queryBucketList,
    //   createBucket,
    //   queryBucketInfo,
    //   deleteBucket,

    //   queryAuthorityList,
    submitExtrinsic,
    authorize,
    //   cancelAuthorize,

    //   userOwnedSpace,
    buySpace,
    renewalSpace,

    //   queryFileList,
    //   uploadFile,
    //   downloadFile,
    //   queryFileMetadata,
    //   deleteFile,
};

async function submitExtrinsic(extrinsic) {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
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
    let acc = getItem("account");
    return acc;
}
async function buySpace(gibCount) {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
    let api = getAPI();
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
function renewalSpace(days) {
    return submitExtrinsic(window.api.tx.storageHandler.renewalSpace(days));
}
async function authorize() {
    let acc = getAccount();
    if (!acc) {
        return message.error("login firist please");
    }
    return submitExtrinsic(window.api.tx.oss.authorize(acc.address));
}