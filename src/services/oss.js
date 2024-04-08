import { getCessSdk, getAPI } from "../utils/init-polkadot-api";
import { formatBalance, formatterSize } from "../utils/formatter";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { getItem, setItem } from "../utils/cache";
import { message } from "antd";

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
  queryBucketList,
  createBucket,
  queryBucketInfo,
  deleteBucket,

  queryAuthorityList,
  authorize,
  cancelAuthorize,

  userOwnedSpace,
  buySpace,
  renewalSpace,

  queryFileList,
  uploadFile,
  downloadFile,
  queryFileMetadata,
  deleteFile,

  subscribeUserOwnedSpace,
  subscribeBalance
};
async function login() {
  // return;
  await init();
  const allInjected = await web3Enable("my cool dapp");
  console.log("allInjected", allInjected);
  let accounts = await web3Accounts();
  console.log("accounts", accounts);
  if (!window.api) {
    console.error("window.api not found");
    return null;
  }
  if (accounts && accounts.length > 0) {
    // saveAccount(accounts[0]);
    message.success("Login success!");
    for (let a of accounts) {
      // a.base58=encodeAddress(a.address, 11330);
      const { nonce, data: balance } = await window.api.query.system.account(
        a.address
      );
      console.log("balance", balance);
      console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
      a.nonce = nonce;
      a.balance = formatBalance(balance);
      a.balance_str = a.balance + " TCESS";
    }
    accounts.sort((t1, t2) => t2.balance - t1.balance);
    let acc = accounts[0];
    if (acc.address.length != 64) {
      acc.address = bucket.formatAccountId(acc.address);
    }
    setItem("account", acc);
    if (window.refreshSpace) {
      window.refreshSpace();
    }
    return acc;
  } else {
    message.error("account list is empty.");
  }
  return null;
}
function logout() {
  setItem("account", "");
}
function getAccount() {
  let acc = getItem("account");
  return acc;
}

//Bucket
async function queryBucketList() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please(queryBucketList)");
  }
  await init();
  let result = await bucket.queryBucketList(acc.address);
  return result;
}
async function createBucket(name) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please(createBucket)");
  }
  await init();
  let result = await bucket.createBucket(acc.address, acc.address, name);
  return result;
}
async function queryBucketInfo(name) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please(queryBucketInfo)");
  }
  await init();
  let result = await bucket.queryBucketInfo(acc.address, name);
  return result;
}
async function deleteBucket(name) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await bucket.deleteBucket(acc.address, acc.address, name);
  return result;
}

//Authority
async function queryAuthorityList() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please(queryAuthorityList)");
  }
  await init();
  let result = await authorizeHandle.authorityList(acc.address);
  return result;
}
async function authorize() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please(authorize)");
  }
  await init();
  let result = await authorizeHandle.authorize(acc.address);
  return result;
}
async function cancelAuthorize() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await authorizeHandle.cancelAuthorize(acc.address);
  return result;
}

//Space
async function userOwnedSpace() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await space2.userOwnedSpace(acc.address);
  const blockHeight = await common.queryBlockHeight();
  await common.formatSpaceInfo(result.data, blockHeight);
  return result;
}
async function buySpace(gibCount) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await space2.userOwnedSpace(acc.address);
  if (result.data?.totalSpace) {
    result = await space2.expansionSpace(acc.address, gibCount);
  } else {
    result = await space2.buySpace(acc.address, gibCount);
  }
  return result;
}
async function renewalSpace(days) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await space2.renewalSpace(acc.address, days);
  return result;
}

//File
async function queryFileList() {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await fileHandle.queryFileListFull(acc.address);
  if (result.msg == "ok" && result.data && result.data.length > 0) {
    result.data.forEach((t) => {
      t.key = t.fileHash;
      t.keyIndex = t.key;
    });
  }
  let tmpList = getItem("tmpfiles");
  if (tmpList && tmpList.length > 0) {
    tmpList.forEach(tmp => {
      let isExist = result.data.find(t => t.fileHash == tmp.fileHash);
      if (!isExist) {
        result.data.push(tmp);
      }
    });
  }
  return result;
}
async function uploadFile(file, bucketName, mnemonic) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  //storage tmplate
  let obj = {
    fileName: file.name,
    stat: 'Pending',
    fileSize: file.size,
    fileSizeStr: formatterSize(file.size),
    bucketName: bucketName,
  };
  let result = await fileHandle.uploadFile(
    mnemonic,
    acc.address,
    file,
    bucketName
  );
  obj.fileHash = result.data;
  obj.key = result.data;
  let tmpList = getItem("tmpfiles") || [];
  tmpList.push(obj);
  setItem("tmpfiles", tmpList);
  return result;
}
async function downloadFile(fileHash, savePath) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await fileHandle.downloadFile(fileHash, savePath);
  return result;
}
async function queryFileMetadata(fileHash) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await fileHandle.queryFileMetadata(fileHash);
  return result;
}
async function deleteFile(fileHashArr) {
  let acc = getAccount();
  if (!acc) {
    return message.error("login firist please");
  }
  await init();
  let result = await fileHandle.deleteFile(
    acc.address,
    acc.address,
    fileHashArr
  );
  return result;
}

//sub
async function subscribeUserOwnedSpace(accountId32, subFun) {
  if (!accountId32) throw 'accountId32 is required';
  if (!subFun) throw 'subFun is required';
  if (typeof subFun != 'function') throw 'subFun must a function';
  let blockHeight = 0;
  let api = await getAPI();
  let unsubHeader = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    blockHeight = lastHeader.number;
  });
  let unsubSpace = await api.query.storageHandler.userOwnedSpace(accountId32, (ret) => {
    let data = ret.toJSON();
    if (data) {
      let human = ret.toHuman();
      data.state = human.state;
    }
    subFun(common.formatSpaceInfo(data, blockHeight));
  });
  return () => {
    unsubHeader();
    unsubSpace();
  }
}
async function subscribeBalance(accountId32, subFun) {
  if (!accountId32) throw 'accountId32 is required';
  if (!subFun) throw 'subFun is required';
  if (typeof subFun != 'function') throw 'subFun must a function';
  let api = await getAPI();
  const unsub = await api.query.system.account(accountId32, ({ nonce, data: balance }) => {
    subFun({
      nonce: nonce.toNumber(),
      free: balance.free / 1e18,
      reserved: balance.reserved / 1e18,
      frozen: balance.frozen / 1e18,
      flags: balance.flags / 1e18,
    });
  });
  return unsub;
}
window.login = login;
window.logout = logout;
window.getAccount = getAccount;
