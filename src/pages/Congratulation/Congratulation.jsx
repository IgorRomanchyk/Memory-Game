import {useSelector} from 'react-redux'

export function Congratulation() {
    const minutes = useSelector(state => state.minutes)
    const seconds = useSelector(state => state.seconds)
    const min = minutes >= 10 ? minutes : '0' + minutes
    const sec = seconds >= 10 ? seconds : '0' + seconds

    return (
        <div>
            <h1 style={{ marginTop: "240px", fontSize: "40px", fontWeight: "600", color: "white", textAlign: "center" }}>
                Congratulation your result: {min}:{sec}
            </h1>
        </div>
    )
}