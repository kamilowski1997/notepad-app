import React, { useEffect, useState, useRef} from 'react'
import { Navbar, Nav, Button} from "react-bootstrap";
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
import { ref, set, push, onValue, query, orderByChild, onChildAdded, onChildChanged, onChildRemoved, update, remove  } from "firebase/database";
import { db } from '../firebase'
import Note from "./Note"

export default function Dashboard() {
  const { currentUser, logout } = useAuth(); 
  const history = useHistory();
  const [error, setError] = useState('')
  const [notes, setNotes] = useState();
  const [notesDb, setNotesDb] = useState();
  const [isReady, setIsReady] = useState(false)

  const notesRef = ref(db, 'notes/'+ currentUser.uid);

  useEffect( () => {
    onValue(notesRef, (snapshot) => {
      setNotesDb(snapshot.val());
    });
  }, [])

  useEffect(() => {
    var arr=[];
    if(notesDb!==undefined&&notesDb!==null){
      
      Object.keys(notesDb).sort((a,b)=> new Date(notesDb[b].createdAt)-new Date(notesDb[a].createdAt)).map((keyName, i)=>{
        var obj={key:keyName, title:notesDb[keyName].title, noteText:notesDb[keyName].note_text, createdAt: new Date(notesDb[keyName].createdAt) }
        
        arr.push(obj);
      });
      setNotes(arr);
      
    }
  }, [notesDb])

  async function handleLogout(){
    try{
      await logout();
      history.push('/signin');
    }catch{
      setError('Failed to sign out.');
    }
  }

  function handleClick(){
    try{
      push(ref(db, 'notes/' + currentUser.uid ), {
        title: "",
        note_text: "",
        createdAt: Date.now()
      });

    }catch(error){
      console.log(error)
    }  
  }

  function saveNote(key, title, note_text){
    update(ref(db, 'notes/' + currentUser.uid + '/' + key), {
      title: title,
      note_text: note_text
    });
  }
  function deleteNote(key){
    remove(ref(db, 'notes/' + currentUser.uid + '/' + key));
  }

  var listItems=<div></div>

  if(notes!==undefined&&notes!==null){

    listItems = notes.map((note, index)=>{
      const key=index;
    return <Note index={index} notes={notes} saveNote={saveNote} deleteNote={deleteNote} notesDb={notesDb} isReady={isReady} key={key}/>
    })
  }
  if(notesDb==undefined||notesDb==null){
    listItems=<div></div>
  } 

  return (
    <div className="text-align-center" style={{backgroundColor: 'LightGrey', minHeight: "100vh"}}>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" className="justify-content-between">
        <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>NotebookApp</Navbar.Brand></Link>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              {currentUser.email}
            </Nav.Link>       
            <IconButton color="secondary" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Nav>
      </Navbar>
      <Button onClick={handleClick} variant="secondary">Add new note</Button>
      <div className="d-flex justify-content-start flex-wrap">
      {listItems}
      </div>
    </div>
  )
}
