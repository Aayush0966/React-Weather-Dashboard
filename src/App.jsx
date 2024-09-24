
import './App.css'
import Dashboard from './components/Dashboard'
import WeatherDetails from './components/WeatherDetails'
import { CityProvider } from './context/CityContext'

function App() {

  return (

    <CityProvider>
    <Dashboard />
    {/* <WeatherDetails /> */}
    </CityProvider>

  )
}

export default App
