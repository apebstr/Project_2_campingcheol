import { baseUrl } from "../../apiurl";
import "../../css/userpage.css";
import UserMenu from "./user_menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./modal";
import DaumPostcode from "react-daum-postcode";

const MyMy = () => {
  const [isNickAvailable, setIsNickAvailable] = useState(false);
  const [nickCheckMessage, setNickCheckMessage] =
    useState("닉네임 중복체크를 해주세요.");

  const [nickbtnEnabled, setNickbtnEnabled] = useState(false); //닉네임 중복확인버튼 활성화여부

  const [searchZip, setSearchZip] = useState(""); //검색결과-우편번호
  const [searchAddr, setSearchAddr] = useState(""); //검색결과-주소
  const [fullAddr, setFullAddr] = useState(""); //합친주소

  const [userInfo, setUserInfo] = useState({
    userKeynum: "",
    userID: "",
    userPass: "",
    userName: "",
    userNick: "",
    userAddr: "",
    userPhone: "",
    userSex: "",
    userAge: "",
  });

  const {
    userKeynum,
    userID,
    userPass,
    userName,
    userNick,
    userAddr,
    userPhone,
    userSex,
    userAge,
  } = userInfo;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const info = async () => {
    return await axios
      .get(`${baseUrl}/my/my/${localStorage.getItem("userKeynum")}`, config)
      .then((response) => {
        setUserInfo({ ...response.data, userPass: "" });
      });
  };

  useEffect(() => {
    info();
  }, []);

  const handleValueChangeNick = (e) => {
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/; // 한글+영어+숫자 사용가능 10글자이내
    const inputChar = e.target.value;

    if (!regex.test(inputChar)) {
      // 정규식에 맞지 않는 문자가 입력된 경우
      setNickCheckMessage("2~10자의 한글,영어,숫자만 입력가능합니다");
      setNickbtnEnabled(false);
      console.log("b");
    } else if (regex.test(inputChar)) {
      setNickCheckMessage("닉네임 중복체크를 해주세요.");
      setIsNickAvailable(false);
      setNickbtnEnabled(true);
      console.log("c");
    }

    const newValue = e.target.value.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(newValue)) {
      // 자음이나 모음만 있는 경우
      setNickCheckMessage("올바른 닉네임을 입력해주세요.");
      setIsNickAvailable(false);
      setNickbtnEnabled(false);
      console.log("a");
    }
    setUserInfo({ ...userInfo, [e.target.name]: newValue });
  };

  const nickCheck = async (e) => {
    await axios
      .post(`${baseUrl}/signup/nickcheck`, { userNick: userInfo.userNick })
      .then((response) => {
        setIsNickAvailable(response.data.available);
        if (response.data === 0) {
          setIsNickAvailable(true); //나중에 회원가입 버튼 클릭 이벤트핸들러에 필요!
          setNickCheckMessage("사용 가능한 닉네임 입니다.");
          setNickbtnEnabled(false);
        } else if (response.data >= 1) {
          setNickCheckMessage(
            "이미 사용중인 닉네임 입니다. 다른 닉네임을 입력해주세요"
          );
        }
      });
  };

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChange = (e) => {
    e.preventDefault();
    if (userPass !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  ///////////////////////////
  //모달창
  const [modalOpen, setModalOpen] = useState(false);

  //추가버튼 모달 open
  const openModal = () => {
    setModalOpen(true); // 모달 창 열기
  };

  //추가모달 close
  const closeModal = () => {
    setModalOpen(false);
  };

  const [addrParts, setAddrParts] = useState(
    userInfo.userAddr ? userInfo.userAddr.split("/") : ["", "", ""]
  );

  const [addrDetail, setAddrDetail] = useState({
    zipAddr: "",
    addr: "",
    addDet: "",
  });

  //주소
  const handleComplete = (data) => {
    let zonecode = data.zonecode; //우편번호
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddrDetail({
      ...addrDetail,
      addr: fullAddress,
      zipAddr: zonecode,
      addDet: "",
    });
    const newAddr = zonecode + "/" + fullAddress + "/";

    setUserInfo({ ...userInfo, userAddr: newAddr });
    // setFullAddr(searchZip + "/" + fullAddress + "/" + extraAddress);
    setModalOpen(false);
  };

  const handleValueChangeAddr = (e) => {
    // const newAddr = searchZip + "/" + searchAddr + "/" + e.target.value;
    setAddrDetail({
      ...addrDetail,
      addDet: e.target.value,
    });
    const newAddr =
      addrDetail.zipAddr + "/" + addrDetail.addr + "/" + e.target.value;

    console.log("새주소", newAddr);
    setUserInfo({ ...userInfo, userAddr: newAddr });
  };

  const handleValueChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userPass) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    console.log(userInfo);
    console.log(addrDetail);
    await axios.post(`${baseUrl}/my/my/update`, userInfo, config);
    localStorage.setItem("userKeynum", userKeynum);
    //navigator('/');
    window.location.replace("/my/my", config);
    //await axios.get(`${baseUrl}/my/my/${localStorage.userKeynum}`, config);
  };

  useEffect(() => {
    if (userInfo.userAddr) {
      const addrArr = userInfo.userAddr.split("/");
      setAddrDetail({
        zipAddr: addrArr[0],
        addr: addrArr[1],
        addDet: addrArr[2],
      });
    }
  }, [userInfo.userAddr]);

  const dropUserinfo = async (e) => {
    e.preventDefault();

    const confirmResult = window.confirm(
      "탈퇴하시면 다시 서비스를 이용하실 수 없습니다. 정말 탈퇴하시겠습니까?"
    );
    if (confirmResult) {
      await axios.put(`${baseUrl}/my/my/drop/${userKeynum}`, config);

      window.location.replace("/");
    }
  };

  return (
    <>
      <div className='user'>
        <UserMenu />
        <div className='loginfrm'>
          <form onSubmit={onSubmit}>
            <h1>내 프로필</h1>
            <form action='#' method='post'>
              <p>{localStorage.userName}</p>
              <p>ID: {localStorage.userID}</p>

              <hr />

              <h3>상세정보</h3>

              <div className='myprofile'>
                <p>이름</p>
                <input
                  type='text'
                  className='form-control'
                  name='userName'
                  placeholder='이름'
                  value={localStorage.userName}
                  readOnly
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>ID</p>
                <input
                  type='text'
                  className='form-control'
                  name='userId'
                  placeholder='ID'
                  value={localStorage.userID}
                  readOnly
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>닉네임</p>
                <input
                  style={{ marginBottom: "10px" }}
                  type='text'
                  className='form-control'
                  name='userNick'
                  placeholder='닉네임'
                  value={userInfo.userNick}
                  onChange={handleValueChangeNick}
                />
                <button
                  className='addr_btn'
                  type='button'
                  onClick={(e) => {
                    nickCheck(e);
                  }}
                  disabled={!nickbtnEnabled}
                >
                  닉네임 중복체크
                </button>
                <div className='errorMessageWrap'>{nickCheckMessage}</div>
              </div>

              <hr />

              <div className='myprofile'>
                <h4>비밀번호 변경하기</h4>

                <p>새로운 비밀번호</p>
                <input
                  type='password'
                  className='form-control'
                  name='userPass'
                  placeholder='새로운 비밀번호를 입력해주세요'
                  value={userPass}
                  onChange={handleValueChange}
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>비밀번호 확인</p>
                <input
                  type='password'
                  className='form-control'
                  name='userPass2'
                  placeholder='비밀번호를 한 번 더 입력해주세요'
                  onChange={passChange}
                />
                <span style={{ color: "red" }}>{passwordCheck}</span>
              </div>

              <hr />

              <div className='myprofile'>
                <p>전화번호</p>
                <input
                  type='text'
                  className='form-control'
                  name='userPhone'
                  placeholder='전화번호'
                  value={userPhone}
                  readOnly
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>주소</p>
              </div>
              <div className='myprofile'>
                <input
                  style={{
                    backgroundColor: "transparent",
                    marginBottom: "15px",
                  }}
                  id='member_post'
                  className='form-control'
                  type='text'
                  name='userAddr1'
                  placeholder='우편번호'
                  value={addrDetail.zipAddr}
                  onChange={handleValueChangeAddr}
                  readOnly
                />
              </div>
              <button className='addr_btn' type='button' onClick={openModal}>
                주소찾기
              </button>
              <Modal open={modalOpen} close={closeModal} header='주소검색'>
                <DaumPostcode onComplete={handleComplete} />
              </Modal>
              <div className='myprofile'>
                <input
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                  id='member_addr'
                  className='form-control'
                  type='text'
                  name='userAddr2'
                  placeholder='주소'
                  value={addrDetail.addr}
                  onChange={handleValueChangeAddr}
                  readOnly
                />
              </div>
              <div className='myprofile'>
                <input
                  type='text'
                  className='form-control'
                  name='userAddr3'
                  placeholder='상세 주소를 입력하세요.'
                  value={addrDetail.addDet}
                  onChange={handleValueChangeAddr}
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>성별</p>
                <input
                  type='text'
                  className='form-control'
                  name='userSex'
                  placeholder='성별'
                  value={userSex === "1" ? "남성" : "여성"}
                  readOnly
                />
              </div>

              <hr />

              <div className='myprofile'>
                <p>생년월일</p>
                <input
                  type='text'
                  className='form-control'
                  name='userAge'
                  placeholder='생년월일'
                  value={userAge}
                  onChange={handleValueChange}
                  readOnly
                />
              </div>

              <hr />

              <button type='submit' className='btn btn-edit' onClick={onSubmit}>
                정보 수정
              </button>

              <button
                type='submit'
                className='btn btn-drop'
                onClick={dropUserinfo}
              >
                회원 탈퇴
              </button>
            </form>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyMy;
