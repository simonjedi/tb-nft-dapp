// Bootstrap
import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

// Css
import './SingleNFT.css';

// React
import React, { Component, useState, useEffect } from 'react'

// React Addons
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const SingleNFT = (props) => {

  // Balance of NFTs

  // Transform Json Element
  // var trait = props.item.attributes[0].trait_type.split("_")
  // if (trait[1]) {
    
  // } else {
  //   trait[1] = ""
  // }
  
  // console.log(props.item.image,"image")
  // console.log(props.nft_balanceOf[props.id],"bal")
  var bal = props.nft_balanceOf[props.id]
// Not used as each one is a whole NFT
  // balanceOfresult = props.nft_balanceOf.substring(0, tokenContract_xyz_.length-18)

  // Not used as each one is a whole NFT
  // balanceOfresult = props.nft_balanceOf.substring(0, tokenContract_xyz_.length-18)
  
  // var base_url = "https://api.treasureblox.finance/"
  // var json_url = props.item.image.split("https://api.treasureblox.finance/");

  // var final_img = base_url.concat(json_url[1]);  
// console.log(props.item.image,"props.item.image")

  return(
    <div >

    {/* {(bal >= 1)?(
      <div>
          <Card.Img variant="top"  src={props.item.image} key={props.item.image} alt="Logo" className='customRounded nftImg'/>
            <div className="nftTitle">Name: {props.item.name}</div>
            <div className="nftSubTitle">TRAIT TYPE: {trait[0].toUpperCase()} {trait[1].toUpperCase()}</div>
            <div className="nftSubTitle">ITEM DESCRIPTION: {props.item.attributes[0].value}</div>
            <div className="nftSubTitle">YOUR BALANCE:  {bal}</div>
            <div className="nftSubTitle">TOKEN ID:  {props.id}</div>


          <br/>
        
      </div>
    ):(
      <div>
          

      </div>
    )} */}

         




    </div>





  );


};

export default SingleNFT;
