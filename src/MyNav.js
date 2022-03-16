import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyNav.css';
import { Button,Container,Nav,Navbar,NavDropdown } from 'react-bootstrap';

import Connection from "./Connection";

import logo from './TreasureBlox_Logo.png';
import Pdf from './components/Structure/images/TreasureBloxWhitePaperV1.pdf';
import logo_meter from './components/Structure/images/treasurebloxXmeter.png';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const MyNav = (props) => {

    const nav_home_link_click = (event) => {
      window.dataLayer.push({
        event: "wallet_information",
        wallet: props.wallet_for_google,
        wallet_ip: props.ip,
        url: window.location.pathname,
        buttonClicked:"nav_home_link_click"
      });
    }

    const nav_how_to_play = (event) => {
      window.dataLayer.push({
        event: "wallet_information",
        wallet: props.wallet_for_google,
        wallet_ip: props.ip,
        url: window.location.pathname,
        buttonClicked:"nav_how_to_play"
      });
    }

    const nav_discord = (event) => {
      window.dataLayer.push({
        event: "wallet_information",
        wallet: props.wallet_for_google,
        wallet_ip: props.ip,
        url: window.location.pathname,
        buttonClicked:"nav_discord"
      });
    }

    const nav_wallet_connected_button = (event) => {
      window.dataLayer.push({
        event: "wallet_information",
        wallet: props.wallet_for_google,
        wallet_ip: props.ip,
        url: window.location.pathname,
        buttonClicked:"nav_wallet_connected_button"
      });
    }


  return(

    <Navbar collapseOnSelect className="fixed-top MyBakground" expand="lg" variant="dark">
      <Container>

      <Link className='customLinks' to="/home">
      <Navbar.Brand>
      <img
        alt="treasureblox_logo"

        src={props.is_meter?(logo_meter):(logo)}
        width="225"
        className="d-inline-block align-middle"
      />

     </Navbar.Brand>
     </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link className='customLinks' onClick={nav_home_link_click} to="">
          Treasure Hunts
          </Link>

          

          <NavDropdown title="How to play / Community" id="collasible-nav-dropdown">
          <NavDropdown.Item   target = "_blank" href="https://treasureblox.gitbook.io/how-to-play/">How to Play</NavDropdown.Item>
          <NavDropdown.Item  target = "_blank" href="https://www.youtube.com/channel/UC3bSv9wrLjpqiSq-WwErWHQ">Video Tutorials</NavDropdown.Item>
          <NavDropdown.Item  onClick={nav_how_to_play} target = "_blank" href="https://treasureblox.gitbook.io/treasureblox/">About</NavDropdown.Item>

          <NavDropdown.Item  onClick={nav_discord} target = "_blank" href="https://discord.gg/mAQeHXEjB9">Discord</NavDropdown.Item>

          </NavDropdown>


        </Nav>
        <Nav className="ml-auto">

          <Connection id="wallet-button" onClick={nav_wallet_connected_button} accounts={props.accounts}/>

        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>



  );


};

export default MyNav;
