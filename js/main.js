function main() {
	/* Datenobjekt */
	var TYPE_CODES = {
		90: 0,			// Triebfahrzeuge besonderer Bauart (z.B. Dampflokomotiven, Hybridlokomotiven)
		91: 6,			// Elektrolokomotiven ab 100 km/h
		92: 1,			// Diesellokomotiven ab 100 km/h
		93: 5,			// Elektrotriebwagen für Hochgeschwindigkeitsverkehr
		94: 0,			// Elektrotriebwagen
		95: 0,			// Dieseltriebwagen
		96: 0,			// Beiwagen
		97: 8,			// Rangier-Elektrolokomotiven
		98: 3,			// Rangier-Diesellokomotiven (Vmax unter 100 km/h)
		99: 9				// Bahndienst-Fahrzeuge
	};

	var TYPE_LETTER_MAPPINGS = {
		'E': 1,			// Elektrische Lokomotiven
		'V': 2,			// Brennkraftlokomotiven
		'K': 3,			// Kleinlokomotiven
		'ET': 4,		// Elektrische Triebwagen ohne Akkumulatortriebwagen
		'ETA': 5,		// Akkumulatortriebwagen
		'VT': 6,		// Brennkrafttriebwagen
		'ES': 8,		// Steuerwagen zu elektrischen Triebwagen
		'ESA': 8,		// Steuerwagen zu elektrischen Akkumulatortriebwagen
		'EB': 8,		// Bei- und Mittelwagen zu elektrischen Triebwagen
		'VS': 9,		// Steuerwagen zu Brennkrafttriebwagen und Schienenbussen
		'VB': 9,		// Beiwagen zu Brennkrafttriebwagen und Schienenbussen
		'VM': 9			// Mittelwagen zu Brennkrafttriebwagen und Schienenbussen
	}

	var TYPE_LETTERS = Object.keys(TYPE_LETTER_MAPPINGS);

	var CLASS_NUMBER_PATTERN_DESCIPTION_DE = '1-3 Kennbuchstabe(n) (optional), gefolgt von 2-3 stelliger Baureihennummer';
	var CLASS_NUMBER_PATTERN = '^(?:(' + TYPE_LETTERS.join('|') + ')[ ,-]?)?([0-9]{2,3})$'
	var CLASS_NUMBER_REGEXP = new RegExp(CLASS_NUMBER_PATTERN);

	/* Error objects */
	var ERRORS = {
		TYPE_LETTER_INVALID: new Error('The provided type letter is not allowed. Should be one of: ' + JSON.stringify(TYPE_LETTERS)),
		CLASS_NUMBER_INVALID: new Error('The string does not match the required pattern: ' + CLASS_NUMBER_PATTERN)
	};

	/* App globals */
	var nodes;

	/* App Logic */
	function engine(typeCode, locoClass, indentureNumber, countryCode, owner) {
		this.typeCode = typeCode;
		this.locoClass = locoClass;
		this.indentureNumber = indentureNumber;
		this.countryCode = countryCode;
		this.owner = owner;

		this.clearingNumber = TYPE_CODES[typeCode];

		/* Rechenlogik */
		this.computeEdvNumber = function () {
			var locoNumber = this.locoClass + this.indentureNumber;
			var checkDigit = luhn.calculate(locoNumber);

			// Zusammenstellen der EDV-Loknummer
			return zeroPad(this.locoClass, 3) + ' ' + zeroPad(this.indentureNumber, 3) + '-' + checkDigit;
		};

		this.computeUicNumber = function () {
			return this.typeCode + ' ' + this.countryCode + ' ' + this.clearingNumber + this.computeEdvNumber() + ' ' + this.owner;
		};
	}

	/* Luhn algorithm */
	var luhn = {
		/* Calculates the Luhn checksum */
		calculate: function (digits) {
			var sum = this.sum(digits, false);
			return (sum * 9) % 10;
		},

		/* Verifies if a number is a valid Luhn checksum */
		verify: function (digits) {
			var sum = this.sum(digits, true);
			return sum > 0 && sum % 10 === 0;
		},

		/* Sum each digit from right to left, and double
			 every second digit. If the double exceeds 9,
			 then sum its digits (i.e., 654321 -> 358341
			 -> 24) */
		sum: function (digits, even) {
			var sum = 0,
				digit = 0,
				i = digits.length;

			while (i--) {
				digit = Number(digits[i]);
				sum += (even = !even) ? this.computed[digit] : digit;
			}

			return sum;
		},

		/* Create a precomputed list based on doubling
			 each digit, as described in sum(). */
		computed: [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
	};

	var luhnTools = {
		/* Appends a Luhn checksum to the end of a number */
		createLuhnId: function (digits) {
			return digits + luhn.calculate(digits);
		},

		/* Checks if a credit card or IMEI number is valid */
		isLuhnId: function (digits) {
			return luhn.verify(digits);
		}
	};

	function validateClassKey(key) {
		var isInvalid = typeof key !== 'undefined' && TYPE_LETTERS.indexOf(key) === -1;

		if (isInvalid) {
			throw ERRORS.TYPE_LETTER_INVALID;
			return false;
		}
		
		return true;
	}

	function parseLocoClass(text) {
		var match = text.match(CLASS_NUMBER_REGEXP);
		var classKeyMatch = match[1];
		var classKey = validateClassKey(classKeyMatch) &&
			TYPE_LETTER_MAPPINGS[classKeyMatch] || '';


		if (match !== null) {
			return {
				classKey: classKey,
				classNumber: match[2]
			}
		}

		throw ERRORS.CLASS_NUMBER_INVALID;
	}

	function normalizeLocoClass(locoClass) {
		var joinedClassParts = locoClass.classKey + locoClass.classNumber;
		var trimmedClassedParts = joinedClassParts.slice(0, 3);

		return zeroPad(trimmedClassedParts, 3);
	}


	function zeroPad(text, digits) {
		return (Array(digits + 1).join("0") + text).slice(-digits);
	}

	/* DOM-Operationen */

	function getDomNodes(doc) {
		return {
			numberFormNode: doc.getElementById('number_form'),
			locoClassInputNode: doc.getElementById('loco_class'),
			indentureNumberInputNode: doc.getElementById('indenture_number'),
			edvNumberInputNode: doc.getElementById('edv_number'),
			uicNumberInputNode: doc.getElementById('uic_number'),
			page1Node: doc.getElementById('page1'),
			page2Node: doc.getElementById('page2'),
			computeButtonNode: doc.getElementById('compute'),
			backButtonNode: doc.getElementById('back_button')
		}
	}

	function compute(e) {
		e.preventDefault();

		var locoClass = parseLocoClass(nodes.locoClassInputNode.value);
		var indentureNumber = nodes.indentureNumberInputNode.value;
		var typeCode = parseInt(
			document.querySelector(
				'input[name="bauartcode"][type="radio"]:checked'
			).value
		);

		var current = new engine(typeCode, normalizeLocoClass(locoClass), indentureNumber, '80', 'D-DB');

		// generieren der EDV-Loknummer
		var EdvNumber = current.computeEdvNumber();
		// generieren der UIC-Loknummer
		var UicNumber = current.computeUicNumber();

		nodes.edvNumberInputNode.textContent = EdvNumber;
		nodes.uicNumberInputNode.textContent = UicNumber;

		nextPage();
	}

	function prevPage() {
		nodes.page1Node.style.display = 'block';
		nodes.page2Node.style.display = 'none';
	}

	function nextPage() {
		nodes.page1Node.style.display = 'none';
		nodes.page2Node.style.display = 'block';
	}

	function init() {
		nodes = getDomNodes(document);
		
		nodes.locoClassInputNode.setAttribute('pattern', CLASS_NUMBER_PATTERN);
		nodes.locoClassInputNode.setAttribute('title', CLASS_NUMBER_PATTERN_DESCIPTION_DE);

		nodes.numberFormNode.addEventListener('submit', compute);
		nodes.backButtonNode.addEventListener('click', prevPage);
	}

	init();
}

// Start app
main();


