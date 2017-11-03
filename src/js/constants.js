/* Datenobjekt */
export const TYPE_CODES = {
  90: 0,			// Triebfahrzeuge besonderer Bauart (z.B. Dampflokomotiven, Hybridlokomotiven)
  91: 6,			// Elektrolokomotiven ab 100 km/h
  92: 1,			// Diesellokomotiven ab 100 km/h
  93: 5,			// Elektrotriebwagen für Hochgeschwindigkeitsverkehr
  94: 0,			// Elektrotriebwagen
  95: 0,			// Dieseltriebwagen
  96: 0,			// Beiwagen
  97: 8,			// Rangier-Elektrolokomotiven
  98: 3,			// Rangier-Diesellokomotiven (Vmax unter 100 km/h)
  99: 9,				// Bahndienst-Fahrzeuge
};

export const TYPE_LETTER_MAPPINGS = {
  E: 1,			// Elektrische Lokomotiven
  V: 2,			// Brennkraftlokomotiven
  K: 3,			// Kleinlokomotiven
  ET: 4,		// Elektrische Triebwagen ohne Akkumulatortriebwagen
  ETA: 5,		// Akkumulatortriebwagen
  VT: 6,		// Brennkrafttriebwagen
  ES: 8,		// Steuerwagen zu elektrischen Triebwagen
  ESA: 8,		// Steuerwagen zu elektrischen Akkumulatortriebwagen
  EB: 8,		// Bei- und Mittelwagen zu elektrischen Triebwagen
  VS: 9,		// Steuerwagen zu Brennkrafttriebwagen und Schienenbussen
  VB: 9,		// Beiwagen zu Brennkrafttriebwagen und Schienenbussen
  VM: 9,			// Mittelwagen zu Brennkrafttriebwagen und Schienenbussen
};

export const TYPE_LETTERS = Object.keys(TYPE_LETTER_MAPPINGS);

export const CLASS_NUMBER_PATTERN_DESCIPTION_DE = '1-3 Kennbuchstabe(n) (optional), gefolgt von 2-3 stelliger Baureihennummer';
export const CLASS_NUMBER_PATTERN = `^(?:(${TYPE_LETTERS.join('|')})[ ,-]?)?([0-9]{2,3})$`;
export const CLASS_NUMBER_REGEXP = new RegExp(CLASS_NUMBER_PATTERN);

/* Error objects */
export const ERRORS = {
  TYPE_LETTER_INVALID: new Error(`The provided type letter is not allowed. Should be one of: ${JSON.stringify(TYPE_LETTERS)}`),
  CLASS_NUMBER_INVALID: new Error(`The string does not match the required pattern: ${CLASS_NUMBER_PATTERN}`),
};
