import { Router, Link, Switch, Route } from 'react-router-dom'

import MemoryApp from './pages/Game/Memory';
import { NotFound } from './pages/Notfound/Notfound';
import { Welcome } from './pages/Welcome/Welcome'
import { Congratulation } from './pages/Congratulation/Congratulation'
import { Profile } from './pages/Profile/Profile';
import { Records } from './pages/Records/Records';
import { useSelector } from "react-redux";
import { users } from './pages/Welcome/Welcome';
import './style.css'

import history from './history'

function App() {
  const isNotif = useSelector(state => state.isNotif) 
  
  return (
    <Router history={history}>
      {isNotif || users ? <div className='welcome_navigation'>
        <nav className='navigation'>
          <ul style={{display: "flex", justifyContent: "space-between"}}>
            <li>
              <Link to="/">Home</Link>
            </li> 
            <li style={{paddingRight: "15px"}}>
              <Link to="/records">Records</Link>
            </li> 
          </ul>
        </nav>
        <div className="welcome_profile" onClick={() => history.push('/profile')}>{users[0].firstName[0].split()}</div>
      </div> : null}
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/profile"  component={Profile}/>
        <Route path="/game" component={MemoryApp} />
        <Route path="/congratulation" component={Congratulation} />
        <Route path="/records" component={Records} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
 
export default App;