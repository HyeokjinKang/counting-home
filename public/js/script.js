const homeDays = ["June 05, 2021 08:00:00", ""];
const schoolDays = ["May 23, 2021 18:00:00", "June 20, 2021 18:00:00", ""];

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
  let now = new Date();
  let nextHomedays = new Date(homeDays[0]);
  let nextSchooldays = new Date(schoolDays[0]);
  let goal;
  if (nextHomedays < nextSchooldays) {
    mainTitle.innerText = "집 가고 싶다";
    homeNoticeText.innerText = "귀가까지";
    goal = nextHomedays;
  } else {
    mainTitle.innerText = "학교 가기 싫다";
    homeNoticeText.innerText = "귀교까지";
    goal = nextSchooldays;
  }
  let remain = Math.floor((goal.getTime() - now.getTime()) / 1000);

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
  update();
  isDay();
};

const isDay = () => {
  let now = new Date();
  let hour = now.getHours();
  if (hour <= 7 || hour >= 19) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

initialize();
