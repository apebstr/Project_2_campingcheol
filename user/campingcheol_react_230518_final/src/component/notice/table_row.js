import { Link, useNavigation } from "react-router-dom";
import style from "../../css/noticeManagement.module.css";

const TableRow = (props) => {
  const { notice, navigator, currentPage, searchWords } = props;

  const noticeView = () => {
    if (searchWords.searchWord) {
      navigator(`/notice/view/${notice.noticeNum}`, {
        state: {
          currentPage: currentPage,
          table: searchWords.table,
          searchKey: searchWords.searchKey,
          searchWord: searchWords.searchWord,
        },
      });
    } else {
      navigator(`/notice/view/${notice.noticeNum}`, { state: currentPage });
    }
  };

  return (
    <tr className={style.boardList}>
      <td>{notice.noticeNum}</td>
      <td onClick={noticeView} style={{ cursor: "pointer" }}>
        {/* <Link to={`/notice/view/${notice.noticeNum}`}> */}
        {notice.noticeTitle}
        {/* </Link> */}
      </td>
      <td>{notice.noticeRegdate}</td>
      <td>{notice.adminId}</td>
      <td>{notice.noticeReadCount}</td>
    </tr>
  );
};

export default TableRow;
