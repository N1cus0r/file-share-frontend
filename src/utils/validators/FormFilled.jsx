const FormFilled = (...fields) => {
  return [...fields].every((x) => (x ? true : false));
};

export default FormFilled;
