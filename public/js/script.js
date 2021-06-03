let goal = -1;
let isHome = true;

const isMobile = () => {
  let userAgent = navigator.userAgent;
  if (
    userAgent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
    ) != null ||
    userAgent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return true;
  } else {
    return false;
  }
};

const update = () => {
  if (goal == -1) return;
  if (!goal) {
    mainTitle.innerText = "학교 가기 싫다";
    homeNoticeText.innerText = "";
    homeRemainText.innerText = "귀가완료!";
    return;
  }
  let now = new Date();
  if (isHome) {
    mainTitle.innerText = "집 가고 싶다";
    homeNoticeText.innerText = "귀가까지";
  } else {
    mainTitle.innerText = "학교 가기 싫다";
    homeNoticeText.innerText = "귀교까지";
  }
  let remain = Math.floor((goal.getTime() - now.getTime()) / 1000);
  if (remain <= 0) {
    goal = -1;
    updateDate();
    return;
  }

  let day = Math.floor(remain / 86400);
  remain -= day * 86400;
  let hour = Math.floor(remain / 3600);
  remain -= hour * 3600;
  let min = Math.floor(remain / 60);
  remain -= min * 60;
  let sec = remain;

  dayText.innerText = day;
  hourText.innerText = `${hour}`.padStart(2, "0");
  minText.innerText = `${min}`.padStart(2, "0");
  secText.innerText = `${sec}`.padStart(2, "0");
};

const initialize = () => {
  if (isMobile()) {
    mainTitle.style.fontSize = "13vw";
    homeRemainText.style.fontSize = "9vw";
    homeNoticeText.style.fontSize = "5vw";
  }
  setInterval(update, 1000);
  setInterval(isDay, 60000);
  updateDate();
  update();
  isDay();
};

const isDay = () => {
  let now = new Date();
  fetch("https://api.sunrise-sunset.org/json?lat=37.566215&lng=126.978422")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((response) => {
      sunrise = parseDate(response.results.sunrise);
      sunset = parseDate(response.results.sunset);

      if (now <= sunrise || now >= sunset) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
};

const updateDate = () => {
  fetch("https://api.coupy.dev/getSchedule/comming")
    .then((res) => res.json())
    .then((json) => {
      isHome = json.type == "Home";
      if (new Date().getMonth() == 5 && new Date().getDate() == 4) {
        goal = new Date("Fri Jun 04 2021 17:00:00 GMT+0900");
      } else if (new Date().getMonth() == 5 && new Date().getDate() == 5) {
        goal = false;
      } else {
        goal = new Date(json.date);
      }
    });
};

const parseDate = (tmp) => {
  let result = new Date();

  tmp = tmp.split(":");
  if (tmp[2].endsWith("PM")) {
    tmp[0] = parseInt(tmp[0]) + 21;
  } else {
    tmp[0] = parseInt(tmp[0]) + 9;
  }

  result.setHours(tmp[0] % 24);
  result.setMinutes(parseInt(tmp[1]));
  result.setSeconds(parseInt(tmp[2].slice(0, -3)));

  return result;
};

initialize();
