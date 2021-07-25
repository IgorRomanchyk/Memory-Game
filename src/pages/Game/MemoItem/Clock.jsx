import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reducer/actions'
import history from '../../../history'

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      type: this.props.tableType
    };
    this.timerId = null
    this.stopTime = null
  }

  tick = () => {
    const seconds = this.state.seconds + 1
    const minutes = this.state.minutes + 1

    if (seconds > 59) {
      this.setState({minutes, seconds: 0});
    } else {
      this.setState({minutes: this.state.minutes, seconds});
    }
  }

  getArrRecords = (records, setRecords) => {
    const recordsUpdate = [...records, this.state].sort((a, b) => {
      if (a.minutes > b.minutes){
        return 1
      } else if (a.minutes < b.minutes) {
        return -1
      } else {
        if (a.seconds > b.seconds) {
          return 1
        }
        if (a.seconds < b.seconds) {
          return -1
        }
      }
      return 0
    }).filter((i, id) => id < 10)
    localStorage.setItem(setRecords, JSON.stringify(recordsUpdate))
    return recordsUpdate
  }

  tickTime = () => {
      this.props.addResult(this.state.minutes, this.state.seconds)
       
      clearInterval(this.timerId);  
      this.timerId = null

      if (this.props.tableSize === 16) {
        this.props.endGame4x4(this.getArrRecords(this.props.records4x4, 'records4x4'))
      }

      if (this.props.tableSize === 36) {
        this.props.endGame6x6(this.getArrRecords(this.props.records6x6, 'records6x6'))
      }

      if (this.props.tableSize === 64) {
        this.props.endGame8x8(this.getArrRecords(this.props.records8x8, 'records8x8'))
      }
      
      history.push('./congratulation')
  }
  
  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);  
    this.timerId = null
  }

  componentDidUpdate() {
    const {pair, tableSize, isWin} = this.props;

    if (pair ===tableSize/2 && !isWin) {
      this.tickTime()
    }
  }

  onNewGameClick = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(this.tick, 1000);
    history.push('./welcome')
  }

  onRestart = () => {
    clearInterval(this.timerId)
    this.setState({
      minutes: 0,
      seconds: 0,
    })
    this.timerId = setInterval(this.tick, 1000);
    this.props.restart(this.props.tableSize, this.props.tableType)
  }

  render() {
    return (
      <div>
        <div className='memo_clock'>
          <div>Pair: {this.props.pair}</div>
          <div style={{ margin: "0" }}>
              {(this.state.minutes >= 10)? this.state.minutes: "0" + this.state.minutes}:
              {(this.state.seconds >= 10)? this.state.seconds: "0" + this.state.seconds}
          </div>
        </div>
        <div className='memo_button'>
              <button className='button' onClick={this.onNewGameClick}>New Game</button>
              <button className='button' onClick={this.onRestart}>Restart</button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({ memoTable, tableSize, tableType, pair, minutes, seconds, records4x4, records6x6, records8x8, isWin }) => ({
  memoTable,
  tableSize,
  tableType,
  pair,
  minutes,
  seconds,
  records4x4,
  records6x6,
  records8x8,
  isWin
});

export default connect(mapStateToProps, actions)(Clock)