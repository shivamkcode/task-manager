
// eslint-disable-next-line react/prop-types
const Input = ({ type = 'text',autoComplete ='off', value, onChange, placeholder, required=false }) => {
  const style = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(0,0,0,0.5)',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  return (
    <input 
      style={style} 
      type={type} 
      value={value} 
      autoComplete={autoComplete}
      onChange={onChange} 
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
