import React from "react";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { IoClose } from "react-icons/io5";


import './userInformation.css';



export default UserInformation;

function UserInformation() {
    const [username, setUsername] = useState("test");
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState(false);





    const closeEditMode = () => {
        setEditMode(false)
    }
    
    const openEditMode = () => {
        setEditMode(true)
    }
    
    const onEditHandler = () => {
        closeEditMode();
    }

    return(
        <>
            <div className="user-information user-information-container">
                <div className="username_div">
                    <div className="icon">
                        <MdDashboard />
                    </div>
                    <label>test</label>
                    <input id={id} readOnly={!editMode} type={"text"} value={username} onChange={(event) => {setUsername(event.target.value);}}/>
                    <MdDashboard/>
                    {editMode && (
                    <button className="textfield--header-action"onClick={closeEditMode} aria-label="Cancel" title="Cancel" aria-controls={id}>
                        <IoClose aria-hidden="true" />
                    </button>
                    )}
                    <button onClick={editMode ? onEditHandler : openEditMode} aria-label={editMode ? 'Save' : 'Edit'} title={editMode ? 'Save' : 'Edit'} className="textfield--header-action"aria-controls={id}>                  
                        {editMode ? (<IoIosSave aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                    </button>
                </div>
                

                   
                
            </div>
        </>
    );
}