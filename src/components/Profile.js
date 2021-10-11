import React, { useEffect, useRef, useState} from 'react'
import { Navbar, Nav, Form, Button, Card, Alert, Container} from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function Profile() {
  const { currentUser, logout, changePassword} = useAuth(); 
  const history = useHistory();
  const [error, setError] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const newPasswordRef = useRef(); 
  const confirmNewPasswordRef = useRef();
  
  async function handleLogout(){
    try{
      await logout();
      history.push('/signin');
    }catch{
      setError('Failed to sign out.');
    }
  }

  function handleShowChangePassword(){
    setShowChangePassword(!showChangePassword);
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(newPasswordRef.current.value!==confirmNewPasswordRef.current.value){
      return setError('Passwords do not match!')
    }
    if(newPasswordRef.current.value.length < 6){
      return setError('Password should be at least 6 characters')
    }
    try{
      setError('');
      setLoading(true);
      await changePassword(passwordRef.current.value, newPasswordRef.current.value);
      alert("Password successfully changed")
    }catch{
      setError('Failed to change password')
    }
    setLoading(false);
  }

  return (
    <div className="text-align-center">
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" className="justify-content-between">
        <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>NotepadApp</Navbar.Brand></Link>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              {currentUser.email}
            </Nav.Link>   
            <IconButton color="secondary" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Nav>
      </Navbar>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>

          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error ? <Alert variant="danger">{error}</Alert>:<div></div>}
              <Card.Text>Email: {currentUser.email}</Card.Text>
              <Button onClick={handleShowChangePassword} className="text-center mb-3" variant="dark" size="sm" >Change Password</Button>
              {showChangePassword?
                <Form onSubmit={handleSubmit} >
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Form.Group id="new-password">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password" ref={newPasswordRef} required />
                  </Form.Group>
                  <Form.Group id="confirm-password">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="password" ref={confirmNewPasswordRef} required />
                  </Form.Group>
                
                  <Button className="w-100 mt-3" type="submit" variant="dark" size="lg"  >Save</Button>
                </Form>:<div></div>
              }
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
