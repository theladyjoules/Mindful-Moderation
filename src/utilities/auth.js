function loginUser(email, password, firstName, lastName){

  const options = {
    method: 'POST',
    body: JSON.stringify({email:email, password: password, firstName: firstName, lastName: lastName}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  return fetch('http://localhost:3001/api/register', options).then(response => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } 
    else {
      return 'Server error';
    }
  });

}

export {loginUser};