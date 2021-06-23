import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { List, Dog } from './Components';
import { DataLayer } from './Context/Context';
import reducer, { initialState } from './Context/reducer';

function App() {
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <Router>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/dog">
            <Dog />
          </Route>
        </Switch>
      </Router>
    </DataLayer>
  );
}

export default App;
