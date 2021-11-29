import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Primeui from "./Primeui";
import TabMenuListBar from "../components/TabMenuListBar";
import { UserState } from "../context";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  arrayCheck,
  compare,
  getTasks,
  todayDate,
} from "../components/CommonMethods";

//  styles
export const styles = {
  paper: {
    padding: 20,
    height: "70vh",
    width: "50%",
    margin: "30px auto",
  },
  doneTask: {
    textDecoration: "line-through",
    color: "grey",
  },
  pendingTask: {
    textDecoration: "none",
  },
};

const columns = [
  { field: "First_name", header: "First_name" },
  { field: "Last_name", header: "Last_name" },
  { field: "Username", header: "Username" },
];

// eslint-disable-next-line func-names
const Homepage = function (props) {
  const { addUserOpenModal } = props;

  Homepage.propTypes = {
    addUserOpenModal: PropTypes.func,
  };

  Homepage.defaultProps = {
    addUserOpenModal: PropTypes.func,
  };

  const { userID, isDoneFilter, setIsDoneFilter, isAdmin, users } = UserState();

  const [taskList, setTaskList] = useState(getTasks(userID).sort(compare));
  const [task, setTask] = useState("");
  const [dateValue, setDateValue] = useState(todayDate);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [todoForm, setTodoForm] = useState(false);
  const [adminPanel, setAdminPanel] = useState("");
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);

  let userName = "";
  let userAvatar = "";

  const setEditingMode = (id) => {
    setTodoForm(true);
    setIsEditing(true);
    setOpenModal(true);
    setTaskId(id);
  };

  if (arrayCheck(users)) {
    users.find((i) => {
      if (i.id === userID) {
        userName = i.First_name;
        userAvatar = i.Avatar;
      }
      return userName;
    });
  }

  const updateTask = (id) => {
    setEditingMode(id);
  };

  const updateTaskList = (updated) => {
    const result = taskList.map((i) =>
      i.id === taskId ? { ...i, name: updated, date: dateValue } : i
    );
    setTaskList(result);
    setIsEditing(false);
    setTask("");
    setDateValue(todayDate);
  };

  const delModalOpen = (id) => {
    setOpenDelModal(true);
    setTaskId(id);
  };

  const deleteTask = () => {
    const result = taskList.filter((i) => i.id !== taskId);
    setTaskList(result);
  };

  const handleClose = () => {
    setOpenDelModal(false);
  };

  useEffect(() => {
    localStorage.setItem(`task-${userID}`, JSON.stringify(taskList));
  }, [taskList, userID]);

  const eventObj = (ids, taskName, date, description) => {
    const id = ids;
    const title = taskName;
    const allDay = true;
    const start = new Date(date);
    const end = new Date(date);
    const desc = description;
    return { id, title, allDay, start, end, desc };
  };

  let filteredResults;
  if (arrayCheck(users)) {
    if (isDoneFilter) {
      filteredResults = taskList.filter(
        (i) => i.Task.includes(searchTask) && i.isDone === isDoneFilter
      );
    }
    filteredResults = taskList.filter((i) => i.Task.includes(searchTask));
  }

  const eventlist = filteredResults.map((i) =>
    eventObj(i.id, i.Task, i.date, i.Description)
  );

  const updateDate = (id, date) => {
    const result = taskList.map((i) =>
      i.id === id ? { ...i, date } : { ...i }
    );
    setTaskList(result);
  };

  const handleOnDeleteModal = (id) => {
    deleteTask(id);
    setOpenDelModal(false);
  };

  return (
    <>
      <Header
        userAvatar={userAvatar}
        userName={userName}
        setSearchTask={setSearchTask}
        searchTask={searchTask}
        isDoneFilter={isDoneFilter}
        setIsDoneFilter={setIsDoneFilter}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        setOpenSideBar={setOpenSideBar}
        openSideBar={openSideBar}
      />

      <Sidebar
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
        userName={userName}
        userAvatar={userAvatar}
        isDoneFilter={isDoneFilter}
        setIsDoneFilter={setIsDoneFilter}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        addUserOpenModal={addUserOpenModal}
      />

      {!isAdmin && (
        <TabMenuListBar
          openModal={openModal}
          setOpenModal={setOpenModal}
          taskList={taskList}
          setTaskList={setTaskList}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          updateTaskList={updateTaskList}
          taskId={taskId}
          updateTask={updateTask}
          delModalOpen={delModalOpen}
          eventlist={eventlist}
          updateDate={updateDate}
          userID={userID}
          task={task}
          setTask={setTask}
          dateValue={dateValue}
          setDateValue={setDateValue}
          setTaskId={setTaskId}
          deleteTask={deleteTask}
          searchTask={searchTask}
          isDoneFilter={isDoneFilter}
          setIsDoneFilter={setIsDoneFilter}
          todoForm={todoForm}
          setTodoForm={setTodoForm}
        />
      )}

      {isAdmin && <Primeui itemsData={users} columns={columns} />}

      <Dialog
        open={openDelModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete the todo from the list?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleOnDeleteModal(taskId)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Homepage;
