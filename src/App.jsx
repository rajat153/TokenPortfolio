
import PortFolio from './Components/PortFolio/PortFolio'
import Header from './Components/Header/Header'
import WatchList from './Components/WatchList/WatchList'
import appStore from './utils/store/appStore'
import './App.css'
import { Provider } from 'react-redux'



function App() {
  return (
    <Provider store={appStore}>
      <div className='app'>
        <Header/>
        <PortFolio/>
        <WatchList/>
      </div>
    </Provider>
  )
}

export default App
