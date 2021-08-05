import React  from "react"
import {useSelector} from 'react-redux'

import './style.css'

export function Records() {
    const records4x4= useSelector(state => state.records4x4)
    const records6x6= useSelector(state => state.records6x6)
    const records8x8= useSelector(state => state.records8x8)


    return (
        <div className="record_page">
            <h1 className='records'>Your records</h1>    
            <div className='records_container'>
                <div>
                    {records4x4 ? (
                        <>
                        <p style={{textAlign: "center"}}>Records list 4x4</p>
                        <ol>
                            {records4x4.map((i, id) => 
                                <li key={id}>
                                    {i.minutes>=10 ? i.minutes : '0' + i.minutes}:
                                    {i.seconds>=10 ? i.seconds : '0' + i.seconds} (type: {i.type})
                                </li>)}
                        </ol>
                        </>
                    ): null}
                </div>
                <div>
                    {records6x6 ? (
                        <>
                        <p style={{textAlign: "center"}}>Records list 6x6</p>
                        <ol>
                            {records6x6.map((i, id) => 
                                <li key={id}>
                                    {i.minutes>=10 ? i.minutes : '0' + i.minutes}:
                                    {i.seconds>=10 ? i.seconds : '0' + i.seconds} 
                                    (type: {i.type})
                                </li>)}
                        </ol>
                        </>
                    ): null}
                </div>
                <div>
                    {records8x8 ? (
                        <>
                        <p style={{textAlign: "center"}}>Records list 8x8</p>
                        <ol>
                            {records8x8.map((i, id) => 
                                <li key={id}>
                                    {i.minutes>=10 ? i.minutes : '0' + i.minutes}:
                                    {i.seconds>=10 ? i.seconds : '0' + i.seconds} 
                                    (type: {i.type})
                                </li>)}
                        </ol>
                        </>
                    ): null}
                </div>
            </div>
        </div>
    )
}