import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import { Box, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { receivedLogin, showAlert, setShowAlert } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [textSize, setTextSize] = useState(16);

  useEffect(() => {
    const recoverData = () => {
      setEmail(localStorage.getItem("keyEmail"));
      setPassword(localStorage.getItem("keyPassword"));
      console.log("Recuperado do storage: ", email, password);
    };
    recoverData();
  }, []);

  useEffect(() => {
    loginAlert(showAlert);
    return () => setShowAlert(false);
  }, [showAlert]);

  const handleLogin = async () => {
    receivedLogin(email, password, checked);
    loginAlert(showAlert);
  };

  const loginAlert = (showAlert) => {
    if (showAlert) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login ou senha inválidos!",
        footer: "Verifique seus dados e tente novamente!",
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => prevSize + 2);
  };

  const decreaseTextSize = () => {
    setTextSize((prevSize) => prevSize - 2);
  };

  return (
    <Container style={{ backgroundColor: "#211f1c" }} fluid id="login">
      <div>
        <div className="text-container" style={{ fontSize: `${textSize}px` }}>
          <div className="button-container">
            <button onClick={increaseTextSize}>A+</button>
            <button onClick={decreaseTextSize}>A-</button>
          </div>
          
          <h1 style={{ color: "#2d939c", marginBottom: 200, marginTop: 0, fontSize: `${textSize + 24}px`}}>
            Seja bem-vindo(a)
          </h1>
          <img className="logo" src="/Logo-neki.png" alt="logo" />
          <h1 style={{ color: "#2d939c", marginBottom: 10, fontSize: `${textSize + 9}px` }}>
            Já é cadastrado? Faça login aqui ou registre-se agora mesmo!
          </h1>

          <form className="formLogin" style={{ maxHeight: "500px" }}>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
                borderRadius: "10px",
              }}
            >
              <Box style={{ width: "100%" }}>
                <FormControl
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    borderRadius: "10px",
                  }}
                >
                  <TextField
                    style={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}
                    placeholder="Digite seu email"
                    value={email}
                    id="outlined-start-adornment"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>

              <Box style={{ width: "100%" }}>
                <FormControl
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    borderRadius: "10px",
                  }}
                >
                  <OutlinedInput
                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Digite sua senha"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      checked={checked}
                      onChange={(e) => {
                        setChecked(e.target.checked);
                      }}
                    />
                  }
                  label="Lembrar login e senha"
                />
              </FormGroup>
            </Container>

            <Container id="buttonGroup">
              <div className="actionsLogin">
                <Button
                  id="button"
                  variant="primary"
                  onClick={() => {
                    handleLogin();
                    console.log("showAlert", showAlert);
                  }}
                >
                  Entrar
                </Button>
                <Button
                  className="button"
                  id="button"
                  variant="primary"
                  onClick={() => {
                    navigate("/cadastro");
                  }}
                >
                  Cadastrar
                </Button>
              </div>
            </Container>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
