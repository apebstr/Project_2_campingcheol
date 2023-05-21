import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useState } from "react";
import style from "../../css/searchDatepicker.module.css";

const SearchDate = (props) => {
  const { setStart, setEnd } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function getDateString(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dateString = `${year}${month}${day}`;
    console.log(dateString); // "20230513"
    return dateString;
  }

  function handleStartDateChange(startDate) {
    setStartDate(startDate);
    const dateString = getDateString(startDate);
    setStart(dateString);
  }

  function handleEndDateChange(endDate) {
    setEndDate(endDate);
    const dateString = getDateString(endDate);
    setEnd(dateString);
  }

  return (
    // <div className={style.datepicker_container}>
    <>
      <td>
        <DatePicker
          className={style.calendar}
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={handleStartDateChange}
          dateFormat='yyyy년 MM월 dd일'
          locale={ko}
          placeholderText='시작날짜'
        />
      </td>
      <td>
        <DatePicker
          className={style.calendar}
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={handleEndDateChange}
          dateFormat='yyyy년 MM월 dd일'
          locale={ko}
          placeholderText='종료날짜'
        />
      </td>
    </>
    // </div>
  );
};

export default SearchDate;
