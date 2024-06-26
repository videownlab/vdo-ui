/**
 * 头部
 * @author fage
 * @Date: 2022-4-8
 */

import styled from "styled-components";
import _ from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  MenuOutlined,
  CloudUploadOutlined,
  WalletOutlined,
  SearchOutlined,
  HomeOutlined,
  GlobalOutlined,
  LoginOutlined,
  CloseCircleOutlined,
  SwapOutlined,
  CheckOutlined,
  UserOutlined,
  CopyOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Menu,
  message,
  Empty,
  Avatar,
  Button,
  List,
  Spin,
  Form,
  Input,
  Skeleton,
} from "antd";

import PolkadotLogo from "../statics/polkadot-logo.svg";
import { getAPI, toPublickKey } from "../utils/polkadot";
import evm from "../services/evm";
import { formatAddress, formatAddressLong } from "../utils/formatter";
import { formatBalance } from "../utils/formatter";
import Identicon from "@polkadot/react-identicon";
import store from "../utils/store";
import * as antdHelper from "../utils/antd-helper";
import webconfig from "../webconfig";
import BuySpace from "../components/BuySpace";
import { loginByWallet, applyCode, loginByEmail } from "../services/auth";
import {
  subscribeUserOwnedSpace,
  subscribeBalance
} from "../services/oss";
import { getConfig, getTimestamp } from "../services/auth";

import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import copy from "copy-to-clipboard";
import * as util from "../utils";
import logo from "../statics/logo.png";
import { encodeAddress } from "@polkadot/util-crypto";
import { stringToHex, hexToU8a } from "@polkadot/util";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
function getCatItems() {
  let arr = webconfig.cats.map(t => {
    return {
      key: "/cat/" + t.value, label: t.label
    }
  });
  return arr;
}
const items = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Explore", "sub", <GlobalOutlined />, getCatItems()),
];

let timeout = null;
let count = 0;
let lock = false;

function Header({ className }) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [keyword, setKeyword] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
  const [isModalConfig, setIsModalConfig] = useState(false);
  const [balanceStr, setBalanceStr] = useState('0');


  const [account, setAccount] = useState();
  const [accounts, setAccounts] = useState();
  const [email, setEmail] = useState();
  const [hasSendAuthCode, setHasSendAuthCode] = useState(false);
  const [authCode, setAuthCode] = useState();
  const [countDown, setCountDown] = useState(0);

  // accountkind:1=email,2=polkdot,3=evm

  const [config, setConfig] = useState({});

  useEffect(() => {
    getConfig();
    getAPI().then((t) => {
    }, console.log);
    setConfig({
      videoApiUrl: webconfig.videoApiUrl,
      apiUrl: webconfig.apiUrl,
      contractAddress: webconfig.contractAddress
    });
    let acc = store.get("account");
    if (acc) {
      saveAccount(acc);
    }
    let accs = store.get("accounts");
    if (accs && accs.length > 0) {
      setAccounts(accs);
      if (acc) {
        subBalance(acc, accs);
      }
    }
    window.setConnecting = setConnecting;
  }, []);

  const subBalance = async (acc, accs) => {
    if (!acc) {
      acc = account;
    }
    if (!acc) {
      return;
    }
    console.log('start sub balance');
    subscribeBalance(acc.address, res => {
      acc.balance = res.free;
      acc.balance_str = res.free + " TCESS";
      setBalanceStr(res.free + " TCESS");
      saveAccount(acc);
      store.set("account", acc);
      if (!accs || accs.length == 0) {
        return console.log('accs not found');
      }
      accs.forEach(t => {
        if (t.address == acc.address) {
          t.balance = acc.balance;
          t.balance_str = acc.balance_str;
        }
      });
      setAccounts(accs);
      store.set("accounts", accs);
      console.log('sub balance return', res);
    });
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onSearch = () => {
    navigate("/search/" + keyword);
  };
  const onMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (key == "sub") return;
    navigate(key);
    toggleCollapsed();
  };
  const onInput = (e) => {
    setKeyword(e.target.value);
  };
  const onShowLoginBox = () => {
    setModalOpen(true);
  };
  const queryBalance = async (account) => {
    let api = await getAPI();
    const { nonce, data: balance } = await api.query.system.account(account.address);
    console.log("balance", balance);
    console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
    account.nonce = nonce;
    account.balance = formatBalance(balance);
    account.balance_str = account.balance + " TCESS";
    return account;
  }
  const onLogin = async () => {
    try {
      setLoading(true);
      const allInjected = await web3Enable("my cool dapp");
      console.log("allInjected", allInjected);
      if (!allInjected || allInjected.length == 0) {
        antdHelper.alertError('Please install the Polkadot{.js} extension(https://polkadot.js.org/extension/).');
        window.setTimeout(function () {
          window.open('https://polkadot.js.org/extension/');
        }, 3000);
        return;
      }
      let accounts = await web3Accounts();
      console.log("accounts", accounts);
      if (accounts && accounts.length > 0) {
        // saveAccount(accounts[0]);      
        message.success("Login success!");
        try {
          let api = await getAPI();
          for (let a of accounts) {
            a.address = encodeAddress(a.address, 11330);
            const { nonce, data: balance } = await api.query.system.account(
              a.address
            );
            console.log("balance", balance);
            console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
            a.nonce = nonce;
            a.balance = formatBalance(balance);
            a.balance_str = a.balance + " TCESS";
          }
        } catch (e) {
          console.log("query balance error");
          console.error(e);
          let lastAccounts = store.get("accounts");
          accounts.forEach((a) => {
            let tmp = lastAccounts.find((l) => l.address == a.address);
            if (tmp) {
              a.nonce = tmp.nonce;
              a.balance = tmp.balance;
              a.balance_str = tmp.balance_str;
            }
          });
        }
        let lastAddr = store.getAddress();
        accounts = accounts.sort((t1, t2) => t2.balance - t1.balance);
        let index = 0;
        if (lastAddr) {
          index = accounts.findIndex((t) => t.address == lastAddr);
          if (index == -1) {
            index = 0;
          }
        }
        let account = accounts[index];
        setAccounts(accounts);
        store.set("accounts", accounts);
        saveAccount(account);
        // openAccountBox(accounts);

        let address = account.address;
        let timestamp = await getTimestamp();//  
        if (timestamp && timestamp.ok) {
          timestamp = timestamp.ok;
        } else {
          timestamp = parseInt(new Date().valueOf() / 1000);
        }

        const injector = await web3FromSource(account.meta?.source);
        const signRaw = injector?.signer?.signRaw;
        let tmp = stringToHex("<Bytes>" + address + timestamp + "</Bytes>");
        // tmp = address + timestamp;
        // tmp = "<Bytes>" + address + timestamp + "</Bytes>";
        const { signature } = await signRaw({
          address,
          data: tmp,
          type: "bytes",
        });
        let data = {
          address,
          timestamp,
          sign: signature.replace('0x', '')
        };
        let ret = await loginByWallet(data);
        console.log('loginByWallet', ret);
        if (ret.ok) {
          antdHelper.notiOK('Login success');
          store.set("accountType", 'wallet');
          store.set("token", ret.ok.token);
          setModalOpen(false);
          subBalance(account, accounts);
        } else if (ret.error?.msg) {
          antdHelper.alertError(ret.error.msg);
        } else {
          antdHelper.alertError('Login fail');
        }
      }
    } catch (e) {
      antdHelper.notiError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const onLoginByEvm = async () => {
    try {
      if (lock) return;
      lock = true;
      setLoading(true);
      let ret = await evm.connectEvmWallet();
      lock = false;
      if (!ret) {
        return;
      }
      if (ret.msg != 'ok') {
        return antdHelper.alertError(ret.msg);
      }
      let account = ret.account;
      setAccounts([account]);
      saveAccount(account);
      antdHelper.notiOK("Login success");
      setModalOpen(false);
      subBalance(account, [account]);
    } catch (e) {
      console.log(e);
    } finally {
      lock = false;
      setLoading(false);
    }
  }
  const onLoginByEmail = async (e) => {
    try {
      if (!email) {
        return antdHelper.alertError("email error");
      }
      if (!authCode) {
        return antdHelper.alertError("AuthCode error");
      }
      setLoading(true);
      let ret = await loginByEmail(email, authCode);
      setLoading(false);
      console.log({ ret });
      if (ret.ok) {
        antdHelper.notiOK('Login success');
        store.set("accountType", 'email');
        store.set("token", ret.ok.token);
        setModalOpen(false);
        let account = { address: ret.ok.walletAddress };
        account = await queryBalance(account);
        setAccounts([account]);
        store.set("accounts", [account]);
        saveAccount(account);
        localStorage.setItem("addr", account.address);
        subBalance(account, [account]);
      } else if (ret.error?.msg) {
        antdHelper.alertError(ret.error.msg);
      } else {
        antdHelper.alertError('Login fail');
      }
    } catch (e) {
      console.log(e);
    }
  }
  const saveAccount = async (account) => {
    setAccount(account);
    if (account?.balance_str) {
      setBalanceStr(account.balance_str);
    }
    store.set("account", account);
    // console.log("saveAccount", account);
    if (account) {
      let publicKey = toPublickKey(account.address);
      localStorage.setItem("publicKey", publicKey);
      localStorage.setItem("addr", account.address);
      // localStorage.setItem("base58",account.base58);
    } else {
      localStorage.removeItem("publicKey");
      localStorage.removeItem("addr");
      // localStorage.removeItem("base58");
    }
  };
  const openAccountBox = (list) => {
    if (!list) {
      list = accounts;
    }
    if (!list || list.length == 0) {
      return util.alert("account not found");
    }
    setIsAccountsModalOpen(true);
  };
  const onLogout = () => {
    store.remove("accounts");
    store.remove("account");
    saveAccount(null);
    setAccounts(null);
    setIsAccountsModalOpen(false);
    navigate('/');
  };
  const onSwitchAccount = (item) => {
    saveAccount(item);
    store.set('account', item);
    window.location.reload();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    store.set("webconfig", values);
    util.alert("Save Success!", () => {
      window.location.reload();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showSpaceBox = (isShow) => {
    setIsSpaceModalOpen(isShow);
  }
  window.showSpaceModel = showSpaceBox;
  const onInputEmail = (e) => {
    setEmail(e.target.value);
  }
  const onInputAuthCode = (e) => {
    setAuthCode(e.target.value);
  }
  const startCountDown = () => {
    timeout = setInterval(function () {
      count--;
      if (count < 0) {
        clearInterval(timeout);
        return;
      }
      setCountDown(count);
    }, 1000);
  }
  const onSendAuthCode = async (e) => {
    try {
      if (!email) {
        return antdHelper.alertError("email error");
      }
      setLoading(true);
      let ret = await applyCode(email);
      setLoading(false);
      console.log({ ret });
      if (ret.ok == 1) {
        antdHelper.notiOK("email vcode has been sent");
        count = 60;
        setCountDown(60);
        startCountDown();
        setHasSendAuthCode(true);
      } else if (ret.error?.msg) {
        antdHelper.alertError(ret.error.msg);
      } else {
        antdHelper.alertError("email vcode send fail");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={className}>
      {connecting && <div className="connecting">connecting...</div>}
      <div className="abs-header">
        <div className="header-content">
          <span className="h-col h-col-1 menu-btn">
            <label onClick={toggleCollapsed}>
              <MenuOutlined
                style={{
                  color: "#013088",
                  fontSize: 30,
                  position: "absolute",
                  top: "13px",
                  left: "0px",
                }}
              />
            </label>
            <NavLink to="/">
              <img
                src={logo}
                style={{
                  width: "160px",
                  position: "absolute",
                  top: "14px",
                  left: "45px",
                }}
              />
            </NavLink>
          </span>
          <span className="h-col h-col-3 search-box">
            <input
              type="text"
              onKeyUp={onInput}
              placeholder="Search"
              className="search-txt"
            />
            <SearchOutlined className="search-btn" onClick={onSearch} />
          </span>
          {account ? (
            <span className="h-col h-col-4 upload-btn">
              <span className="h-account" onClick={openAccountBox}>
                <Identicon
                  value={account.address}
                  size={36}
                  theme={"polkadot"}
                  style={{ marginTop: 0 }}
                />
                <span className="addr-text">
                  {formatAddress(account.address)}
                </span>
                <span className="balance-text">
                  {balanceStr || "**"}
                </span>
              </span>
              <span
                className="h-btn"
                onClick={() => showSpaceBox(true)}
                style={{ backgroundColor: "rgb(9 98 147)" }}
              >
                <DatabaseOutlined /> My Space
              </span>
              <span className="h-btn" onClick={() => navigate("/create")}>
                <CloudUploadOutlined /> Upload Video
              </span>
            </span>
          ) : (
            <span className="h-col h-col-4 upload-btn">
              <span className="h-btn" onClick={onShowLoginBox}>
                <WalletOutlined /> Connect Wallet
              </span>
            </span>
          )}
        </div>
      </div>
      {collapsed ? (
        <div className="menu-box">
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub"]}
            mode="inline"
            theme="dark"
            items={items}
            className="nav-menu"
            onClick={onMenuClick}
          />
          {/* <div
            className="h-bottom-btn"
            onClick={() => {
              setIsModalConfig(true);
              toggleCollapsed();
            }}
          >
            <UnorderedListOutlined /> Config API URL
          </div> */}
        </div>
      ) : (
        ""
      )}
      <Modal
        width={800}
        title="Config API URL"
        open={isModalConfig}
        onOk={() => setIsModalConfig(false)}
        onCancel={() => setIsModalConfig(false)}
        footer={null}
      >
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={config}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Video API"
              name="videoApiUrl"
              rules={[
                {
                  required: true,
                  message: "Please input video API!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="NFT API"
              name="apiUrl"
              rules={[
                {
                  required: true,
                  message: "Please input NFT API!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contract Address"
              name="contractAddress"
              rules={[
                {
                  required: true,
                  message: "Contract Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Node RPC"
              name="nodeURL"
              rules={[
                {
                  required: true,
                  message: "Please input Node RPC!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 20,
              }}
            >
              <Button className="btn-bg" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        width={800}
        title="Connect Your Wallet"
        open={isModalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        loading={loading}
      >
        <Spin spinning={loading}>
          <p>
            If you don't have a wallet yet, you can select a provider and create
            one now
          </p>
          <p></p>
          <div className="login-line" onClick={onLogin}>
            <img className="dot-log" src={PolkadotLogo} />
            <label>Connect to polkadot{"{.js}"} extension</label>
          </div>
          <div className="txt-line">Or</div>
          <p></p>
          <div className="login-line" onClick={onLoginByEvm}>
            <div>
              <img src={process.env.PUBLIC_URL + "/wallet-logo/ok.png"} />
              <img src={process.env.PUBLIC_URL + "/wallet-logo/coinbase.svg"} />
              <img src={process.env.PUBLIC_URL + "/wallet-logo/imtoken.svg"} />
              <img src={process.env.PUBLIC_URL + "/wallet-logo/matemask.svg"} />
              <img src={process.env.PUBLIC_URL + "/wallet-logo/sub.png"} />
            </div>
            <label>Connect to Evm wallet</label>
          </div>
          <div className="txt-line">Or</div>
          <div className="input-line">
            <input type="text" onInput={onInputEmail} onChange={onInputEmail} onKeyUp={onInputEmail} placeholder="Enter your email" />
            {
              countDown > 0 ?
                <span className="btn-send diabled">{countDown}</span> :
                <span className="btn-send enabled" onClick={onSendAuthCode}>Send</span>
            }
          </div>
          {
            hasSendAuthCode && <div className="input-line">
              <input type="text" onInput={onInputAuthCode} onChange={onInputAuthCode} onKeyUp={onInputAuthCode} placeholder="Enter auth code" />
            </div>
          }

          <div className="btn-line">
            <span className="btn-login" onClick={onLoginByEmail}>Sign up / Login</span>
          </div>
        </Spin>
      </Modal>
      <Modal
        width={800}
        title="Switch Account"
        open={isAccountsModalOpen}
        onCancel={() => setIsAccountsModalOpen(false)}
        footer={null}
        loading={loading}
      >
        {accounts && accounts.length > 0 ? (
          <div className="block">
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={accounts}
              pagination={{ position: "bottom", pageSize: 5 }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    account.address == item.address ? (
                      <Button disabled={true} icon={<CheckOutlined />}>
                        Current
                      </Button>
                    ) : (
                      <Button
                        icon={<SwapOutlined />}
                        disabled={account.address == item.address}
                        onClick={() => onSwitchAccount(item)}
                      >
                        Switch
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Identicon
                        value={item.address}
                        size={36}
                        theme={"polkadot"}
                        style={{ marginTop: 0 }}
                        onCopy={() => antdHelper.onCopy(item.address)}
                      />
                    }
                    title={item.meta?.name || formatAddress(item.address)}
                    description={<div className="addr-line">
                      <span className="addr-txt">{formatAddressLong(item.address)} </span>
                      <label className="addr-copy" style={{ color: '#2668bd', cursor: "copy" }} onClick={() => antdHelper.onCopy(item.address)}> <CopyOutlined /></label>
                    </div>}
                  />
                  <div>{item.balance_str}</div>
                </List.Item>
              )}
            />
            <div className="block">
              <Button
                onClick={onLogout}
                style={{ width: "32%", marginTop: "20px" }}
                size="large"
                danger
                icon={<LoginOutlined />}
              >
                Logout
              </Button>
              <Button
                onClick={() => {
                  navigate("/my");
                  setIsAccountsModalOpen(false);
                }}
                style={{
                  width: "32%",
                  marginLeft: "10px",
                  marginTop: "20px",
                }}
                type="default"
                size="large"
                icon={<UserOutlined />}
              >
                Profile
              </Button>
              <Button
                onClick={() => setIsAccountsModalOpen(false)}
                style={{
                  width: "32%",
                  marginLeft: "10px",
                  marginTop: "20px",
                  backgroundColor: "#a4cb29",
                }}
                type="primary"
                size="large"
                icon={<CloseCircleOutlined />}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </Modal>
      {isSpaceModalOpen ? (
        <Modal
          width={700}
          title="My Space"
          open={true}
          onCancel={() => setIsSpaceModalOpen(false)}
          footer={null}
        >
          <BuySpace />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default styled(Header)`
  display: block;
  overflow: hidden;
  position: relative;
  top: 0;
  .block {
    display: block;
    overflow: hidden;
    clear: both;
    width: 100%;
  }
  .connecting{
    position: fixed;
    bottom: 3px;
    right: 3px;
    z-index: 99999;
    background-color: #2196F3;
    color: #fff;
    width: 170px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: url(/img/loading.gif);
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 22px;
    font-size: 14px;
  }
  .abs-header .header-content .search-box .search-btn {
    padding-left: 10px;
  }
  .abs-header {
    overflow: hidden;
    width: 100%;
    padding: 0 3%;
    height: 56px;
    line-height: 56px;
    background-color: #000;
    position: fixed;
    color: #fff;
    clear: both;
    z-index: 99;
    .header-content {
      display: block;
      overflow: hidden;
      margin: 0 auto;
      text-align: left;
      color: #fff;
      position: relative;
      top: 0;
      left: 0;
      .h-col {
        line-height: 50px;
        height: 50px;
        display: block;
        overflow: hidden;
        float: left;
        .h-btn {
          background-color: #013088;
          color: #fff;
          padding: 0 10px;
          line-height: 38px;
          height: 38px;
          text-align: center;
          display: block;
          overflow: hidden;
          float: right;
          margin-left: 10px;
        }
      }
      .h-col-4 {
        float: right;
        margin-top: 9px;
      }
      .menu-btn {
        width: 250px;
        margin-top: 1px;
        cursor: pointer;
        z-index: 99;
      }
      .logo-txt {
        width: 20%;
        font-size: 30px;
        text-decoration: none;
        a {
          text-decoration: none;
        }
      }
      .search-box {
        width: 300px;
        position: absolute;
        left: 35%;
        top: 3px;
        .search-txt {
          width: calc(90% - 38px);
          max-width: 300px;
          background-color: #545454;
          color: #fff;
          border: 1px solid #000;
          outline: none;
          height: 38px;
          line-height: 38px;
          text-indent: 10px;
        }
        .search-btn {
          width: 38px;
          height: 38px;
          border: 1px solid #000;
          line-height: 38px;
          border-left: none;
          font-size: 15px;
          font-weight: bold;
          color: #013088;
          background-color: #545454;
          cursor: pointer;
        }
      }
      .upload-btn {
        width: 480px;
        cursor: pointer;
      }
      .login-btn {
        width: 200px;
        float: right;
        cursor: pointer;
      }
      .h-account {
        font-size: 16px;
        color: #fff;
        position: relative;
        display: block;
        line-height: 38px;
        float: right;
        width: 200px;
        margin-left: 10px;
        .addr-text {
          position: absolute;
          top: 0px;
          left: 40px;
          font-size: 14px;
          line-height: 18px;
        }
        .balance-text {
          position: absolute;
          top: 14px;
          left: 40px;
          font-size: 14px;
          line-height: 26px;
          color: #6d9df7;
          overflow: hidden;
          display: block;
        }
      }
    }
  }
  .hold {
    width: 100%;
    height: 65px;
    display: block;
    overflow: hidden;
    clear: both;
  }
  .menu-box {
    position: fixed;
    width: 240px;
    left: 0;
    top: 55px;
    z-index: 9999;
    background-color: #000;
    height: calc(100vh - 55px);
    .nav-menu {
      background-color: #000;
    }
    .h-bottom-btn {
      color: #fff;
      position: absolute;
      left: 20px;
      bottom: 20px;
      cursor: pointer;
    }
  }
`;
