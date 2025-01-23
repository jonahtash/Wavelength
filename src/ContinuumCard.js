import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

class ContinuumCard extends Component {
  render() {
    return (
        <Card sx={{ width: 275 }}>
          <CardContent style={{padding: "0 0 0 0"}}>
            <Stack direction={'row'}>
              <Box flex={1} sx={{bgcolor: 'lightgreen'}}>
                <Typography variant="h5" component="div">
                  {this.props.left}
                </Typography>
                <ArrowBackIcon />
              </Box>
              <Box flex={1} sx={{bgcolor: 'orange'}}>
                <Typography variant="h5" component="div">
                    {this.props.right}
                  </Typography>
                  <ArrowForwardIcon />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      );
  }
}

export default ContinuumCard;
