import { Link } from 'react-router-dom';

const TableRow = (props) => {
  const { notice } = props;

  return (
    <tr>
      <td>{notice.noticeNum}</td>
      <td>
        <Link to={`/admin/notice/view/${notice.noticeNum}`}>
          {notice.noticeTitle}
        </Link>
      </td>
      <td>{notice.noticeRegdate}</td>
      <td>{notice.adminId}</td>
      <td>{notice.noticeReadCount}</td>
    </tr>
  );
};

export default TableRow;
