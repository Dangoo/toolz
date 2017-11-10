/**
 * From https://gist.github.com/thensg/07bd82f73a1f784a35f0
 */

/* Luhn algorithm */
export const luhn = {
  /* Calculates the Luhn checksum */
  calculate(digits) {
    const sum = this.sum(digits, false);
    return (sum * 9) % 10;
  },

  /* Verifies if a number is a valid Luhn checksum */
  verify(digits) {
    const sum = this.sum(digits, true);
    return sum > 0 && sum % 10 === 0;
  },

  /**
   * Sum each digit from right to left, and double
   * every second digit. If the double exceeds 9,
   * then sum its digits (i.e., 654321 -> 358341
   * -> 24)
   */
  sum(digits, even) {
    let sum = 0;
    let digit = 0;
    let i = digits.length;

    while (i--) {
      digit = Number(digits[i]);
      sum += (even = !even) ? this.computed[digit] : digit;
    }

    return sum;
  },

  /* Create a precomputed list based on doubling
   *  each digit, as described in sum().
   */
  computed: [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
};

export const luhnTools = {
  /* Appends a Luhn checksum to the end of a number */
  createLuhnId(digits) {
    return digits + luhn.calculate(digits);
  },

  /* Checks if a credit card or IMEI number is valid */
  isLuhnId(digits) {
    return luhn.verify(digits);
  },
};
