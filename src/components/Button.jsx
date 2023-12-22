
// eslint-disable-next-line react/prop-types
const Button = ({ onClick, children, color = '#635FC7', disabled = false }) => {
  const style = {
    backgroundColor: color,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s ease',
  };

  const handleMouseDown = (e) => {
    e.target.style.opacity = '0.7';
  };

  const handleMouseUp = (e) => {
    e.target.style.opacity = '1';
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.1)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  return (
    <button 
      style={style} 
      onClick={onClick} 
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
