import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { create } from "./api-user";
import { ContainerLoginRegister } from "../component/customstyle/CustomStyledDiv";
import { TextFieldBlue } from "../component/customstyle/CustomStyledTextField";
import { COLOR_TEXT } from "../lib/color-help";
import ButtonMainTheme from "../component/button/ButtonMainTheme";
import ModalGeneralMessage from "../component/modal/ModalGeneralMessage";
import ToastMessageGeneral from "../component/modal/ToastMessageGeneral.jsx";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

export default function Signup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [errName, setErrName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errToast, setErrToast] = useState("");

  const [values, setValues] = useState({
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
    phone: "",
  });
  const handleChange = (name) => (event) => {
    if (name == "phone") {
      if (/^.*([0-9()+-])$/.test(event.target.value) || event.target.value == "") {
        setValues({ ...values, [name]: event.target.value });
      }
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };
  const handleClose = () => {
    setVisibleSuccess(false);
    navigate("/signin");
  };
  const clickSubmit = () => {
    let isError = false;

    if (values.name == "") {
      isError = true;
      setErrName("Please input your name!");
    } else {
      setErrName("");
    }

    if (values.email == "") {
      isError = true;
      setErrEmail("Please input your email!");
    } else {
      setErrEmail("");
    }

    if (values.phone == "") {
      isError = true;
      setErrPhone("Please input your phone number!");
    } else {
      setErrPhone("");
    }

    if (values.password == "") {
      isError = true;
      setErrPassword("Please input your password!");
    } else {
      setErrPassword("");
    }

    if (values.confirmpassword == "") {
      isError = true;
      setErrConfirmPassword("Please input your confirm password!");
    } else if (values.confirmpassword != values.password) {
      isError = true;
      setErrConfirmPassword("Password and confirm password does not match.");
    } else {
      setErrConfirmPassword("");
    }

    if (!isError) {
      const user = {
        name: values.name || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
        phone: values.phone || undefined,
        user_type: "patient",
      };
      create(user).then((data) => {
        if (data.error) {
          setErrToast(data.error);
          // setValues({ ...values, error: data.error });
        } else {
          setVisibleSuccess(true);
        }
      });
    }
  };
  Signup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <ToastMessageGeneral
        visible={errToast != ""}
        type={"error"}
        message={errToast}
        onRequestClosed={() => setErrToast("")}
      />
      <ModalGeneralMessage
        message={"New account successfully created."}
        visible={visibleSuccess}
        buttonText={"Login"}
        onRequestClosed={handleClose}
      />
      <ContainerLoginRegister style={{ gap: 20, paddingBottom: 50 }}>
        <img
          src="/logo.webp"
          height={300}
          width={300}
          style={{ borderRadius: 20 }}
          alt={"COMP229_Group4"}
        />

        <span style={{ fontSize: 24, color: COLOR_TEXT, fontWeight: "bold" }}>
          Register
        </span>

        <TextFieldBlue
          variant="outlined"
          fullWidth
          margin="dense"
          style={{ width: 300 }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          label={"Name"}
          error={errName != ""}
          helperText={errName}
          onChange={handleChange("name")}
        />

        <TextFieldBlue
          variant="outlined"
          fullWidth
          margin="dense"
          style={{ width: 300 }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          label={"Email"}
          error={errEmail != ""}
          helperText={errEmail}
          onChange={handleChange("email")}
        />

        <TextFieldBlue
          variant="outlined"
          fullWidth
          margin="dense"
          style={{ width: 300 }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          label={"Phone Number"}
          value={values.phone}
          error={errPhone != ""}
          helperText={errPhone}
          onChange={handleChange("phone")}
        />

        <TextFieldBlue
          variant="outlined"
          fullWidth
          margin="dense"
          style={{ width: 300 }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          label={"Password"}
          type={"password"}
          error={errPassword != ""}
          helperText={errPassword}
          onChange={handleChange("password")}
        />

        <TextFieldBlue
          variant="outlined"
          fullWidth
          margin="dense"
          style={{ width: 300 }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          label={"Confirm Password"}
          type={"password"}
          error={errConfirmPassword != ""}
          helperText={errConfirmPassword}
          onChange={handleChange("confirmpassword")}
        />

        <ButtonMainTheme
          style={{ width: 200 }}
          textStyle={{ fontSize: 24, fontWeight: "bold" }}
          label={"Submit"}
          onClick={clickSubmit}
        />
      </ContainerLoginRegister>
    </div>
  );
}
