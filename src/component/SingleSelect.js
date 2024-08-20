// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// export default function SingleSelect() {
//   const [personName, setPersonName] = useState(null);

//   const handleChange = (event, newValue) => {
//     setPersonName(newValue);
//   };

//   return (
//     <div>
//       <Autocomplete
//         id="single-outlined"
//         options={names}
//         getOptionLabel={(option) => option}
//         value={personName}
//         onChange={handleChange}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Name"
//             placeholder="Type to search and select a name"
//           />
//         )}
//         sx={{ m: 1, width: 350 }}
//       />
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// export default function SingleSelect({ names, label, placeholder,width }) {
//   const [personName, setPersonName] = useState(null);

//   const handleChange = (event, newValue) => {
//     setPersonName(newValue);
//   };

//   return (
//     <div>
//       <Autocomplete
//         id="single-outlined"
//         options={names}
//         getOptionLabel={(option) => option}
//         value={personName}
//         onChange={handleChange}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={label}
//             placeholder={placeholder}
//           />
//         )}
//         sx={{ m: 1, width: {width} }}
//       />
//     </div>
//   );
// }

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SingleSelect({ names, label, placeholder, width, onChange, value }) {
  return (
    <Autocomplete
      id="single-outlined"
      options={names}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      onChange={onChange}
      value={value} // Nếu cần thiết để làm giá trị được chọn
      sx={{ m: 1,width: width }}
    />
  );
}
