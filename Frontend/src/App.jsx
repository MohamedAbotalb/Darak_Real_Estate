import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import ReviewList from './components/ReviewList';
import ReportUserList from './components/ReportUserList';
import ReportPropertyList from './components/ReportPropertyList';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/reviews" component={ReviewList} />
        <Route path="/report-users" component={ReportUserList} />
        <Route path="/report-properties" component={ReportPropertyList} />
        <Route path="/properties/:slug" component={PropertyDetails} />
      </Switch>
    </Router>
  );
}

export default App;
