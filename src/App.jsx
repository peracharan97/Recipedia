import TextToSpeech from './TextToSpeech';
import Navbar from './Navbar';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import ItemsDiscription from './ItemsDiscription';
import VoiceControl from './VoiceControl';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/item/:id' element={<ItemsDiscription/>}/>
     <Route path='/' element={<TextToSpeech/>}/>
     <Route path='/voice' element={<VoiceControl/>}/>
    </Routes>
    
    </BrowserRouter>
      
   </>
  );
}
export default App;