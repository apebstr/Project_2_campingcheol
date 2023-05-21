import style from "../../css/noticeUpdate.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";

const NoticeUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { noticeNum } = useParams();

  const [inputs, setInputs] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeState: "",
    noticeFile: null,
  });

  const [noticeFileOb, setNoticeFileOb] = useState();

  const { noticeTitle, noticeContent, noticeState, noticeFile } = inputs;

  const notice = useSelector((state) => state.notice.noticeDetail);

  const pv = useSelector((state) => state.notice.pv);

  useEffect(() => {
    setInputs(notice);
    // dispatch(noticeActions.getFile(noticeNum));
    // console.log(noticeFileOb);
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  const handleSelectChange = (e) => {
    setInputs((prev) => {
      return { ...prev, noticeState: e.target.value };
    });
  };
  const saveFile = (e) => {
    e.preventDefault();
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        noticeFile: e.target.files[0].name,
      };
    });
    setNoticeFileOb(e.target.files[0]);
    // noticeFileOb = e.target.files[0];
    console.log(e.target.files[0]);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeNum", noticeNum);
    formData.append("noticeState", noticeState);
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("currentPage", pv.currentPage);
    if (noticeFileOb != null) {
      formData.append("noticefileName", noticeFileOb);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(noticeActions.getNoticeUpdate(formData, config));

    setInputs({
      noticeTitle: "",
      noticeContent: "",
      noticeState: "",
    });

    navigator(`/admin/notice`);
    // 오류나는데
    //navigator(`/admin/notice/${pv.currentPage}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs(notice);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>공지사항 수정하기</p>
          </div>
        </div>

        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            <div className={style.SubText}>
              <p>공지수정</p>
              <hr />
            </div>
          </div>

          <div className={style.noticeWritePage}>
            <div className={style.noticeForm}>
              <form>
                <p className={style.NoticeWriter}>
                  <p className={style.title}>등록일</p>

                  <input
                    type="text"
                    readOnly
                    value={notice.noticeRegdate}
                    className="form-control"
                    disabled
                  />
                </p>

                <p className={style.NoticeWriter}>
                  <p className={style.title}>상태</p>
                  <select
                    name="noticeState"
                    className={style.formControl}
                    value={noticeState}
                    onChange={handleSelectChange}
                  >
                    <option value="1">게시 중</option>
                    <option value="2">게시 중지</option>
                  </select>
                </p>

                <p className={style.NoticeWriter}>
                  <p className={style.title}>제목</p>
                  <input
                    type="text"
                    name="noticeTitle"
                    className={style.formControl}
                    value={noticeTitle}
                    onChange={handleValueChange}
                  />
                </p>

                <p className={style.NoticeWriter} id={style.noticeContent}>
                  <p className={style.title}>내용작성</p>

                  <textarea
                    name="noticeContent"
                    rows="13"
                    cols="42"
                    className={style.formControl}
                    value={noticeContent}
                    onChange={handleValueChange}
                  />
                </p>
                <div className={style.fileInput}>
                  <input
                    type="file"
                    id="noticeFile"
                    onChange={(e) => saveFile(e)}
                  />

                  <p>
                    <label for="noticeFile"> 파일 첨부하기</label>
                    {noticeFile ? (
                      <span>
                        {noticeFile.substring(noticeFile.indexOf("_") + 1)}
                      </span>
                    ) : (
                      <span>파일을 첨부해주세요</span>
                    )}
                  </p>
                </div>
                <div className={style.formBtn}>
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    수정
                  </button>
                  <button className="btn btn-primary" onClick={handleReset}>
                    취소
                  </button>
                  <button className="btn btn-primary" onClick={handleBack}>
                    뒤로
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

export default NoticeUpdate;
