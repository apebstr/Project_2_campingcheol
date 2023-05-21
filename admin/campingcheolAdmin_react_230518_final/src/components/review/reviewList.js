import { useState } from 'react';
import check from '../image/check.png';
import list from '../image/list.png';
import style from '../css/reviewManagement.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const ReviewManagement = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>리뷰관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  리뷰를 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>리뷰 등록 기간</td>
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>평점</td>
                    <td colSpan='2'>
                      <select className={style.memberStatus}>
                        <option name='reviewRating'>전체</option>
                        <option name='reviewRating'>1</option>
                        <option name='reviewRating'>2</option>
                        <option name='reviewRating'>3</option>
                        <option name='reviewRating'>4</option>
                        <option name='reviewRating'>5</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>상품 종류</td>
                    <td colSpan='2'>
                      <select className={style.memberStatus}>
                        <option name='prodCategory'>전체</option>
                        <option name='prodCategory'>텐트</option>
                        <option name='prodCategory'>캠핑가구</option>
                        <option name='prodCategory'>랜턴</option>
                        <option name='prodCategory'>취사용품</option>
                        <option name='prodCategory'>캠핑매트</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>검색어</td>
                    <td>
                      <select className={style.searchCategory}>
                        <option name='searchCategory'>전체</option>
                        <option name='searchCategory'>상품코드</option>
                        <option name='searchCategory'>아이디</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={style.searchWord}
                        placeholder='검색어를 입력하세요'
                      />
                      <button type='button' className='btn btn-primary'>
                        검색
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className={style.managmentContentUnder}>
              <div className={style.memListTop}>
                <p className={style.membetText}>
                  <img src={list} />
                  리뷰 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : 2개 / 검색결과 : 10 개
                </p>
                <p className={style.controllBtn}>
                  <button type='button' className='btn btn-outline-primary'>
                    엑셀 다운로드 ( 할까요말까요.. )
                  </button>
                  <button type='button' className='btn btn-outline-primary'>
                    삭제
                  </button>
                </p>
              </div>
              <div className={style.memberList}>
                <table>
                  <tr>
                    <th>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='flexCheckDefault'
                        />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'
                        >
                          번호
                        </label>
                      </div>
                    </th>
                    <th>구매 상품명</th>
                    <th>작성자아이디</th>

                    <th>리뷰내용</th>
                    <th>별점</th>
                    <th>작성일</th>
                  </tr>
                  <tr>
                    <td>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='flexCheckDefault'
                        />
                        002
                      </div>
                    </td>

                    <td>루메나 X3 전용 실리콘 케이스 카키</td>
                    <td>포로리</td>
                    <td>아주아주아주좋네요 짱입니다</td>
                    <td>5</td>
                    <td>2023.04.03</td>
                  </tr>
                </table>
              </div>
            </div>
            {/* 관리자페이지갈아끼워야하는부분 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
