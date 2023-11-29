import React from 'react'
import 
{ BsGrid1X2Fill,  BsPeopleFill, 
   BsMenuButtonWideFill, BsFillGearFill, BsPeople, BsPersonPlus, BsHospital}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsHospital  className='icon_header'/> Sneh Hospital
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/patient">
                    <BsPeopleFill className='icon'/>Patient 
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Admitted Pateint">
                    <BsPeople className='icon'/>Regular Checkup
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/addnew">
                    <BsPersonPlus className='icon'/> Add New
                </Link>
            </li>
           
           
        </ul>
    </aside>
  )
}

export default Sidebar