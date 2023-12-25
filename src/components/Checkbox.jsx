import { useState } from 'react';
import './css/Checkbox.css'; 

// eslint-disable-next-line react/prop-types
const Checkbox = ({children, initialChecked = false, onCheckboxChange}) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    onCheckboxChange(event.target.checked);
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
