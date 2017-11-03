function renderOption(value, selected, text) {
  const option = document.createElement('option');
  option.setAttribute('value', value);
  option.innerText = text;
  if (selected) option.setAttribute('selected', true);

  return option;
}

export default function (lst, parentNode, selectedValue) {
  const splitted = lst.reduce((iterator, item) => {
    const firstLetter = item.label.substr(0, 1).toUpperCase();
    const selected = item.value === selectedValue;

    Array.isArray(iterator[firstLetter]) ? null : iterator[firstLetter] = [];

    iterator[firstLetter].push(renderOption(item.value, selected, item.label));

    return iterator;
  }, {});

  Object.keys(splitted).forEach((key) => {
    const optGroup = document.createElement('optgroup');
    optGroup.setAttribute('label', key);

    splitted[key].forEach((option) => {
      optGroup.appendChild(option);
    });

    parentNode.appendChild(optGroup);
  });
}

