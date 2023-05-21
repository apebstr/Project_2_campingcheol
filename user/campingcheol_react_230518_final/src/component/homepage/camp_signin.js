import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../apiurl";
import Modal from "./modal";
import DaumPostcode from "react-daum-postcode";
import "../../css/signin.css";

const CampSignin = () => {
  const navigator = useNavigate();

  const inputRef = useRef();

  const [isIDAvailable, setIsIDAvailable] = useState(false);
  const [idCheckMessage, setIdCheckMessage] =
    useState("아이디 중복체크를 해주세요.");

  const [isNickAvailable, setIsNickAvailable] = useState(false);
  const [nickCheckMessage, setNickCheckMessage] =
    useState("닉네임 중복체크를 해주세요.");

  const [isAddrAvailable, setIsAddrAvailable] = useState(false);
  const [addrCheckMessage, seAddrCheckMessage] = useState("");
  const [nameCheckMessage, setNameCheckMessage] = useState("");

  const [userPassCheck, setUserPassCheck] = useState("");
  const [userPassCheckMessage, setUserPassCheckMessage] = useState(
    "영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자로 입력해주세요"
  );
  const [passCheck, setPassCheck] = useState(false);
  const [birthCheck, setBirthCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [sexCheck, setSexCheck] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [idbtnEnabled, setIdbtnEnabled] = useState(false); //아이디 중복확인버튼 활성화여부
  const [nickbtnEnabled, setNickbtnEnabled] = useState(false); //닉네임 중복확인버튼 활성화여부

  const [searchZip, setSearchZip] = useState(""); //검색결과-우편번호
  const [searchAddr, setSearchAddr] = useState(""); //검색결과-주소

  const [users, setUsers] = useState({
    userID: "",
    userPass: "",
    userName: "",
    userNick: "",
    userAddr: "",
    userPhone: "",
    userSex: "",
    userAge: "",
    usableId: false,
  });

  const config = { headers: { "Content-Type": "application/json" } };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseUrl}/signup`, users, config)
      .then((response) => {
        setUsers({
          userID: "",
          userPass: "",
          userName: "",
          userNick: "",
          userAddr: "",
          userPhone: "",
          userSex: "",
          userAge: "",
          usableId: false,
        });
      })
      .then((response) => {
        alert("회원가입 완료! 로그인을 해주세요.");
        navigator("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleValueChangeName = (e) => {
    const newValue = e.target.value;
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(newValue)) {
      // 자음이나 모음만 있는 경우
      setNameCheckMessage("올바른 이름을 입력해주세요.");
      setNameCheck(false);
    } else if (newValue.length < 2) {
      setNameCheckMessage("올바른 이름을 입력해주세요.");
      setNameCheck(false);
    } else if (newValue === "") {
      setNameCheck(false);
    } else {
      setNameCheckMessage("");
      setNameCheck(true);
    }
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleValueChangeSex = (e) => {
    if (e.target.value === "") {
      setSexCheck(false);
    } else {
      setSexCheck(true);
    }
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleValueChangeID = (e) => {
    const regex = /^[a-z0-9]{5,10}$/; // 소문자+숫자 가능, 5~10글자
    const inputChar = e.target.value;

    if (!regex.test(inputChar)) {
      // 정규식에 맞지 않는 문자가 입력된 경우
      setIdCheckMessage("5~10자의 영어 소문자와 숫자만 입력가능합니다");
    } else if (regex.test(inputChar)) {
      setIdCheckMessage("아이디 중복체크를 해주세요.");
      setIsIDAvailable(false);
      setIdbtnEnabled(true);
    }

    const newValue = e.target.value.replace(/[^a-z0-9]/g, ""); // 영어만 남기고 모든 문자 제거
    setUsers({ ...users, [e.target.name]: newValue });
    setIdbtnEnabled(
      newValue !== "" && newValue.length >= 5 && newValue.length <= 10
    );
  };

  const handleValueChangeNick = (e) => {
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/; // 한글+영어+숫자 사용가능 10글자이내
    const inputChar = e.target.value;

    if (!regex.test(inputChar)) {
      // 정규식에 맞지 않는 문자가 입력된 경우
      setNickCheckMessage("2~10자의 한글,영어,숫자만 입력가능합니다");
      setNickbtnEnabled(false);
    } else if (regex.test(inputChar)) {
      setNickCheckMessage("닉네임 중복체크를 해주세요.");
      setIsNickAvailable(false);
      setNickbtnEnabled(true);
    }

    const newValue = e.target.value.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(newValue)) {
      // 자음이나 모음만 있는 경우
      setNickCheckMessage("올바른 닉네임을 입력해주세요.");
      setIsNickAvailable(false);
      setNickbtnEnabled(false);
    }
    setUsers({ ...users, [e.target.name]: newValue });
  };

  const handleValueChangeAddr = (e) => {
    const newValue = e.target.value;
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(newValue)) {
      // 자음이나 모음만 있는 경우
      seAddrCheckMessage("올바른 주소를 입력해주세요.");
      setIsAddrAvailable(false);
    } else if (newValue === "") {
      setIsAddrAvailable(false);
    } else {
      setIsAddrAvailable(true);
      seAddrCheckMessage("");
    }

    const newAddr = searchZip + "/" + searchAddr + "/" + newValue;
    setUsers({ ...users, userAddr: newAddr });
    console.log(newAddr);
    console.log(users);
  };

  const handleValueChangePhone = (e) => {
    const regex = /^[0-9]{1,11}$/; // 숫자만 가능
    const inputValue = e.target.value;
    const newValue = inputValue.replace(/[^0-9]/g, "").substring(0, 11); // 숫자 이외의 값을 제거

    // 숫자가 아닌 값을 제거한 결과가 이전 입력값과 다른 경우에만 상태 업데이트
    if (newValue !== inputValue) {
      e.target.value = newValue;
    }
    if (newValue.length === 11) {
      setPhoneCheck(true);
    }

    setUsers({ ...users, [e.target.name]: newValue });
  };

  const handleValueChangeBirth = (e) => {
    const regex = /^[0-9]{1,4}$/; // 숫자만 가능
    const inputValue = e.target.value;
    const newValue = inputValue.replace(/[^0-9]/g, "").substring(0, 4); // 숫자 이외의 값을 제거

    // 숫자가 아닌 값을 제거한 결과가 이전 입력값과 다른 경우에만 상태 업데이트
    if (newValue !== inputValue) {
      e.target.value = newValue;
    }
    if (newValue.length === 4) {
      setBirthCheck(true);
    }
    setUsers({ ...users, [e.target.name]: newValue });
  };

  const idCheck = async (e) => {
    await axios
      .post(`${baseUrl}/signup/idcheck`, { userID: users.userID })
      .then((response) => {
        setIsIDAvailable(response.data.available);
        if (response.data === 0) {
          setIsIDAvailable(true); //나중에 회원가입 버튼 클릭 이벤트핸들러에 필요!
          setIdCheckMessage("사용 가능한 아이디 입니다.");
          setIdbtnEnabled(false);
        } else if (response.data === 1) {
          setIdCheckMessage(
            "이미 사용중인 아이디 입니다. 다른 아이디를 입력해주세요"
          );
        }
      });
  };

  const nickCheck = async (e) => {
    await axios
      .post(`${baseUrl}/signup/nickcheck`, { userNick: users.userNick })
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

  const handleValuePass = (e) => {
    const regex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+~`\-=\[\]{}\\|;':",./<>?])(?!.*\s).{8,16}$/;
    //영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
    const inputChar = e.target.value;

    if (!regex.test(inputChar)) {
      // 정규식에 맞지 않는 문자가 입력된 경우
      setPassCheck(false);
    } else if (regex.test(inputChar)) {
      if (userPassCheck.length === 0) {
        setPassCheck(false);
        setUserPassCheckMessage("");
      } else if (userPassCheck.length > 0 && e.target.value === userPassCheck) {
        setPassCheck(true);
        setUserPassCheckMessage("비밀번호가 동일합니다.");
      } else {
        setPassCheck(false);
        setUserPassCheckMessage("비밀번호가 다릅니다. 다시 입력해주세요.");
      }
    }

    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleValuePassCheck = (e) => {
    setUserPassCheck(e.target.value);
    if (userPassCheck.length === 0) {
      setPassCheck(false);
      setUserPassCheckMessage("");
    } else if (userPassCheck.length > 0 && users.userPass === e.target.value) {
      setPassCheck(true);
      setUserPassCheckMessage("비밀번호가 동일합니다.");
    } else {
      setPassCheck(false);
      setUserPassCheckMessage("비밀번호가 다릅니다. 다시 입력해주세요.");
    }
  };

  ///////////////////////////
  //모달창
  const [selectedAddress, setSelectedAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  //추가버튼 모달 open
  const openModal = () => {
    setModalOpen(true); // 모달 창 열기
  };

  //추가모달 close
  const closeModal = () => {
    setModalOpen(false);
  };

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

    setSearchZip(zonecode);
    setSearchAddr(fullAddress);

    setModalOpen(false);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (
      isIDAvailable &&
      nameCheck &&
      isNickAvailable &&
      passCheck &&
      isAddrAvailable &&
      phoneCheck &&
      sexCheck &&
      birthCheck
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [
    isIDAvailable,
    nameCheck,
    passCheck,
    isNickAvailable,
    isAddrAvailable,
    phoneCheck,
    sexCheck,
    birthCheck,
  ]);

  return (
    <div className='loginPage'>
      <form onSubmit={onSubmit}>
        <div className='titleWrap'>
          <p>회원가입</p>
        </div>
        <div className='contentwrap'>
          <div className='inputform'>
            <div className='inputTitle'>아이디</div>
            <div className='withButton'>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='input'
                  name='userID'
                  value={users.userID}
                  placeholder='아이디를 입력해주세요'
                  ref={inputRef}
                  onChange={handleValueChangeID}
                />
              </div>
              <button
                className='addr_btn'
                type='button'
                onClick={idCheck}
                disabled={!idbtnEnabled}
              >
                아이디 중복체크
              </button>
            </div>
            <div className='errorMessageWrap'>{idCheckMessage}</div>

            <div className='inputTitle'>비밀번호</div>
            <div className='inputWrap'>
              <input
                type='password'
                className='input'
                name='userPass'
                placeholder='비밀번호를 입력해주세요'
                onChange={handleValuePass}
              />
            </div>

            <div className='inputTitle'>비밀번호 재확인</div>
            <div className='inputWrap'>
              <input
                type='password'
                className='input'
                name='userPassCheck'
                placeholder='비밀번호를 한 번 더 입력해주세요'
                value={userPassCheck}
                onChange={handleValuePassCheck}
              />
            </div>
            <div className='errorMessageWrap'>
              {userPassCheckMessage}
              {/* {users.userPass &&
                userPassCheck &&
                users.userPass.length > 0 &&
                userPassCheck.length > 0 &&
                userPassCheckMessage} */}
            </div>

            <div className='inputTitle'>이름</div>
            <div className='inputWrap'>
              <input
                type='text'
                className='input'
                name='userName'
                placeholder='이름을 입력해주세요'
                onChange={handleValueChangeName}
              />
            </div>
            <div className='errorMessageWrap'>{nameCheckMessage}</div>

            <div className='inputTitle'>닉네임</div>
            <div className='withButton'>
              <div className='inputWrap'>
                <input
                  type='text'
                  className='input'
                  name='userNick'
                  value={users.userNick}
                  placeholder='닉네임을 입력해주세요'
                  onChange={handleValueChangeNick}
                />
              </div>
              <button
                className='addr_btn'
                type='button'
                onClick={nickCheck}
                disabled={!nickbtnEnabled}
              >
                닉네임 중복체크
              </button>
            </div>
            <div className='errorMessageWrap'>{nickCheckMessage}</div>

            <div className='inputTitle'>주소</div>
            <div className='inputWrap'>
              <input
                id='member_post'
                className='input'
                type='text'
                name='userAddr1'
                placeholder='우편번호'
                value={searchZip}
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
            <div className='inputWrap'>
              <input
                id='member_addr'
                className='input'
                type='text'
                name='userAddr2'
                placeholder='주소'
                value={searchAddr}
                onChange={handleValueChangeAddr}
                readOnly
              />
            </div>
            <div className='inputWrap'>
              <input
                type='text'
                className='input'
                id='extra'
                name='userAddr3'
                placeholder='상세 주소를 입력하세요.'
                onChange={handleValueChangeAddr}
              />
            </div>
            <div className='errorMessageWrap'>{addrCheckMessage}</div>

            <div className='inputTitle'>연락처</div>
            <div className='inputWrap'>
              <input
                type='text'
                className='input'
                name='userPhone'
                placeholder='연락처를 입력해주세요(숫자만 입력)'
                onChange={handleValueChangePhone}
              />
            </div>

            <div className='inputTitle'>성별</div>
            <div className='inputWrap radio'>
              <div>
                <input
                  type='radio'
                  name='userSex'
                  value='1'
                  onChange={handleValueChangeSex}
                />
                <label className='label'>남성</label>
              </div>
              <div>
                <input
                  type='radio'
                  name='userSex'
                  value='2'
                  onChange={handleValueChangeSex}
                />
                <label className='label'>여성</label>
              </div>
            </div>

            <div className='inputTitle'>출생년도</div>
            <div className='inputWrap'>
              <input
                type='text'
                className='input'
                name='userAge'
                placeholder='출생년도 4자리를 입력해주세요'
                onChange={handleValueChangeBirth}
              />
            </div>
          </div>
          <button
            type='submit'
            className='bottomButton'
            disabled={notAllow}
            style={{ width: "100%" }}
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampSignin;

// const postCodeStyle = {
//   display: 'block',
//   position: 'absolute',
//   top: '50%',
//   width: '400px',
//   height: '500px',
//   padding: '7px',
// };
