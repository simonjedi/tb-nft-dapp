import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown,Carousel,Row,Col,Modal,Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNav from './MyNav';

import React, { Component, useState, useEffect } from 'react'

import getWeb3 from "./getWeb3";

//   
import SingleNFT from './SingleNFT';

// import { NftProvider, useNft } from "use-nft"

import Connection from "./Connection";
 
import { useWallet, UseWalletProvider } from 'use-wallet'

import img1 from './components/Structure/images/PowerPose.gif';
import img2 from "./components/Structure/images/NFT_LOOTBOX_HEADER.png"

 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import { Helmet } from 'react-helmet';

import axios from "axios";

import ABI from './erc1155.json'
import LOOTBOX_ABI from './LootboxABI.json'
import TOKEN_ABI from './TokenABI.json'



import { HashLink as LinkHeader } from 'react-router-hash-link';


function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {

    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

    window.scrollTo(0, 0);


  }, []); // Empty array ensures that effect is only run on mount


  return windowSize;
}


const App = (props) => {


  const { width, height } = useWindowSize();

  // Set Web 3
  const [web3,setWeb3] = useState(null)
  const [balance,setBalance] = useState(null)

  // Account info
  const [accounts,setAccounts] = useState(null)

  // Contracts
  const [erc1155_contract,setErc1155_contract] = useState(null)
  const [erc1155_contract_address,setErc1155_contract_address] = useState(null)

  const [LootBox_contract,setLOOTBOX_contract] = useState(null)
  const [LootBox_contract_address,setLOOTBOX_contract_address] = useState(null)

  const [tokenContract,settokenContract] = useState(null)
  const [tokenContract_Address,settokenContract_address] = useState(null)

  // wallet info
  const [wallet_for_google, setWallet_for_google_treasurebloxNative_] = useState('Unknown');
  const [ip, setIP_treasurebloxNative_] = useState('');

  // network type
  const [is_meter,setIs_Meter] = useState(false);

    // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Json
  var [data,setData]=useState([]);
  var tempArray = []

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Componant
  const [index, setIndex] = useState(0);
  const [nft_balanceOf, setnft_balanceOf] = useState(1);
  const [loader, setLoader] = useState(true);


  // Google Analytics
  const learn_more = (event) => {
    window.dataLayer.push({
      event: "wallet_information",
      wallet: props.wallet_for_google,
      wallet_ip: props.ip,
      url: window.location.pathname,
      buttonClicked:"learn_more_clicked"
    });
  }

  let myArray = []
  let balances = []

  const handlePlay = async() => {

    const allowance = await tokenContract.methods.allowance(accounts[0],LootBox_contract_address).call();

    if (allowance <= web3.utils.toWei("10", 'ether')){
      await tokenContract.methods.approve(LootBox_contract_address,web3.utils.toWei("100", 'ether')).send({from: accounts[0]});
    }

    const transaction = await LootBox_contract.methods.rollDice(accounts[0],1).send({from: accounts[0]});
    
  }


  useEffect(() => {

    // Wait for 3 seconds

    setTimeout(() => {

      setIsLoading(false);
    }, 4000);
  }, []);

  var my_index = 0

  useEffect(() => {


  const init = async() => {

    if (isLoading){
      window.scrollTo({top: 0})
    }

    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts[0])

    const Moralis = require('moralis');

    // Loading state

    const isWeb3Active = Moralis.ensureWeb3IsInstalled()

    if (isWeb3Active) {
    } else {
      await Moralis.enableWeb3();
    }

    const currentChainId = await Moralis.getChainId();


    // START NETWORK IF BSC
    if (currentChainId === 56) {

    setIs_Meter(false)

    setWallet_for_google_treasurebloxNative_("w="+accounts.toString())

    // End of Game timer code

  }// End of network if statement BSC

  // STARTING METER HERE
  // Meter Testnet
  // if (currentChainId === 83) {
  // https://rpctest.meter.io/


  if (currentChainId === 82) {

    setIs_Meter(true)

    // SET ACCOUNTS
    const accounts = await web3.eth.getAccounts();

    setAccounts(accounts)

    setWeb3(web3)

    const ERC1155_CONTRACT = new web3.eth.Contract(ABI,"https://rpc.meter.io/" && "0x4FBd2Db19de40e0fD36e91d7a848F84515a54242");
    const ERC1155_CONTRACT_ADDRESS = "0x4FBd2Db19de40e0fD36e91d7a848F84515a54242"
    
    setErc1155_contract(ERC1155_CONTRACT)
    setErc1155_contract_address(ERC1155_CONTRACT_ADDRESS)


    const LOOTBOX_CONTRACT = new web3.eth.Contract(LOOTBOX_ABI,"https://rpc.meter.io/" && "0x84502299d9E1c3d5fb207D17357D12E9F0476C89");
    const LOOTBOX_CONTRACT_ADDRESS = "0x84502299d9E1c3d5fb207D17357D12E9F0476C89"
     
    setLOOTBOX_contract(LOOTBOX_CONTRACT)
    setLOOTBOX_contract_address(LOOTBOX_CONTRACT_ADDRESS)


    const tokenContract = new web3.eth.Contract(TOKEN_ABI,"https://rpc.meter.io/" && "0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3");
    const tokenContract_Address = "0x84502299d9E1c3d5fb207D17357D12E9F0476C89"
    const decimals = await tokenContract.methods.decimals().call();

    settokenContract(tokenContract)
    settokenContract_address(tokenContract_Address)

   


    const timer = window.setInterval( async() => {

      myArray = []
      balances = []


      // var nft_metadata = await ERC1155_CONTRACT.methods.uri(0).call();
      // console.log(nft_metadata)
      // 46
      for (let i = 0; i < 46; i++) {
        // console.log(i)
        setIndex(i)
        my_index = i;

        // console.log(my_index)
       
        var nft_metadata = await ERC1155_CONTRACT.methods.uri(i).call();
        console.log(nft_metadata,"nft_metadata nft_metadata")
        var quick_bal = await ERC1155_CONTRACT.methods.balanceOf(accounts[0],i).call();

        balances.push(quick_bal)

        // console.log(nft_metadata)
        // nft_metadata = nft_metadata.split("https://api.treasureblox.finance/");
        // console.log(nft_metadata[1])
        //   fetch(nft_metadata[1]
        //     ,{
        //       headers : { 
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //       }
        //     }
        //     ).then(function(response){
        //         // console.log(response)
        //         return response.json();
        //       }).then(function(myJson) {
        //         // console.log(myJson,"this is the log");
        //         var json = myJson;
                
        //         myArray.push(json);
                
        //         // console.log(myArray)
        //         // setData([json])
        //       });

        nft_metadata = nft_metadata.split("https://api.treasureblox.finance/");

        console.log(nft_metadata)
          fetch(nft_metadata
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
            ).then(function(response){
                // console.log(response)
                return response.json();
              }).then(function(myJson) {
                // console.log(myJson,"this is the log");
                var json = myJson;
                
                myArray.push(json);
                
                // console.log(myArray)
                // setData([json])
              });
             
      }
      // console.log(myArray)
      setData(myArray)
      setnft_balanceOf(balances)

      setLoader(false)
      // console.log(index,"index")
      // console.log(data,"data")
      // console.log(myArray,"myarray")

    }, 10000);

    
    

} // End of network if statement METER


  }
  init()

  },[is_meter,web3,accounts,wallet_for_google,ip,balance,isLoading,nft_balanceOf,data,index])


  

  
  return (

    <div className="background customFont" >

    <Helmet>
    <Modal.Title>TreasureBlox Lootbox NFT's</Modal.Title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    </Helmet>

    <Router>

        <Switch>

              <Route path="">

              <MyNav {...props} accounts={accounts} is_meter={is_meter} onClick={() => Connection()}/>

                <Container className='mt-5' fluid="md">

                <div id="top" className="spaceTopHome">




                </div>
                <br/> 

                <div style={{ color: 'white' }}>

                <Modal show={show} onHide={handleClose} 
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                >
                <Modal.Header closeButton>
                  <Modal.Title className="customFont">TreasureBlox Lootbox NFT's</Modal.Title>
                </Modal.Header>
                <Modal.Body className="customFont">Cost for 3 random NFT's - 2 MTRG</Modal.Body>
                <Modal.Footer>
                  <Button className="customButton customFont" variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button className="customButton customFont" onClick={handlePlay}>
                    Mint
                  </Button>
                </Modal.Footer>
                </Modal>


                <Card.Img variant="top" src={img2} alt="Logo" className='customRounded'/>
                <center>
                  <h3 >NFT Lootbox - Collect and trade elements to build your own charicter NFT's, gain in game abilities to complete our treasurehunts & more!</h3>
                  <p>
                    Click generate to mint 3 random nft's - cost 2 MTRG!
                  </p>
                  <LinkHeader to="/home#yourAnchorTag">
                  <Button  className="customButton" onClick={handleShow} id="header_play_to_earn" style={{margin:'10px'}}>Start</Button>
                </LinkHeader>

                </center>

                <br/>
                <div className="hr">
                </div>
                <br/>

                <center>
                  <h3 sm={12} lg={4} className="d-none d-lg-block">YOUR COLLECTION</h3>

                  {(loader) && <Spinner animation="border" role="status"/> }
                    
                </center>

                <div className="collection-background">

                <div className="container">
                  <div className="row">

                  <div className="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 0) &&  <SingleNFT id={i} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div className="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 1) &&  <SingleNFT id={i} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div className="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 2) &&  <SingleNFT id={i} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div className="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 3) &&  <SingleNFT id={i} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>


                  </div>
                </div>


                

                </div>
                 
                
                

                <br/>
                <br/>


{/* 

                NFT BAL: {nft_balanceOf}
 */}


                {/* <br/>
                {props.data.image}
                <br/> 

                {props.data.name}
                <br/> 

                {props.data.attributes[0].trait_type}
                <br/> 

                {props.data.attributes[0].value} */}










                </div>




                </Container>

          

              </Route>

        </Switch>
        <div>

        </div>


    </Router>

    




    </div>


  );

}
  
  



export default App;

