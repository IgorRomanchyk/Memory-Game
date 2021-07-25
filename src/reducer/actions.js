export const restart = (tableSize, tableType) => ({
    type: 'RESTART',
    tableSize,
    tableType
})

export const openMemo = (id) => ({
    type: 'OPEN_MEMO',
    id
})

export const endGame4x4 = (records4x4) => ({
    type: 'END_GAME4x4',
    records4x4,
})

export const endGame6x6 = (records6x6) => ({
    type: 'END_GAME6x6',
    records6x6,
})

export const endGame8x8 = (records8x8) => ({
    type: 'END_GAME8x8',
    records8x8,
})

export const addUser = (isNotif) => ({
    type: 'ADD_USER',
    isNotif
})

export const addResult = (minutes, seconds) => ({
    type: 'RESULT',
    minutes,
    seconds
})