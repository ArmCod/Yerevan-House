export function addDots(param) {
  const numStr = typeof param == "string" ? param : param.toString();
  let result = "";
  let count = 0;
  for (let i = numStr.length - 1; i >= 0; i--) {
    result = numStr[i] + result;
    if (count === 2 && i !== 0) {
      result = "." + result;
      count = 0;
    } else {
      count++;
    }
  }
  return result;
}
