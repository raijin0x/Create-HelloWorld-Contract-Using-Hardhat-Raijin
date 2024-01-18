import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import helpers from "@nomicfoundation/hardhat-toolbox/network-helpers";  

// Load Environment Variables
// ========================================================
require("dotenv").config();



const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // For localhost network
    hardhat: {
      chainId: 1337,
    },
    // NOTE: hardhat viem currently doesn't yet support this method for custom chains through Hardhat config ↴
    "berachainTestnet": {
      chainId: 80085,
      url: "https://artio.rpc.berachain.com/",
      accounts: [process.env.WALLET_KEY as string],
      
    },
  },
  etherscan: { 
    apiKey: `${process.env.BLOCK_EXPLORER_API_KEY}`, 
    customChains: [ 
      { 
        network: "Berachain Testnet", 
        chainId: 80085,
        urls: { 
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/80085/etherscan/api/", 
          browserURL: "https://artio.beratrail.io/" 
        } 
      }, 
    ] 
  } 
}; 
export default config;
