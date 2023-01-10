import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaRegQuestionCircle, FaTicketAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <>
        <section className="heading">
            <h1>Please choose from an option below</h1>
        </section>

        <Link to='/new-job' className='btn btn-reverse btn-block'><FaQuestionCircle/> Create New Job</Link>
        <Link to='/jobs' className='btn btn-block'> View My Job</Link>
    </>
  )
}

export default Home