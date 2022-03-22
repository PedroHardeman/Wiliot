import { CardContent, Typography} from '@mui/material';
import { StyledDiv, StyledMUICard } from './styles';

export interface TemperatureCardProps {
  temperatures: Array<Number>;
};

export const TemperatureCard = ({temperatures} : TemperatureCardProps):JSX.Element => {
  return (
    <StyledDiv>
      <StyledMUICard style={{width: "25%"}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: 1
          </Typography>
          <Typography variant="body2">
            Temp: {temperatures[0]} C
          </Typography>
        </CardContent>
      </StyledMUICard>
      <StyledMUICard style={{width: "25%"}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: 2
          </Typography>
          <Typography variant="body2">
            Temp: {temperatures[1]} C
          </Typography>
        </CardContent>
      </StyledMUICard>
    </StyledDiv>
  )
};