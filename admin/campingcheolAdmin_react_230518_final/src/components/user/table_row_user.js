import { useState } from 'react';

const TableRowUser = (props) => {
  const { user } = props;

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  console.log(checkItems);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    console.log(checked, id);
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      console.log(checkItems);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  return (
    <tr key={user.userKeynum}>
      <td>
        <input
          type='checkbox'
          name={`select-${user.userKeynum}`}
          onChange={(e) => handleSingleCheck(e.target.checked, user.userKeynum)}
          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
          checked={checkItems.includes(user.userKeynum) ? true : false}
        />
      </td>
      <td>{user.userKeynum}</td>
      <td>{user.userID}</td>
      <td>{user.userName}</td>
      <td>{user.userNick}</td>
      <td>{user.userPhone}</td>
      <td>{user.userAddr}</td>
      <td>{user.userSex}</td>
      <td>{user.userAge}</td>
      <td>{user.userRegdate}</td>
    </tr>
  );
};

export default TableRowUser;
