import React, { useContext, useEffect, useRef, useState } from 'react';
import notesContext from '../context/Notes/noteContext'
import Addnotes from './Addnotes';
import Noteitems from './Noteitems';
import { useNavigate } from 'react-router-dom';
export default function Notes() {
  const navigate = useNavigate();
  const context = useContext(notesContext)
  const { notes, getNote, editNote} = context
  useEffect(() => {
    if(localStorage.getItem('token') !== null)
       {
         getNote();
       }
    else
       {
        navigate('/login')
       }
  }, []);

  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click()
    setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})

  }

  const handleClick = (e) => {
    console.log("this is updating", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    ref.current.click()
    // addNote(note.title, note.description, note.tag)
  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })

  }
  return <div>
    <Addnotes />
    {/* <!-- Button trigger modal --> */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit  note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='my-2 container'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' placeholder="Enter title" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <textarea className="form-control" id="edescription" value={note.edescription} name='edescription' rows="3" onChange={onChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <textarea className="form-control" id="etag" name='etag' value={note.etag} rows="3" onChange={onChange}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length < 5 || note.edescription.length < 8} type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
          </div>
        </div>
      </div>
    </div>

    <div className='container row'>
      <h3>Your Notes</h3>
      <div className='container'>
        <h3>{notes.length == 0 && "No notes added"}</h3>
      </div>

      {notes.map((note) => {
        return <Noteitems key={note._id} updateNote={updateNote} note={note} />;
      })}
    </div>
  </div>;
}
