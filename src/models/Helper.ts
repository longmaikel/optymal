export const getNextLetter: string = (key: string) => {
  if (key === "Z" || key === "z") {
    return (
      String.fromCharCode(key.charCodeAt() - 25) +
      String.fromCharCode(key.charCodeAt() - 25)
    ); // AA or aa
  } else {
    const lastChar = key.slice(-1);
    const sub = key.slice(0, -1);
    if (lastChar === "Z" || lastChar === "z") {
      // If a string of length > 1 ends in Z/z,
      // increment the string (excluding the last Z/z) recursively,
      // and append A/a (depending on casing) to it
      return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
    } else {
      // (take till last char) append with (increment last char)
      return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
    }
  }
  return key;
};
