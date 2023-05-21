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
  });

  const { noticeTitle, noticeContent, noticeState } = inputs;

  const { noticeNum } = useParams();

  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const handleFileChange = () => {};

  //여기 내용 안채웠음
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("noticeState", noticeState);

    const config = {
      Authorization: localStorage.getItem("Authorization"),
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

  return (
    <>
      <div className={style.noticeWritePage}>
        <p className={style.Toptext}>공지사항 작성하기</p>
        <div className={style.SubText}>
          <p>공지입력</p>
          <hr />
        </div>

        <div className={style.noticeForm}>
          <form onSubmit={onSubmit}>
            <p className={style.NoticeWriter}>
              <p className={style.title}>작성자</p>

              <input
                type='text'
                readOnly
                value={localStorage.getItem("adminID")}
                name='adminID'
                className='form-control'
                disabled
              />
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

            <p className={style.NoticeWriter}>
              <p className={style.state}>상태</p>
              <select
                name='noticeState'
                className={style.formControl}
                value={noticeState}
                onChange={handleValueChange}
              >
                <option value='1'>게시 중</option>
                <option value='2'>게시 중지</option>
              </select>
            </p>

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
    </>
  );
};

export default NoticeWrite;
