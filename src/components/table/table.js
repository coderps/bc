import React from "react";
import axios from 'axios';
import HeaderRow from "./headerRow";
import DataRows from "./dataRows";
import TotalDayValues from "./totalDayValues";

function getCurrentWeekOfYear() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now - startOfYear;
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week
  const week = Math.ceil(diff / oneWeek);
  
  return week + 1;
}

function getDatesInWeek(year, week) {
  const startDate = new Date(year, 0, 1); // month is zero-based in JavaScript
  const firstDay = startDate.getDay();
  const offset = (week - 1) * 7 - firstDay + 1;
  const today = new Date();
  const oneDayAgo = new Date();
  const twoDaysAgo = new Date();

  oneDayAgo.setDate(today.getDate() - 1);
  twoDaysAgo.setDate(today.getDate() - 2);

  const isValidForEdit = (date) => {
    return (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) || 
    (date.getFullYear() === oneDayAgo.getFullYear() && date.getMonth() === oneDayAgo.getMonth() && date.getDate() === oneDayAgo.getDate()) || 
    (date.getFullYear() === twoDaysAgo.getFullYear() && date.getMonth() === twoDaysAgo.getMonth() && date.getDate() === twoDaysAgo.getDate());
  }

  const completeDate = (currentDate) => {
    // Extract the year, month, and day
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    var day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    return year + '-' + month + '-' + day;
  }
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(year, 0, offset + i + 1);
    const validDateForEdit = isValidForEdit(date);
    const formattedDate = completeDate(date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    dates.push([dayOfWeek, dayOfMonth, validDateForEdit, formattedDate]);
  }

  return dates;
}

const Table = (props) => {
    const [week, setWeek] = React.useState(getCurrentWeekOfYear());
    const [ready, setReady] = React.useState(false);
    const [data, setData] = React.useState({total: [0, 0], total_day: [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]]});
    const [editMode, setEditMode] = React.useState(false);
    const [postData, setPostData] = React.useState({"airin": [], "prax": []});
    const dates = getDatesInWeek((new Date()).getFullYear(), week-1);

    React.useEffect(() => {
        if (!ready) {
            console.log('updating table...');
            axios.get('https://praxtheslayer.pythonanywhere.com/api/stuff-records?where='+props.page+'&week='+week)
            .then(response => {
                console.log('data:', response.data);
                setData(response.data);
                setReady(true);
            })
            .catch(error => console.log(error));
        }
    }, [props.page, ready, week]);

    const saveValues = (user, val) => {
      var d = postData;
      var found = false;
      for (let idx = 0; idx < d[user].length; ++idx) {
        if (d[user][idx][0] === val[0] && d[user][idx][1] === val[1]) {
          d[user][idx] = val;
          found = true;
        }
      }
      if (!found) {
        d[user] = [...d[user], val];
      }
      setPostData(d);
    }

    const sendPostRequest = () => {
      if (postData["airin"].length || postData["prax"].length) {
        console.log('sending post request...', postData);
        axios.post('https://praxtheslayer.pythonanywhere.com/api/store-records', postData)
        .then(response => {
          console.log('response:', response.data);
          setReady(false);
          setPostData({"airin": [], "prax": []});
        })
        .catch(error => {
          console.log(error);
          setPostData({"airin": [], "prax": []});
        });
      }
      setEditMode(!editMode);
    }

    const cancelFunc = () => {
      setEditMode(false);
      setPostData({"airin": [], "prax": []});
    }

    return <table style={{width: '100%', color: 'white', textAlign: 'center', letterSpacing: 1}}>
        <thead>
            <HeaderRow 
                dates={dates}
                week={week}
                onReduce={() => {
                    setWeek(week-1);
                    setReady(false);
                }} 
                onIncrease={() => {
                    setWeek(week+1);
                    setReady(false);
                }}
                editMode={editMode}
                onEdit={sendPostRequest}
                cancelFunc={cancelFunc}
            />
            <DataRows data={data} editMode={editMode} dates={dates} saveValsFunc={saveValues}/>
            <TotalDayValues vals={data.total_day} val1={data.total[0]} val2={data.total[1]}/>
        </thead>
    </table>
}

export default Table;