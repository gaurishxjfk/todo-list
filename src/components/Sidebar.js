/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from "@mui/system";
import { UserState } from "../context";

const Sidebar = (props) => {
  const {
    openSideBar,
    setOpenSideBar,
    userName,
    userAvatar,
    isDoneFilter,
    setIsDoneFilter,
    addUserOpenModal,
  } = props;

  const anchor = "left";

  const { isAdmin } = UserState();

  const [state, setState] = useState({
    left: openSideBar,
  });

  // eslint-disable-next-line no-shadow
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSideBar(false);
    setState({ ...state, [anchor]: open });
  };

  // eslint-disable-next-line no-shadow
  const list = (anchor) => {
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
        onKeyDown={toggleDrawer(anchor, true)}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <img
                src={userAvatar}
                alt=""
                style={{
                  borderRadius: "10rem",
                  height: "2.6rem",
                  width: "auto",
                }}
              />
            </ListItemIcon>
            <ListItemText primary={`Hello, ${userName}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Filters" />
          </ListItem>
          <ListItem sx={{ marginTop: -2 }}>
            <ListItemText primary="Done Tasks" />
            <Checkbox
              defaultChecked={isDoneFilter}
              onChange={() => setIsDoneFilter(!isDoneFilter)}
            />
          </ListItem>
        </List>
        <Divider />
        <List style={{ display: isAdmin ? "block" : "none" }}>
          <ListItem>
            <ListItemText primary="Users" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Add User"
              style={{ cursor: "pointer" }}
              onClick={() => addUserOpenModal()}
            />
          </ListItem>
        </List>
      </Box>
    );
  };

  const toggleSideBar = (value) => {
    setState({ ...state, left: { value } });
  };

  useEffect(() => {
    toggleSideBar(openSideBar);
  }, [openSideBar]);

  if (openSideBar) {
    return (
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    );
  }
  return <></>;
};

export default Sidebar;
