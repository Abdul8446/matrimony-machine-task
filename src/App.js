import './App.css';
import {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Matches from './components/matches/Matches';
import ProfilePage from './components/profile-page/ProfilePage';
import Datas from './json/matches.json'
import { filtercontext } from './Contexts/filterContext';

   
function App() {
  const [matchData, setMatchData] = useState([])  
  const [count, setCount] = useState(Math.round(Datas.length/4))
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filter,setFilter]=useState(false)
  const [filteredData, setFilteredData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex=(value-1)*4
    const endIndex = startIndex + 4;
    const slicedData = filter?filteredData.slice(startIndex,endIndex):Datas.slice(startIndex, endIndex);
    setMatchData(slicedData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (                
    <div className="App"> 
      <filtercontext.Provider value={{
        matchData,
        setMatchData,
        selectedGender,
        setSelectedGender,
        selectedAge,
        setSelectedAge,
        selectedReligion,
        setSelectedReligion,
        selectedLocation,
        setSelectedLocation,
        filter,
        setFilter,
        filteredData,
        setFilteredData,
        count,
        setCount,
        currentPage,
        setCurrentPage,
        handlePageChange
      }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Matches/>} exact path='/'/>
            <Route element={<ProfilePage/>} exact path='/profile'/>
          </Routes>      
        </BrowserRouter>
      </filtercontext.Provider>
    </div>
  );
}

export default App;
