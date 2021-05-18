import React from 'react'
import { FormattedMessage } from 'react-intl'
import ContextStore from './store'
import './App.css'

const App = () => {
  const { getUsername } = ContextStore.useStoreState(s => s);

  return (
    <span className="app">
      <img alt="logo" src={`${process.env.PUBLIC_URL}/logo192.png`} />
      <h1 className="title">
        <FormattedMessage id="app.title" description="Title text" defaultMessage="SRM Example" />
        <span role="img" aria-label="trophee">🏆</span>
      </h1>
      <h2 className="greeting">
        <FormattedMessage id="app.greeting" description="Greeting text" defaultMessage="Hi {name}!" values={{ name: getUsername() }} />
      </h2>
    </span>
  )
}

export default App
