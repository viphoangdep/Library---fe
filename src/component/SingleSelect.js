import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SingleSelect({ names, label, placeholder, width, onChange, onInputChange, value }) {
  return (
    <Autocomplete
      freeSolo // Cho phép nhập liệu tự do mà không cần chọn từ danh sách
      options={names}
      getOptionLabel={(option) => option || ''}
      onChange={onChange}
      onInputChange={onInputChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          sx={{ width }}
        />
      )}
    />
  );
}

export default SingleSelect;
