let timer = null;

function timeLimit (fun, time = 500) {
  if (timer) return;
  fun();
  timer = setTimeout(() => {
    timer = null;
  }, time);
}

export default timeLimit;
