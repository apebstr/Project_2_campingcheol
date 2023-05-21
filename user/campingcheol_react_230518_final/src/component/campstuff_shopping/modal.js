import React from "react";
import style from "../../css/modal.module.css";
// import DaumPostcode from "react-daum-postcode";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    //className={style.prodRight}>
    <div className={open ? `${style.openModal} ${style.modal}` : style.modal}>
      {open ? (
        <section>
          <header>
            {header}
            <button className={style.close} onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.children}
            {/* <DaumPostcode onComplete={handleComplete} /> */}
          </main>
          {/* <footer>
            <button className='close' onClick={close}>
              닫기
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
