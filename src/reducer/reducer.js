const createTable = (tableSize = 36, tableType = 'numbers') => {
    let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','bb','cc','dd', 'ee', 'ff', 'gg'];
    let newTable = []

    for (let i = 1; i < tableSize/2 + 1; i++) {
        newTable.push({
        value: i,
        isOpen: false
        })
    }

    newTable = newTable.concat(newTable)
        .sort(() => Math.round(Math.random() * 100) - 50)
    
    if (tableType === 'letters') {
        newTable = [...newTable.map(item => ({...item, value: letters[item.value].toUpperCase()}))]
    }

    return newTable
}

const initialState = {
    memoTable: createTable(),
    tableSize: 36,
    tableType: 'numbers',
    one: null,
    two: null,
    index: 1,
    clicks: 0,
    pair: 0,
    minutes: 0,
    seconds: 0,
    records4x4: JSON.parse(localStorage.getItem('records4x4')) || [],
    records6x6: JSON.parse(localStorage.getItem('records6x6')) || [],
    records8x8: JSON.parse(localStorage.getItem('records8x8')) || [],
    isWin: false,
    isNotif: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'RESTART': 
            return {
                ...state,
                memoTable: createTable(actions.tableSize, actions.tableType),
                tableSize: actions.tableSize,
                tableType: actions.tableType,
                one: null,
                two: null,
                index: 1,
                clicks: 0,
                pair: 0,
                isWin: false
            };
        case 'OPEN_MEMO': 
            const old = state.memoTable[actions.id]
            const newItem = {...old, isOpen: true}
            let newArr = [...state.memoTable.slice(0, actions.id), newItem, ...state.memoTable.slice(actions.id + 1)]
            let oneUpdate = state.one;
            let twoUpdate = null;
            let indexUpdate = 2;
            let pairUpdate = state.pair;
            let clicksUpdate = state.clicks;

            if (state.index === 1) {
                oneUpdate = {...newItem, id: actions.id}
            }

            if (state.index === 2) {
                clicksUpdate += 1;
                twoUpdate = {...newItem, id: actions.id}
                indexUpdate = 3

                if (state.one.value === old.value) {
                    pairUpdate += 1
                }
            }
            if (state.index === 3) {
                oneUpdate = {...newItem, id: actions.id}

                if (state.one.value !== state.two.value) {
                    const id1 = state.one.id
                    const old1 = state.memoTable[id1]
                    const newItem1 = {...old1, isOpen: false}
                    const newArr1 = [...newArr.slice(0, id1), newItem1, ...newArr.slice(id1 + 1)]

                    const id2 = state.two.id
                    const old2 = state.memoTable[id2]
                    const newItem2 = {...old2, isOpen: false}
                    newArr = [...newArr1.slice(0, id2), newItem2, ...newArr1.slice(id2 + 1)]
                }
            }
            return {
                ...state,
                memoTable: newArr,
                one: oneUpdate,
                two: twoUpdate,
                index: indexUpdate,
                clicks: clicksUpdate,
                pair: pairUpdate,
            };
        case 'END_GAME4x4':
            return {
                ...state,
                isWin: true,
                records4x4: actions.records4x4,
            };
        case 'END_GAME6x6':
            return {
                ...state,
                isWin: true,
                records6x6: actions.records6x6,
            };
        case 'END_GAME8x8':
            return {
                ...state,
                isWin: true,
                records8x8: actions.records8x8
            };
        case 'ADD_USER':
            return {
                ...state,
                isNotif: actions.isNotif,
            };
        case 'RESULT':
            return {
                ...state,
                minutes: actions.minutes,
                seconds: actions.seconds
            };
        default:
            return state;
    }
}

export default reducer
