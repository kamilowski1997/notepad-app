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

export default function ResetPassword() {
  const emailRef = useRef();
  
  const { resetPassword } = useAuth(); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();

    try{
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      history.push('/');
    }catch{
      setError('Failed to reset password.')
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset password</h2>
          {error ? <Alert variant="danger">{error}</Alert>:<div></div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
          
            <Button className="w-100 mt-3" type="submit" disabled={loading} variant="dark">Send reset password email</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/signin">Back to Sign In page</Link>
      </div>
    </div>
  )
}
