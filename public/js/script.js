const isMobile = () => {
  let userAgent = navigator.userAgent;
  if (userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
    return true;
  } else {
    return false;
  }
};

const update = () => {
  let d = new Date();
  let remain = 0;
  if (d.getDay() <= 5) {
    if (d.getHours() >= 9) {
      remain = ((5 - d.getDay()) * 24 * 60 * 60) + ((32 - d.getHours()) * 60 * 60) + ((59 - d.getMinutes()) * 60) + (60 - d.getSeconds());
    } else {
      remain = ((5 - d.getDay()) * 24 * 60 * 60) + ((10 - d.getHours()) * 60 * 60) + ((59 - d.getMinutes()) * 60) + (60 - d.getSeconds());
    }
    let day = Math.floor(remain / 86400);
    let hour = Math.floor((remain - day * 86400) / 3600);
    let min = Math.floor((remain - day * 86400 - hour * 3600) / 60);
    let sec = Math.floor(remain - day * 86400 - hour * 3600 - min * 60);
    dayText.innerText = day;
    hourText.innerText = `${hour}`.padStart(2, '0');
    minText.innerText = `${min}`.padStart(2, '0');
    secText.innerText = `${sec}`.padStart(2, '0');
  } else {
    homeNoticeText.textContent = '짜잔';
    homeRemainText.style.fontWeight = '900';
    homeRemainText.textContent = '귀가완료!';
  }
};

const initialize = () => {
  if (isMobile()) {
    mainTitle.style.fontSize = '13vw';
    homeRemainText.style.fontSize = '9vw';
    homeNoticeText.style.fontSize = '5vw';
  }
  setInterval(update, 1000);
  setInterval(isDay, 60000);
  update();
  isDay();
};

const isDay = () => {
  let d = new Date();
  let hour = parseInt(d.getHours());
  if(hour <= 7 || hour >= 19) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

initialize();
