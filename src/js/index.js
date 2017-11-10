import serializeForm from './serializeForm';
import renderOptions from './options';
import Engine from './engine';
import { zeroPad } from './helpers';
import {
  TYPE_LETTER_MAPPINGS,
  TYPE_LETTERS,
  ERRORS,
  CLASS_NUMBER_PATTERN,
  CLASS_NUMBER_PATTERN_DESCIPTION_DE,
  CLASS_NUMBER_REGEXP,
} from './constants';

function main() {
  /* App globals */
  let nodes;

  /* App Logic */

  function validateClassKey(key) {
    const isInvalid = typeof key !== 'undefined' && TYPE_LETTERS.indexOf(key) === -1;

    if (isInvalid) {
      throw ERRORS.TYPE_LETTER_INVALID;
    }

    return true;
  }

  function parseLocoClass(text) {
    const match = text.match(CLASS_NUMBER_REGEXP);
    const classKeyMatch = match[1];
    const classKey = (typeof classKeyMatch !== 'undefined') &&
      validateClassKey(classKeyMatch) ? TYPE_LETTER_MAPPINGS[classKeyMatch] : '';

    if (match !== null) {
      return {
        classKey,
        classNumber: match[2],
      };
    }

    throw ERRORS.CLASS_NUMBER_INVALID;
  }

  function normalizeLocoClass(locoClass) {
    const joinedClassParts = locoClass.classKey + locoClass.classNumber;
    const trimmedClassedParts = joinedClassParts.slice(0, 3);

    return zeroPad(trimmedClassedParts, 3);
  }

  /* DOM-Operationen */

  function getDomNodes(doc) {
    return {
      numberFormNode: doc.getElementById('number_form'),
      locoCountryNode: doc.querySelector('[name="loco_country"]'),
      locoOwnerNode: doc.querySelector('[name="loco_owner"]'),
      locoClassInputNode: doc.querySelector('[name="loco_class"]'),
      steamLocoOilInputNode: doc.querySelector('[name="steam-loco-oil"]'),
      edvNumberInputNode: doc.getElementById('edv_number'),
      uicNumberInputNode: doc.getElementById('uic_number'),
      page1Node: doc.getElementById('page1'),
      page2Node: doc.getElementById('page2'),
      backButtonNode: doc.getElementById('back_button'),
    };
  }

  function prevPage() {
    nodes.page1Node.style.display = 'block';
    nodes.page2Node.style.display = 'none';
  }

  function nextPage() {
    nodes.page1Node.style.display = 'none';
    nodes.page2Node.style.display = 'block';
  }

  function compute(e) {
    e.preventDefault();

    // var formData = new FormData(nodes.numberFormNode);
    // Add due to disabled leads to not submitting data
    // formData.append(nodes.locoCountryNode.name, nodes.locoCountryNode.value);
    // formData.append(nodes.locoOwnerNode.name, nodes.locoOwnerNode.value);

    const formDataObj = serializeForm(nodes.numberFormNode);

    const locoCountry = formDataObj.loco_country.split(',');
    const locoClass = parseLocoClass(formDataObj.loco_class);

    const current = new Engine(
      formDataObj['loco_class-code'],
      normalizeLocoClass(locoClass),
      formDataObj['loco_indenture-number'],
      locoCountry,
      formDataObj.loco_owner,
    );

    // generieren der EDV-Loknummer
    const EdvNumber = current.computeEdvNumber();
    // generieren der UIC-Loknummer
    const uicNumberParts = current.computeUicNumber().parts;

    const underlinedNode = document.createElement('u');
    underlinedNode.textContent = uicNumberParts[4];

    nodes.edvNumberInputNode.textContent = EdvNumber;

    nodes.uicNumberInputNode.innerHTML = '';
    nodes.uicNumberInputNode.append(`${[uicNumberParts[0], uicNumberParts[1], uicNumberParts[2], uicNumberParts[3]].join(' ')} `);
    nodes.uicNumberInputNode.append(underlinedNode);
    nodes.uicNumberInputNode.append(`-${uicNumberParts[5]}`);

    nextPage();
  }

  function update(e) {
    const formDataObj = serializeForm(nodes.numberFormNode);

    nodes.steamLocoOilInputNode.disabled = (
      formDataObj['loco_class-code'] !== '90'
    );
  }

  function init() {
    nodes = getDomNodes(document);

    nodes.locoClassInputNode.setAttribute('pattern', CLASS_NUMBER_PATTERN);
    nodes.locoClassInputNode.setAttribute('title', CLASS_NUMBER_PATTERN_DESCIPTION_DE);

    nodes.numberFormNode.addEventListener('submit', compute);
    nodes.numberFormNode.addEventListener('change', update);
    nodes.backButtonNode.addEventListener('click', prevPage);
  }

  init();

  import(/* webpackChunkName: "owners_de" */'../json/owners_de.json')
    .then((data) => {
      const sortedDate = data.sort((a, b) => a.label.localeCompare(b.label));

      nodes.locoOwnerNode.innerHTML = '';
      renderOptions(sortedDate, nodes.locoOwnerNode, 'DB');
      nodes.locoOwnerNode.removeAttribute('disabled');
    });
}

// Start app
main();
