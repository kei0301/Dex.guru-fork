import Web3 from 'web3';
import FactoryABI from '../contract/factory.json';
import RouterABI from '../contract/swap.json';
import TokenABI from '../contract/erc20.json';
const FactoryAddress = '0x59CF3D522A74C0829e6Cb452A32C336C37Cdb252';
const RouterAddress = '0x5944cB6Fe916b1F5142faF63d0bFA9779382eE75';
// import TokenABI from '../contracts/Moonstar.json';
// import MoonstarAuctionABI from '../contracts/MoonstarAuction.json';
// import NFTABI from '../contracts/MoonstarNFT.json';
// import AuctionABI from '../contracts/Auction.json';
// import AuctionBNBABI from '../contracts/AuctionBNB.json';
// import {
//   TokenAddress,
//   FactoryAddress,
//   MoonstarAuction,
//   AuctionAddress,
//   AuctionBNBAddress,
// } from '../constants';

const { ethereum } = window;
const web3 = new Web3(ethereum);
// Check if the metamas is installed
export const _isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  let { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};
export const getCurrentChainId = async () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const chainID = await web3.eth.net.getId();
  return chainID;
};
// Check current chain is valid or not
export const _isValidChainId = async () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  if (_isMetaMaskInstalled()) {
    const chainID = await web3.eth.net.getId();
    if (chainID === 97) {
      // BSC testnet for demo version
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Get Factory Contract Instanse
export const getFactoryContractInstance = () => {
  let newFactoryContract = new web3.eth.Contract(
    FactoryABI,
    FactoryAddress
  );
  return newFactoryContract;
};

export const getSwapContractInstance = () => {
  let swapContract = new web3.eth.Contract(
    RouterABI,
    RouterAddress
  );
  return swapContract;
}

// Get Token Contract Instanse
export const getTokenContractInstance = (tokenAddress) => {
  let newTokenContract = new web3.eth.Contract(
    TokenABI,
    tokenAddress
  );
  return newTokenContract;
};

// // Get NFT  Contract Instanse
// export const getNFTContractInstance = (address) => {
//   let newNFTContract = new web3.eth.Contract(
//     NFTABI,
//     address
//   );
//   return newNFTContract;
// };

// // Get Factory Contract Instanse
// export const getAuctionContractInstance = () => {
//   let newAuctionContract = new web3.eth.Contract(
//     MoonstarAuctionABI,
//     MoonstarAuction
//   );
//   return newAuctionContract;
// };

// // export const getAuctionContractInstance = () => {
// //   let newAuctionContract = new web3.eth.Contract(
// //     AuctionABI,
// //     AuctionAddress
// //   );
// //   return newAuctionContract;
// // };
// // Get Factory Contract Instanse

// export const getAuctionBNBContractInstance = () => {
//   let newAuctionContract = new web3.eth.Contract(
//     AuctionBNBABI,
//     AuctionBNBAddress
//   );
//   return newAuctionContract;
// };
// // Get user default wallet address
// export const getDefaultAddres = async () => {
//   let defaultAccount = await web3.eth.getAccounts();
//   return defaultAccount[0];
// };

// // get current user's BNB Balance
// export const getBNBBalance = async () => {
//   let userAddress = await getDefaultAddres();
//   let defaultBalance = await web3.eth.getBalance(userAddress);
//   return web3.utils.fromWei(defaultBalance, 'ether');
// };

// // Get current user's Token balance
// export const getTokenBalance = async () => {
//   let tokenContract = await getTokenContractInstance();
//   let userAddress = await getDefaultAddres();
//   if (tokenContract && userAddress) {
//     const temp = await tokenContract.methods.balanceOf(userAddress).call();
//     return web3.utils.fromWei(temp, 'ether');
//   } else {
//     return 0;
//   }
// };

// // Get User NFT Balance
// export const getUserNFTBalance = async () => {
//   let gameFactory = await getTokenContractInstance();
//   let userAddress = await getDefaultAddres();
//   if (gameFactory && userAddress) {
//     const ntfBalance = await gameFactory.methods.balanceOf(userAddress).call();
//     return ntfBalance;
//   } else {
//     return 0;
//   }
// };
