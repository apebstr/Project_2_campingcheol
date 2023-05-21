import { useState } from "react";
import "../../css/signin.css";
import Modal from "./modal";
import DaumPostcode from "react-daum-postcode";

const Test = () => {
  const [searchZip, setSearchZip] = useState(""); //검색결과-우편번호
  const [searchAddr, setSearchAddr] = useState(""); //검색결과-주소
  const [fullAddr, setFullAddr] = useState(""); //합친주소

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

  const handleValueChangeAddr = (e) => {
    setFullAddr(searchZip + "/" + searchAddr + "/" + e.target.value);
    setUsers({ ...users, userAddr: fullAddr });
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

  return (
    <>
      <div className='loginPage'>
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
      </div>
    </>
  );
};

export default Test;
