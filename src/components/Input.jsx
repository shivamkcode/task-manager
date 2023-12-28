
// eslint-disable-next-line react/prop-types
const Input = ({ type = 'text',autoComplete ='off', value, onChange, placeholder, capital = true }) => {
  const style = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(0,0,0,0.5)',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

  return (
    <input 
      style={style} 
      type={type} 
      // eslint-disable-next-line react/prop-types
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
