import {  Checkbox, Divider, List,  ListItem,  ListItemIcon,  ListItemText,  SwipeableDrawer } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'

const Sidebar = ({openSideBar,setOpenSideBar,userName,userAvatar,isDoneFilter,setIsDoneFilter}) => {

    var anchor = 'left';//assigning side for swipeable drawer
    
    const [state, setState] = useState({
        left: openSideBar
      });
      
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
          
        ) {
          return;
        }        
        setOpenSideBar(false)
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, true)}
          onKeyDown={toggleDrawer(anchor, true)}
        >
          <List>
            
              <ListItem button >
                <ListItemIcon>
                    <img src={userAvatar} alt="" style={{borderRadius : '10rem',height:'2.6rem',width: 'auto'}}/>
                </ListItemIcon>
                <ListItemText primary={`Hello, ${userName}`} />
              </ListItem>
              <Divider />
              <ListItem >
                      <ListItemText primary="Filters" />
              </ListItem>   
              <ListItem sx={{marginTop : -2}}>                 
                      <ListItemText primary="Done Tasks" />
                      <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} />                                        
              </ListItem>
            
          </List>
         
        </Box>
      );

      const toggleSideBar = (value) => {
        setState({ ...state, left : {value} });
      }
      
      useEffect(() => {
        toggleSideBar(openSideBar) 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openSideBar]) 
     
     if(openSideBar){        
            return (       
                <>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
                </>            
            )
     }else{
         return(<></>)
     }
}

export default Sidebar
