import React, { useState } from 'react';
import { InterviewCard } from "./InterviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import s from './InterviewCard.module.css';

export const InterviewTabs = ({ interviewData,refresh, update, userType }) => {
    // console.log(interviewData,userType)
    const [page, setPage] = useState(1);
    const itemlimit = 4;
    const pa = interviewData.length / itemlimit
    const no = pa > parseInt(pa) ? parseInt(pa) + 1 : parseInt(pa)
    const pages = new Array(no).fill(1)
    const paginations = () => {
        return (
            <div className={s.pagination}>
                <div className={s.paginationItem} onClick={() => setPage(page > 1 ? page - 1 : 1)}> <FontAwesomeIcon icon={faAngleLeft} /></div>
                {pages.map((pageno, i) => {
                    return (
                        <div className={`${s.paginationItem} ${page === i + 1 ? s.active : ''}`} key={i} onClick={() => setPage(i + 1)}>{i + 1}</div>
                    )
                })}
                <div className={s.paginationItem} onClick={() => setPage(page < pages.length ? page + 1 : page)}> <FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
        )
    }

    return (
        <div className="container">
            {paginations()}
            <div className="row">
                {
                    interviewData
                        // .filter(item => item.status === status)
                        .slice((page - 1) * itemlimit, page * itemlimit)
                        .map((item, i) => {
                            return (
                                <div className="col-sm-12 col-md-6 my-1" key={i}>
                                    <InterviewCard
                                        data={item}
                                        userType={userType}
                                        refresh = {refresh}
                                        update={update} />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )

}