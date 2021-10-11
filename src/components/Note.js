import React, { useRef, useState, useEffect } from 'react'
import {Form, Button, Card, Alert, Container, Row, Col} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function Note(props) {
  const titleRef = useRef();
  const noteTextRef = useRef();

  const [error, setError] = useState('');
  const history = useHistory();

  const [title, setTitle] = useState(props.notes[props.index].title)
  const [noteText, setNoteText] = useState(props.notes[props.index].noteText);

  const skipInputRef = useRef();

  useEffect(() => {
    skipInputRef.current.tabIndex = -1;
  }, []);


  function handleDelete(e){
    e.preventDefault();
    props.deleteNote(props.notes[props.index].key);
  }


  return (
    <div>
      <Container
        className="d-flex flex-wrap align-items-center justify-content-center p-2"
        style={{}}
      >
        <div style={{ maxWidth: "400px", minWidth: "23vw"}}>
          <Card style={{backgroundColor: 'DimGrey'}}>
            <Card.Body>
              {error ? <Alert variant="danger">{error}</Alert>:<div></div>}
              <Form>
                  <Row>
                    <Col> 
                      <Form.Group id="title">
                        <Form.Control style={{backgroundColor: 'LightGrey'}} type="text" ref={titleRef} value={props.notes[props.index].title} onChange={()=>{setTitle(titleRef.current.value); props.saveNote(props.notes[props.index].key, titleRef.current.value, noteTextRef.current.value)}} required placeholder="Title"/>
                      </Form.Group>
                    </Col>
                    <Col xs="1" className="p-0">
                      <IconButton variant="secondary" onClick={handleDelete} className="p-0" ref={skipInputRef}>
                        <DeleteIcon />
                      </IconButton>
                    </Col>
                  </Row>
                <Form.Group id="note-text" className="pt-1">
                  <Form.Control style={{backgroundColor: 'LightGrey'}} as="textarea" ref={noteTextRef} value={props.notes[props.index].noteText} onChange={()=>{setNoteText(noteTextRef.current.value); props.saveNote(props.notes[props.index].key, titleRef.current.value, noteTextRef.current.value)}} rows={6} />
                </Form.Group>
              </Form>
              <Card.Text className="text-white">Created at: {props.notes[props.index].createdAt.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
