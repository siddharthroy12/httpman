import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import Header from './Components/Header'
import Dashboard from './Screens/Dashboard'
import Project from './Screens/Project'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/project/:id'>
          <Project />
        </Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
