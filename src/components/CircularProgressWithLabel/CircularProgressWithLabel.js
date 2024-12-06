import { Box, CircularProgress } from '@mui/material';
import { Title } from '../Text/Text';
export const CircularProgressWithLabel = (props) => {
  const color =
    props.value > 90
      ? '#D32F2F'
      : props.value > 70
        ? '#F57C00'
        : props.value > 50
          ? '#FBC02D'
          : '#388E3C';
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <CircularProgress
        variant="determinate"
        size={200}
        sx={{ color: color }}
        {...props}
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
        <Title style={{ color: color }}>{`${Math.round(props.value)}%`}</Title>
      </Box>
    </Box>
  );
};
