
// eslint-disable-next-line react/prop-types
const Button = ({ onClick, children, textColor = 'white', color = '#635FC7', disabled = false , type="button", className}) => {
  const style = {
    backgroundColor: disabled ? 'rgba(99, 95, 199, 0.10)' : color,
    color: disabled ? '#635FC7' : textColor,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
  };

  const handleMouseDown = (e) => {
    e.target.style.opacity = '0.7';
  };

  const handleMouseUp = (e) => {
    e.target.style.opacity = '1';
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.03)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  return (
    <button 
    className={className}
      style={style} 
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
