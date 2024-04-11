import store from "./utils/store";

let defaultConfig = {
  videoApiUrl: "/cmps",
  apiUrl: '/vd',
  websocketApiUrl:"wss://videown.io/cmps/upload-progress/",
  // videoApiUrl: "http://39.108.54.98:3008",
  // apiUrl: "http://39.108.54.98:3007",
  // websocketApiUrl:"ws://221.122.79.5:8081/upload-progress/",
  nodeURLs: [
    'wss://testnet-rpc0.cess.cloud/ws/',
    'wss://testnet-rpc1.cess.cloud/ws/',
    'wss://testnet-rpc2.cess.cloud/ws/',
    'wss://testnet-rpc3.cess.cloud/ws/'
  ],
  contractAddress: "cXkKguBENwLWp1ftTekF4bwcpqNRD55Vri28Q1vVNEL64GpME",
  gatewayAddr: "cXisZ8kRMxWmjHsuwYFd6SWCxskZyRyCRfLVxznXMEr8sXebA",
  ss58Format: 11330,
  cats:[
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

export default {
  sitename: "Videown",
  isUpgrading: false,
  videoApiUrl: getConfig("videoApiUrl"),
  apiUrl: getConfig("apiUrl"),
  websocketApiUrl: getConfig("websocketApiUrl"),
  contractAddress: getConfig("contractAddress"),
  gatewayAddr: getConfig("gatewayAddr"),
  wsnode: {
    nodeURLs: getConfig("nodeURLs"),
    keyringOption: { type: "sr25519", ss58Format: getConfig("ss58Format") },
  },
  cats:  getConfig("cats"),
};
function getConfig(key) {
  let json = store.get("webconfig");
  if (!json) {
    return defaultConfig[key];
  }
  return json[key] || defaultConfig[key];
}
