import React, { useRef } from "react"

export function CardShirt({setIcon}) {
    const selectRef = useRef(null)

    function selOption(){
        if (selectRef) {
            setIcon (selectRef.current.value)
        }
    }

    return (
        <div className='card_shirt' style={{color: "white"}}>
            <div>Select card shirt:</div>
            <select className="select" ref={selectRef} onChange={() => selOption()}>
                <option>Card shirt (select)</option>
                <option value='numbers'>Opt 1 (numbers)</option>
                <option value='letters'>Opt 2 (letters)</option>
                <option value='images'>Opt 3 (images)</option>
            </select>
        </div>
    )
}