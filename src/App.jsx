import {Route, Routes} from 'react-router-dom'


import Validate from './Routes/Validation/Validate.jsx'

function App() {
  return (
   <Routes>
      <Route path='validate' element={<Validate/>}/>
   </Routes>
  )
}

export default App;
