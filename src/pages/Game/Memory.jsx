import React from "react"
import { useSelector } from "react-redux";
import MemoItem from "./MemoItem/MemoItem";
import Clock from './MemoItem/Clock'
import './memory.css'

const MemoryApp = () => {
  const memoTable = useSelector(state => state.memoTable)
  const tableSize = useSelector(state => state.tableSize)

  const widthClass = tableSize === 16 ? 'w-easy' : tableSize === 36 ? 'w-middle' : 'w-hard'

  return (
    <div className='memo_game'>
      <Clock/>
      <div className={`memo_table ${widthClass}`}>
        {memoTable && memoTable.map((item, id) => (
          <MemoItem key={id} id={id} memo={item}/>
        ))}
      </div>
    </div>
  )
}

export default MemoryApp
