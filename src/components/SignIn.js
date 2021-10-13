import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth(); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value.length < 6){
      return setError('Password should be at least 6 characters')
    }
    try{
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    }catch(e){
      setError('Failed to sign in')
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error ? <Alert variant="danger">{error}</Alert>:<div></div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
          
            <Button className="w-100 mt-3" type="submit" disabled={loading} variant="dark">Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/reset-password">Forgot password?</Link>
      </div>
      <div className="w-100 text-center mt-2">
        <Link to="/signup">Doesn't have account? Sign Up</Link>
      </div>
    </div>
  )
}
