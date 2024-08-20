

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ label }) {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { 
          width: '100%', // Adjust width as needed
          marginBottom: '3px',
        },
        m: 2, // Optional: margin for spacing
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label} // Sử dụng props để thay đổi tên của TextField
        variant="outlined"
        sx={{
          height: '60px', // Adjust height to your preference
          '& .MuiInputBase-root': {
            height: '100%', // Ensure the input area takes the full height
          },
          '& .MuiInputLabel-root': {
            height: '100%', // Ensure the label area matches the height
            top: '0', // Adjust label position if needed
          },
          '& .MuiOutlinedInput-root': {
            height: '100%', // Ensure the outlined input area matches the height
          }
        }}
      />
    </Box>
  );
}


// export default function BasicTextFields2() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
      
//       <TextField id="filled-basic" label="Filled" variant="filled" />
      
//     </Box>
//   );

// }
{/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}