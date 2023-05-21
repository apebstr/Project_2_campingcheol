import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../apiurl";
import { campActions } from "../../reduxs/actions/camp_action";

import fullheart from "../../image/fullheart.png";
import emptyheart from "../../image/emptyheart.png";

function CampJjim({}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { num } = useParams();
  const campSiteDetail = useSelector((state) => state.campSite.campSiteDetail);
  const userID = localStorage.userID;
  const dispatch = useDispatch();

  console.log("isFavorite:" + isFavorite);

  useEffect(() => {
    if (campSiteDetail.checkJjim >= 1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [campSiteDetail.checkJjim]);

  //찜하기 & 해제
  const handleFavoriteClick = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    if (isFavorite) {
      await axios.delete(
        `${baseUrl}/camp/delete/${num}?userID=${userID}`,
        config
      );
      dispatch(
        campActions.getCampDetail(num, userID, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
      );
    } else {
      const formData = new FormData();
      formData.append("num", num);
      formData.append("userID", userID);
      await axios.post(`${baseUrl}/camp/Jjim/${num}`, formData, config);
    }

    setIsFavorite((previsFavorite) => !previsFavorite);
  };

  return (
    <div>
      <span onClick={handleFavoriteClick} style={{ cursor: "pointer" }}>
        {isFavorite ? <img src={fullheart} /> : <img src={emptyheart} />}
      </span>
    </div>
  );
}

export default CampJjim;
