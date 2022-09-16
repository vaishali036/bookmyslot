import React from "react";
import { Form } from 'react-bootstrap';
import { Link, Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import NavigateTo from "../navigate/NavigateTo";
import { DEMO_CREDENTIALS } from './exampleData';
import s from './Signup.module.css';
import axios from "axios";
import notify from "../../Shared/notify";
import instance from "../../services/axios";
import { userService } from "../../services/api";


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: 'TAG',
      errorDetails: {
      },
      userDetails: {
        userName: '',
        userEmailId: '',
        password: '',
        department: '',
        phoneNo: '',
      },
      isValid: false,
    }
  }

  handleRoleChange = e => {
    this.setState({
      userRole: e.target.value
    })
  }

  handleTextInputChange = (e, key) => {
    const { userDetails } = this.state;
    if (key === "userName") {
      userDetails.userName = e.target.value;
    } else if (key === "userEmailId") {
      userDetails.userEmailId = e.target.value;
    } else if (key === "password") {
      userDetails.password = e.target.value;
    } else if (key === "phoneNo") {
      userDetails.phoneNo = e.target.value;
    } else if (key === "department") {
      userDetails.department = e.target.value;
    }
    this.setState({
      userDetails: userDetails,
    },
      () => {
        this.validateForm();
      }
    )
  }
  validateuserEmailId = userEmailId => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(userEmailId))
      return true;
    return false;
  }

  validatePassword = password => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (regex.test(password))
      return true;
    return false;
  }

  validateMobileNumber = mobile => {
    const regex = /^[6-9]\d{9}$/gi;
    if (regex.test(mobile)) {
      return true;
    }
    return false;
  }

  validateForm() {
    let isValid = true;
    const { userDetails, userRole, errorDetails } = this.state;
    if ((userDetails.userName && !userDetails.userName?.length) || userDetails.userName?.length < 5) {
      isValid = false
      errorDetails.userName = "user name should be min 5";
    }
    else {
      if (errorDetails.userName) {
        delete errorDetails.userName
      }
    }
    if ((userDetails.userEmailId) && (!this.validateuserEmailId(userDetails.userEmailId)) && userDetails.userEmailId?.length) {
      isValid = false;
      errorDetails.userEmailId = 'Enter a valid userEmailId';
    } else {
      if (errorDetails.userEmailId) {
        delete errorDetails.userEmailId
      }
    }
    if (userDetails.password && (!userDetails.password?.length || !this.validatePassword(userDetails.password))) {
      isValid = false
      errorDetails.password = 'contain a capital,small,special and digit characters of length 8';
    } else {
      if (errorDetails.password) {
        delete errorDetails.password
      }
    }
    if (userDetails.phoneNo && (userDetails.phoneNo?.length && !this.validateMobileNumber(userDetails.phoneNo))) {
      isValid = false
      errorDetails.phoneNo = 'not a valid mobile number';
    } else {
      if (errorDetails.phoneNo) {
        delete errorDetails.phoneNo;
      }
    }
    if (userRole === "INTERVIEWER" && !userDetails.department && !userDetails.department?.length) {
      isValid = false
    }

    const status = Object.keys(userDetails).some(detail => {
      if (detail === 'department' && userRole === 'TAG') {
        return false;
      }
      return !userDetails[detail]?.length;
    })

    if (status) {
      isValid = false;
    }

    this.setState({
      isValid: isValid,
      errorDetails: errorDetails
    })
  }

  validateUserCredentials = () => {
    const { userDetails } = this.state;
    let validCredentials = true;
    if (userDetails.userName === DEMO_CREDENTIALS.userName) {
      validCredentials = false;
    }
    if (userDetails.userEmailId === DEMO_CREDENTIALS.userEmailId) {
      validCredentials = false;
    }
    const userInfo = {
      ...userDetails,
      userRole: this.state.userRole,
    }

 // .post("http://localhost:8090/api/v1/user", userInfo)
    instance.post(`${userService}user`, userInfo)
      .then(res => {
        this.setState({
           route: '/signin'
              })
        notify('Register is successfully','success')
      })
      .catch(err => {
        notify('Something went wrong','error')
        console.error('fetching failed ', err);
      })
  }

  render() {
    const { userRole, isValid, errorDetails, route } = this.state;
    if (route) {
      return <NavigateTo route={route} />
    }
    //const { userRole, isValid, errorDetails } = this.state;
    return (
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.signupContainer}>
            <div className={s.leftContainer}>
              <div className={s.logoContainer}>
                <div className={s.logoText}></div>
              </div>
              <h1 className={s.welcomeText}>Hi, Welcome</h1>
              <div className={s.memberAlready}>Already a member ?</div>
              <Link className={s.loginButton} to={{ pathname: '/signin' }}>Login</Link>
            </div>
            <div className={s.rightContainer}>
              <div className={s.formWrapper}>
                <h1 className={s.signupHeading} style={{ color: '#059995', textAlign: 'center' }}>Sign up</h1>
                <form className={s.formWrapper}>
                  <Form.Group controlId="userRole" className={s.roleTypeWrapper}>
                    <Form.Check
                      className={s.roleTypeRadio}
                      type="radio"
                      label="TAG Team"
                      name="userRole"
                      value="TAG"
                      onChange={this.handleRoleChange}
                      checked={userRole === 'TAG'}
                    />
                    <Form.Check
                      className={s.roleTypeRadio}
                      type="radio"
                      label="Interviewer"
                      name="userRole"
                      value="INTERVIEWER"
                      onChange={this.handleRoleChange}
                      checked={userRole === 'INTERVIEWER'}
                    />
                  </Form.Group>
                  <div className={s.mainInputWrapper}>
                    <div className={s.inputWrapper}>
                      <input
                        type="text"
                        className={s.textInput}
                        placeholder="User name *"
                        autoComplete="off"
                        value={this.state.userDetails.userName}
                        onChange={
                          (e) => {
                            this.handleTextInputChange(e, "userName")
                          }
                        } />
                    </div>
                    {errorDetails.userName ? <div className={s.errorMessage}>{errorDetails.userName}</div> : null}
                  </div>
                  <div className={s.mainInputWrapper}>
                    <div className={s.inputWrapper}>
                      <input
                        type="userEmailId"
                        className={s.textInput}
                        placeholder="Email Id *"
                        autoComplete="off"
                        value={this.state.userDetails.userEmailId}
                        onChange={
                          (e) => {
                            this.handleTextInputChange(e, "userEmailId")
                          }
                        } />
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    {errorDetails.userEmailId ? <div className={s.errorMessage}>{errorDetails.userEmailId}</div> : null}
                  </div>
                  <div className={s.mainInputWrapper}>
                    <div className={s.inputWrapper}>
                      <input
                        type="password"
                        className={s.textInput}
                        placeholder="Password *"
                        maxLength="15"
                        autoComplete="off"
                        value={this.state.userDetails.password}
                        onChange={
                          (e) => {
                            this.handleTextInputChange(e, "password")
                          }
                        } />
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    {errorDetails.password ? <div className={s.errorMessage}>{errorDetails.password}</div> : null}
                  </div>
                  <div className={`${s.row} ${s.marginTop4}`}>
                    <div className={s.selectParent}>
                      <select
                        value={this.state.userDetails.department}
                        name="cars" id="cars"
                        disabled={userRole === 'TAG' ? true : false} form="carform"
                        className={`${s.inputWrapper} ${s.customWidth} ${s.selectTag}`}
                        style={{ backgroundColor: 'white' }}
                        onChange={
                          (e) => {
                            this.handleTextInputChange(e, "department")
                          }
                        }
                      >
                        <option value="" disabled>Department</option>
                        <option value="frontend">Front-End Developer</option>
                        <option value="backend">Back-End Developer</option>
                        <option value="fullstack">Full Stack Developer</option>
                        <option value="mobile_dev">Mobile Developer</option>
                        <option value="data_science">Data Science</option>
                        <option value="devops">Devops</option>
                        <option value="testing">Software testing</option>
                        <option value="support">Support L/L2</option>
                        <option value="software_architect">Software Architecture</option>
                        {/* <option value="db">Database</option> */}
                      </select>
                      {errorDetails.department ? <div className={s.errorMessage}>{errorDetails.department}</div> : null}
                    </div>
                    <div className={s.selectParent}>
                      <div className={`${s.inputWrapper} ${s.customWidth}`}>
                        <input type="tel"
                          id="phoneNo"
                          name="phoneNo"
                          placeholder="Phone No*"
                          // pattern="[0-9]{10}"
                          maxLength="10"
                          required className={s.textInput}
                          autoComplete="off"
                          value={this.state.userDetails.phoneNo}
                          onChange={
                            (e) => {
                              this.handleTextInputChange(e, "phoneNo")
                            }
                          } />
                        <FontAwesomeIcon icon={faMobileScreen} />
                      </div>
                      {errorDetails.phoneNo ? <div className={s.errorMessage}>{errorDetails.phoneNo}</div> : null}
                    </div>
                  </div>
                </form>
                <br />
                <button onClick={
                  () => {
                    this.validateUserCredentials()
                  }

                }
                  className={s.SignupButton}
                  style={{ backgroundColor: '#13B4B0', opacity: isValid ? 1 : 0.3 }}
                  disabled={!isValid} >Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Signup;