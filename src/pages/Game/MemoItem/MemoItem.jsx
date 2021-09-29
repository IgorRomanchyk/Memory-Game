import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMemo } from "../../../reducer/actions";
import './memoitem.scss';


const MemoItem = ({id, memo}) => {
    const dispatch = useDispatch();
    const tableType = useSelector(state => state.tableType) 
    const classes = memo.isOpen ? 'memo_open' : 'memo_close'
    const transform = memo.isOpen ? null : 'memo_open'

    const memoItem = tableType === 'images' ? (
        <div className={`memo_value ${transform}`}>
            <img src={require(`../../../img/${memo.value}.png`).default} className='img' alt=''/>
        </div>
    ) : (
        <div className={`memo_value ${transform}`}>{memo.value}</div>
    )
    return (
        <div className="memo" onClick={() => dispatch(openMemo(id))}>
            {memoItem}
            <div className={`memo_cover ${classes}`} />
        </div>
    )
}

export default MemoItem
