import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";
import style from "../../css/noticeManagement.module.css";
import { useState } from "react";
import event from "../../image/campEvent.jpg";

import download from "../../image/download.png";

//상세페이지2,4,8
const NoticeView = () => {
  const { noticeNum } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [src, setSrc] = useState("");
  const location = useLocation();

  const params = location.state;
  console.log("디테일에서 location값", params);

  // console.log('noticeNum:', noticeNum);

  const noticeDetail = useSelector((state) => state.notice.noticeDetail);

  const pv = useSelector((state) => state.notice.pv);
  const noticeFile = useSelector((state) => state.notice.noticeFile);

  useEffect(() => {
    dispatch(noticeActions.getNoticeDetail(noticeNum));
    console.log("페이지 객체", params);
  }, []);

  //삭제1,3
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(noticeActions.getNoticeDelete(noticeNum));
    //삭제된 뒤 리스트 보이기
    navigator(`/notice/list/${pv.currentPage}`);
  };

  const gotoback = (e) => {
    e.preventDefault();

    if (params.searchWord) {
      console.log("검색할때 뒤로가기");
      navigator(
        `/notice/list/${params.currentPage}/${params.table}/${params.searchKey}/${params.searchWord}`
      );
    } else {
      console.log("일반 리스트일떄 뒤로가기");
      navigator(`/notice/list/${params}`);
    }
  };

  const handleDownload = async () => {
    const fileName = noticeDetail.noticeFile.substring(
      noticeDetail.noticeFile.indexOf("_") + 1
    );

    // console.log(fileName);

    //파일내용을 stream으로 읽어오는 작업
    const url = window.URL.createObjectURL(new Blob([noticeFile]), {
      type: "application/octet-stream",
    });
    //이때 타입은 스프링 controller에서 지정한 타입

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.style.cssText = "display:none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className={style.managmentCommon}>
      <div className={style.commonTop}>
        <p>공지사항</p>
      </div>

      <div className={style.noticeTitle_date}>
        <p>{noticeDetail.noticeTitle}</p>
        <p>
          <b>작성일</b> : {noticeDetail.noticeRegdate}
        </p>
        <p>
          <b>조회수</b> : {noticeDetail.noticeReadCount}
        </p>
      </div>

      <div className={style.noticemainContent}>
        {noticeDetail.noticeFile ? (
          noticeDetail.noticeFile.indexOf(".png") !== -1 ||
          noticeDetail.noticeFile.indexOf(".jpg") !== -1 ? (
            <div>
              <img
                className={style.noticePic}
                src={noticeFile ? URL.createObjectURL(noticeFile) : ""}
                width="1200px"
                height="600px"
              />
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <div className={style.noticeDetail}>{noticeDetail.noticeContent}</div>
      </div>

      {noticeDetail.noticeFile ? (
        <div className={style.filedownLoad}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "white",
              border: "none",
              color: "gray",
              fontWeight: "700",
            }}
            name="다운로드하기"
          >
            <img src={download} style={{ width: "40px", height: "40px" }} />
            &nbsp;&nbsp;첨부된 파일 :&nbsp;
            {noticeDetail.noticeFile.substring(
              noticeDetail.noticeFile.indexOf("_") + 1
            )}{" "}
          </button>
        </div>
      ) : null}

      <div style={{ textAlign: "center" }}>
        <button onClick={gotoback} className="btn btn-primary">
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default NoticeView;
