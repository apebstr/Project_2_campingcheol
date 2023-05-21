import { useEffect, useState } from 'react';
import style from '../css/adminLogin.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../apiurl';

const AdminLogin = () => {
  const navigatior = useNavigate();

  const [inputs, setInputs] = useState({
    adminID: '',
    adminPass: '',
  });

  const { adminID, adminPass } = inputs;

  const config = { headers: { 'Content-Type': 'application/json' } };

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseUrl}/login`, inputs, config)
      .then((response) => {
        console.log('response: ', response.data);

        //let jwtToken = response.headers['Authorization'];
        let jwtToken = response.headers.get('Authorization');
        console.log(jwtToken);

        let jwtadminName = response.data.adminName;
        let jwtadminID = response.data.adminID;
        console.log(jwtadminName);
        console.log(jwtadminID);

        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('adminID', jwtadminID);
        localStorage.setItem('adminName', jwtadminName);
        localStorage.setItem('isLogin', 'true');

        setInputs({ adminID: '', adminPass: '' });
      })
      .then((response) => {
        window.location.replace('/admin/user');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('adminName')) {
      window.location.replace('/admin/user');
    }
  }, []);

  return (
    <>
      <div className={style.adminLoginPage}>
        <form action='#' method='POST' onSubmit={onSubmit}>
          <p className={style.adminLoginText}>ADMIN LOGIN</p>
          <div className={style.adminloginArea}>
            <div className={style.adminID}>
              <p className={style.adminIDText}>아이디</p>
              <p>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    name='adminID'
                    value={adminID}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-default'
                    onChange={handleValueChange}
                  />
                </div>
              </p>
            </div>
            <div className={style.adminPW}>
              <p className={style.adminPWText}>비밀번호</p>
              <p>
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    name='adminPass'
                    value={adminPass}
                    aria-label='Sizing example input'
                    aria-describedby='inputGroup-sizing-default'
                    onChange={handleValueChange}
                  />
                </div>
              </p>
            </div>
          </div>
          <div className={style.adminloginBtn}>
            <button type='submit' className='btn btn-primary'>
              로그인
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
