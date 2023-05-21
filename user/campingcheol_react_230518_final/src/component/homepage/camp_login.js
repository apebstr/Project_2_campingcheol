import "bootstrap/dist/css/bootstrap.min.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import "../../css/login.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { baseUrl } from "../../apiurl";

const CampLogin = () => {
  const [inputs, setInputs] = useState({
    userID: "",
    userPass: "",
  });

  const { userID, userPass } = inputs;

  const config = { headers: { "Content-Type": "application/json" } };

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseUrl}/login`, inputs, config)
      .then((response) => {
        console.log("response: ", response.data);

        //let jwtToken = response.headers['Authorization'];
        let jwtToken = response.headers.get("Authorization");
        console.log(jwtToken);

        let jwtuserName = response.data.userName;
        let jwtuserID = response.data.userID;
        let jwtAuthRole = response.data.authRole;
        let jwtuserNick = response.data.userNick;
        let jwtuserPhone = response.data.userPhone;
        let jwtuserKeynum = response.data.userKeynum;

        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("userID", jwtuserID);
        localStorage.setItem("userName", jwtuserName);
        localStorage.setItem("authRole", jwtAuthRole);
        localStorage.setItem("userNick", jwtuserNick);
        localStorage.setItem("userPhone", jwtuserPhone);
        localStorage.setItem("userKeynum", jwtuserKeynum);
        localStorage.setItem("isLogin", "true");

        setInputs({ userID: "", userPass: "" });
      })
      .then((response) => {
        //navigator('/');
        window.location.replace("/");
      })
      .catch((err) => {
        console.error(err.message);
        setShow(true);
      });
  };

  // 팝업
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "400px" }}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ margin: "auto" }}>
          아이디 / 비밀번호를 확인해주세요
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='login'>
        <div className='loginText'>로그인</div>
        <div className='loginfrm'>
          <form action='#' method='post' onSubmit={onSubmit}>
            <p>ID</p>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>
                <AccountBoxIcon />
              </span>
              <input
                type='text'
                className='form-control'
                name='userID'
                value={userID}
                aria-label='Sizing example input'
                aria-describedby='inputGroup-sizing-default'
                placeholder='아이디를 입력하세요'
                onChange={handleValueChange}
              />
            </div>

            <p>PASSWORD</p>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>
                <LockIcon />
              </span>
              <input
                type='password'
                name='userPass'
                value={userPass}
                className='form-control'
                aria-label='Sizing example input'
                aria-describedby='inputGroup-sizing-default'
                placeholder='비밀번호를 입력하세요'
                onChange={handleValueChange}
              />
            </div>

            <button
              type='submit'
              id='login_loginBtn'
              className='btn btn-primary'
            >
              로그인
            </button>
            <NavLink to='/signup'>
              <button id='login_loginBtn' className='btn btn-primary'>
                회원가입
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default CampLogin;
