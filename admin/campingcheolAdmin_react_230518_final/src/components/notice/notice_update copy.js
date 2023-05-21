import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";
import style from "../../css/noticeWrite.module.css";

const NoticeUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { noticeNum } = useParams();

  const [inputs, setInputs] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeState: "",
  });

  const { noticeTitle, noticeContent, noticeState } = inputs;

  const notice = useSelector((state) => state.notice.noticeDetail);

  const pv = useSelector((state) => state.notice.pv);

  useEffect(() => {
    setInputs(notice);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeNum", noticeNum);
    formData.append("noticeState", noticeState);
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("currentPage", pv.currentPage);

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
    <div>
      <p className={style.Toptext}>공지사항 수정하기</p>
      <form name='frm' encType='multipart/form-data'>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width='20%'>작성자</th>
              <td>{notice.adminId}</td>
              <th width='20%'>등록일</th>
              <td>{notice.noticeRegdate}</td>
            </tr>

            <tr>
              <th>제목</th>
              <td colSpan='3'>
                <input
                  type='text'
                  name='noticeTitle'
                  id='noticeTitle'
                  defaultValue={notice.noticeTitle}
                  value={noticeTitle}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th>상태</th>
              <td colSpan='3'>
                <select
                  name='noticeState'
                  id='noticeState'
                  value={noticeState}
                  onChange={handleSelectChange}
                >
                  <option value='1'>게시 중</option>
                  <option value='2'>게시 중지</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan='3'>
                <textarea
                  name='noticeContent'
                  id='noticeContent'
                  rows='13'
                  cols='40'
                  defaultValue={notice.noticeContent}
                  value={noticeContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <button className='btn btn-primary' onClick={handleUpdate}>
          수정
        </button>
        <button className='btn btn-primary' onClick={handleReset}>
          취소
        </button>
        <button className='btn btn-primary' onClick={handleBack}>
          뒤로
        </button>
      </form>
    </div>
  );
};

export default NoticeUpdate;
