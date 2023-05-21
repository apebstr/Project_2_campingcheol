import React, { useEffect, useState } from "react";
import style from "../../css/modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";

const ModalProdUpdate = (props) => {
  const dispatch = useDispatch();
  const { open, close, header, num } = props;

  const [inputs, setInputs] = useState({
    prodKeyNum: "",
    prodTitle: "",
    prodPrice: "",
    prodCategory: "",
    prodStock: "",
    prodState: "",
    imgname: null,
  });

  const {
    prodKeyNum,
    prodTitle,
    prodPrice,
    prodCategory,
    prodStock,
    prodState,
    imgname,
  } = inputs;

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const prodDetail = useSelector((state) => state.prod.prodDetail);

  const getProdDetail = (prodKeyNum) => {
    dispatch(prodActions.getProdDetail(prodKeyNum, config));
    console.log("prodKeyNum", prodKeyNum);
  };

  useEffect(() => {
    getProdDetail(num);
  }, []);

  useEffect(() => {
    setInputs({
      prodKeyNum: prodDetail.prodKeyNum,
      prodTitle: prodDetail.prodTitle,
      prodPrice: prodDetail.prodPrice,
      prodCategory: prodDetail.prodCategory,
      prodStock: prodDetail.prodStock,
      prodState: prodDetail.prodState,
      imgname: imgname,
    });
  }, [prodDetail]);

  const handleValueChange = (e) => {
    e.preventDefault();
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

  // 모달 내 수정 버튼
  const handleUpdate = async (e) => {
    e.preventDefault();

    let korcategory = "";

    if (["a", "b", "c", "d", "e", "f"].includes(prodCategory)) {
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
    } else {
      korcategory = prodCategory;
    }

    const formData = new FormData();
    formData.append("prodKeyNum", prodKeyNum);
    formData.append("prodTitle", prodTitle);
    formData.append("prodPrice", prodPrice);
    formData.append("prodStock", prodStock);
    formData.append("prodState", prodState);
    formData.append("prodCategory", korcategory);

    console.log("imgname", imgname);
    if (imgname != null) formData.append("imgname", imgname);

    console.log(prodKeyNum);
    console.log(prodTitle);
    console.log(prodPrice);
    console.log(prodStock);
    console.log(prodState);
    console.log(prodCategory);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(prodActions.getProdUpdate(formData, config));

    close();

    getProdDetail(prodKeyNum);
  };

  // useEffect(() => {
  //   setInputs(prodDetail);
  // }, [prodDetail]);

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
              <div className='style.detail'>
                <form name='frm'>
                  <table
                    className='style.detail_table'
                    id='style.detail_table'
                    key={prodDetail.prodKeyNum}
                  >
                    <tr>
                      <th>상품카테고리</th>
                      <td>
                        <select
                          name='prodCategory'
                          onChange={handleSelectChange}
                          defaultValue={
                            prodDetail.prodCategory === "텐트"
                              ? "a"
                              : prodDetail.prodCategory === "캠핑가구"
                              ? "b"
                              : prodDetail.prodCategory === "랜턴"
                              ? "c"
                              : prodDetail.prodCategory === "캠핑매트"
                              ? "d"
                              : prodDetail.prodCategory === "취사용품"
                              ? "e"
                              : prodDetail.prodCategory === "기타캠핑용품"
                              ? "f"
                              : ""
                          }
                        >
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
                          defaultValue={prodDetail.prodTitle}
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
                          defaultValue={prodDetail.prodPrice}
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
                          defaultValue={prodDetail.prodStock}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>판매상태</th>
                      <td>
                        <select
                          name='prodState'
                          defaultValue={prodDetail.prodState}
                          onChange={handleSelectChange}
                        >
                          <option value='0'>판매중</option>
                          <option value='1'>판매중지</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <th rowSpan='2'>상품사진</th>
                      <td>
                        <img
                          src={
                            prodDetail.prodImage &&
                            prodDetail.prodImage.startsWith("https://")
                              ? prodDetail.prodImage
                              : "/images/" + prodDetail.prodImage
                          }
                          width='200'
                          height='200'
                        />
                        <br />
                        <span>
                          {prodDetail.prodImage
                            ? prodDetail.prodImage.substring(
                                prodDetail.prodImage.indexOf("_") + 1
                              )
                            : null}
                        </span>
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

                    <tr>
                      <th>등록일</th>
                      <td>{prodDetail.prodRegdate}</td>
                    </tr>
                  </table>
                  <div>
                    <input
                      type='hidden'
                      name='prodKeyNum'
                      value={prodDetail.prodKeyNum}
                    />

                    <input
                      type='button'
                      id='update'
                      onClick={handleUpdate}
                      value='수정'
                    />
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

export default ModalProdUpdate;
