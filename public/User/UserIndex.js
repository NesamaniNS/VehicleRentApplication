document.addEventListener('DOMContentLoaded',function(){

    const registeruser = document.getElementById('registerform');
               if(registeruser){
                     registeruser.addEventListener('submit',function(event){
                        event.preventDefault();
                        Registeruser();
                     })
               }

    const login = document.getElementById('loginForm');
               if(login){
                     login.addEventListener('submit',function(event){
                        event.preventDefault();
                        UserLogin();
                    })
               }
    const username = localStorage.getItem('username');
    const welcomeuser = document.getElementById('usernameDisplay');

    if (welcomeuser) { 
        if (username) {
            welcomeuser.textContent = username; 
        } else {
            welcomeuser.textContent = ''; 
        }
    } else {
        console.error('Element with ID "usernameDisplay" not found.'); 
    }

    const logout = document.getElementById('Logout');
               if(logout){
                logout.addEventListener('click',function(){
                    localStorage.removeItem('username');
                    window.location.href = '../index.html';
                })
               }

    const Discount = document.getElementById('DiscountForm');
               if(Discount){
                     Discount.addEventListener('submit',function(event){
                        event.preventDefault();
                        DiscountPrice();
                     })
               }           
    const Booking = document.getElementById('Bookingform');
                if(Booking){
                    const today = new Date().toISOString().split('T')[0];
                    document.getElementById('BookingDate').setAttribute('min', today);
                    
                    Booking.addEventListener('submit',function(event){
                        event.preventDefault();
                        BookingVehicle();
                    })
                }
    const Feedback = document.getElementById('Feedbackform');
                if(Feedback){
                    Feedback.addEventListener('submit',function(event){
                        event.preventDefault();
                        FeedBackVehicle();
                    })
                }             
})

function Registeruser(){
  document.getElementById('Error').textContent = '';
  document.getElementById('usernameerror').textContent='';
  document.getElementById('passworderror').textContent='';
  document.getElementById('Emailerror').textContent='';
  document.getElementById('cityerror').textContent='';
  document.getElementById('contacterror').textContent='';

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const EmailInput = document.getElementById('email');
  const CityInput = document.getElementById('city');
  const ContactNumberInput = document.getElementById('contactnumber');


  const UserName= usernameInput.value;
  const Password= passwordInput.value;
  const Email= EmailInput.value;
  const City= CityInput.value;
  const ContactNumber= ContactNumberInput.value;

  usernameInput.classList.remove('error-border')
  passwordInput.classList.remove('error-border')
  EmailInput.classList.remove('error-border')
  CityInput.classList.remove('error-border')
  ContactNumberInput.classList.remove('error-border')

  const emailPattern =  /^(?!.*\.\.)([a-z][a-z0-9.]{5,29})@[a-z][a-z.-]*\.com$/;
  const emailPatternlong = /[a-zA-Z0-9.]{6,30}@gmail\.com$/;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const contactPattern = /^[6-9]\d{9}$/;
  const cityPattern = /^[A-Za-z\s]+$/; 

  let valid = true;
  
   if(UserName === ''){
    usernameInput.classList.add('error-border')
    document.getElementById('usernameerror').textContent='Please enter a username';
    valid = false;
   }else if (UserName.length < 3) {
    usernameInput.classList.add('error-border');
    document.getElementById('usernameerror').textContent = 'Username must be at least 3 characters long.';
    valid = false;
   }
   if(Password === ''){
    passwordInput.classList.add('error-border')
    document.getElementById('passworderror').textContent='Please enter a password';
    valid = false;
   }else if(!passwordPattern.test(Password)){
    passwordInput.classList.add('error-border')
    document.getElementById('passworderror').textContent = 'Password must be at least 8 characters, include a number, and a special character';
    valid = false;
   }
   if(Email === ''){
    EmailInput.classList.add('error-border')
    document.getElementById('Emailerror').textContent='Please enter your email address';
    valid = false;
   }else{
    if(!emailPatternlong.test(Email)){
    EmailInput.classList.add('error-border')
    document.getElementById('Emailerror').textContent='Sorry, your username must be between 6 and 30 characters long.';
    valid = false;
   }else if(!emailPattern.test(Email)){
    EmailInput.classList.add('error-border')
    document.getElementById('Emailerror').textContent='Sorry, only letters (a-z), numbers (0-9), and periods(.) are allowed.';
    valid = false;
   }}
   if(City === ''){
    CityInput.classList.add('error-border')
    document.getElementById('cityerror').textContent='Please enter a city';
    valid = false;
   }else if(!cityPattern.test(City)){
    CityInput.classList.add('error-border')
    document.getElementById('cityerror').textContent='City name should contain only letters';
    valid = false;
   }
   if(ContactNumber === ''){
    ContactNumberInput.classList.add('error-border')
    document.getElementById('contacterror').textContent='Please enter a contact number';
    valid = false;
   }else if(!contactPattern.test(ContactNumber)){
    ContactNumberInput.classList.add('error-border')
    document.getElementById('contacterror').textContent='Please enter a valid 10-digit Indian phone number';
    valid = false;
   }

   usernameInput.addEventListener('input', () => {
       if(usernameInput){
              usernameInput.classList.remove('error-border');
              document.getElementById('usernameerror').textContent='';
       }
   })
    
   passwordInput.addEventListener('input', () => {
    if(passwordInput){
           passwordInput.classList.remove('error-border')
           document.getElementById('passworderror').textContent='';
    }
   })
   EmailInput.addEventListener('input', () => {
    if(EmailInput){
           EmailInput.classList.remove('error-border');
           document.getElementById('Emailerror').textContent='';
    }
   }) 
   CityInput.addEventListener('input', () => {
    if(CityInput){
           CityInput.classList.remove('error-border');
           document.getElementById('cityerror').textContent='';
    }
   })
   ContactNumberInput.addEventListener('input', () => {
    if(ContactNumberInput){
           ContactNumberInput.classList.remove('error-border');
           document.getElementById('contacterror').textContent='';
    }
   })

   if (valid) {

    fetch('http://localhost:5000/registers', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            Name: UserName,
            Password: Password,
            Email: Email,
            City: City,
            ContactNumber: ContactNumber,
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log('Success:', result);

            let alertBox = document.getElementById("customAlertBox");
            let alertMessage = document.getElementById("alertMessage");

            alertMessage.innerHTML = "Registration successfull! Please wait the page will redirect to login page.";
            alertBox.style.display = "block";

        setTimeout(() =>{
            window.location.href = 'UserLogin.html';
         },3000);
        }else{
            if(result.message === '!both'){
                usernameInput.classList.add('error-border');
                EmailInput.classList.add('error-border');
                document.getElementById('usernameerror').textContent='Username and email is already exists!';
            }else if(result.message === '!username'){
                usernameInput.classList.add('error-border');
                document.getElementById('usernameerror').textContent='Username already exists!';
            }else if(result.message === '!Email'){
                EmailInput.classList.add('error-border');
                document.getElementById('Emailerror').textContent='Email already exists!';
            }
        }
    })
    .catch(err => {
        console.error('Error:', err);
        document.getElementById('usernameerror').textContent = 'Registration failed. Please try again.';
    });
   }
}

function UserLogin(){

    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('Error').textContent='';

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameInput.classList.remove('error-border');
    passwordInput.classList.remove('error-border');

    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


    let valid = true;

    if (username === '') {
        usernameInput.classList.add('error-border')
        document.getElementById('usernameError').textContent = 'Please enter a username';
        valid = false;
    }else if (username.length < 3) {
        usernameInput.classList.add('error-border');
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
        valid = false;
       }
    if(password === '') {
        passwordInput.classList.add('error-border')
        document.getElementById('passwordError').textContent = 'Please enter a password';
        valid = false;
    }else if(!passwordPattern.test(password)){
        passwordInput.classList.add('error-border')
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters, include a number, and a special character';
        valid = false;
    }

    usernameInput.addEventListener('input', () => {
        if (usernameInput) {
            usernameInput.classList.remove('error-border');
            document.getElementById('usernameError').textContent = '';
        }
    });
    
    passwordInput.addEventListener('input', () => {
        if (passwordPattern) {
            passwordInput.classList.remove('error-border');
            document.getElementById('passwordError').textContent = '';
        }
    });

  if(valid){

    fetch('http://localhost:5000/userlogin',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            localStorage.setItem('Email',result.Email)
            localStorage.setItem('username',result.username);
            window.location.href="UserDashboard.html";
        } else {
            console.log("result.message", result.message)
            if(result.message === '!both'){
                usernameInput.classList.add('error-border')
                passwordInput.classList.add('error-border')
                document.getElementById('passwordError').textContent = 'Invalid username and password';
            }else if(result.message === '!username'){
                usernameInput.classList.add('error-border')
                document.getElementById('usernameError').textContent = 'Invalid username';
            }else if(result.message === '!password'){
                passwordInput.classList.add('error-border')
                document.getElementById('passwordError').textContent = 'Invalid password';
            }
        }
    })
    .catch(err => {
       console.error('Error:', err);
        document.getElementById('Error').textContent = 'An error occurred. Please try again.';
    })
  }
    
}
 
function DiscountPrice(){

      document.getElementById('vehNumberError').textContent = '';
      
      const VINInput = document.getElementById('vehicleNumber');

      const VIN = VINInput.value;

      VINInput.classList.remove('error-border');

      const indianVINPattern =  /^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;

      localStorage.setItem('VIN',VIN);

      let valid = true;

      if(VIN === ''){
        VINInput.classList.add('error-border');
        document.getElementById('vehNumberError').textContent = 'Vehicle Number is Required';
        valid = false;
      }else if(!indianVINPattern.test(VIN)){
        VINInput.classList.add('error-border');
        document.getElementById('vehNumberError').textContent = 'Invalid vehicle number (e.g: TN01AB1234)';
        valid = false;
      }
      
      if(valid){
        fetch('http://localhost:5000/UpdateDiscount',{
            headers:{
                'Content-Type':'application/json'
            },
            method : 'PUT',
            body :JSON.stringify({
                VIN : VIN
            })
        })
        .then(response => response.json())
        .then(result =>{
            if(result.success){
                window.location.href="AfterDiscount.html";
            }else {
                VINInput.classList.add('error-border');
                document.getElementById('vehNumberError').textContent = 'Please Enter Valid Vehicle Number';
            }
        })
        .catch(err => {
            console.error('Error:', err);
             document.getElementById('vehNumberError').textContent = 'An error occurred. Please try again.';
         })
      }
}

function BookingVehicle(){
    
    document.getElementById('VINerror').textContent = '';
    document.getElementById('DateOfBirtherror').textContent = '';
    document.getElementById('Gendererror').textContent = '';
    document.getElementById('BookingTypeerror').textContent = '';
    document.getElementById('BookingDateerror').textContent = '';

    const vinInput = document.getElementById('VIN');
    const DateOfBirthInput = document.getElementById('DateOfBirth');
    const GenderInput = document.getElementById('Gender');
    const BookingTypeInput = document.getElementById('BookingType');
    const BookingDateInput = document.getElementById('BookingDate');

    const vin = vinInput.value;
    const DateOfBirth = DateOfBirthInput.value;
    const Gender = GenderInput.value;
    const BookingType = BookingTypeInput.value;
    const BookingDate = BookingDateInput.value;

    vinInput.classList.remove('error-border');
    DateOfBirthInput.classList.remove('error-border');
    GenderInput.classList.remove('error-border');
    BookingTypeInput.classList.remove('error-border');
    BookingDateInput.classList.remove('error-border');

    const UserName = localStorage.getItem('username');
    const Email = localStorage.getItem('Email');

    const indianVINPattern =  /^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;

    let valid = true;

    if(vin === ''){
        vinInput.classList.add('error-border');
        document.getElementById('VINerror').textContent = 'Please enter the Vehicle Identification Number';
        valid = false;
    }else if(!indianVINPattern.test(vin)){
        vinInput.classList.add('error-border');
        document.getElementById('VINerror').textContent = 'Invalid vehicle number (e.g: TN01AB1234)';
        valid = false;
    }
    if(DateOfBirth === ''){
        DateOfBirthInput.classList.add('error-border');
        document.getElementById('DateOfBirtherror').textContent = 'Please enter your date of birth';
        valid = false;
    }
    if(Gender === ''){
        GenderInput.classList.add('error-border');
        document.getElementById('Gendererror').textContent = 'Please select your gender';
        valid = false;
    }
    if(BookingType === ''){
        BookingTypeInput.classList.add('error-border');
        document.getElementById('BookingTypeerror').textContent = 'Please select the type of booking';
        valid = false;
    }
    if(BookingDate === ''){
        BookingDateInput.classList.add('error-border');
        document.getElementById('BookingDateerror').textContent = 'Please select the booking date';
        valid = false;
    }
   
    vinInput.addEventListener('input', () => {
        if (vinInput) {
            vinInput.classList.remove('error-border');
            document.getElementById('VINerror').textContent = '';
        }
    });
    DateOfBirthInput.addEventListener('input', () => {
        if (DateOfBirthInput) {
            DateOfBirthInput.classList.remove('error-border');
            document.getElementById('DateOfBirtherror').textContent = '';
        }
    });
    GenderInput.addEventListener('input', () => {
        if (GenderInput) {
            GenderInput.classList.remove('error-border');
            document.getElementById('Gendererror').textContent = '';
        }
    });
    BookingTypeInput.addEventListener('input', () => {
        if (BookingTypeInput) {
            BookingTypeInput.classList.remove('error-border');
            document.getElementById('BookingTypeerror').textContent = '';
        }
    });
    BookingDateInput.addEventListener('input', () => {
        if (BookingDateInput) {
            BookingDateInput.classList.remove('error-border');
            document.getElementById('BookingDateerror').textContent = '';
        }
    });

    if(valid){
        fetch('http://localhost:5000/Booking',{
            headers:{
                'Content-Type':'Application/json'
            },
            method: 'POST',
            body:JSON.stringify({
                UserName:UserName,
                Email:Email,
                VIN:vin,
                DateOfBirth:DateOfBirth,
                Gender:Gender,
                Payment:BookingType,
                BookingDate:BookingDate,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                let alertBox = document.getElementById("customAlertBox");
                let alertMessage = document.getElementById("alertMessage");
    
                alertMessage.innerHTML = 'Vehicle Booked sucessfully! Email sent to Registered Email Address,Thankyou..'
                alertBox.style.display = "block";
    
                const closeTag = document.querySelector(".close");
    
       if(closeTag){
        document.addEventListener('click',function(){
            document.getElementById("customAlertBox").style.display = "none";
            window.location.href = "UserDashboard.html";

        })
       }
            }else{
                document.getElementById('Error').textContent ='Booking Failed';
            }
        })
        .catch(err => {
            console.error('Error:', err);
            document.getElementById('Error').textContent = 'Registration failed. Please try again.';
        });
        return valid;
    }
}

function FeedBackVehicle(){
    document.getElementById('feedbackTypeerror').textContent = '';
    document.getElementById('VINerror').textContent = '';
    document.getElementById('Dateerror').textContent = '';
    document.getElementById('feedbackError').textContent = '';
  
    const feedbackTypeInput = document.getElementById('feedbackType');
    const VINInput = document.getElementById('VIN');
    const BookingDateInput = document.getElementById('experienceDate');
    const feedbackInput = document.getElementById('feedback');

    const feedbackType = feedbackTypeInput.value;
    const VIN = VINInput.value;
    const BookingDate = BookingDateInput.value;
    const feedback = feedbackInput.value;
  
    feedbackTypeInput.classList.remove('error-border');
    VINInput.classList.remove('error-border');
    BookingDateInput.classList.remove('error-border');
    feedbackInput.classList.remove('error-border');

    const UserName = localStorage.getItem('username');
    const Email = localStorage.getItem('Email');

    feedbackTypeInput.addEventListener('input', () => {
        if (feedbackTypeInput) {
            feedbackTypeInput.classList.remove('error-border');
            document.getElementById('feedbackTypeerror').textContent = '';
        }
    });
    VINInput.addEventListener('input', () => {
        if (VINInput) {
            VINInput.classList.remove('error-border');
            document.getElementById('VINerror').textContent = '';
        }
    });
    BookingDateInput.addEventListener('input', () => {
        if (BookingDateInput) {
            BookingDateInput.classList.remove('error-border');
            document.getElementById('Dateerror').textContent = '';
        }
    });
    feedbackInput.addEventListener('input', () => {
        if (feedbackInput) {
            feedbackInput.classList.remove('error-border');
            document.getElementById('feedbackError').textContent = '';
        }
    });

    let valid = true;

    if(feedbackType === '') {
        feedbackTypeInput.classList.add('error-border');
        document.getElementById('feedbackTypeerror').textContent = 'Please select a feedback type';
        valid = false;
    }
    if(VIN === '') {
        VINInput.classList.add('error-border');
        document.getElementById('VINerror').textContent = 'Please enter the Vehicle Identification Number';
        valid = false;
    }
    if(BookingDate === '') {
        BookingDateInput.classList.add('error-border');
        document.getElementById('Dateerror').textContent = 'Please select the booking date';
        valid = false;
    }
    if(feedback === '') {
        feedbackInput.classList.add('error-border');
        document.getElementById('feedbackError').textContent = 'Please provide your feedback';
        valid = false;
    }

  if(valid){

    fetch('http://localhost:5000/userFeedback',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            UserName:UserName,
            Email:Email,
            FeedbackType: feedbackType,
            VIN:VIN,
            BookingDate:BookingDate,
            Feedback: feedback
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            let alertBox = document.getElementById("customAlertBox");
            let alertMessage = document.getElementById("alertMessage");

            alertMessage.innerHTML = 'Feedback inserted sucessfully!'
            alertBox.style.display = "block";

            const closeTag = document.querySelector(".close");

   if(closeTag){
    document.addEventListener('click',function(){
        document.getElementById("customAlertBox").style.display = "none";
        window.location.href = "UserDashboard.html";
    })
   }
            
        } else {
            document.getElementById('Error').textContent = 'Failed Try Again';
        }
    })
    .catch(err => {
       console.error('Error:', err);
        document.getElementById('Error').textContent = 'An error occurred. Please try again.';
    })
  }
}