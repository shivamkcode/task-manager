/* eslint-disable react/prop-types */
const Input = ({
  type = "text",
  autoComplete = "off",
  value,
  onChange,
  placeholder,
  capital = true,
  className, 
  onBlur,
}) => {
  const style = {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    border: "1px solid #828fa3",
    borderRadius: "4px",
    color: "var(--text-color)",
    boxSizing: "border-box",
  };

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  return (
    <input
      className={className}
      onBlur={onBlur}
      style={style}
      type={type}
      value={capital ? capitalize(value) : value}
      autoComplete={autoComplete}
      autoCapitalize="on"
      autoCorrect="on"
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
