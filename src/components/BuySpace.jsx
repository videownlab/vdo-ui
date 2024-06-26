import React, { useState, useEffect } from "react";
import { getAPI } from "../utils/polkadot";
import store from "../utils/store";
import {
  Button,
  Col,
  DatePicker,
  Table,
  Tabs,
  Input,
  Row,
  Select,
  message,
  Radio,
  Space,
  Modal,
} from "antd";
import {
  SearchOutlined,
  RedoOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import * as util from "../utils";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatTime, formatImgUrl, formatVideoUrl } from "../utils/formatter";
import {
  formatBalance,
  formatterSize,
  formatterSize2,
} from "../utils/formatter";
import { encodeAddress } from "@polkadot/util-crypto";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";

import {
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
  subscribeBalance,
  subscribeUserOwnedSpace,
} from "../services/oss";
import * as emailUserTx from "../services/email-user-tx";
import evm from "../services/evm";

let ignore = false;
let api = null;
let currBlockHeight = 0;
let endDays = 0;
let timeout = null;

const SearchBar = ({ className }) => {
  const [priceType, setPriceType] = useState("Purchase");
  const [inputValue, setInputValue] = useState(0);
  const [canBuySpace, setCanBuySpace] = useState(0);
  const [sumResult, setSumResult] = useState(0);
  const [myBalance, setMyBalance] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");

  const [addr, setAddr] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const [loading, setLoading] = useState(false);
  const [space, setSpace] = useState({
    deadline: 0,
    remainingSpace: 0,
    start: 0,
    state: 0,
    totalSpace: 0,
    usedSpace: 0,
    totleSpaceGiB: 0,
  });
  useEffect(() => {
    ignore = false;
    myinit();
    return () => {
      clearTimeout(timeout);
      ignore = true;
    };
  }, []);

  // const sub = async (acc) => {
  //   let addr =  store.getAddress();
  //   if(!addr) return;
  //   console.log('start sub balance');
  //   subscribeBalance(addr, res => {
  //     acc.balance = res.free;
  //     acc.balance_str = res.free + " TCESS";
  //     saveAccount(acc);
  //     console.log('sub balance return', res);
  //   });
  // }

  const myinit = async () => {
    setLoading(true);
    api = await getAPI();
    let tt = await api.query.system.number();
    currBlockHeight = tt.toNumber();
    let publicKey = await getMyAddr();
    await queryMySpace(publicKey);
    await queryMyBalance();
    await getStore();
    setLoading(false);
  };

  const getMyAddr = () => {
    let a =  store.getAddress();
    if (!a) {
      return false;
    }
    setAddr(a);
    let p = encodeAddress(a, 11330);
    setPublicKey(p);
    console.log("my addr", a);
    console.log("publik key", p);
    return p;
  };

  const getStore = async () => {
    try {
      if (ignore) return;
      setLoading(true);
      let used = await api.query.storageHandler.totalServiceSpace();
      used = used.toNumber();
      if (ignore) return;
      let idle = await api.query.storageHandler.totalIdleSpace();
      idle = idle.toNumber();
      if (ignore) return;
      const total = used + idle;
      const totalGiB = parseInt(total / 1073741824);
      console.log({ totalGiB, used, idle });
      setCanBuySpace(totalGiB);
    } catch (e) {
      setCanBuySpace(2560000);
    }
  };

  const queryMySpace = async (publicKey) => {
    try {
      let ret = await userOwnedSpace();
      if (ret.msg != "ok") {
        return message.error("error:" + ret.msg);
      }
      console.log(ret.data);
      if (ret.data && ret.data.remainingSpaceGib) {
        ret.data.totleSpaceGiB = ret.data.remainingSpaceGib;
        setSpace(ret.data);
        endDays = ret.data.remainingDays || ret.data.RemainingDays;
        if (ret.data.totalSpace > 0) {
          setPriceType("Upgrade");
          setExpirationDate(ret.data.deadlineTime);
        }
      }
      // console.log('query result：',ret);
    } catch (e) {
      console.log(e);
    }
  };

  const queryMyBalance = async () => {
    if (ignore) {
      return;
    }
    let accountAddr = addr;
    if (!addr) {
      accountAddr = store.getAddress();
    }
    if(!api){
      await myinit();
    }
    const bb = await api.query.system.account(accountAddr);
    let v = formatBalance(bb.data.free);
    setMyBalance(v);
    setTimeout(queryMyBalance, 3000);
  };

  const onTabChange = (e) => {
    setPriceType(e.target.value);
  };

  const countPrice = (v) => {
    if (!v || isNaN(v)) {
      return;
    }
    let n = parseInt(v);
    setInputValue(n);
    let price = 0;
    if (priceType == "Purchase") {
      price = n * 30;
    } else if (priceType == "Upgrade") {
      console.log("endDays", endDays);
      price = n * endDays;
    } else {
      price = space.totleSpaceGiB * n;
      console.log("space.totleSpaceGiB", space.totleSpaceGiB);
    }
    setSumResult(price);
  };

  const onSubmit = async () => {
    // 
    // return;
    if (inputValue < 1) {
      return util.alert("Please fill quantity");
    }
    if (priceType == "Purchase") {
      if (inputValue > canBuySpace) {
        return util.alert("Storage Available max is " + canBuySpace);
      }
    } else if (priceType == "Upgrade") {
      if (inputValue > canBuySpace) {
        return util.alert("Storage Available max is " + canBuySpace);
      }
    }
    if (sumResult > myBalance) {
      return util.alert("Insufficient balance");
    }
    util.loading(true);
    setLoading(true);
    let ret;
    let accountType = store.get("accountType");
    if (accountType == 'email') {
      // todo emailUserTx.buySpace();
      if (priceType == "Purchase" || priceType == "Upgrade") {
        ret = await emailUserTx.buySpace(inputValue);
      } else {
        ret = await emailUserTx.renewalSpace(inputValue);
      }
      await util.sleep(2000);
      queryMySpace();
      util.sleep(2000).then(queryMySpace);
      util.sleep(4000).then(queryMySpace);
      util.sleep(6000).then(queryMySpace);
    }else if (accountType == 'evm') {
      if (priceType == "Purchase" || priceType == "Upgrade") {
        ret = await evm.buySpace(inputValue);
      } else {
        ret = await evm.renewalSpace(inputValue);
      }
      await util.sleep(2000);
      queryMySpace();
      util.sleep(2000).then(queryMySpace);
      util.sleep(4000).then(queryMySpace);
      util.sleep(6000).then(queryMySpace);
    } else {
      if (priceType == "Purchase" || priceType == "Upgrade") {
        ret = await buySpace(inputValue);
      } else {
        ret = await renewalSpace(inputValue);
      }
    }
    util.loading(false);
    setLoading(false);
    util.alert(ret.msg == "ok" ? "Success!" : "error:" + ret.msg);
    myinit();
    if (window.onUpdateSpace) {
      window.onUpdateSpace();
    }
  };

  return (
    <div className={className}>
      <div className="now-space-box">
        <Row>
          <Col span={6}>
            <span className="gray">Total Space</span>
          </Col>
          <Col span={18}>
            <span className="green">
              {formatterSize2(space.totalSpace).size}
            </span>
            <span className="gray">{formatterSize2(space.totalSpace).ext}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span className="gray">Remaining</span>
          </Col>
          <Col span={18}>
            <span className="green">
              {formatterSize2(space.remainingSpace).size}
            </span>
            <span className="gray">
              {formatterSize2(space.remainingSpace).ext}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span className="gray">Expiration Date</span>
          </Col>
          <Col span={18}>
            <span className="green">{expirationDate}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span className="gray">My Balance</span>
          </Col>
          <Col span={18}>
            <span className="green">{myBalance}</span>
            <span className="gray">TCESS</span>
          </Col>
        </Row>
      </div>
      <div>
        <Radio.Group
          buttonStyle="solid"
          size="large"
          value={priceType}
          onChange={onTabChange}
        >
          <Radio.Button
            value="Purchase"
            disabled={space.totalSpace > 0 ? true : false}
          >
            Purchase Space
          </Radio.Button>
          <Radio.Button value="Upgrade">Upgrade Space Size</Radio.Button>
          <Radio.Button value="Extend">Extend Storage Duration</Radio.Button>
        </Radio.Group>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div>
          <Row>
            <Col span={17}>
              <Input
                onChange={(e) => countPrice(e.target.value)}
                size="large"
                type="number"
                style={{ width: "100%" }}
                placeholder={
                  priceType == "Purchase"
                    ? "Storage Space"
                    : priceType == "Upgrade"
                      ? "Upgrade Storage Space Size"
                      : "Extend Days"
                }
              />
            </Col>
            <Col span={7}>
              <div style={{ lineHeight: "40px", paddingLeft: "10px" }}>
                {priceType == "Purchase"
                  ? "GiB / 30 days"
                  : priceType == "Upgrade"
                    ? "GiB"
                    : "Days"}
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "20px" }} className="top-line">
          Estimated 30 TCESS / GiB / 30 days
        </div>
        <div style={{ marginTop: "20px" }} className="top-line">
          <span className="gray">CESS Storage Available </span>
          <span className="green"> {canBuySpace} </span>
          <span className="gray"> GiB</span>
        </div>
      </div>
      <div
        className="tb-bottom-txt"
        style={{
          marginTop: "20px",
          paddingTop: "10px",
          display: "block",
          overflow: "hidden",
        }}
      >
        <div style={{ float: "left" }}>
          <span style={{ color: "#222" }}>Total</span>
          <span
            style={{
              fontSize: "30px",
              padding: "0 10px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {sumResult}
          </span>
          <span style={{ color: "#aaa" }}>TCESS</span>
        </div>
        <Button
          size="large"
          type="primary"
          loading={loading}
          disabled={loading}
          style={{ float: "right" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default React.memo(styled(SearchBar)`
  margin-bottom: 20px;
  .gray {
    color: #aaa;
  }
  .green {
    color: green;
  }
  .now-space-box {
    width: 100%;
    padding: 20px 0;
    display: block;
    overflow: hidden;
    span {
      padding-left: 20px;
      font-size: 20px;
    }
  }
  .top-price-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    width: 420px;
    padding: 5px 30px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 1px 1px 20px 0px #e9e9e9;
    .top-price-btn-left {
      width: 70%;
      span {
        font-size: 13px;
      }
      label {
        font-size: 12px;
        color: #aaa;
      }
    }
    .top-price-btn-right {
      width: 30%;
      span {
        width: 100%;
        border-radius: 4px;
        background-color: #3187fa;
        color: #fff;
        margin: 5px 0;
        display: block;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
      span:hover {
        background-color: #73abf7;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .top-price-btn {
      position: relative !important;
      width: 100% !important;
      margin: 20px auto 0;
      padding: 5px 10px;
    }
  }
  .search-box {
    max-width: 700px;
  }
  .big-title {
    font-family: "Microsoft YaHei", 微软雅黑;
    .big-title-txt {
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
    .big-title-txt-2 {
      font-size: 14px;
      color: #aaa;
      margin-bottom: 16px;
    }
  }
  .ant-input-group-addon button {
    border: none !important;
    color: rgb(69 148 255) !important;
  }
`);
