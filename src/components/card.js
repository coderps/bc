import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const OutlinedCard = (props) => {
  const card = (
    <React.Fragment>
      <CardContent>
        {props.element}
      </CardContent>
      {props.additional}
    </React.Fragment>
  );

  return (
    <Box sx={{ width: props.width}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default OutlinedCard;