import React , {useContext} from 'react';
import notesContext from '../context/Notes/noteContext'

export default function Noteitems(props) {
    const context = useContext(notesContext)
    const {deleteNote} = context
    const { note, updateNote } = props;
    return (
        <div className='container col-md-3'>
            <div className="card my-2"> 
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                    <h5 className="card-title">{note.title} </h5>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>         
                </div>
            </div>
        </div>
    );
}
