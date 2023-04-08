import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

const theme = createTheme();

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        variant="outlined"
        sx={{ px: "68px", py: "84px", width: "688px", mt: 12, mx: "auto" }}
      >
        <Typography component="h1" variant="h4">
          Reset your password
        </Typography>
        <Stack direction="row" spacing={1} mt={"20px"}>
          <Typography component="body2" variant="span">
            Enter the email address associated with your account, and we'll send
            you a link to reset your password.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb:2, p: 1 }}
          >
            Continue
          </Button>
          <Button fullWidth variant="outlined" sx={{ p: 1 }} href="/sign-in">
            Return to sign in
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
