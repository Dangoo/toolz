import { luhn } from './luhn';
import { zeroPad } from './helpers';
import {
  TYPE_CODES,
} from './constants';

export default function (typeCode, locoClass, indentureNumber, country, owner) {
  this.typeCode = typeCode;
  this.locoClass = locoClass;
  this.indentureNumber = indentureNumber;
  this.owner = owner;
  [this.countryCode, this.countryShort] = country;

  this.clearingNumber = TYPE_CODES[typeCode];

  /* Rechenlogik */
  this.computeEdvNumber = () => {
    const locoNumber = this.locoClass + this.indentureNumber;
    const checkDigit = luhn.calculate(locoNumber);

    // Zusammenstellen der EDV-Loknummer
    return `${zeroPad(this.locoClass, 3)} ${zeroPad(this.indentureNumber, 3)}-${checkDigit}`;
  };

  this.computeUicNumber = () => {
    const UIClocoClass = `${this.clearingNumber}${zeroPad(this.locoClass, 3)}`;
    const UICindentureNumber = zeroPad(this.indentureNumber, 3);

    const UICcheckDigit = luhn.calculate([
      this.typeCode,
      this.countryCode,
      UIClocoClass,
      UICindentureNumber,
    ].join(''));

    const parts = [
      this.typeCode,
      this.countryCode,
      UIClocoClass,
      `${UICindentureNumber}-${UICcheckDigit}`,
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
