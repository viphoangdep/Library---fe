// src/components/SingleSelect.jsx
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SingleSelect({ names, label, placeholder, width, onChange, value }) {
  return (
    <Autocomplete
      options={names.map((name) => ({ label: name }))}
      getOptionLabel={(option) => option.label || ''}
      value={names.find((name) => name === value) ? { label: value } : null}
      onChange={(event, newValue) => {
        onChange(event, newValue ? newValue.label : '');
      }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
      style={{ width: width }}
    />
  );
}

export default SingleSelect;
