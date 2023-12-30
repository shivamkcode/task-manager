import './css/Alert.css'
import Check from '../assets/icon-check.svg'
import Cross from '../assets/icon-cross.svg'
// eslint-disable-next-line react/prop-types
const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      <img className='alert-icon' src={type === 'success' ? Check : Cross} alt="" />{message}
    </div>
  );
};

export default Alert;
