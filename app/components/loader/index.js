import React from 'react'
import './loader.scss'

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className='overlay'>
          <div className='loader' />
        </div>
      )}
    </>
  )
}

export default Loader
