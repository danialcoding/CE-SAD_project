import React from "react";
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { MdDashboard } from "react-icons/md";
import {FaUser,FaCalendar,FaMailBulk,FaPhone,FaQuestion,FaCircle,} from "react-icons/fa";



import './profile.css';

import UserInformation from "../../components/userInformation/userInformation";

export default Profile;

function Profile() {
    


    return(
        <>
        <div className="profile profile-container">
            <Sidebar backgroundColor="#304D30" collapsed={false}>
                <div>test</div>
                <Menu
                    menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        if (level === 0)
                        return {
                            color: disabled ? '#000' : '#000',
                            backgroundColor: active ? '#304D30' : undefined,
                        };
                    },
                    label: {
                        color: '#f0000',
                    },
                    icon: {
                        color: '#f0000',
                    },
                    SubMenuExpandIcon: {
                        color: '#000',
                    },
                    subMenuContent: {
                        color: '#fd0600',
                    },
                    }}>
                    <MenuItem icon={<MdDashboard/>}>Dashboard</MenuItem>
                    <MenuItem icon={<FaUser/>}>User Informaion</MenuItem>
                    {/* <SubMenu label="HELOOO" icon={<FaCalendar/>}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                    </SubMenu> */}
                    
                </Menu>
            </Sidebar>
            <main className="main"> <UserInformation/></main>
        </div>
        
        </>
    );
}