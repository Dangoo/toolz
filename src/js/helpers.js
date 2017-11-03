export function zeroPad(text, digits) {
  return (Array(digits + 1).join('0') + text).slice(-digits);
}

