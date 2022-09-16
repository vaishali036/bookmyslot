import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import s from './Signin.module.css';
import axios from "axios";
import NavigateTo from "../navigate/NavigateTo";
import notify from "../../Shared/notify";
import { getLoggedInData } from "../../services/auth";
import { users } from "./signindata";
import instance from "../../services/axios";
import { authenticationService } from "../../services/api";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleType: 'tagteam',
      errorDetails: {
      },
      userDetails: {
        userEmailId: null,
        password: null,
      },
      isValid: false,
    }
  }

  handleTextInputChange = (e, key) => {
    const { userDetails } = this.state;
    if (key === "email") {
      userDetails.userEmailId = e.target.value;
    } else if (key === "password") {
      userDetails.password = e.target.value;
    }
    this.setState(
      {
        userDetails: userDetails,
      },
      () => {
        this.validateForm()
      }
    );
  }
  validateForm = () => {
    const { userDetails } = this.state;
    let isValid = true;
    if (!userDetails.userEmailId || !userDetails.userEmailId?.length) {
      isValid = false;
    } else if (!userDetails.password || !userDetails.password?.length) {
      isValid = false;
    }
    this.setState({
      isValid: isValid,
    })
  }

  validateUserCredentials = () => {
    const { userEmailId, password } = this.state.userDetails;

    // axios.post("http://localhost:5000/signin_users", { userEmailId, password })
    // const signed_in_user = users.filter((userDetails) => { return userDetails.userEmailId === userEmailId && userDetails.password === password });
    // if (signed_in_user[0]) {
    //   const role = signed_in_user[0].userRole.toUpperCase();
    //   this.setState({
    //     route: 'INTERVIEWER' === role ? '/interviewer/home' : '/tag/tecktrack'
    //   })
    //   notify(signed_in_user[0].message, 'suceess');
    //   localStorage.setItem('bookmyslot', JSON.stringify({ ...signed_in_user[0], userEmailId }));
    // } else {
    //   notify('Username or password is wrong', 'error');
    // }

    // axios.post("http://localhost:8095/api/v1/login", { userEmailId, password })
    instance.post(`${authenticationService}login`, { userEmailId, password })
      .then(response => {
        if (response) {
          this.setState({
            route: response.data.userRole.toUpperCase() === 'INTERVIEWER' ? '/interviewer/home' : '/tag/tecktrack'
          })
          let userName = userEmailId.split('@')[0];
          notify(response.data.message, 'suceess');
          localStorage.setItem('bookmyslot', JSON.stringify({ ...response.data, userEmailId ,userName}));
        }
      }).catch(err => {
        notify('Username or password is wrong', 'error');
        console.log(err)
      })
  }


  render() {
    const { isValid, route } = this.state;
    if (route) {
      return <NavigateTo route={route} />
    }
    return (
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.signinContainer}>
            <div className={s.leftContainer}>
              <div className={s.formWrapper}>
                <h1 className={s.signinHeading} style={{ color: '#059995', textAlign: 'center' }}>Sign in</h1>
                <form className={s.formWrapper}>
                  <div className={s.inputWrapper}>
                    <input
                      type="email"
                      className={s.textInput}
                      placeholder="Email *"
                      autoComplete="off"
                      value={this.state.userDetails.email}
                      onChange={
                        (e) => {
                          this.handleTextInputChange(e, "email")
                        }
                      } />
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className={s.inputWrapper}>
                    <input
                      type="password"
                      className={s.textInput}
                      placeholder="Password *"
                      maxLength="15"
                      // autoComplete="off"
                      value={this.state.userDetails.password}
                      onChange={
                        (e) => {
                          this.handleTextInputChange(e, "password")
                        }
                      } />
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  {/* <p style={{ cursor: 'pointer' }}>Forgot password?</p> */}
                </form>
                <br />

                <button onClick={
                  () => {
                    this.validateUserCredentials()
                  }
                }

                  className={s.SigninButton}
                  style={{ backgroundColor: '#13B4B0', opacity: isValid ? 1 : 0.3 }}
                  disabled={!isValid}>Signin</button>
                <br />
                {/* <p className={s.signinHeading} style={{ color: '#059995', textAlign: 'center', cursor: 'pointer' }}>
                  Sign in with google <i className="fa fa-google-plus" aria-hidden="true"></i>
                </p> */}
              </div>
            </div>

            <div className={s.rightContainer}>
              <div className={s.logoContainer}>
                <div className={s.logoText}></div>
              </div>
              <h1 className={s.welcomeText}>Hi, Welcome</h1>
              <div className={s.memberAlready}>Don't have account</div>
              <Link className={s.loginButton} to={{ pathname: '/signup' }}>Signup</Link>
            </div>
          </div>
        </div>

      </div >
    )
  }
}
export default Signin;
