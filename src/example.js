import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { NftProvider, useNft } from "use-nft"

import FiredGuys from '../../build/contracts/Flock.json'

const contractAddress = '0x892e21f1105E663d2fDAD28356FbC63bbCB13d09'

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);

function Home() {

  const [totalMinted, setTotalMinted] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      getCount();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCount = async () => {
    const count = await contract.balanceOf(signer.getAddress());
    console.log(`Total Minted: ${parseInt(count)}`);
    setTotalMinted(parseInt(count));
  };


  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.buyTicket({
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
  };




  return (



<NftProvider fetcher={["ethers", {provider: provider}]}>
    
    <div>
      <WalletBalance />

      <h1>Perpetualator lottery</h1>
      <button className="btn btn-primary" onClick={mintToken}>
    Mint
  </button>
      
      <div className="container">
        <div className="row">
          {Array(totalMinted)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage index={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  </NftProvider>
  );
}

function NFTImage({ index }) {
  console.log(`Checking: ${contractAddress} | index ${index} | signer ${signer.getAddress()}`)

  //async function getTokenOfOwnerByIndex(index) {
  //  const tokenId = await contract.tokenOfOwnerByIndex(signer.getAddress(), index);
  //  console.log(`tokenId: ${tokenId}`);
  //  return tokenId;
  //}

  //const tokenId = getTokenOfOwnerByIndex(index);


  const { loading, error, nft } = useNft(
    contractAddress,
    contract.tokenOfOwnerByIndex(signer.getAddress(), index)
    
  )


  console.log(`loading: ${loading}`)

  console.log(`error: ${error}`)

  console.log(`nft: ${nft}`)



  // nft.loading is true during load.
 

  // nft.error is an Error instance in case of error.
  //if (error || !nft) return <>Error.</>




//   const imageURI = `img/${tokenId}.png`;





  const [isMinted, setIsMinted] = useState(false);

  //useEffect(() => {
   // getMintedStatus();
  //}, [isMinted]);


  // is this right?
  useEffect(() => {
    getMintedStatus();
  }, [loading, isMinted]);


  const getMintedStatus = async () => {
    //console.log(`nft.rawData: ${nft.rawData}`);
    console.log(`nft.image: ${nft.image}`);
    //console.log(`nft.imageType: ${nft.imageType}`);
    //console.log(`nft.name: ${nft.name}`);
    //console.log(`nft.description: ${nft.description}`);
    //const result = await contract.isContentOwned(nft.metadataUrl);
    const result = await contract.isContentOwned(nft.metadataUrl);
    console.log(`nftmetadataUrl: ${nft.metadataUrl}`);
    //console.log(`MINTED? ${result}`);
    setIsMinted(result);
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? nft.image : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #</h5>
      </div>

    </div>
  );
}

export default Home;
