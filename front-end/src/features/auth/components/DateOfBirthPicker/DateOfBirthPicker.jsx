import React from 'react';

const DateOfBirthPicker = ({ dob, setDob }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 40 }, (_, i) => 2007 - i);
  const days = [...Array(31)].map((_, i) => String(i + 1).padStart(2, '0'));

  return (
    <div style={{ margin: "18px 0 8px 0" }}>
      <label>What's your date of birth?</label>
      <div className="dob-row">
        <select 
          className="day" 
          value={dob.day} 
          onChange={e => setDob({ ...dob, day: e.target.value })}
        >
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        
        <select 
          className="month" 
          value={dob.month} 
          onChange={e => setDob({ ...dob, month: e.target.value })}
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        
        <select 
          className="year" 
          value={dob.year} 
          onChange={e => setDob({ ...dob, year: e.target.value })}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateOfBirthPicker;
