const update = () => {
  let d = new Date();
  let remain = 0;
  if(d.getHours() >= 9) {
    remain = ((5 - d.getDay()) * 24 * 60 * 60) + ((32 - d.getHours()) * 60 * 60) + ((59 - d.getMinutes()) * 60) + (60 - d.getSeconds());
  } else {
    remain = ((5 - d.getDay()) * 24 * 60 * 60) + ((8 - d.getHours()) * 60 * 60) + ((59 - d.getMinutes()) * 60) + (60 - d.getSeconds());
  }
  let day = Math.floor(remain / 86400);
  let hour = Math.floor((remain - day * 86400) / 3600);
  let min = Math.floor((remain - day * 86400 - hour * 3600) / 60);
  let sec = Math.floor(remain - day * 86400 - hour * 3600 - min * 60);
  dayText.innerText = day;
  hourText.innerText = hour;
  minText.innerText = min;
  secText.innerText = sec;
  console.log(remain);
};

setInterval(update, 1000);

update();
