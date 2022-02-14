import React,{useContext, useState} from 'react';
import notesContext from '../context/Notes/noteContext'
export default function Addnotes() {
    const context = useContext(notesContext)
    const {addNote} = context

    const [note, setnote] = useState({title:"", description:"", tag:""});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setnote({title:"", description:"", tag:""})

    }
    
    const onChange = (e) => {
      //this ...note syntax for to add value into note instead of delete the value of whole.
        setnote({...note, [e.target.name]:e.target.value})

    }

  return <div>
      <div className='container my-3'>
      <h1>Add Your Notes</h1>
      <form className='my-2 container'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder="Enter title" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" value={note.description} name='description' rows="3" onChange={onChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <textarea className="form-control" id="tag" value={note.tag} name='tag' rows="3" onChange={onChange}></textarea>
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 8} type="button" className="btn btn-success" onClick={handleClick}>Add note</button>
      </form>

    </div>
  </div>;
}
