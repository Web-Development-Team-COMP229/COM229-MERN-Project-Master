import React, { useState, useEffect } from "react";
import values from "../lib/Signin.jsx";
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
  rgbToHex,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import { Link, useParams } from "react-router-dom";
//import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { create } from "./api-appointment";
import { list, remove } from "./api-appointment";
import auth from "../lib/auth-helper.js";
import DatePicker from "react-datepicker";
import DateCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../src/appointment.css";
import setHours from "date-fns/setHours";
import moment from "moment";
import { TextFieldBlue } from "../component/customstyle/CustomStyledTextField.jsx";
import ButtonMainTheme from "../component/button/ButtonMainTheme.jsx";
import ToastMessageGeneral from "../component/modal/ToastMessageGeneral.jsx";
import { Link as RouterLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  AppointmentTooltip,
  DateNavigator,
  TodayButton,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    width: 250,
    height: 250,
    resize: "auto",
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
  dialog: {
    width: 300,
    height: 500,
  },
  dialog_media: {
    width: 200,
    height: 200,
  },
}));

export default function Appointment() {
  const jwt = auth.isAuthenticated();

  const [appointments, setAppointments] = useState([
    {
      title: "Website Re-Design Plan",
      startDate: new Date(2018, 5, 25, 12, 35),
      endDate: new Date(2018, 5, 25, 15, 0),
      id: 0,
    },
  ]);

  const today = new Date();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal, {
      t: jwt.token,
      userId: jwt.user._id,
    }).then((data) => {
      listCB(data);
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const listCB = (data) => {
    if (data && data.error) {
      console.log(data.error);
    } else {
      var appointmentsCollection = [];
      data.forEach(function (item) {
        var appoi = {
          title: item.apply_user,
          startDate: new Date(item.appointment_date),
          endDate: new Date(item.appointment_date),
          id: item._id,
        };
        var hoursToAdd = 15 * 60 * 60 * 1000;
        appoi.startDate.setTime(appoi.startDate.getTime() + hoursToAdd);
        hoursToAdd = 16 * 60 * 60 * 1000;
        appoi.endDate.setTime(appoi.endDate.getTime() + hoursToAdd);

        appointmentsCollection.push(appoi);
      });
      setAppointments(appointmentsCollection);
      console.log(appointmentsCollection);
    }
  };

  const deleteCB = (data) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal, {
      t: jwt.token,
      userId: jwt.user._id,
    }).then((data) => {
      listCB(data);
    });
  };

  const commitChanges = (deleted, changed) => {
    remove(deleted, {
      t: jwt.token,
    }).then((data) => {
      deleteCB(data);
    });
  };

  const classes = useStyles();

  return (
    <div>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState defaultCurrentDate={today} />
          <EditingState
            onCommitChanges={(added, changed, deleted) =>
              commitChanges(added, changed, deleted)
            }
          />
          <IntegratedEditing />
          <MonthView />
          <ConfirmationDialog />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showDeleteButton />
        </Scheduler>
      </Paper>
    </div>
  );
}
