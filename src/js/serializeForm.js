// Read all values from elements of a name group inside given form node
export default function (formNode) {
  const fields = formNode.elements;
  const fieldsArray = [].slice.call(fields);

  const names = fieldsArray
    // Filter unchecked radios and inputs
    .filter(field => !((field.type === 'checkbox' || field.type === 'radio') && !field.checked))
    .reduce((lst, field) => {
      const { name } = field;

      if (name.length && lst.indexOf(name) === -1) {
        lst.push(name);
      }

      return lst;
    }, []);


  const data = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    data[name] = fields[name].value;
  }

  return data;
}
