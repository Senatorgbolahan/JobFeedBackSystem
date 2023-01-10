import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {closeJob, getJob, reset} from '../features/job/jobSlice'
import { getNotes, createNote, reset as noteReset } from '../features/notes/noteSlice'
import { FaPlus } from 'react-icons/fa'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  };

  Modal.setAppElement('#root')

function Job() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const {job, isLoading, isError, isSuccess, message} = useSelector((state) => state.jobs)
    const {notes, isLoading : noteIsLoading} = useSelector((state) => state.notes)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {jobId} = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getJob(jobId))
        dispatch(getNotes(jobId))
    }, [isError, message, jobId, dispatch])

    // Close Job
    const onJobClose = () => {
        dispatch(closeJob(jobId))
        toast.success("Job Closed")
        navigate('/jobs')
    }

    // Open/Close modal
    const openModal = () => {
        return setModalIsOpen(true)
    }

    // Open/Close modal
    const closeModal = () => {
        return setModalIsOpen(false)
    }

    // Create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, jobId}))
        closeModal()
    }

    if(isLoading || noteIsLoading){
       return <h3>Something Went Wrong</h3>
    }

  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url="/jobs" />
            <h2>Job ID: {job._id}  <span className={`status status-${job.status}`}>{job.status}</span></h2>
            <h3>Date Submitted: {new Date(job.createdAt).toLocaleString('en-US')}</h3>
            <h3>Category: {job.category}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of Job</h3>
                <p>{job.description}</p>
            </div>
            <h2>Notes</h2>
        </header>

        {job.status !== 'closed' && (<button onClick={openModal} className="btn" ><FaPlus/> Add Note</button>) }

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>
                X
            </button>
            <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea 
                            name="noteText" 
                            id="noteText" 
                            className='form-control' 
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder='Note text'></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>Submit</button>
                    </div>
                </form>
        </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}

        {job.status !== 'closed' && ( <button onClick={onJobClose} className = "btn btn-block btn-danger">Close Job</button>)}
    </div>
  )
}

export default Job