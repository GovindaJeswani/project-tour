const express =  require('express') 
const morgan = require('morgan')
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path')
const cookieParser = require('cookie-parser'); 
const cors = require('cors')
const compression = require('compression')

const AppError = require('./utils/appError');

const bookingController = require('./controllers/bookingController');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

//  starting express App
const app = express()

app.use(cors())


app.enable('trust proxy');
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// console.log(app.get('env'));

// Global MIDDLEWARES


//  serving 'static' files to browser
app.use(express.static(path.join(__dirname,'public')))


//  Set security HTTP headers
// app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);

  // app.post(
  //   '/webhook-checkout',
  //   // eslint-disable-next-line no-undef
  //   bodyParser.raw({ type: 'application/json' }),
  //   bookingController.webhookCheckout
  // );
  

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());


//  Data saniization against no-sql query injection
app.use(mongoSanitize());

//  Data saniization against xss
app.use(xss());

app.use(compression())
//  prevent parameter pollution
// app.use(
//     hpp({
//       whiteList: [
//         'duration',
//         'ratingQUANTITY',
//         'ratingsAvg',
//         'maxGroupSize',
//         'difficulty',
//         'price'
//       ]
//     })
//   );




// app.use((req, res, next) => {
//   console.log('Hello from the middleware test 1');
//   next();
// });



  // Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
  });
  
  
//  Routes 

app.use('/',viewRouter)
app.use('/api/user',userRouter)
app.use('/api/tour',tourRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/bookings',bookingRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);


module.exports = app;