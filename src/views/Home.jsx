import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {
  PlayCircleOutlined,
  CloudUploadOutlined,
  WalletOutlined,
  SearchOutlined,
  HomeOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Modal, Alert, Menu, message, Popconfirm, Empty } from "antd";
import React, { useState, useEffect } from "react";
import PolkadotLogo from "../statics/polkadot-logo.svg";
import { getAPI, getKeyring } from "../utils/polkadot";
import { formatAddress } from "../utils";
import Identicon from "@polkadot/react-identicon";
import Img from "../components/Img";
import * as util from "../utils";
import { formatImgUrl, formatterSize } from "../utils/formatter";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import {
  controlGetList,
  controlGetActivityList,
  controlTransfer,
  controlMint,
  controlBuy,
  controlCancel,
} from "../controls/nft";

function Home({ className }) {
  const { keyword, cat } = useParams();
  document.title = "Videown Home";
  let navigate = useNavigate();
  const [NFTlist, setNFTlist] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (cat) {
      controlGetList(null, null, true).then((list) => {
        let tmp = list.filter((t) => t.label == cat);
        console.log({filter,tmp});
        if (cat == 'Conference' && filter != 'all') {
          tmp = tmp.filter((t) => t.nftType == filter);
          console.log({tmp});
        }
        setNFTlist(tmp);
      });
    } else {
      controlGetList(setNFTlist, keyword, true);
    }
  }, [keyword, cat,filter]);
  const onBackHome = () => {
    navigate("/"); 
  };
  return (
    <div className={className}>
      <div className="content">
        {keyword ? (
          <div className="search-show">
            <Alert
              icon={<HomeOutlined />}
              showIcon={true}
              message={
                'Search results of the keyword "' +
                keyword +
                '",found ' +
                NFTlist.length +
                " items."
              }
              onClose={onBackHome}
              type="success"
              closeText="Back Home"
            />
            <span></span>
            <span></span>
          </div>
        ) : cat ? (
          <div className="search-show">
            <Alert
              icon={<HomeOutlined />}
              showIcon={true}
              message={
                "The NFT of category " +
                cat +
                ",found " +
                NFTlist.length +
                " items."
              }
              onClose={onBackHome}
              type="success"
              closeText="Back Home"
            />
            <span></span>
            <span></span>
          </div>
        ) : (
          ""
        )}
        <div className={cat && cat == "Conference" ? "filter-box" : "none"}>
          <div className="filter-title">Filter</div>
          <div className="filter-btns">
            <span className={filter == "all" ? "curr" : "uncurr"} onClick={() => setFilter('all')}>All</span>
            <span className={filter == "video" ? "curr" : "uncurr"} onClick={() => setFilter('video')}>Duke Blockchain conference 2024 video</span>
            <span className={filter == "pictures" ? "curr" : "uncurr"} onClick={() => setFilter('pictures')}>Duke Blockchain conference 2024 pictures</span>
          </div>
        </div>
        {NFTlist.length == 0 ? (
          <div className="empty">
            <Empty />
          </div>
        ) : (
          ""
        )}
        <div className="con">
          {NFTlist &&
            NFTlist.map((t, i) => (
              <div
                className="item block"
                key={i}
                onClick={() => {
                  navigate("/play/" + t.fileHash);
                }}
              >
                <Img width={"100%"} height={202} src={t.coverImg} />
                <PlayCircleOutlined className="play-icon" />
                <div className="view-line block">
                  {t.views ? (
                    <span>{t.views} views</span>
                  ) : (
                    <span>{formatterSize(t.size)}</span>
                  )}

                  <label>{t.length}</label>
                </div>
                <div className="title-line block">{t.fileName}</div>
                <div className="icon-line block">
                  <Identicon
                    value={t.owner}
                    size={28}
                    theme={"polkadot"}
                    style={{ width: "10%" }}
                  />
                  <span className="addr">{formatAddress(t.owner)}</span>
                  <span className="blance">{t.price}TCESS</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default styled(Home)`
  padding: 70px 0px 20px;
  .con {
    width: 100%;
    padding: 0 2%;
    display: flex;
    flex-wrap: wrap;
  }
  .none{
    display: none;
  }
  .block {
    display: block;
    overflow: hidden;
  }
  .filter-box{
    width: 100%;    
    .filter-title{
      width: 100%;  
      height:40px;
      line-height: 40px;
      color:#000;
      font-size:14px;
      text-align: center;
      font-weight:bold;
    }
    .filter-btns{
      display: flex;
      width: 100%;
      height:40px;      
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span{
        padding:0 10px;
        height:26px;
        line-height: 26px;
        border-radius: 30px;
        border:1px solid #999;
        margin:0 3px;
        font-size:14px;
      }
      .curr{
        background-color: rgba(1, 48, 136, 1);
        color:#fff;
        cursor: not-allowed;
      }
      .uncurr{
        color:#000;
        cursor: pointer;
      }
      .uncurr:hover{
        background-color: #eee;
      }
    }
  }
  .item:hover {
    box-shadow: 1px 2px 7px 0px #0000007a;
    .play-icon {
      color: #5e96ff;
    }
  }
  .empty {
    padding: 100px;
  }
  .search-show {
    padding: 0 3%;
  }
  .item {
    width: 23%;
    background-color: rgb(221, 221, 221);
    position: relative;
    cursor: pointer;
    margin: 1%;
    .play-icon {
      position: absolute;
      top: 59px;
      left: 41%;
      z-index: 99;
      font-size: 59px;
      color: #ffffff37;
      border-radius: 100%;
      transition: all 1s;
    }
    .img {
      width: 357px;
      height: 202px;
    }
    .view-line {
      width: 100%;
      height: 22px;
      line-height: 22px;
      background-color: #000000bf;
      position: absolute;
      top: 181px;
      left: 0px;
      color: #fff;
      padding: 0 10px;
      span {
        float: left;
      }
      label {
        float: right;
      }
    }
    .title-line {
      padding: 4px 6px;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
    }
    .icon-line {
      display: flex;
      padding: 4px 6px;
      line-height: 26px;
      .addr {
        color: #888;
        width: 60%;
      }
      .blance {
        width: 40%;
        text-align: right;
      }
    }
  }
`;
