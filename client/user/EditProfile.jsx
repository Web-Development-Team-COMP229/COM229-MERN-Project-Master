import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from '../lib/auth-helper.js'
import { read, update } from './api-user.js'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { ContainerLoginRegister } from '../component/customstyle/CustomStyledDiv.jsx'
import { TextFieldBlue } from '../component/customstyle/CustomStyledTextField.jsx'
import ButtonMainTheme from '../component/button/ButtonMainTheme.jsx'
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))
export default function EditProfile() {
    const classes = useStyles()
    const { userId } = useParams();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        phone: '',
        open: false,
        error: '',
        NavigateToProfile: false
    })
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            userId: userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, name: data.name, email: data.email, phone: data.phone })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            phone: values.phone || undefined,
            password: values.password || undefined,
        }
        update({
            userId: userId
        }, {
            t: jwt.token
        }, user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, userId: data._id, NavigateToProfile: true })
            }
        })
    }
    const handleChange = name => event => {
        if (name == "phone") {
            if (/^.*([0-9()+-])$/.test(event.target.value) || event.target.value == "") {
              setValues({ ...values, [name]: event.target.value });
            }
        } else {
            setValues({ ...values, [name]: event.target.value })
        }
    }
    if (values.NavigateToProfile) {
        return (<Navigate to={'/user/' + values.userId} />)
    }

    return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <ContainerLoginRegister style={{gap: 20, paddingBottom: 50}}>
                <span style={{fontWeight: 'bold', fontSize: 24, color: '#414042'}}>Edit Profile</span>

                <TextFieldBlue variant="outlined" fullWidth margin='dense' InputLabelProps={{style:{fontSize: 14}}} 
                    label={"Name"} value={values.name} onChange={handleChange('name')}/>
                <TextFieldBlue variant="outlined" fullWidth margin='dense' InputLabelProps={{style:{fontSize: 14}}} 
                    label={"Email"} value={values.email} onChange={handleChange('email')}/>
                <TextFieldBlue variant="outlined" fullWidth margin='dense' InputLabelProps={{style:{fontSize: 14}}} 
                    label={"Phone"} value={values.phone} onChange={handleChange('phone')}/>
                <TextFieldBlue variant="outlined" fullWidth margin='dense' InputLabelProps={{style:{fontSize: 14}}} 
                    label={"Password"} type={"password"} value={values.password} onChange={handleChange('password')}/>

                <ButtonMainTheme textStyle={{fontSize: 16}} label={"Submit"} onClick={clickSubmit} />
            </ContainerLoginRegister>
        </div>
    )

    // return (
    //     <Card className={classes.card}>
    //         <CardContent>
    //             <Typography variant="h6" className={classes.title}>
    //                 Edit Profile
    //             </Typography>
    //             <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
    //             <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
    //             <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
    //             <br /> {
    //                 values.error && (<Typography component="p" color="error">
    //                     <Icon color="error" className={classes.error}>error</Icon>
    //                     {values.error}
    //                 </Typography>)
    //             }
    //         </CardContent>
    //         <CardActions>
    //             <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
    //         </CardActions>
    //     </Card>
    // )
}


