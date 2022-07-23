import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  return (
      <Alert variant="filled" style={props.style} severity= {props.type}>
        {props.message}
      </Alert>
  );
}