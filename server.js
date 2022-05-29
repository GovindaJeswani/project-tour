const mongoose = require('mongoose')
const dotenv = require('dotenv')


// UNCAUGHT EXCEPTIONAL ERROR 
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!  Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  }); 
  
  dotenv.config({ path: './config.env' });
  const app = require('./app');

//   GETTING VALUE FROM DOTENV FILE
  const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

//    connecting with DATABASE

  mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  }).then(()=>
      console.log('DB CONNECTED SUCCESSFULLY!')
  ).catch(err=>{
      if(err){
          console.log('There was some error',err.message);
      }
  })


//   STARTING SERVER 
const port = process.env.port || 3000;
const localhost ='127.0.0.1'
const server = app.listen(port,()=>{
    console.log(`App is running on http://${localhost}:${port} ...`);
})
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!  Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });
  