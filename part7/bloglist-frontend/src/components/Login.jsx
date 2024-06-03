import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material'

const Login = ({
  handleSubmit,
  username,
  handleNameChange,
  password,
  handlePasswordChange,
}) => (
  <Container maxWidth="sm">
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Please, Login...
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Username"
            value={username}
            onChange={handleNameChange}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Paper>
  </Container>
)

export default Login
