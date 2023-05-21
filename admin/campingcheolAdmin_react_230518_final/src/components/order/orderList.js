import { useState } from 'react';
import boobono from '../image/bonobono.jpg';
import check from '../image/check.png';
import list from '../image/list.png';
import style from '../css/orderManagement.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>주문관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  주문을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>주문 조회 기간</td>
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
                    <td>주문 상태</td>
                    <td colSpan='2'>
                      <select className={style.memberStatus}>
                        <option name='orderStatus'>전체</option>
                        <option name='orderStatus'>신규주문</option>
                        <option name='orderStatus'>주문확인</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>주문 종류</td>
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
                        <option name='searchCategory'>아이디</option>
                        <option name='searchCategory'>수취인 주소</option>
                        <option name='searchCategory'>상품번호</option>
                        <option name='searchCategory'>주문번호</option>
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
                  주문 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : 2개 / 검색결과 : 10 개
                </p>
                <p className={style.controllBtn}>
                  <button type='button' className='btn btn-outline-primary'>
                    발주 확인
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

                    <th>상품번호</th>
                    <th>상품명</th>
                    <th>수취인</th>
                    <th>주소</th>
                    <th>구매수량</th>
                    <th>가격</th>
                    <th>주문여부</th>
                    <th>결제여부</th>
                    <th>주문일자</th>
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

                    <td>132</td>
                    <td>루메나 X3 전용 실리콘 케이스 카키</td>
                    <td>홍길동</td>
                    <td>주소주소주소</td>
                    <td>5개</td>
                    <td>15000</td>
                    <td>완</td>
                    <td>완</td>
                    <td>2023.03.04</td>
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
export default OrderManagement;
