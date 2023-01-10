import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createJob, reset } from '../features/job/jobSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewJob() {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.jobs)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate('/jobs')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate,message])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createJob({ category, description}))
    }

    if (isLoading) {
        <Spinner/>
    }

  return ( 

    <>
    <BackButton url = '/'  />
      <section className="heading">
            <h1>Create New Job</h1>    
            <p>Fill out the form below</p>
      </section>  

      <section className="form">
          <div className="form-group">
              <label htmlFor="name">Candidate Name</label>
              <input type="text" className="form-control"  value={name} disabled/>
          </div>
          <div className="form-group">
              <label htmlFor="email">Candidate Email</label>
              <input type="text" className="form-control"  value={email} disabled/>
          </div> 
          <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="product">Category</label>
                    <select 
                        name="category" 
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}> 
                            <option value="Select Category">Select category</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Full-Time">Full-Time</option>    
                            <option value="Contract">Contract</option>    
                            <option value="Internship">Internship</option>    
                    </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description of the job</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className='form-control' 
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
            </div>
            <div className="form-group">
                <button className="btn btn-block">Submit</button>
            </div>
            </form>
      </section>
    </>
  )
}

export default NewJob