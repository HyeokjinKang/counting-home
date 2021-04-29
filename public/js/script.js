const homeDays = ["May 04, 2021 08:00:00", "June 05, 2020 08:00:00", ""];
const schoolDays = ["May 23, 2021 18:00:00", "June 20, 2020 18:00:00", ""];

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
  let nextHomeday = new Date(homeDays[0]);
  let nextSchoolday = new Date(schoolDays[0]);
  if (nextHomeday.getTime() < nextSchoolday.getTime()) {
    let remain = Math.floor((nextHomeday.getTime() - now.getTime()) / 1000);

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
  } else {
    homeNoticeText.textContent = "짜잔";
    homeRemainText.style.fontWeight = "900";
    homeRemainText.textContent = "귀가완료!";
  }
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
