import store from "./utils/store";

let defaultConfig = {
  // videoApiUrl: "/cmps",
  videoApiUrl: "http://221.122.79.5:8081/cmps",
  // apiUrl: "/vd",
  apiUrl: 'http://221.122.79.5:5001',
  // apiUrl: "/vd",
  // apiUrl:"http://www.videown.net/vd",
  contractAddress: "cXkKguBENwLWp1ftTekF4bwcpqNRD55Vri28Q1vVNEL64GpME", //"cXkTiNhkhh9hEZS45g3ZNRre1nYVza927yY6eDk9Qrte1rBZE",//0xdc07f8eab0f42135e751d5f0b3f7357c3aac3730a49ce5972747b5d83db533dc
  // nodeURL: "wss://testnet-rpc1.cess.cloud/ws/", //"ws://192.168.14.211:9944", //"ws://localhost:9944"
  // nodeURL:"wss://devnet-rpc.cess.cloud/ws/"
  nodeURL: "wss://testnet-rpc1.cess.cloud/ws/",
};

export default {
  sitename: "Videown",
  isUpgrading: false,
  videoApiUrl: getConfig("videoApiUrl"),
  apiUrl: getConfig("apiUrl"),
  contractAddress: getConfig("contractAddress"),
  wsnode: {
    nodeURL: getConfig("nodeURL"), //"ws://localhost:9944"
    keyringOption: { type: "sr25519", ss58Format: 42 },
  },
  cats: [
    {
      label: "Trendy", value: "Trendy"
    },
    {
      label: "Games", value: "Games"
    },
    {
      label: "Music", value: "Music"
    },
    {
      label: "Education", value: "Education"
    },
    {
      label: "Tech/DIY", value: "TechDIY"
    },
    {
      label: "Events", value: "Events"
    },
    {
      label: "Conference", value: "Conference"
    },
    {
      label: "Interview", value: "Interview"
    },
  ]
};
function getConfig(key) {
  let json = store.get("webconfig");
  if (!json) {
    if (window.webconfig && window.webconfig[key]) {
      return window.webconfig[key];
    }
    return defaultConfig[key];
  }
  return json[key] || defaultConfig[key];
}
