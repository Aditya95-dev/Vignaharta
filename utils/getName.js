exports.getName = (first_name, middle_name, last_name, title) => {
  let name = '';

  if (title) name = title;
  if (first_name) name = name + ' ' + first_name;
  if (middle_name) name = name + ' ' + middle_name;
  if (last_name) name = name + ' ' + last_name;

  return name.trim();
};
