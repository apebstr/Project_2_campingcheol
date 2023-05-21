import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";
import style from "../../css/noticeView.module.css";

//상세페이지2,4,8
const NoticeView = () => {
  const { noticeNum } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // console.log('noticeNum:', noticeNum);

  const noticeDetail = useSelector((state) => state.notice.noticeDetail);

  const pv = useSelector((state) => state.notice.pv);

  useEffect(() => {
    dispatch(noticeActions.getNoticeDetail(noticeNum));
  }, []);

  //삭제1,3
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(noticeActions.getNoticeDelete(noticeNum));
    //삭제된 뒤 리스트 보이기
    navigator(`/admin/notice`);
  };

  const gotoback = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>공지사항 작성</p>
          </div>
        </div>

        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            <table className="table table-stribed" style={{ marginTop: 20 }}>
              <tbody>
                <tr>
                  <th width="20%">작성일</th>
                  <td>{noticeDetail.noticeRegdate}</td>
                  <th width="20%">조회수</th>
                  <td>{noticeDetail.noticeReadCount}</td>
                </tr>

                <tr>
                  <th>제목</th>
                  <td colSpan="3">{noticeDetail.noticeTitle}</td>
                </tr>

                <tr>
                  <th>작성자</th>
                  <td colSpan="3">{noticeDetail.adminId}</td>
                </tr>

                <tr>
                  <th>내용</th>
                  <td colSpan="3" style={{ whiteSpace: "pre-line" }}>
                    {noticeDetail.noticeContent}
                  </td>
                </tr>
                <tr>
                  <th>첨부파일</th>
                  <td colSpan="3" style={{ whiteSpace: "pre-line" }}>
                    {noticeDetail.noticeFile ? (
                      <span>
                        {noticeDetail.noticeFile.substring(
                          noticeDetail.noticeFile.indexOf("_") + 1
                        )}
                      </span>
                    ) : (
                      <span>없음</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={gotoback} className="btn btn-primary">
              뒤로
            </button>

            <Link
              className="btn btn-primary"
              to={`/admin/notice/update/${noticeNum}`}
            >
              수정
            </Link>

            <button className="btn btn-primary" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeView;
