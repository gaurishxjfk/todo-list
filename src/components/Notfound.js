import React from 'react'
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

const Notfound = () => {

    const history = useHistory();
    
    return (
        <Div>
            Sorry! This page does not exists
            <Button onClick={e => history.push('/')}>GoBack</Button>
        </Div>
    )
}

export default Notfound
