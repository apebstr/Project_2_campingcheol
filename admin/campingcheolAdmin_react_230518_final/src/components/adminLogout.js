import { useEffect } from 'react';

const AdminLogout = () => {
  useEffect(() => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminID');
    localStorage.removeItem('isLogin');
    localStorage.clear();
    //navigator("/");
    window.location.replace('/');
  });
};

export default AdminLogout;
