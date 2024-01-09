import React,{ useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import './matches.css'
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Datas from '../../json/matches.json'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Filter from '../filter/Filter';
import Modal from '@mui/material/Modal';
import { filtercontext } from '../../Contexts/filterContext';
   
function Matches() {     
  const {
        matchData,
        setMatchData,
        setSelectedGender,
        setSelectedAge,
        setSelectedReligion,
        setSelectedLocation,
        filter,
        setFilter,
        filteredData,
        setFilteredData,
        count,
        setCount,
        currentPage,
        handlePageChange   
  } = useContext(filtercontext)    
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const clearFilter = () => {
    setSelectedGender(null)
    setSelectedAge(null)
    setSelectedReligion(null)
    setSelectedLocation(null)
    setFilteredData(null)
    setCount(Math.round(Datas.length/4))
    setFilter(false)
    handlePageChange(null,1)
  }

  
  useEffect(() => {     
    setMatchData(Datas.slice(0,4)) 
  }, []);

  const profilePage = (profileId)=> {
    navigate(`/profile`, { state: {profileId} });
  }
  
  return (
    <>
      <div className='filters-header' onClick={!filter?handleOpen:clearFilter}>{!filter?<>Profile Filters <svg style={{height:'11px',width:'10px'}} viewBox="0 0 80 90" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="m 0,0 30,45 0,30 10,15 0,-45 30,-45 Z"></path></svg></>:<>Clear Filters ⛌</>}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Filter type='modal' handleClose={handleClose}/>
      </Modal>   
      <div className='container'>
      {/* // {`${hideFilter?'container':''}`}> */}
        {/* =======================================================================left side contents */}
        <Filter type='normal'/>{/*Big screen filter*/}
      
        {/* =======================================================================left side contents */}
    
        {/* =====================================================================right side contents */}
        <div className='matches-right-section'>
          <div className='matches-header'><h1 className='filter-heading'>Showing {filter?filteredData.length:Datas.length} Results</h1></div>
          <div className='card-container'>
            {matchData && matchData.map((data,i)=>(
              <div key={i} className='card'>
                <div className={`${data.sex===`Male`?'cardimage1':'cardimage2'}`}>
                  <img src={data.sex===`Male`?
                  require('../../assets/Profile images/male1.jpeg'):
                  require('../../assets/Profile images/Lilith Insko1.webp')} 
                  alt="" height='100%' width='100%' style={{borderRadius:'inherit'}}/>
                </div>
                <div className='card-right-side'>  
                    <div className='card-favorite'>      
                      <FavoriteBorderIcon color='disabled'/>    
                    </div>
                    <div className='name'>
                      <span>{data.name}&nbsp;{data?.sex==='Male'?<MaleIcon sx={{color:'#3498db'}}/>:<FemaleIcon sx={{color:'#e91e63'}}/>}</span>  
                    </div>
                    <div className='other-details'>    
                      <span className='other-details-items'><LocationOnIcon style={{fontSize:'smaller'}}/> {data.location}</span> 
                      <span className='other-details-items'>{data.age}</span>
                      <span className='other-details-items'>{data.profession}</span>
                    </div>
                    <hr style={{marginLeft:'15px'}}/>
                    <div className='card-bottom'>
                      <span className='outlined-button'>Chat now</span>   
                      <span className='outlined-button'>Whatsapp</span>
                      <span className='outlined-button'>Send interest</span>
                      <span className='outlined-button' onClick={()=>{profilePage(data.profileId)}}>More details</span>
                    </div>
                </div>
              </div>  
            ))}  
          </div>
          <Stack spacing={2} className='pagination'>
            <Pagination count={count} color="warning" page={currentPage} onChange={handlePageChange}/>
          </Stack>
        </div>
        {/* =====================================================================right side contents */}     
      </div>
    </>
  ) 
}   
    
export default Matches   