const TableRow = (props) => {
  const { user } = props;

  return (
    <tr>
      <td>{user.dropKeynum}</td>
      <td>{user.userKeynum}</td>
      <td>{user.userID}</td>
      <td>{user.userName}</td>
      <td>{user.userDropdate}</td>
    </tr>
  );
};

export default TableRow;
