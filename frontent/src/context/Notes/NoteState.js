import React from 'react';
import NoteContext from './noteContext'
import { useState } from 'react';
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

  //get all notes
  const getNote = async () => {
    //add note - API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYWY4NWNmYmNlNzczYTY1NDgyYTNmIn0sImlhdCI6MTY0MzA0MDM3NX0.UuP_yJxZo-KIxVRA8Wzh1-jOHPyAdTVvbXT8ol0X6pk'
      }
      //, body: JSON.stringify(title,description,tag) // body data type must match "Content-Type" header
    });

    const json = await response.json()
    console.log(json);
    setnotes(json)
  }
  //Add a notes
  const addNote = async (title, description, tag) => {
    //add note - API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYWY4NWNmYmNlNzczYTY1NDgyYTNmIn0sImlhdCI6MTY0MzAyMDU3OX0.gDg_1D_aszpfPAplgH076Hg64Tp3T-SmcYXYQf7Q7xA'
      },
      body: JSON.stringify({title:title, description:description, tag:tag}) // body data type must match "Content-Type" header
    });

    const note =  await response.json()
    setnotes(notes.concat(note))
    
  }

  //Add delete note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYWY4NWNmYmNlNzczYTY1NDgyYTNmIn0sImlhdCI6MTY0MzA0MDM3NX0.UuP_yJxZo-KIxVRA8Wzh1-jOHPyAdTVvbXT8ol0X6pk'
      },
      // body: JSON.stringify(title, description, tag) // body data type must match "Content-Type" header
    });

    // const json = response.json()
    const newNote = notes.filter((notes) => { return notes._id !== id })
    setnotes(newNote)
  }

  //Edit notes
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYWY4NWNmYmNlNzczYTY1NDgyYTNmIn0sImlhdCI6MTY0MzA0MDM3NX0.UuP_yJxZo-KIxVRA8Wzh1-jOHPyAdTVvbXT8ol0X6pk'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const json = await response.json()

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }

    }
    setnotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState




