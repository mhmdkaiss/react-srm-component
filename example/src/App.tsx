import './App.scss'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage'
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage'
import { ListDemoPage } from './pages/ListDemoPage/ListDemoPage';
import { Navigation } from './components/Navigation/Navigation'
import React from 'react'
import { StepperDemoPage } from './pages/StepperDemoPage/StepperDemoPage'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { UserTeamCardsDemoPage } from './pages/UserTeamCardsDemoPage/UserTeamCardsDemoPage'

const routes = [
  {
    path: '/atoms/button',
    component: ButtonsDemoPage
  },
  {
    path: '/component/inputs',
    component: InputDemoPage
  },
  {
    path: '/component/stepper',
    component: StepperDemoPage
  },
  {
    path: '/component/user-team-cards',
    component: UserTeamCardsDemoPage,
  },
  {
    path: "/component/lists",
    component: ListDemoPage,
  }
]

const App = () => {
  return (
    <div className='app'>
      <Router basename={'/'}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' className='title'>
              NC Shared library
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='content d-flex flex-row w-100 h-100'>
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
  )
}

export default App
