import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./css/new_layout.css";
import weatherIcon from "./image/weatherIcon.png";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import rain from "./image/rain.gif";
import clear from "./image/clear.gif";
import wind from "./image/wind.gif";
import cloud from "./image/cloud-clear.gif";
import Dropdown from "react-bootstrap/Dropdown";
//탭관련
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//탭관련
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

//탭관련
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

//탭관련
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Weather = () => {
  //날씨관련 변수
  const [temperatures, setTemperatures] = useState([]);
  const [weatherList, setWeatherList] = useState([]);

  //도시
  const [city, setCity] = useState("수도권");

  const changeCity = (value) => {
    setCity(value);
  };

  // 팝업창 띄우기 관련
  const [weatherPop, setWeatherPop] = useState(false);

  // api에서 날짜 이쁘게 가져오려고하는 역할
  function addZero(element) {
    if (element < 10) {
      return "0" + element;
    } else {
      return element;
    }
  }

  // api 가져오기
  const fetchWeatherData = async () => {
    let apiCity = "";

    switch (city) {
      case "수도권":
        apiCity = "Seoul";
        break;
      case "강원도 영서":
        apiCity = "Chuncheon";
        break;
      case "강원도 영동":
        apiCity = "Gangneung";
        break;
      case "충청남도":
        apiCity = "Cheonan";
        break;
      case "충청북도":
        apiCity = "Cheongju";
        break;
      case "전라남도":
        apiCity = "Suncheon";
        break;
      case "전라북도":
        apiCity = "Jeonju";
        break;
      case "경상남도":
        apiCity = "Busan";
        break;
      case "경상북도":
        apiCity = "Daegu";
        break;
      case "제주도":
        apiCity = "Jeju City";
        break;
    }

    const weatherList = [];
    try {
      // const response = await axios.get(
      //   "https://api.openweathermap.org/data/2.5/forecast?q=Seoul,KR&appid=e826b0c1d81b53bff1bc6ffc2d9a75e4&units=metric&lang=kr"
      // );
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${apiCity},KR&appid=e826b0c1d81b53bff1bc6ffc2d9a75e4&units=metric`
      );

      response.data.list.map((element) => {
        let date = new Date(element.dt_txt);
        date.setHours(date.getHours() + 9);
        let year = date.getFullYear();
        let month = addZero(date.getMonth() + 1);
        let fulldate = addZero(date.getDate());
        let hour = date.getHours();

        //utc를 한국시간으로 변경하기
        element.dt_txt =
          year + "-" + month + "-" + fulldate + " " + hour + ":00:00";

        let weatherEntity = {
          date: month + "월 " + fulldate + "일",
          hour: hour + ":00",
          temp: Math.round(element.main.temp),
          weather: element.weather[0].main,
          weatherDetail: element.weather[0].description,
        };

        weatherList.push(weatherEntity);
      });

      setTemperatures(weatherList); // 이 부분을 수정
    } catch (error) {
      console.error(error);
    }
  };

  // 실질적으로 사용되는 정보들을 모으기
  const makeList = () => {
    let data = temperatures;

    const groupedData = data.reduce((acc, curr) => {
      // 현재 데이터의 날짜와 동일한 객체가 이미 accumulator에 있는지 확인
      const index = acc.findIndex((obj) => obj.date === curr.date);
      if (index !== -1) {
        // 있다면 해당 객체에 현재 데이터 추가
        acc[index].data.push(curr);
      } else {
        // 없다면 새로운 객체 생성 후 accumulator에 추가
        acc.push({ date: curr.date, data: [curr] });
      }
      return acc;
    }, []);
    console.log(groupedData);
    setWeatherList(groupedData);
  };

  const fetchAndMakeList = async () => {
    await fetchWeatherData();
    makeList();
  };

  const viewPopup = () => {
    weatherPop === true ? setWeatherPop(false) : setWeatherPop(true);
  };

  useEffect(() => {
    fetchAndMakeList();
  }, []);
  useEffect(() => {
    fetchAndMakeList();
  }, [city]);

  useEffect(() => {
    makeList();
  }, [temperatures]); // 이 부분을 추가

  //날씨팝업창관렴
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='weatherDropDown'>
        <img src={weatherIcon} onClick={viewPopup} />
      </div>
      <div
        className='weatherTab'
        value={weatherPop}
        style={{ display: weatherPop ? "block" : "none" }}
      >
        <div className='locationDrop'>
          <Dropdown>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              {city}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                value='수도권'
                onClick={() => changeCity("수도권")}
              >
                수도권
              </Dropdown.Item>
              <Dropdown.Item
                value='강원도 영서'
                onClick={() => changeCity("강원도 영서")}
              >
                강원도 영서
              </Dropdown.Item>
              <Dropdown.Item
                value='강원도 영동'
                onClick={() => changeCity("강원도 영동")}
              >
                강원도 영동
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("충청남도")}>
                충청남도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("충청북도")}>
                충청북도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("전라남도")}>
                전라남도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("전라북도")}>
                전라북도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("경상남도")}>
                경상남도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("경상북도")}>
                경상북도
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeCity("제주도")}>
                제주도
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={classes.root}>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label='Vertical tabs example'
            className={classes.tabs}
          >
            {weatherList &&
              weatherList.map((weather, idx2) => {
                return (
                  <Tab key={idx2} label={weather.date} {...a11yProps(idx2)} />
                );
              })}
          </Tabs>

          {weatherList &&
            weatherList.map((element, idx3) => {
              return (
                <>
                  <TabPanel key={idx3} value={value} index={idx3}>
                    <div className='dayPaddle'>
                      {element.data &&
                        element.data.map((weather, idx4) => {
                          return (
                            <div key={idx4} className='onetimebar'>
                              <div className='weathercom'>{weather.temp}°</div>
                              <div className='weathercom'>
                                {(() => {
                                  switch (weather.weather) {
                                    case "Clouds":
                                      return <img src={wind} />;
                                    case "Clear":
                                      return <img src={clear} />;
                                    case "Rain":
                                      return <img src={rain} />;
                                    // case "lost":
                                    //   return <Lost handleClick={handleClick} />;
                                    default:
                                      return null;
                                  }
                                })()}
                              </div>
                              <div className='weathercom'>{weather.hour}</div>
                            </div>
                          );
                        })}
                    </div>
                  </TabPanel>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Weather;
