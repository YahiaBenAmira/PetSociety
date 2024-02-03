import React,{useState} from 'react'
import axios from 'axios'
import { Link,useNavigate  } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
function Login () {
const navigate = useNavigate(); 
const [loginData,setLoginData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
})

const handleinputChange = (event) => { 
    const {name,value} = event.target
    setLoginData({
        ...loginData,
        [name]: value
    })
    console.log(loginData);
}
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  try {
     // Assuming email and password are defined somewhere in the scope

    const response = await axios.post('http://localhost:8002/api/auth/signup', loginData);
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      const id = response.data.userId; 
      alert('User Created succesfully')
      localStorage.setItem('userId', id);
      navigate('/'); // Assuming 'navigate' is properly defined to redirect to the 'Home' page
    }
  } catch (error) {
    console.error(error);
    // Handle error cases here (e.g., display an error message to the user)
  }
};
    return(
       
            <MDBContainer fluid>
        
              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
        
                  <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        
                      <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                      <p className="text-white-50 mb-3">Please enter your login and password!</p>
                      <MDBInput wrapperClass='mb-4 w-100' label='First Name' id='formControlLg' type='firstName' size="lg" name='firstName' value={loginData.firstName} onChange={handleinputChange}/>
                      <MDBInput wrapperClass='mb-4 w-100' label='Last Name' id='formControlLg' type='lastName' size="lg" name='lastName' value={loginData.lastName} onChange={handleinputChange}/>

                      <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" name='email' value={loginData.email} onChange={handleinputChange}/>
                      <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" name='password' value={loginData.password} onChange={handleinputChange}/>
        
                      <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password'  />
        
                      <MDBBtn size='lg' onClick={handleSubmit}>
                        Sign up!
                      </MDBBtn>
        
                      <hr className="my-4" />
        
                      <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                        <MDBIcon fab icon="google" className="mx-2"/>
                        Sign up with google
                      </MDBBtn>
        
                      <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Sign up with facebook
                      </MDBBtn>
                     
                    </MDBCardBody>
                  </MDBCard>
                    
                </MDBCol>
              </MDBRow>
        
            </MDBContainer>
        
    )

}

export default Login