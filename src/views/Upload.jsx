import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {
  InboxOutlined,
  CloudUploadOutlined,
  WalletOutlined,
  SearchOutlined,
  HomeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Upload,
  Input,
  message,
  Select,
  Empty,
  Button,
  Card,
  InputNumber,
  Modal,
  Alert,
  Progress,
} from "antd";

import React, { useState, useEffect } from "react";

import CessMiniLogo from "../statics/imgs/cess-mini-logo.png";
import { getAPI } from "../utils/polkadot";
import * as util from "../utils";
import store from "../utils/store";
import webconfig from "../webconfig";
import { formatTime, formatImgUrl, formatVideoUrl } from "../utils/formatter";
import { formatBalance, formatterSize } from "../utils/formatter";
import Identicon from "@polkadot/react-identicon";
import Img from "../components/Img";
import VideoList from "../components/VideoList";
import StoreMinerList from "../components/StoreMinerList";
import MinerLogo from "../statics/imgs/miner.svg";
import { encodeAddress } from "@polkadot/util-crypto";
import { create } from "../services/nft";
import * as emailUserTx from "../services/email-user-tx";
import evm from "../services/evm";
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
  queryFileMetadata,
  deleteFile,
} from "../services/oss";

const { TextArea } = Input;
const { Dragger } = Upload;
let run = 1;
let timeout = "";
const filterList = [{
  label: "All", value: "all"
},
{
  label: "Duke Blockchain conference 2024 video", value: "video"
},
{
  label: "Duke Blockchain conference 2024 pictures", value: "pictures"
}];

function Home(props) {
  document.title = "Create New Video NFT";
  let navigate = useNavigate();
  const [api, setAPI] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [duration, setDuration] = useState("");
  const [saving, setSaving] = useState(false);
  const [space, setSpace] = useState();
  const [spaceAuth, setSpaceAuth] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [spaceAuthing, setSpaceAuthing] = useState(false);

  const [addr, setAddr] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const [fileSize, setFileSize] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [cover, setCover] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [videoObj, setVideoObj] = useState("");
  const [label, setLabel] = useState("News");
  const [filter, setFilter] = useState("all");
  const [buySize, setBuySize] = useState(1);
  const [buySpacing, setBuySpacing] = useState(false);

  const [myBalance, setMyBalance] = useState(0);

  const [uploadId, setUploadId] = useState();
  const [selectVideoName, setSelectVideoName] = useState();

  const isDebug = true;
  let addressG = "";

  //get wallet address
  const getAddr = (ignoreAlert) => {
    console.log("******************************getAddr start", run);
    let a = store.get('account');
    if (!a) {
      run++;
      if (run != 3 && !ignoreAlert) {
        util.alert("Please connect your wallet first");
      }
      return false;
    }
    a = a.address;
    // let address = ("0x263158a10b39debac59bd1239bc64fb4bd678f507814d24f59efd46279111c71", 11330)
    setAddr(a);
    addressG = a;
    let p = encodeAddress(a, 11330);
    setPublicKey(p);
    console.log("******************************getAddr end");
    return true;
  };
  //space authorize
  const onAuthorize = async () => {
    console.log("******************************onAuthorize start");
    let isOK = getAddr();
    if (!isOK) return;
    util.loading(true);
    setSpaceAuthing(true);
    let accountType = store.get("accountType");
    if (accountType == 'email') {
      let ret = await emailUserTx.authorize();
      startAuthProgress(100);
      util.loading(false);
      setSpaceAuthing(false);
      setSpaceAuth(true);
      if (ret.msg == 'ok') {
        //ok       
        store.set("spaceAuth", addressG);
        startQuerySpace();
      }
      return;
    }
    if (accountType == 'evm') {
      let ret = await evm.authorize();
      startAuthProgress(100);
      util.loading(false);
      setSpaceAuthing(false);
      setSpaceAuth(true);
      if (ret.msg == 'ok') {
        //ok       
        store.set("spaceAuth", addressG);
        startQuerySpace();
      }
      return;
    }
    //
    await web3Enable("my cool dapp");
    const injector = await web3FromAddress(addr);
    try {
      //space authorize
      let apiS = api;
      if (!api || !api.tx || !api.tx.oss) {
        apiS = await getAPI();
        setAPI(apiS);
      }
      let hasStartProgress = false;
      apiS.tx.oss
        .authorize(webconfig.gatewayAddr)
        .signAndSend(
          addr,
          { signer: injector.signer },
          (status) => {
            console.log("status****", status);
            if (!hasStartProgress) {
              hasStartProgress = true;
              startAuthProgress(1);
            }
            try {
              console.log("status.status.toJSON()", status.status.toJSON());
              console.log("isFinalized", status.isFinalized);
              if (status.isFinalized) {
                //ok
                startAuthProgress(100);
                util.loading(false);
                setSpaceAuthing(false);
                setSpaceAuth(true);
                store.set("spaceAuth", addressG);
                startQuerySpace();
              }
            } catch (e) {
              util.alert(e.message);
              util.loading(false);
              setSpaceAuthing(false);
              console.log(e);
            }
          },
          (e) => {
            console.log("===========", e);
          }
        );
      console.log("******************************onAuthorize end");
    } catch (e) {
      util.loading(false);
      setSpaceAuthing(false);
      util.alert(e.message);
      console.log("err***********");
      console.log(e);
    }
  };

  const startAuthProgress = (i) => {
    if (i > 100) i = 100;
    setAuthProgress(i);
    if (i >= 100) {
      clearTimeout(timeout);
      return;
    }
    timeout = setTimeout(() => {
      startAuthProgress(i + 1);
    }, 160);
  };
  const querySpace = async () => {
    try {
      let ret = await userOwnedSpace();
      if (ret.msg != "ok") {
        return message.error("error:" + ret.msg);
      }
      if (ret.data && ret.data.remainingSpaceGib) {
        ret.data.totleSpaceGiB = ret.data.remainingSpaceGib;
        setSpace(ret.data);
      }

    } catch (e) {
      console.log(e);
    }
  };

  const startQuerySpace = () => {
    if (getAddr(true)) {
      setTimeout(querySpace, 100);
      clearTimeout(timeout);
      console.log("clearInterval");
      return;
    }
    // timeout = setTimeout(startQuerySpace, 300);
  };
  const isAuthority = async () => {
    let res = await queryAuthorityList();
    console.log('isAuthority', res);
    if (res.msg != 'ok' || !res.data || res.data.length == 0) return false;
    return res.data.includes(webconfig.gatewayAddr);
  }
  const init = async () => {
    let isOK=await isAuthority();
    setSpaceAuth(isOK);
    startQuerySpace();
    window.onUpdateSpace = function () {
      querySpace();
    };
  }
  useEffect(() => {
    init();
    return () => {
      window.onUpdateSpace = null;
    };
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeAbout = (e) => {
    setAbout(e.target.value);
  };
  const onSubmit = async () => {
    await querySpace();
    if (!name || name.length < 4) {
      return util.alert("NFT name is required and min length 4 char");
    }
    if (!about || about.length < 4) {
      return util.alert("NFT about is required and min length 4 char");
    }
    if (!uploadId) {
      return util.alert("File hash is not ready.");
    }
    if (!cover) {
      return util.alert("Please upload cover image.");
    }
    if (!space || !space.remainingSpace) {
      return util.alert("Please purchase space first");
    }
    if (label == 'Conference' && filter != 'video' && filter != 'pictures') {
      return util.alert("Please select a filter");
    }
    setSaving(true);
    const obj = {
      filename: name,
      filehash: uploadId,
      filesize: fileSize,
      description: about,
      creator: addr,
      label: label,
      image: cover,
      length: duration,
      nftType: filter
    };
    console.log(obj);
    store.set("uploading", obj);
    navigate("/uploading");
  };
  const onRemoveVideo = () => {
    setVideoObj(null);
    setVideoUrl(null);
  };
  const uppropsVideo = {
    name: "file",
    multiple: false,
    accept: ".mp4,.mov,.rmvb,.rm,.png,.jpg,.jpeg,.gif,.bmp,.webp",
    action: webconfig.videoApiUrl + "/file",
    data: {
      force: 1,
      walletAddress: publicKey, //cXh5StobuVP4B7mGH9xn8dSsDtXks4qLAou8ZdkZ6DbB6zzxe
    },
    maxCount: 1,
    method: "PUT",
    onRemove() {
      onRemoveVideo();
    },
    beforeUpload: (file) => {
      setFileSize(file.size);
      let ext = file.name.split('.');
      ext = ext[ext.length - 1];
      ext = ext.toLocaleLowerCase();
      if (".png,.jpg,.jpeg,.gif,.bmp,.webp".includes(ext)) {
        setFilter('pictures');
      } else {
        setFilter('video');
      }
    },
    async onChange(info) {
      const { status, response } = info.file;
      console.log("************on change**********", status);
      if (status == "uploading" && info.file) {
        console.log("uploading------------");
        console.log(info.file);
        // let obj = await getBase64(info.file);
        // setVideoObj(obj);
      }
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setVideoObj(null);
        console.log("*********upload response*******", response);
        // Modal.success({
        //   title: `${info.file.name} file uploaded successfully.`,
        // });
        if (response.ok.uploadId) {
          setUploadId(response.ok.uploadId);
          // timeout2=setInterval(() => {
          //   let ele=document.getElementById("myplayer");
          //   if(!ele) return;
          //   let d = ele.duration;
          //   if (d) {
          //     setDuration(formatTime(d));
          //     console.log("has get video duration", duration);
          //     clearInterval(timeout2);
          //   }
          // }, 2000);
          util.showOK("uploaded successfully");
        } else {
          util.alert(response.error.msg);
        }
      } else if (status === "error") {
        Modal.error({ title: `${info.file.name} file upload failed.` });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const uppropsPic = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "image/png,image/jpeg,image/bmp,image/jpg,image/gif,image/webp",
    action: webconfig.apiUrl + "/video/cover",
    method: "PUT",
    onRemove() {
      setCover("");
    },
    onChange(info) {
      const { status, response } = info.file;
      if (status == "uploading") {
        util.loading(true);
      }
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        util.loading(false);
        console.log("*********upload response*******", response);
        if (response.ok) {
          setCover(response.ok);
          util.showOK("uploaded successfully");
        } else {
          util.alert(response.error.msg);
        }
      } else if (status === "error") {
        Modal.error({ title: `${info.file.name} file upload failed.` });
        util.loading(false);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const queryMyBalance = async () => {
    let apiS = api;
    if (!api || !api.query || !api.query.system) {
      apiS = await getAPI();
      setAPI(apiS);
    }
    if (!addr) {
      getAddr();
    }
    const { nonce, data: balance } = await apiS.query.system.account(addr);
    console.log("balance", balance);
    console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
    setMyBalance(formatBalance(balance));
  };

  const onOpenBuySpaceModel = () => {
    window.showSpaceModel(true);
  };

  // confirm tx
  const handleOk = async () => {
    if (buySize < 1) {
      return util.alert("Please fill quantity");
    }
    // setIsModalOpen(false);
    //buy space
    setBuySpacing(true);
    util.loading(true);
    await web3Enable("my cool dapp");
    const injector = await web3FromAddress(addr);
    let event =
      space && space.totalSpace > 0
        ? api.tx.fileBank.expansionSpace
        : api.tx.fileBank.buySpace;
    event(buySize)
      .signAndSend(
        addr,
        { signer: injector.signer },
        (status) => {
          console.log("status****", status);
          try {
            console.log("status.status.toJSON()", status.status.toJSON());
            console.log("isFinalized", status.isFinalized);
            if (status.isFinalized) {
              //ok
              setBuySpacing(false);
              util.loading(false);
              util.showOK();
              setIsModalOpen(false);
              setInterval(() => {
                querySpace();
                queryMyBalance();
              }, 1000);
            }
          } catch (e) {
            util.alert(e.message);
            util.loading(false);
            setBuySpacing(false);
          }
        },
        (e) => {
          console.log("===========", e);
        }
      )
      .then(
        (t) => console.log,
        (ee) => {
          util.loading(false);
          setBuySpacing(false);
        }
      );
    querySpace();
  };
  const handleCancel = () => {
    util.loading(false);
    setIsModalOpen(false);
  };
  const onNumberChange = (e) => {
    setBuySize(e);
  };
  const onCategoryChanage = (e) => {
    setLabel(e);
    console.log(e);
  };
  const onFilterChanage = (e) => {
    setFilter(e);
    console.log(e);
  };
  return (
    <div className={props.className}>
      <Modal
        title="Buy Store Space"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={buySpacing}
            disabled={buySpacing}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div>
          <p style={{ marginTop: "20px", color: "#888" }}>
            Estimated 30 TCESS / GiB / 30 days
          </p>
          <div style={{ lineHeight: "20px" }}>
            Buy Size{" "}
            <InputNumber
              min={1}
              max={10000}
              defaultValue={1}
              onChange={onNumberChange}
            />{" "}
            GiB
          </div>
          <div style={{ lineHeight: "20px", marginTop: "30px", color: "#aaa" }}>
            Total{" "}
            <font style={{ fontSize: "30px", color: "#000" }}>
              {" "}
              {buySize * 30}{" "}
            </font>{" "}
            TCESS
          </div>
          <div style={{ lineHeight: "20px", marginTop: "30px", color: "#aaa" }}>
            Your balance{" "}
            <font style={{ fontSize: "30px", color: "#000" }}>
              {" "}
              {myBalance}{" "}
            </font>{" "}
            TCESS
          </div>
          <div>
            {myBalance < buySize * 30 ? (
              <Alert
                message="Sorry, your tcess is running low"
                type="error"
                showIcon
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal>
      {/* <Card title="Create New Video NFT"> */}
      <h1>Create New Video NFT</h1>
      <h3>
        <font color="red">*</font>Upload Files
      </h3>
      <div className="upload-box-out">
        {spaceAuth ? (
          <div className="upload-box">
            <div className="up-left">
              {videoUrl ? (
                <div className="player-box" title="load video from cess">
                  <video
                    style={{ backgroundColor: "#000" }}
                    autoPlay={true}
                    width="100%"
                    height="100%"
                    controls
                    id="myplayer"
                  >
                    <source src={formatVideoUrl(videoUrl)} type="video/mp4" />
                  </video>
                  <div
                    title="Remove and re upload"
                    className="btn-remove"
                    onClick={onRemoveVideo}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ) : selectVideoName ? (
                <div className="player-box">
                  <div className="vide-name">{selectVideoName}</div>
                  <div
                    title="Remove and re upload"
                    className="btn-remove"
                    onClick={onRemoveVideo}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ) : (
                <Dragger {...uppropsVideo}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    File types supported: MP4, PNG, JPG, JPEG.
                  </p>
                  <p className="ant-upload-hint">
                    Max size: 2 GB.
                  </p>
                </Dragger>
              )}
            </div>
            <div className="up-right">
              <div className="up-right-item">
                <div>File size</div>
                <label>{fileSize ? formatterSize(fileSize) : "--"}</label>
              </div>
              {duration ? (
                <div className="up-right-item">
                  <div>File duration</div>
                  <label>{duration}</label>
                </div>
              ) : (
                ""
              )}
              <div className="up-right-item">
                <div>Available size</div>
                {space ? (
                  <label>{formatterSize(space.remainingSpace)}</label>
                ) : (
                  <div>
                    <Button
                      onClick={startQuerySpace}
                      disabled={spaceAuthing}
                      loading={spaceAuthing}
                    >
                      Query available size
                    </Button>
                  </div>
                )}
              </div>
              <div className="up-right-item">
                <Button
                  style={{
                    width: 140,
                    backgroundColor: "#013088",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={onOpenBuySpaceModel}
                >
                  Buy Store Space
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Button
              onClick={onAuthorize}
              disabled={spaceAuthing}
              loading={spaceAuthing}
            >
              Store Space Authorize
            </Button>
            {authProgress ? (
              <Progress percent={authProgress} status="active" />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <h3>
        <font color="red">*</font>Upload a cover photo
      </h3>
      <div className="upload-box-out">
        <div className="upload-box">
          <div className="up-left">
            <Dragger {...uppropsPic}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                File types supported: jpg/png/gif/bmp Max size: 8MB.
              </p>
            </Dragger>
          </div>
          {cover ? (
            <div
              className="up-right img-bg"
              style={{
                backgroundImage: "url(" + formatImgUrl(cover) + ")",
              }}
            ></div>
          ) : (
            <div className="up-right">
              <Empty description="Not uploaded" />
            </div>
          )}
        </div>
      </div>
      <h3>
        <font color="red">*</font>Name
      </h3>
      <div className="input-box">
        <Input onChange={onChangeName} maxLength={45} placeholder="Max length 45" />
      </div>
      <h3>
        <font color="red">*</font>NFT Description
      </h3>
      <div className="tips">
        The description will be included on the the detail page underneath its
        video.
      </div>
      <div className="input-box">
        <TextArea
          showCount
          maxLength={300}
          style={{
            height: 80,
          }}
          onChange={onChangeAbout}
          placeholder="The description will be included on the the detail page underneath its video."
        />
      </div>
      <h3>Category</h3>
      <div className="select-chain">
        <Select
          defaultValue="News"
          style={{
            width: 120,
          }}
          onChange={onCategoryChanage}
          options={webconfig.cats}
        />
      </div>
      {
        label == 'Conference' ? <> <h3>Filter</h3>
          <div className="select-chain">
            <Select
              defaultValue={filter}
              style={{
                width: 320,
              }}
              onChange={onFilterChanage}
              options={filterList}
            />
          </div></> : ""
      }
      <h3>Blockchain</h3>
      <div className="select-chain">
        <Select
          defaultValue="CESS"
          style={{
            width: 120,
          }}
          disabled
          options={[
            {
              value: "CESS",
              label: "CESS",
            },
          ]}
        />
      </div>
      <h3>File Storage Onchain</h3>
      <div className="select-chain">
        <Select
          defaultValue="CESS"
          style={{
            width: 120,
          }}
          disabled
          options={[
            {
              value: "CESS",
              label: "CESS",
            },
          ]}
        />
      </div>
      <div className="hold"></div>
      <div className="hold"></div>
      <Button
        type="primary"
        onClick={onSubmit}
        disabled={saving}
        loading={saving}
        size="large"
        style={{ width: 120 }}
      >
        Create
      </Button>
      {/* </Card> */}
      <div className="hold"></div>
      <div className="hold"></div>
    </div>
  );
}

export default styled(Home)`
  width: 600px;
  display: block;
  overflow: hidden;
  margin: 0px auto;
  padding: 70px 20px 20px;

  .block {
    display: block;
    overflow: hidden;
    clear: both;
  }
  .hold {
    display: block;
    overflow: hidden;
    clear: both;
    width: 100%;
    height: 10px;
  }
  h3 {
    margin-top: 20px;
  }
  .vide-name {
    line-height: 40px;
    font-size: 14px;
  }
  .upload-box-out {
    padding-bottom: 20px;
    .upload-box {
      display: flex;
      .up-left {
        width: 60%;
        .btn-remove {
          width: 100%;
          background-color: #eee;
          text-align: center;
          line-height: 28px;
          color: red;
          cursor: pointer;
        }
      }
      .up-right {
        width: 38%;
        padding: 0 1%;
        border: 1px solid #eee;
        border-radius: 9px;
        margin-left: 15px;
        text-align: center;
        box-shadow: 0px 2px 5px 1px #0000000a;
        .up-right-item {
          border-bottom: 1px solid #eee;
          padding: 8px 20px;
          div {
            font-size: 12px;
            color: #aaa;
          }
          label {
            font-size: 20px;
            color: #222;
          }
        }
      }
      .img-bg {
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
  }
`;
