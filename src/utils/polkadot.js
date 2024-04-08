import { getAPI } from './init-polkadot-api';
import Keyring from './keyring';

import webconfig from "../webconfig";
const config = webconfig.wsnode;
let keyring=new Keyring(config.keyringOption);

export { getAPI, getKeyring, toPublickKey };

function getKeyring() {    
  return keyring;
}
function toPublickKey(addr) {
  return keyring.getPublicKeyFromAccountId(addr);
}
