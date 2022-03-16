// App.js

import React, {useState, useEffect} from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'
import { Button,ButtonGroup,Col,Toast,Modal } from 'react-bootstrap';

import MyNav from "./MyNav";
import App from "./App";
import "./App.css";

import getWeb3 from "./getWeb3"

import img_bsc from './components/Structure/images/bsc_logo.png';
import img_meter from './components/Structure/images/meter.png';

let name = 0;
const Connection = (props) =>  {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);



  const wallet = useWallet()
  const [firstPartAddress, setFirstPartAddress] = useState('Connect Wallet');
  const [secondPartAddress, setSecondPartAddress] = useState('');




  useEffect(() => {

     const init = async() => {

       const web3 = await getWeb3();
       const accounts = await web3.eth.getAccounts();
       const usersAccount = accounts;
       const stringOfUsersAccount = new String(usersAccount);
       setFirstPartAddress(stringOfUsersAccount.slice(0, 5));
       setSecondPartAddress('____'+stringOfUsersAccount.slice(37, 42));
       name = stringOfUsersAccount.slice(0, 5)
     }
     init()
   });

  const connectWallet = async(e) => {
    await wallet.connect()
    const usersAccount = props.accounts;
    const stringOfUsersAccount = new String(usersAccount);
    setFirstPartAddress('Welcome');
    setSecondPartAddress('');
    window.location.reload();

  }

  const bsc = async(e) => {
    const Moralis = require('moralis');
    // ES6 Minimized
    const web3 = await Moralis.enableWeb3();

    const chainId = "0x38"; //BSC Mainnet
    const chainName = "Smart Chain";
    const currencyName = "BNB";
    const currencySymbol = "BNB";
    const rpcUrl = "https://bsc-dataseed.binance.org/";
    const blockExplorerUrl = "https://bscscan.com";
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );
    const chainIdHex = await Moralis.switchNetwork(chainId);

    window.location.reload(false);

  }

  const meter = async(e) => {
    const Moralis = require('moralis');
    // ES6 Minimized
    const web3 = await Moralis.enableWeb3();


    // const chainId = "0x53"; //Meter Mainnet
    const chainId = "0x52"; //Meter Mainnet

    // const chainName = "Meter Testnet";
    const chainName = "Meter Mainnet";

    const currencyName = "MTR";
    const currencySymbol = "MTR";
    // const rpcUrl = "https://rpctest.meter.io";
    const rpcUrl = "https://rpc.meter.io";
    const blockExplorerUrl = "https://scan-warringstakes.meter.io";
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );

    const chainIdHex = await Moralis.switchNetwork(chainId);

    window.location.reload(false);

  }






  return(
    <div>

      <ButtonGroup className="mb-1">
          <Button className="btn btn-default btn-light" onClick={meter} >
          <img
            alt="treasureblox_logo"
            src={img_meter}
            width="25"
            className="d-inline-block align-middle"
          />
          </Button>
          <Button className="btn btn-default btn-dark" onClick={bsc} >

          <img
            alt="treasureblox_logo"
            src={img_bsc}
            width="25"
            className="d-inline-block align-middle"
          />
          </Button>

          <Button onClick={connectWallet} id="wallet-button" className="customWalletButton " >{props.accounts?(<div>Connected</div>):(<div>Connect Wallet</div>)} </Button>

        </ButtonGroup>


        <br />

    </div>
  )
}

// Wrap everything in <UseWalletProvider />
export default (props) => (
  <UseWalletProvider


    chainId={1337}
    connectors={{
      // This is how connectors get configured
      provided: {provider: window.cleanEthereum},
    }}>


    <Connection accounts={props.accounts}/>


  </UseWalletProvider>
)
