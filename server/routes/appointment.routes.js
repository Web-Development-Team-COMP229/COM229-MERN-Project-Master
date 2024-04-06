import express from 'express'
import appointmentCtrl from '../controllers/appointment.controller.js'
// import authCtrl from '../controllers/auth.controller'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

router.route('/api/appointment').post(authCtrl.requireSignin, appointmentCtrl.create);
router.route('/api/appointment').get(authCtrl.requireSignin, appointmentCtrl.list);

router.param('appointmentid', appointmentCtrl.appointmentByID)
router.route('/api/appointment/:appointmentid')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, appointmentCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, appointmentCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.IsAuthorizedToDeleteAppointment, appointmentCtrl.remove)


export default router
