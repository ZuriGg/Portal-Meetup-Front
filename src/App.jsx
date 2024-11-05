import {Route, Routes} from 'react-router-dom'


import Validate from './Routes/Validation/Validate.jsx'
import Recover from './Routes/RecoverPass/Recover.jsx';

function App() {
  return (
   <Routes>
      <Route path='validate' element={<Validate/>}/>
      <Route path="recover" element={<Recover/>}/>
   </Routes>
  )
}

export default App;
