import React from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { person1, person2 } from "../../api/getWinningPerson";
import CheckIcon from '@mui/icons-material/Check';
import { ClipLoader } from "react-spinners";

const formattedToday = () => {
  // Extract the year, month, and day
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  var day = String(today.getDate()).padStart(2, '0');

  // Format the date as "YYYY-MM-DD"
  return year + '-' + month + '-' + day;
}

const RenderButton = (props) => {
  const person = props.person === "airin" ? person1 : person2;
  const [content, setContent] = React.useState('done bro');

  const saveEntry = (user, id) => {
    setContent(<ClipLoader
      color={'white'}
      loading={true}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />);
    var postData = {airin: [], prax: []};
    postData[user] = [[id, formattedToday(), 1]];
    console.log('sending post request...', postData);
    axios.post('https://praxtheslayer.pythonanywhere.com/api/store-records', postData)
    .then(response => {
      console.log('response:', response.data);
      setContent(<CheckIcon />);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return <Button 
    variant="contained"
    sx ={{backgroundColor: person.color, width: 100}}
    onClick={() => saveEntry(props.person, props.params.row.id)}
  >{content}</Button>
}

const columns = [
  { field: 'where', width: 200, renderHeader: () => <b>Where</b>},
  { field: 'name', renderHeader: () => <b>What</b>, width: 200 },
  { field: 'points', renderHeader: () => <b>Points</b>, width: 150, type: 'number'},
  { field: 'since_days', renderHeader: () => <b>Days Passed</b>, width: 150, type: 'number'},
  { field: 'frequency', renderHeader: () => <b>Frequency (days)</b>, width: 150, type: 'number'},
  { field: 'airin', width: 200, headerAlign: 'right', type: 'number',
    renderHeader: () => <span style={{leftMargin: '20px'}}><b>Plassed by Airin?</b></span>, 
    renderCell: (params) => <RenderButton params={params} person="airin" />,
  },
  { field: 'prax', width: 170,
    renderHeader: () => <b>Plassed by Prax?</b>, 
    renderCell: (params) => <RenderButton params={params} person="prax" />,
  },
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

  return <div style={{width: 1300}}>
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