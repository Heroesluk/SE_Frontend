import styles from "./Navbar.module.scss";
import logo from "../../assets/img/logo.svg";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/exampleSlice";
import LocalStorage from "../../helpers/LocalStorage";

class Navbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      muted: false
    }
  }

  muteMe(elem) {
    elem.pause();
  }
  
  unmuteMe(elem) {
    elem.play();
  }


  Mute = () => {
    if(this.state.muted === false) {
      document.querySelectorAll("video, audio").forEach((elem) => this.muteMe(elem));
      this.setState({muted: true});
      console.log("Muted");
    } else {
      document.querySelectorAll("video, audio").forEach((elem) => this.unmuteMe(elem));
      this.setState({muted: false});
      console.log("Unmuted")
    }
  }

  onLogout = () => {
    LocalStorage.LogoutUser();
  }

  loginHandler = () => {
    dispatch(increment())
    console.log(`Login Clicked:${count}`)
  };

  onLogout = () => {
    LocalStorage.LogoutUser();
    console.log("Logged out")
  }

  render() {
  return (
    <nav>
      <Link className={styles["logo-wrapper"]} to="hub">
        <img src={logo} />
      </Link>
      <div>
        <ul className={styles["nav-main"]}>
          <li>
            <FontAwesomeIcon icon={faComments} />
            <Link to="profile"> Forum</Link>
          </li>

          <li>
            <Link to="account">
            <FontAwesomeIcon icon={faUserCircle} /> My Account</Link>
          </li>
          { LocalStorage.IsUserLogged() == false  &&
            <li>
              <Link to="login" onClick={this.loginHandler}>
              <FontAwesomeIcon icon={faRightToBracket} /> Login </Link>
            </li>
          }
          { LocalStorage.IsUserLogged() == true &&
            <li>
              <Link to="login" onClick={this.onLogout}>
                 Logout
              </Link>
            </li>  
          } 
          { this.state.muted == false &&
          <li><FontAwesomeIcon icon={faVolumeHigh}/><a onClick={this.Mute}> Mute</a></li>
          }   
          { this.state.muted == true &&
          <li><FontAwesomeIcon icon={faVolumeXmark}/><a onClick={this.Mute}> Unmute</a></li>   
          }
          </ul>
      </div>
    </nav>
  );
        }
}

export default Navbar;
