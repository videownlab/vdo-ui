import { getAPI } from "../utils/init-polkadot-api";
import { sleep } from "../utils/index";
import { userOwnedSpace } from "./oss";
import { hexToString } from "@polkadot/util";
import { getMappingAccount, signAndSendEvm, signMessage } from 'evm-account-mapping-sdk'
import { custom, createWalletClient } from 'viem'
import { loginByEvm, getTimestamp } from "./auth";
import store from "../utils/store";
import { mainnet } from 'viem/chains'
import webconfig from "../webconfig";
import { formatBalance } from "../utils/formatter";
import bs58 from "bs58";


let walletClient = null;
let mappingAccount;

export default {
    connectEvmWallet,
    signMsg,
    submitTx,
    createBucket,
    deleteBucket,
    authorize,
    buySpace,
    renewalSpace,
    uploadFile,
    deleteFile
};
function getAccount() {
    let acc = store.get("account");
    return acc;
}
async function init() {
    let api = await getAPI();
    return api;
}
async function signMsg(msg) {
    try {
        if (!window.api || !window.keyring) {
            await init();
        }
        while (!window.api || !window.keyring) {
            await sleep(0.5);
        }
        if (!walletClient) {
            await connectEvmWallet();
        }
        // if (!msg.includes("<Bytes>")) {
        //     msg = `<Bytes>${msg}</Bytes>`;
        // }
        let sign = await signMessage(walletClient, { address: mappingAccount.evmAddress }, msg);
        // sign = sign.replace("0x", "");
        return sign;
    } catch (e) {
        console.log(e);
        return null;
    }
}
async function queryBalance(account) {
    let api = await getAPI();
    const { nonce, data: balance } = await window.api.query.system.account(account.address);
    console.log("balance", balance);
    console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
    account.nonce = nonce;
    account.balance = formatBalance(balance);
    account.balance_str = account.balance + " TCESS";
    return account;
}
async function connectEvmWallet() {
    try {
        if (!window.api || !window.keyring) {
            await init();
        }
        while (!window.api || !window.keyring) {
            await sleep(0.5);
        }
        if (!window.ethereum) {
            alert('Please install a EVM wallet');
            return null;
        }
        walletClient = createWalletClient({ chain: mainnet, transport: custom(window.ethereum) });
        const [address] = await walletClient.requestAddresses();
        console.log({ address, road: 'there' })
        const SS58Prefix = (window.api?.consts?.system?.ss58Prefix || 11330).toNumber();
        let ma = await getMappingAccount(window.api, walletClient, { address }, { SS58Prefix });
        mappingAccount = ma;
        let acc = ma;
        acc.address = ma.substrateAddress;
        acc = await queryBalance(acc);
        store.set("addr", acc.address);
        store.set("account", acc);
        store.set("accounts", [acc]);
        store.set("identity", acc.address);
        store.set("accountType", 'evm');
        let timestamp = await getTimestamp();//  
        if (timestamp && timestamp.ok) {
            timestamp = timestamp.ok;
        } else {
            timestamp = parseInt(new Date().valueOf() / 1000);
        }
        let randomStr = acc.evmAddress + acc.address + timestamp;

        let sign = await signMessage(walletClient, { address: ma.evmAddress }, randomStr);
        sign = sign.replace("0x", "");
        let ret = await loginByEvm(ma.evmAddress, acc.address, timestamp, sign);
        if (ret.ok?.token) {
            ret.msg = 'ok';
            store.set("token", ret.ok.token);
        } else {
            ret.msg = 'login fail';
        }
        ret.account = acc;
        return ret;
    } catch (e) {
        console.log(e);
        let msg = e.message;
        if (msg.includes('rejected')) {
            return null;
        }
        return { msg };
    }
}
async function submitTx(extrinsic) {
    let ret = '';
    try {
        if (!walletClient) {
            await connectEvmWallet();
        }
        const result = await signAndSendEvm(
            extrinsic,
            window.api,
            walletClient,
            mappingAccount
        );
        const trId = result.status.asInBlock.toHex();
        ret = { msg: 'ok', data: trId };
    } catch (e) {
        console.log(e);
        let msg = e.message || e;
        if (typeof msg == 'object') {
            msg = JSON.stringify(msg);
        }
        if (msg.includes('balance too low')) {
            ret = { msg: 'Insufficient Balance' };
        } else {
            ret = { msg };
        }
    }
    return ret;
}
function subState(o) {
    console.log(o);
}

//bucket  ok
async function createBucket(name) {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please(createBucket)");
    }
    const extrinsic = window.api.tx.fileBank.createBucket(acc.address, name);
    let result = await submitTx(extrinsic);
    return result;
}
async function deleteBucket(name) {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please");
    }
    const extrinsic = window.api.tx.fileBank.deleteBucket(acc.address, name);
    let result = await submitTx(extrinsic);
    return result;
}
//auth ok
async function authorize() {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please(authorize)");
    }
    const extrinsic = window.api.tx.oss.authorize(webconfig.gatewayAddr);
    let result = await submitTx(extrinsic);
    return result;
}
//space ok
async function buySpace(gibCount) {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please");
    }
    let result = await userOwnedSpace(acc.address, subState);
    let extrinsic;
    if (result.data?.totalSpace) {
        extrinsic = window.api.tx.storageHandler.expansionSpace(gibCount);
    } else {
        extrinsic = window.api.tx.storageHandler.buySpace(gibCount);
    }
    result = await submitTx(extrinsic);
    return result;
}
async function renewalSpace(days) {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please");
    }
    const extrinsic = window.api.tx.storageHandler.renewalSpace(days);
    let result = await submitTx(extrinsic);
    return result;
}
async function deleteFile(fileHash) {
    await init();
    let acc = getAccount();
    if (!acc) {
        return; // message.error("login firist please");
    }
    const extrinsic = window.api.tx.fileBank.deleteFile(acc.address, fileHash);
    let result = await submitTx(extrinsic);
    return result;
}
//file
async function uploadFile(fileObj, bucketName) {
    try {
        await init();
        let acc = getAccount();
        if (!acc) {
            return; // message.error("login firist please");
        }
        const accountId32 = acc.address;
        const message = "<Bytes>cess-js-sdk-frontend-" + new Date().valueOf() + "</Bytes>";
        // const { signU8A } = await this.authSign(accountId32, message);
        let signStr = await signMessage(walletClient, { address: mappingAccount.evmAddress }, message);
        let signU8A = hexToString(signStr);
        if (!signU8A) {
            return {
                msg: "sign error",
            };
        }
        const sign = bs58.encode(signU8A);

        if (!sign) {
            console.log("sign error");
            return {
                msg: "sign error",
            };
        }

        const headers = {
            BucketName: bucketName,
            Account: accountId32,
            Message: message,
            Signature: sign,
        };
        const ret = await upload(
            webconfig.gatewayURL,
            fileObj,
            headers,
            subState,
            subState
        );
        return ret;
    } catch (e) {
        console.log(e);
        return { msg: "error", error: e };
    }
}
async function upload(url, file, header, log, progressCb) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            log("uploading to ", url);

            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            // 设置请求头，根据需要添加其他请求头参数
            Object.keys(header).forEach((key) => {
                xhr.setRequestHeader(key, header[key]);
            });
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let data = xhr.response.split('"').join("");
                    resolve({ msg: "ok", data });
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error("Network Error"));
            };
            if (progressCb && typeof progressCb == "function") {
                let stime = new Date().getTime();
                let sloaded = 0;
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        let percentComplete = Math.ceil((e.loaded / e.total) * 100);
                        let endTime = new Date().getTime();
                        let dTime = (endTime - stime) / 1000;
                        let dloaded = e.loaded - sloaded;
                        let speed = dloaded / dTime;
                        speed = speed / 1024;
                        stime = new Date().getTime();
                        sloaded = e.loaded;
                        let speedUnit = "KB/s";
                        if (speed > 1024) {
                            speed = speed / 1024;
                            speedUnit = "MB/s";
                        }
                        speed = speed.toFixed(1);
                        progressCb({
                            percentComplete,
                            speed,
                            speedUnit,
                            xhr,
                        });
                    }
                };
            }
            xhr.send(formData);
        } catch (e) {
            log(e);
            reject(e.message);
        }
    });
}