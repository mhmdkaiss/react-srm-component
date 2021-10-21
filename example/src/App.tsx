import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.scss'
import { Navigation } from './components/Navigation/Navigation';
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage';
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage';

const routes = [
  {
    path: "/atoms/button",
    component: ButtonsDemoPage,
  },
  {
    path: "/component/inputs",
    component: InputDemoPage,
  }
];

const App = () => {
  return (

    <div className='app'>
      <Router basename={"/"}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className='title'>
              NC Shared library
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="content d-flex flex-row w-100 h-100">
          <div className='navigation'>
            <Navigation></Navigation>
          </div>
          <div className='content p-5'>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App
