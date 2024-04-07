/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from '../lib/auth-helper.js'
import { read, remove } from './api-user.js'
import { useLocation, Navigate, Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { ContainerLoginRegister } from '../component/customstyle/CustomStyledDiv.jsx'
import ButtonMainTheme from '../component/button/ButtonMainTheme.jsx'
import ModalConfirmation from '../component/modal/ModalConfirmation.jsx'
const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}))
export default function Profile({ match }) {
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [visibleModalDeleteUser, setVisibleModalDeleteUser] = useState(false)
    const jwt = auth.isAuthenticated()
    const { userId } = useParams();
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
            console.log("<----- data", data)
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    const deleteAccount = () => {
        remove({
          userId: userId
        }, { t: jwt.token }).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            auth.clearJWT(() => console.log('deleted'))
            window.location.href = "/"
          }
        })
    }

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }
    if (auth.isAuthenticated()) {
        console.log(auth.isAuthenticated().user._id)
        console.log(user._id)
    }

    return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <ModalConfirmation visible={visibleModalDeleteUser} onRequestClosed={() => setVisibleModalDeleteUser(false)}
                content={<span style={{fontSize: 16, color: '#494E4E', fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>Confirm to delete your account.</span>}
                cancel={() => setVisibleModalDeleteUser(false)}
                confirm={() => deleteAccount()}/>
            <ContainerLoginRegister style={{gap: 20, paddingBottom: 50, alignItems: 'flex-start', padding: 10}}>
                <span style={{fontWeight: 'bold', fontSize: 16, color: '#414042'}}>Welcome, {user.name ?? ''}</span>

                <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center', marginTop: 30}}>
                    <img src="/icon_user.png" height={100} width={100} style={{borderRadius: 20}} alt={'COMP229_Group4'} />
                    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                        <span style={{color: '#414042'}}>Name: {user.name ?? 'N/A'}</span>
                        <span style={{color: '#414042'}}>Email: {user.email ?? 'N/A'}</span>
                        <span style={{color: '#414042'}}>Phone: {user.phone ?? 'N/A'}</span>
                    </div>
                </div>

                <ButtonMainTheme style={{width: '100%', marginTop: 40}} textStyle={{fontSize: 16, fontWeight: 'bold'}} 
                    label={'Edit Profile'} onClick={() => navigate("/user/edit/" + user._id)} />


                <ButtonMainTheme style={{width: '100%', marginTop: 10, backgroundColor: "#555367"}} textStyle={{fontSize: 16, fontWeight: 'bold'}} 
                    label={'Delete Account'} onClick={() => setVisibleModalDeleteUser(true)} />

            </ContainerLoginRegister>
        </div>
    )

    // return (
    //     <Paper className={classes.root} elevation={4}>
    //         <Typography variant="h6" className={classes.title}>
    //             Profile
    //         </Typography>
    //         <List dense>
    //             <ListItem>
    //                 <ListItemAvatar>
    //                     <Avatar>
    //                         <Person />
    //                     </Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText primary={user.name} secondary={user.email} /> {
    //                     auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
    //                     (<ListItemSecondaryAction>
    //                         <Link to={"/user/edit/" + user._id}>
    //                             <IconButton aria-label="Edit" color="primary">

    //                                 <Edit />
    //                             </IconButton>
    //                         </Link>
    //                         <DeleteUser userId={user._id} />
    //                     </ListItemSecondaryAction>)
    //                 }
    //             </ListItem>
    //             <Divider />
    //             <ListItem>
    //                 <ListItemText primary={"Joined: " + (
    //                     new Date(user.created)).toDateString()} />
    //             </ListItem>
    //         </List>
    //     </Paper>
    // )
}


