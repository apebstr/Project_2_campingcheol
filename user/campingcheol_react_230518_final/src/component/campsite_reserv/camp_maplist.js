/* global kakao */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { campActions } from "../../reduxs/actions/camp_action";

//kakao maps api를 가져오면 window 전역 객체에 들어가는데 함수형 컴포넌트에서 인식 불가
//아래 코드로 함수형 컴포넌트에 인지 시키고 window 에서 kakao 객체 뽑아서 사용하기

const CampMapList = ({ num }) => {
  const { kakao } = window;
  const campSiteDetail = useSelector((state) => state.campSite.campSiteDetail);
  // const dispatch = useDispatch();

  //campSiteDetail 상세 정보가 로드되면 지도 생성하도록
  // useEffect(() => {
  //   dispatch(campActions.getCampDetail(num));
  // }, [dispatch, num]);

  //지도 그리기
  useEffect(() => {
    if (campSiteDetail) {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        center: new kakao.maps.LatLng(
          campSiteDetail.campMapY,
          campSiteDetail.campMapX
        ),
        level: 4,
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //마커 표시하기
      var markerPosition = new kakao.maps.LatLng(
        campSiteDetail.campMapY,
        campSiteDetail.campMapX
      );
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [campSiteDetail]);

  return (
    //지도를 담을 영역 설정
    <div>
      <div
        id="map"
        style={{ width: "1100px", height: "500px", margin: "50px auto" }}
      ></div>
    </div>
  );
};

export default CampMapList;
