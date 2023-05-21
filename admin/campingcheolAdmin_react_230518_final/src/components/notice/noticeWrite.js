import style from "../../css/noticeWrite.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../reduxs/actions/notice_action";

const NoticeWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeState: "1",
    noticefileName: null,
  });

  const { noticeTitle, noticeContent, noticeState } = inputs;

  const { noticeNum } = useParams();

  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  const saveFile = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, noticefileName: e.target.files[0] });
    // console.log("쀼?", inputs.noticefileName);
  };
  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //select
  const handleChageSelect = (e) => {
    setInputs({ ...inputs, noticeState: e.target.value });
  };

  // const handleFileChange = () => {};

  //여기 내용 안채웠음
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("noticeState", noticeState);
    if (inputs.noticefileName != null) {
      formData.append("noticefileName", inputs.noticefileName);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(noticeActions.getNoticeWrite(formData, config));

    setInputs({
      noticeTitle: "",
      noticeContent: "",
      noticeState: "",
    });

    navigator(`/admin/notice`);
    //`/admin/notice${pv.currentPage ? pv.currentPage : { currentPage : 1}}`
  };

  const gotoback = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  // 공지사항 파일첨부 처리하기

  return (
    <>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>공지사항 작성하기</p>
          </div>
        </div>

        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            <div className={style.SubText}>
              <p>공지입력</p>
              <hr />
            </div>
          </div>

          <div className={style.noticeWritePage}>
            <div className={style.noticeForm}>
              <form onSubmit={onSubmit}>
                {/* <p className={style.NoticeWriter}>
                  <p className={style.title}>작성자</p>

                  <input
                    type='text'
                    readOnly
                    value={localStorage.getItem("adminID")}
                    name='adminID'
                    className='form-control'
                    disabled
                  />
                </p> */}

                <p className={style.NoticeWriter}>
                  <p className={style.title}>상태</p>
                  <select
                    name='noticeState'
                    className={style.formControl}
                    value={noticeState}
                    onChange={handleChageSelect}
                  >
                    <option value='1'>게시 중</option>
                    <option value='2'>게시 중지</option>
                  </select>
                </p>

                <p className={style.NoticeWriter}>
                  <p className={style.title}>제목</p>
                  <input
                    type='text'
                    name='noticeTitle'
                    className={style.formControl}
                    value={noticeTitle}
                    onChange={handleValueChange}
                  />
                </p>

                <p className={style.NoticeWriter} id={style.noticeContent}>
                  <p className={style.title}>내용작성</p>

                  <textarea
                    name='noticeContent'
                    rows='13'
                    cols='42'
                    className={style.formControl}
                    value={noticeContent}
                    onChange={handleValueChange}
                  />
                </p>
                <div className={style.fileInput}>
                  <input type='file' id='noticeFile' onChange={saveFile} />

                  <p>
                    <label for='noticeFile'> 파일 첨부하기</label>
                    {inputs.noticefileName ? (
                      <span>{inputs.noticefileName.name}</span>
                    ) : (
                      <span>파일을 첨부해주세요</span>
                    )}
                  </p>
                </div>
                <div className={style.formBtn}>
                  <button onClick={gotoback} className='btn btn-primary'>
                    뒤로
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    등록
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeWrite;
