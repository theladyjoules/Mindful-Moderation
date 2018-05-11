function strings(s){
  let string = '';
  switch(s) {
    case 'generic':
      string = 'An error occured';
      break;
    case 'discount':
      string = 'We are unable to apply this discount code.';
      break;
    case 'login':
      string = 'The email or password you entered is invalid.';
      break;
    case 'forgotPassword':
      string = 'The email you entered is invalid.';
      break;
    case 'forgotPasswordEmail':
      string = 'Password reset email sent. Please check your email.';
      break;
    case 'passwordUpdateSuccess':
      string = 'Password successfully updated.';
      break;
    case 'billingAddressError':
        string = 'Please verify that your billing address is correct.';
        break;
    case 'sessionexpired':
        string = 'Your session has expired. Please login.';
        break;
    case 'emailAlreadyRegistered':
        string = 'This email address is already registered.';
        break;
    case 'required':
        string = 'This field is required.';
        break;
    case 'password':
        string = 'Minimum 8 characters.';
        break;
    case 'passwordConfirm':
        string = 'Passwords must match.';
        break;
    case 'email':
        string = 'Please enter a valid email.';
        break;
    case 'phone':
        string = 'Please enter a valid phone number.';
        break;
    case 'birthday':
        string = 'Please enter your birthday in MM/DD/YYYY format.';
        break;
    case 'birthdaySub18':
        string = 'You must be 18 years or older to register.';
        break;
    case 'phoneNumber':
        string = 'Phone number must be valid.';
        break;
    case 'state':
        string = 'Please select your state.';
        break;
    case 'zipCode':
        string = 'Please enter a valid zip code.';
        break;
    case 'mealDate':
        string = 'Please enter a valid date.';
        break;
    case 'mealTime':
        string = 'Please enter a valid time.';
        break;
    case 'hungerScaleWord0':
        string = 'Empty';
        break;
    case 'hungerScaleWord1':
        string = 'Ravenous';
        break;
    case 'hungerScaleWord2':
        string = 'Over-Hungry';
        break;
    case 'hungerScaleWord3':
        string = 'Hungry';
        break;
    case 'hungerScaleWord4':
        string = 'Lightly Hungry';
        break;
    case 'hungerScaleWord5':
        string = 'Neutral';
        break;
    case 'hungerScaleWord6':
        string = 'Just Satisfied';
        break;
    case 'hungerScaleWord7':
        string = 'Completely Satisfied';
        break;
    case 'hungerScaleWord8':
        string = 'Full';
        break;
    case 'hungerScaleWord9':
        string = 'Stuffed';
        break;
    case 'hungerScaleWord10':
        string = 'Sick';
        break;
    default:
      break;
  }
  return string;
}
export {strings};