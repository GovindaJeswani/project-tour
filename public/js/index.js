/* eslint-disable */
import '@babel/polyfill';
import { login, logout ,signup,forgetPassword} from './auth';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS

const loginForm = document.querySelector('.test');
// const mapBox = document.getElementById('map');
// const loginForm = document.querySelector('.login-form');
// const loginnForm = document.getElementById('loginForm');
const signupForm = document.querySelector(".form-signup");
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// for deletion in admin 
const deleteBtn = document.querySelector('.btn-delete')
const forgetPass = document.querySelector('.link')      

// console.log('loginForm');

// DELEGATION
// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

// if (forgetPass)
// forgetPass.addEventListener('click',()=>{
  // e.preventDefault();
  // console.log('hello');
  // const email = document.getElementById('email').value;
  // forgetPassword(email)
  // })

//  login
if (loginForm)
  loginForm.addEventListener('click', e => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

  // Signup:
if (signupForm)
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;
  signup(name, email, password, passwordConfirm);
});

// logout:
if (logOutBtn) 
  logOutBtn.addEventListener('click',logout)

  // update user data
if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const form = new FormData();    
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });


  // update user password
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

  
  //  book tour btn
  if (bookBtn)
    bookBtn.addEventListener('click', e => {
      e.target.textContent = 'Processing...';
      const { tourId } = e.target.dataset;
      bookTour(tourId);
    });
    
//   // delete booking from admin 
if(deleteBtn)
  deleteBtn.addEventListener('click', ()=> {
    console.log('deleted');

  // const { tourId } = e.target.dataset;
  bookTour(tourId);
});
// deleteBtn.addEventListener('click',()=>{
//   console.log('deleted');
// })


if (forgetPass)
  forgetPass.addEventListener('click',(e)=>{    
    const email = document.getElementById('email').value;
    forgetPassword(email);
  })
    
const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
