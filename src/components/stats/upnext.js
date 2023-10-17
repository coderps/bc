import React from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'where', headerName: 'Where', width: 200 },
  { field: 'name', headerName: 'What', width: 200 },
  { field: 'points', headerName: 'Points', type: 'number', width: 150},
  { field: 'since_days', headerName: 'Days Passed', type: 'number', width: 150},
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const UpNext = (props) => {
  const [ready, setReady] = React.useState(false);
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
      if (!ready) {
          const url = 'https://praxtheslayer.pythonanywhere.com/api/up-next';
          console.log('updating table with url: ', url);
          axios.get(url)
          .then(response => {
              console.log('data:', response.data);
              setData(response.data);
              setReady(true);
          })
          .catch(error => console.log(error));
      }
  }, [ready]);

  return <div style={{width: 800}}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 15, 20, 30]}
      checkboxSelection
      sx={{color: 'white'}}
    />
  </div>
}

export default UpNext;