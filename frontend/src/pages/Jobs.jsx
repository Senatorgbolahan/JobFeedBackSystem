import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, reset} from '../features/job/jobSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import JobItem from '../components/JobItem'


function Jobs() {
    const {isLoading, isSuccess} = useSelector((state) => state.jobs)
    const {jobs} = useSelector((state) => state.jobs)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch,isSuccess])

    useEffect(() => {
        dispatch(getJobs())
    }, [dispatch])

    if (isLoading) {
        <Spinner />
    }

  return (
    <>
        <BackButton url= '/' />
        <h1>Jobs</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Category</div>
                <div>Description</div>
                <div></div>
            </div>
            {jobs.map((job) => (
            <JobItem key={job._id} job={job}/>
            ))}
        </div>
    </>
  )
}

export default Jobs