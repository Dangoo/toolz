import { luhn } from './luhn';
import { zeroPad } from './helpers';
import {
  TYPE_CODES,
} from './constants';

export default function (typeCode, locoClass, indentureNumber, country, owner) {
  this.typeCode = typeCode;
  this.locoClass = locoClass;
  this.indentureNumber = indentureNumber;
  this.countryCode = country[0];
  this.countryShort = country[1];
  this.owner = owner;

  this.clearingNumber = TYPE_CODES[typeCode];

  /* Rechenlogik */
  this.computeEdvNumber = function () {
    const locoNumber = this.locoClass + this.indentureNumber;
    const checkDigit = luhn.calculate(locoNumber);

    // Zusammenstellen der EDV-Loknummer
    return `${zeroPad(this.locoClass, 3)} ${zeroPad(this.indentureNumber, 3)}-${checkDigit}`;
  };

  this.computeUicNumber = function () {
    const parts = [
      this.typeCode,
      this.countryCode,
      this.clearingNumber + this.computeEdvNumber(),
      this.countryShort,
      this.owner,
    ];
    const spacedString = parts.join(' ');
    const pos = spacedString.lastIndexOf(' ');

    return {
      parts,
      string: `${spacedString.substring(0, pos)}-${spacedString.substring(pos + 1)}`,
    };
  };
}
