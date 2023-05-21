import { useEffect } from "react";
//import { useNavigate } from 'react-router-dom';

const CampLogout = () => {
  //const navigator = useNavigate();

  useEffect(() => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    localStorage.removeItem("authRole");
    localStorage.removeItem("userNick");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userKeynum");
    localStorage.removeItem("isLogin");
    localStorage.clear();
    //navigator("/");
    window.location.replace("/");
  });
};

export default CampLogout;
