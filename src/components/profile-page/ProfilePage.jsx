import React,{useEffect, useRef, useState} from 'react'
import './profile-page.css'
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import Datas from '../../json/matches.json'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkIcon from '@mui/icons-material/Work';
import ReplyIcon from '@mui/icons-material/Reply';

function ProfilePage() {
  const location = useLocation()
  const {profileId} = location.state
  const scrollRef = useRef(null);
  const [profileData, setProfileData]=useState(null)
  const navigate=useNavigate()

  console.log(profileData)

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -100 : 100;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(()=>{
      setProfileData(Datas.find(profiles=>profiles.profileId===profileId))
  },[profileId])

  console.log(profileId)
 
  return (      
    <div className='profile-container'>
      {/* =======================================================================left side contents */}
      <div className='profile-left-section'>
        <Button variant='outlined' className='back-button' color='secondary' startIcon={<ReplyIcon/>} sx={{margin:'0 auto 1rem 3rem'}} onClick={()=>{navigate('/')}}>Back</Button>
        <img src={require('../../assets/Profile images/Lilith Insko1.webp')} alt="" height='auto' width='85%' className='profile-image-big'/>
        <div className='button-container'>
          <button className="arrow-button left" onClick={() => handleScroll('left')}>
            {'<'}
          </button>
          <div className='profile-image-small-section' ref={scrollRef}>
            <img src={require('../../assets/Profile images/Lilith Insko1.webp')} alt="" height='100%' width='auto' className='profile-image-small' style={{marginRight:'5px'}}/>
            <img src={require('../../assets/Profile images/Lilith Insko2.jpeg')} alt="" height='100%' width='auto' className='profile-image-small' style={{marginRight:'5px'}}/>
            <img src={require('../../assets/Profile images/Lilith Insko3.jpeg')} alt="" height='100%' width='auto' className='profile-image-small' style={{marginRight:'5px'}}/>
            <img src={require('../../assets/Profile images/Lilith Insko5.jpeg')} alt="" height='100%' width='auto' className='profile-image-small' style={{marginRight:'5px'}}/>
            <img src={require('../../assets/Profile images/Lilith Insko4.jpeg')} alt="" height='100%' width='auto' className='profile-image-small'/>
          </div>
          <button className="arrow-button right" onClick={() => handleScroll('right')}>
            {'>'}
          </button>
        </div>
        <div className='button-area'>
          <Button variant='contained' sx={{width:'50%',height:'100%'}}>CHAT NOW</Button>
          <Button variant='contained' sx={{width:'50%',height:'100%'}} color='warning'>SEND INTEREST</Button>
        </div>
      </div>   
      {/* =======================================================================left side contents */}

      {/* =====================================================================right side contents */}
      {profileData && <div className='profile-right-section'>
        <h1 className='profile-name'>{profileData.name}</h1>
        <div className='profile-basic-details'>
            <div className='profile-basic-details-inner'>
              <LocationCityIcon color='secondary' fontSize='large'/><span>Location/city</span><span style={{fontWeight:'bold'}}>{profileData.location}</span>
            </div>
            <div className='profile-basic-details-inner'>
              <Groups2Icon color='error' fontSize='large'/><span>Age</span><span style={{fontWeight:'bold'}}>{profileData.age}</span>
            </div>
            <div className='profile-basic-details-inner'>
              <WorkIcon color='warning' fontSize='large'/><span>Job</span><span style={{fontWeight:'bold'}}>{profileData.profession}</span>
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'left'}}>
          <h2 style={{marginLeft:'100px'}}>About me:</h2>
        </div>
        <p style={{marginRight:'50px',marginLeft:'50px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing
        and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum</p>
        <hr style={{width:'70%',margin:'20px auto'}}/>
        <div style={{display:'flex',justifyContent:'left'}}>
          <h2 style={{marginLeft:'100px'}}>Contact Info:</h2>
        </div>
        <div style={{display:'flex',justifyContent:'left'}}>
          <h4 style={{marginLeft:'100px'}}>Phone:&nbsp;<span>{profileData.phone}</span> </h4>
        </div>
        <div style={{display:'flex',justifyContent:'left'}}>
          <h4 style={{marginLeft:'100px'}}>Email:&nbsp;<span>{profileData.email}</span> </h4>
        </div>
        <div style={{display:'flex',justifyContent:'left'}}>
          <h4 style={{marginLeft:'100px'}}>Address:&nbsp;<span>{profileData.address}</span> </h4>
        </div>
      </div>}
      {/* =====================================================================right side contents */}
    </div>        
  )
}

export default ProfilePage