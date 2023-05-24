import { useRouteError } from 'react-router-dom';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box display={'flex'} sx={{ justifyContent: 'center' }}>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/">To Home</Link>
      </div>
    </Box>
  );
}
