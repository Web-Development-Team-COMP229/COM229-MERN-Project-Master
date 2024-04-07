import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, rgbToHex } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-appointment';
import auth from '../lib/auth-helper.js'
import DatePicker from "react-datepicker";
import DateCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../src/appointment.css';
import setHours from "date-fns/setHours";
import moment from 'moment';
import { TextFieldBlue } from '../component/customstyle/CustomStyledTextField.jsx'
import ButtonMainTheme from '../component/button/ButtonMainTheme.jsx'
import ToastMessageGeneral from '../component/modal/ToastMessageGeneral.jsx';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
    },
    title: {
        padding: theme.spacing(3, 2.5, 2),
        color: theme.palette.openTitle,
    },
    media: {
        width: 250,
        height: 250,
        resize: 'auto'
    },
    
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    error: {
        color: 'red',
    },
    submit: {
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    dialog:{
        width: 300,
        height: 500
    },
    dialog_media: {
        width: 200,
        height: 200
    },
}));


// const create = async (user) => {
//  return { error: null }; // Simulated API call
// };
export default function Create() {
    const jwt = auth.isAuthenticated();
    //console.log(auth);
    //console.log(jwt);
    const classes = useStyles()
    const navigate = useNavigate();
    const { userId } = useParams();
    const [values, setValues] = useState({
        apply_user_id: jwt.user._id,
        apply_user: jwt.user.name,
        appointment_date: new Date(),
        is_active: true,
    });
    const [open, setOpen] = useState(false);
    const handleChange = name => event => {
        console.log(name);
        console.log(event.target);
        setValues({ ...values, [name]: event.target.value });
    };

    const handleChangeDate = (name, value) =>{
        //console.log(name);
        //console.log(value);
        setValues({ ...values, [name]: value });
    }

    const handleClose = () => {
        setOpen(false);
        // navigate("/user/"+ (auth.isAuthenticated()  ? auth.isAuthenticated().user._id : ''));
        navigate("/myappointments")
    };

    const handleOpen = () => {
        setOpen(true);
    };
/*
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read(
            {
                userId: userId
            }, 
            { t: jwt.token }, 
            signal
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, apply_user: data.name })
            }
            console.log(data);
            console.log(values);
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId]);
*/
    const clickSubmit = () => {
        const appointment = {
            apply_user_id: values.apply_user_id || undefined,
            apply_user: values.apply_user || undefined,
            appointment_date: values.appointment_date || undefined,
            is_active: true,
        };
        console.log(appointment);
        
        console.log(values.appointment_date );
        
        create(
            appointment, 
            {
                t: jwt.token
            }
        ).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setOpen(true);
            }
        });
    };
    
    Create.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    };

    const [startDate, setStartDate] = useState(
        //setHours(new Date(), 16)
        //console.log("setStartDate")
        
      );


    return (
        <div>
            <Card className={classes.card}>
                <CardContent style={{display: 'contents'}}>
                    <Typography variant="h6" className={classes.title}>
                        Create Appointment
                    </Typography>
                    <CardMedia className={classes.media} image={'./Booking.png'}/>
                    <DateCalendar value={values.appointment_date} onChange={(newValue) => handleChangeDate("appointment_date", newValue)} />
                                
                </CardContent>
                <CardActions>
                    
                    <ButtonMainTheme style={{width: 200}} autoFocus={false} textStyle={{fontSize: 24, fontWeight: 'bold'}} label={'Submit'} onClick={clickSubmit} />
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent style={{textAlign: 'center'}} >
                    <img className={classes.dialog_media} src={'./Confirmation Check 1.png'}/>
                
                    <DialogContentText className={classes.title}>
                        The Booking is scheduled.
                    
                    </DialogContentText>
                    <hr />
                    <TextFieldBlue variant="outlined" fullWidth margin='dense' disabled={true} style={{width: 300}} InputLabelProps={{style:{fontSize: 14}}} 
                        label={"Who"} value={values.apply_user}/>
                    
                    <TextFieldBlue  variant="outlined" fullWidth margin='dense' disabled={true} style={{width: 300}} InputLabelProps={{style:{fontSize: 14}}} 
                        label={"When"} value={moment(values.appointment_date).format('DD/MMM/YYYY')}/>
                    <hr />
                    <br/>
                    
                    <ButtonMainTheme autoFocus={false} style={{backgroundColor: 'black' }} textStyle={{fontSize: 24, fontWeight: 'bold'}} label={'Close'} onClick={handleClose} />
                    
                </DialogContent>
               
            </Dialog>
        </div>
    );
}

