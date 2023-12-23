import { useState } from 'react';
import './css/Checkbox.css'; 

// eslint-disable-next-line react/prop-types
const Checkbox = ({children}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      {children}
    </label>
  );
};

export default Checkbox;
