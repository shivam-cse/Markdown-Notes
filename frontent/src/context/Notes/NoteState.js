import React from 'react';
import NoteContext from './noteContext'
import { useState } from 'react';
const NoteState = (props) => {
const host = "http://localhost:5000";
const notesInitial = []
//
const [notes, setnotes] = useState(notesInitial);

  //get all notes
  const getNote = async () => {
    //Get all note - API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json()
    console.log(json);
    setnotes(json)
  }

  //Add a notes
  const addNote = async (title, description, tag) => {
    
    //add note - API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title:title, description:description, tag:tag}) // body data type must match "Content-Type" header
    });

    const note =  await response.json()
    setnotes(notes.concat(note))
    
  }

  // delete note
  const deleteNote = async (id) => {
    
    //API call to delete note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });

    // const json = response.json()
    const newNote = notes.filter((notes) => { return notes._id !== id })
    setnotes(newNote)
  }

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API call to edit 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const json = await response.json()
    let newNotes = JSON.parse(JSON.stringify(notes))
    
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




