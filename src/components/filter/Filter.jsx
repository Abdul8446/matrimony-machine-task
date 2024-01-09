import React,{useContext} from 'react'
import './filter.css'
import Button from '@mui/material/Button';
import Datas from '../../json/matches.json'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { filtercontext } from '../../Contexts/filterContext';
   

function Filter(props) {
  const {
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
    setFilteredData,
    setCount,
    handlePageChange   
  } = useContext(filtercontext)
    const uniqueReligions = new Set(Datas.map(profile => profile.religion));
    const uniqueLocations = new Set(Datas.map(profile => profile.location));
    const religionsArray = Array.from(uniqueReligions); 
    const LocationsArray = Array.from(uniqueLocations); 
    const {type,handleClose}=props 

    console.log(props)
    const clearFilter = () => {
      setSelectedGender(null)
      setSelectedAge(null)
      setSelectedReligion(null)
      setSelectedLocation(null)
      setFilteredData(null)
      setCount(Math.round(Datas.length/4))
      setFilter(false)
    }
    
    const matchFilter = () => {
      type==='modal' && handleClose()
      console.log(selectedGender,selectedAge,selectedReligion,selectedLocation)
      let age=[]
      selectedAge!==null?selectedAge.label==='20-29'?age=[20,29]:age=[30,40]:age=[]
      const filter = Datas.filter(data=>
          (!selectedGender || data.sex === selectedGender) &&
          (age.length<1 || (data.age >= age[0] && data.age <= age[1])) &&
          (!selectedLocation || data.location === selectedLocation) &&
          (!selectedReligion || data.religion === selectedReligion)
      )
      handlePageChange(null,1)
      setCount(Math.round(filter.length/4))
      setFilter(true)
      setFilteredData(filter)
      setMatchData(filter.slice(0,4))
    }  

    const handleLocationChange = (event, value) => {
        setSelectedLocation(value);
      };
    
      const handleReligionChange = (event, value) => {
        setSelectedReligion(value);
      };
    
      const handleAgeChange = (event, value) => {
        setSelectedAge(value);
      };
    
      const handleGenderChange = (event, value) => {
        setSelectedGender(value);
      };
      
  return (
    <div className={`${type==='normal'?'filter':'open-filter'} modal-content`}>
          {type==='modal' && <span style={{margin:'10px 10px auto auto'}} onClick={handleClose}>⛌</span>}  
          <h2 className={`${type==='modal'&&'modal-heading'}`}>Search Profiles By:</h2>
          <Autocomplete
            disablePortal
            id="combo-box-demo"       
            options={['Male','Female']}
            onChange={handleGenderChange}
            value={selectedGender}
            sx={{ width: '85%',marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}
            renderInput={(params) => <TextField {...params} label="Gender" color='warning'/>}
          />
          <Autocomplete
            disablePortal 
            id="combo-box-demo"
            options={[{label:'20-29'},{label:'30-40'}]}
            onChange={handleAgeChange}
            value={selectedAge}
            sx={{ width: '85%',marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}
            renderInput={(params) => <TextField {...params} label="Age" color='warning'/>}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={religionsArray}
            onChange={handleReligionChange}
            value={selectedReligion}
            sx={{ width: '85%',marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}
            renderInput={(params) => <TextField {...params} label="Religion" color='warning'/>}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={LocationsArray}
            onChange={handleLocationChange}
            value={selectedLocation} 
            sx={{ width: '85%',marginLeft:'auto',marginRight:'auto',marginBottom:'20px'}}
            renderInput={(params) => <TextField {...params} label="Location" color='warning'/>}
          />  
          <Button variant='contained' color='warning' sx={{width:'85%',marginLeft:'auto !important',marginRight:'auto !important'}} onClick={matchFilter}>Search...</Button>
          {filter?<Button variant='outlined' color='warning' sx={{width:'85%',marginTop:'10px'}} onClick={clearFilter}>Clear Filter</Button>:''}
        </div>
  )
}

export default Filter