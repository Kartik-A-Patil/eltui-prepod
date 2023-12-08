import React, { useContext, useEffect, useState } from 'react'
import CompContext from '../context/compt/compcontext';
import { useHistory } from 'react-router-dom';
const Prevnext = (props) => {
    const context = useContext(CompContext)
    const history = useHistory();
    const { totalPages, currentPage } = context;
    const { comp } = props
    const handlePrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            history.push(`?page=${prevPage}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            history.push(`?page=${nextPage}`);
        }
    };

    return (
        <div className="prev-next-btn">
            <button className='prev' onClick={handlePrevPage} disabled={currentPage === 1} style={{ opacity: currentPage !== 1 ? 1 : 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" id="IconChangeColor"
                    style={{ position: 'initial', height: '30px', width: '25%' }}> <path stroke="#ffffff" d="M0 0h24v24H0z" fill="none" id="mainIconPathAttribute" strokeWidth="0"></path> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" id="mainIconPathAttribute" stroke="#ffffff"></path> </svg>
                <p>Previous</p></button>
            <button className='next' onClick={handleNextPage} disabled={currentPage === totalPages} style={{ opacity: currentPage !== totalPages && comp.length ? 1 : 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" id="IconChangeColor" transform="scale(-1, 1)" style={{ position: 'initial', height: '30px', width: '25%' }}> <path stroke="#ffffff" d="M0 0h24v24H0z" fill="none" id="mainIconPathAttribute" strokeWidth="0"></path> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" id="mainIconPathAttribute" stroke="#ffffff"></path> </svg>
                <p> Next</p></button>
        </div>
    )
}

export default Prevnext