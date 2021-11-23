import React from 'react'
import './App.scss'
import ContextStore from "./store"
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage'
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage'
import { ListDemoPage } from './pages/ListDemoPage/ListDemoPage'
import { ToastDemoPage } from './pages/ToastDemoPage/ToastDemoPage'
import { StepperDemoPage } from './pages/StepperDemoPage/StepperDemoPage'
import { UserTeamCardsDemoPage } from './pages/UserTeamCardsDemoPage/UserTeamCardsDemoPage'
import { Navigation } from './components/Navigation/Navigation'
import { DialogDemoPage } from './pages/DialogDemoPage/DialogDemoPage'

const routes = [
    {
        path: '/atoms/button',
        component: ButtonsDemoPage
    },
    {
        path: '/atoms/inputs',
        component: InputDemoPage
    },
    {
        path: '/atoms/dialog',
        component: DialogDemoPage
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
    },
    {
        path: "/component/toasts",
        component: ToastDemoPage,
    }
]

const App = () => {
    return (
        <div className='app'>
            <ContextStore.Provider>
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
            </ContextStore.Provider>
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
