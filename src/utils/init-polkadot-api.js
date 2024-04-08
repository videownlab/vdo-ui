import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import wsCheck from "../utils/ws-check.js";
import webconfig from "../webconfig.js";
import { sleep } from "../utils/index.js";
import * as antdHelper from "../utils/antd-helper";
import { Space, Bucket, Common, Authorize, File } from "cess-js-sdk";
let cessSdk = null;

async function getAPI() {
    if (window.api) {
        return window.api;
    }
    if (window.isConnecting) {
        while (!window.api) {
            await sleep(500);
        }
        return window.api;
    }
    window.isConnecting = true;
    if (window.setConnecting) {
        window.setConnecting(true);
        console.log('isConnecting', window.isConnecting);
    }
    const keyring = new Keyring(webconfig.wsnode.keyringOption);
    let rpcs = webconfig.wsnode.nodeURLs;
    let rpc = await wsCheck(rpcs);
    if (!rpc) {
        return { api: null, keyring };
    }
    const wsProvider = new WsProvider(rpc);
    const api = await ApiPromise.create({ provider: wsProvider });
    window.api = api;
    window.keyring = keyring;
    window.isConnecting = false;
    if (window.setConnecting) window.setConnecting(false);
    if (window.setConnecting) {
        window.setConnecting(false);
        console.log('isConnecting', window.isConnecting);
    }
    return api;
};

async function getCessSdk() {
    if (cessSdk && cessSdk.bucket) return cessSdk;
    await getAPI();
    let bucket = new Bucket(window.api, window.keyring, true);
    let space = new Space(window.api, window.keyring, true);
    let authorize = new Authorize(window.api, window.keyring, true);
    let file = new File(window.api, window.keyring, true);
    let common = new Common(window.api, window.keyring, true);
    cessSdk = { bucket, space, authorize, file, common };
    return cessSdk;
}
export { getAPI, getCessSdk };