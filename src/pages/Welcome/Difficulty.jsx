import React, { useRef } from "react"

export function Difficulty({setDiff}) {
    const selectRef = useRef(null)

    function selOption(){
        if (selectRef) {
            setDiff (+selectRef.current.value)
        }
    }

    return (
        <div className='difficulty' style={{color: "white"}}>
            <div>Difficulty:</div>
            <select className="select" ref={selectRef} onChange={() => selOption()}>
                <option >Difficulty (select)</option>
                <option value="16">easy ( 4x4 )</option>
                <option value="36">medium ( 6x6 )</option>
                <option value="64">hard ( 8x8 )</option>
            </select>
        </div>
    )
}