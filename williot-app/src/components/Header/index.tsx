import { Button, AppBar, Box, Typography } from '@mui/material';
import { StyledMUIToolbar } from './styles';

export interface HeaderProps {
  counter: Array<Number>;
};

export const Header = ({counter} : HeaderProps):JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledMUIToolbar>
          <Button color="inherit">Williot Test</Button>
          <Typography sx={{ fontSize: 14 }} align="right" gutterBottom>
            Websocket connected for {counter[0]} minutes and {counter[1]} seconds
          </Typography>
        </StyledMUIToolbar>
      </AppBar>
    </Box>
  )
};