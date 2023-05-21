import React, { useState } from "react";
import style from "../../css/modal.module.css";
import { useDispatch } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";

const ModalProdInsert = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    prodTitle: "",
    prodPrice: "",
    prodCategory: "",
    prodStock: "",
    prodBrand: "",
    prodState: "",
    imgname: null,
  });

  const {
    prodTitle,
    prodPrice,
    prodCategory,
    prodStock,
    prodBrand,
    prodState,
    imgname,
  } = inputs;

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //모달 내 추가버튼
  const onSubmit = async (e) => {
    e.preventDefault();

    if (prodCategory === "") {
      alert("카테고리를 선택해주세요");
      return false;
    } else if (prodState === "") {
      alert("판매상태를 선택해주세요");
      return false;
    } else if (imgname === "") {
      alert("상품사진을 넣어주세요");
      return false;
    }

    let korcategory = "";

    if (prodCategory === "a") {
      korcategory = "텐트";
    } else if (prodCategory === "b") {
      korcategory = "캠핑가구";
    } else if (prodCategory === "c") {
      korcategory = "랜턴";
    } else if (prodCategory === "d") {
      korcategory = "캠핑매트";
    } else if (prodCategory === "e") {
      korcategory = "취사용품";
    } else if (prodCategory === "f") {
      korcategory = "기타캠핑용품";
    }

    const formData = new FormData();
    formData.append("prodTitle", prodTitle);
    formData.append("prodPrice", prodPrice);
    formData.append("prodStock", prodStock);
    formData.append("prodState", prodState);
    formData.append("prodBrand", prodBrand);
    formData.append("prodCategory", korcategory);
    // formData.append("currentPage", currentPage);
    formData.append("imgname", imgname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    await dispatch(prodActions.getProdInsert(formData, config));

    setInputs({
      prodKeyNum: "",
      prodTitle: "",
      prodPrice: "",
      prodCategory: "",
      prodStock: "",
      prodState: "",
      imgname: null,
    });

    close();
  };

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
            <>
              <div className='style.insert'>
                <form name='frm' onSubmit={onSubmit}>
                  <table className='style.insert_table' id='style.insert_table'>
                    <tr>
                      <th>상품카테고리</th>

                      <td>
                        <select
                          name='prodCategory'
                          onChange={handleSelectChange}
                        >
                          <option name='prodCategory' value='void'>
                            선택
                          </option>
                          <option name='prodCategory' value='a'>
                            텐트
                          </option>
                          <option name='prodCategory' value='b'>
                            캠핑가구
                          </option>
                          <option name='prodCategory' value='c'>
                            랜턴
                          </option>
                          <option name='prodCategory' value='d'>
                            캠핑매트
                          </option>
                          <option name='prodCategory' value='e'>
                            취사용품
                          </option>
                          <option name='prodCategory' value='f'>
                            기타캠핑용품
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>상품이름</th>
                      <td>
                        <input
                          type='text'
                          name='prodTitle'
                          onChange={handleValueChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>상품브랜드</th>
                      <td>
                        <input
                          type='text'
                          name='prodBrand'
                          onChange={handleValueChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>상품가격</th>
                      <td>
                        <input
                          type='number'
                          name='prodPrice'
                          onChange={handleValueChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>상품재고</th>
                      <td>
                        <input
                          type='number'
                          name='prodStock'
                          onChange={handleValueChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>판매상태</th>
                      <td>
                        <select name='prodState' onChange={handleSelectChange}>
                          <option value='void'>선택</option>
                          <option value='0'>판매중</option>
                          <option value='1'>판매중지</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <th rowSpan='2'>상품사진</th>
                      <td>
                        {/* <img
                                  src={
                                    modalData.prodImage &&
                                    modalData.prodImage.startsWith("https://")
                                      ? modalData.prodImage
                                      : "/images/" + modalData.prodImage
                                  }
                                  width='200'
                                  height='200'
                                />
                                <br />
                                <span>
                                  {modalData.prodImage
                                    ? modalData.prodImage.substring(
                                        modalData.prodImage.indexOf("_") + 1
                                      )
                                    : null}
                                </span> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type='file'
                          name='imgname'
                          onChange={handleImgChange}
                        />
                        <span>
                          파일이름
                          {/* {board.upload
                                ? board.upload.substring(
                                    board.upload.indexOf('_') + 1
                                  )
                                : null} */}
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div>
                    <input type='submit' id='update' value='추가' />
                    <input type='button' onClick={close} value='취소' />
                  </div>
                </form>
              </div>
            </>
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

export default ModalProdInsert;
