var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const patientRouter = require('./routes/patient');
const authRouter = require('./routes/auth');
const scheduleRouter = require('./routes/schedule');
const appointmentRouter = require('./routes/appointment');
const accountRouter = require('./routes/account');
const profileRouter = require('./routes/profile');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patients', patientRouter);
app.use('/auth', authRouter);
app.use('/schedules', scheduleRouter)
app.use('/appointments', appointmentRouter)
app.use('/accounts', accountRouter);
app.use('/profile', profileRouter);

module.exports = app;
