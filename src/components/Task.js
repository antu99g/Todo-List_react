import { useState, useRef } from 'react';
// Fetch APIs
import { deleteTask, editTask } from "../api";

function Task ({task}) {
   // State for checkbox status
   const [taskDone, setTaskDone] = useState(false);
   // State for hiding a task (after deleting)
   const [hidden, setHidden] = useState(false);
   // State for editing a task
   const [taskTitle, setTaskTitle] = useState(task.title);
   // State for hiding edit-button when a task is done
   const [editingTitle, setEditingTitle] = useState(false);

   const editInputRef = useRef(null);


   // Function for checkbox click
   const handleCheckboxClick = (e) => {
      setTaskDone(e.target.checked);
      // task.completed = !(task.completed);
      const body = { completed: !(task.completed) };
      editTask(task.id, body);
   };


   // Function for deleting a task
   const handleDeleteTask = (id) => {
      setHidden(true);
      deleteTask(id);
      // fetch(`https://jsonplaceholder.typicode.com/tasks/${id}`, {
      //    method: "DELETE",
      // });
   }


   // Function for editing a task
   const handleEditTask = (id) => {
      setTaskTitle(editInputRef.value);
      setEditingTitle(false);
      const body = {title: taskTitle};
      editTask(id, body);
      // fetch(`https://jsonplaceholder.typicode.com/tasks/${id}`, {
      //    method: "PUT",
      //    body: JSON.stringify({
      //       title: taskTitle
      //    }),
      //    headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //    },
      // });
   }


   return (
      <div className={`task ${taskDone && "taskdone"} ${hidden && "hidden"}`}>
         <input type="checkbox" onClick={handleCheckboxClick} />

         <span>
            <h4>Task</h4>

            {!taskDone && (
               <img
                  src={
                     editingTitle
                        ? "https://cdn-icons-png.flaticon.com/512/1632/1632708.png"
                        : "https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                  }
                  alt="edit"
                  className={editingTitle ? "editCross" : "editBtn"}
                  onClick={() => {
                     setEditingTitle(!editingTitle);
                  }}
               />
            )}

            {editingTitle ? (
               <div className="editTaskInput">
                  <input
                     type="text"
                     ref={editInputRef}
                     placeholder="Type here"
                  />
                  <button
                     onClick={() => {
                        handleEditTask(task.id);
                     }}
                  >
                     Save
                  </button>
               </div>
            ) : (
               <p>{taskTitle}</p>
            )}
         </span>

         <img
            src="https://cdn-icons-png.flaticon.com/512/8995/8995303.png"
            alt="delete"
            className="deleteBtn"
            onClick={() => {
               handleDeleteTask(task.id);
            }}
         />
      </div>
   );
}

export default Task;