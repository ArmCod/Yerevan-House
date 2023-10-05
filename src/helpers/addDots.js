export function addDots(param) {
  const numStr = typeof param == "string" ? param : param.toString(); // Convert the number to a string

  let result = "";
  let count = 0;

  // Iterate over each character in the string from right to left
  for (let i = numStr.length - 1; i >= 0; i--) {
    result = numStr[i] + result; // Append the current character to the result

    // Add a dot after every three characters, except for the last group
    if (count === 2 && i !== 0) {
      result = "." + result;
      count = 0;
    } else {
      count++;
    }
  }

  return result;
}
