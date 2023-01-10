import axios from "axios";


const API_URL = '/api/jobs/'


// Get user job
const getNotes = async(jobId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response =  await axios.get(API_URL + jobId + '/notes', config)

    return response.data;
}

// Create job note
const createNote = async(noteText, jobId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response =  await axios.post(API_URL + jobId + '/notes', {text: noteText},config)

    return response.data;
}

const noteService = {
    getNotes,
    createNote,
}

export default noteService;