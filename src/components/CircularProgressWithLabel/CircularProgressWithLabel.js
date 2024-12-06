import { Box, CircularProgress } from '@mui/material';
import { Title } from '../Text/Text';
import './CircularProgressWithLabel.css';

export const CircularProgressWithLabel = (props) => {
  const color =
    props.value > 90
      ? '#D32F2F'
      : props.value > 70
        ? '#F57C00'
        : props.value > 50
          ? '#FBC02D'
          : '#388E3C';
  const bg =
    props.value > 90
      ? '#FFEBEE'
      : props.value > 70
        ? '#FFF3E0'
        : props.value > 50
          ? '#FFFDE7'
          : '#E8F5E9';
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <CircularProgress
        variant="determinate"
        className="foreground"
        size={200}
        sx={{
          color: color,
        }}
        {...props}
      />
      <CircularProgress
        variant="determinate"
        className="background"
        size={200}
        sx={{
          color: bg,
        }}
        value={100}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title style={{ color: color }}>
          {Math.round(props.value) ? `${Math.round(props.value)}%` : '-'}
        </Title>
      </Box>
    </Box>
  );
};
