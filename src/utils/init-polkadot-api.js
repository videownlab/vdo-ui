import { InitAPI } from "cess-js-sdk";

function getAPI() {
    if (!window.api) {
        const { api, keyring } = InitAPI({
            nodeURL: "wss://testnet-rpc1.cess.cloud/ws/",
            keyringOption: { type: "sr25519", ss58Format: 11330 },
            gatewayURL: "http://deoss-pub-gateway.cess.cloud/",
            gatewayAddr: "cXhwBytXqrZLr1qM5NHJhCzEMckSTzNKw17ci2aHft6ETSQm9",
        });
        window.api = api;
        window.keyring = keyring;
    }
    return window.api;
}

export { getAPI };