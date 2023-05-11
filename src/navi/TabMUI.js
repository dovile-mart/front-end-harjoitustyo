import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

//import ReseptilistaMUI from '../components/ReseptilistaMUI';
//import ReseptilomakeMUI from '../components/ReseptilomakeMUI';
//import LaatijalistaMUI from '../components/LaatijalistaMUI';
//import ReseptihakuMUI from '../components/ReseptihakuMUI';
//import Reseptit from '../components/Reseptit';
//import LaatijalomakeMUI from '../components/LaatijalomakeMUI';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Link, Outlet } from 'react-router-dom';

function TabMUI() {//(props)

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <AppBar position='sticky'>
        <Toolbar>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' centered selectionFollowsFocus TabIndicatorProps={{ style: { background: '#da707b'} }} 
            sx={{ flexGrow: 1, mb:1, textAlign: 'center', backgroundColor: 'inherit' }} textColor='inherit' >
            <Tab label='Etusivu' icon={<HomeIcon />} component={Link} to='/' />
            <Tab label='Kuvat ja lista' icon={<ListIcon />} component={ Link } to='kuvat'/>
           {/**  <Tab label='Reseptilista' icon={<ListIcon />} component={ Link } to='reseptit'/>*/}
           {/** <Tab label='Lisää resepti' icon={<CreateIcon />} component={ Link } to='rlomake' /> */}
            <Tab label='Laatijat' icon={<PeopleIcon />} component={ Link } to='laatijat'/>
            {/*<Tab label='Uusi laatija' icon={<FaceIcon />} component={ Link } to='llomake'/>*/}
            <Tab label='Haku'  icon={<SearchIcon />} component={ Link } to='hae'/>
          </Tabs>
        </Toolbar>        
      </AppBar>
          {/**valuet kommentoitu pois, koska muuten nääkyy tuplana kaikki */}
          {/*value === 0 && <ReseptilistaMUI reseptit={ props.reseptitPropsi} />*/}
          {/*value === 1 && <ReseptilomakeMUI />*/}
          {/*value === 2 && <LaatijalistaMUI laatijatPropsi={props.laatijatPropsi} />*/}      
          {/*value === 3 && <LaatijalomakeMUI  />*/}
       {/*   {value === 4 && <ReseptihakuMUI />}
          value === 3 && <Reseptit />*/}
      <Outlet />
    </Box>
  );
}

export default TabMUI;
