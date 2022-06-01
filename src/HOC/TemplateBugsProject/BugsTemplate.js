import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MenuBugs from '../../COMPONENTS/Bugs/MenuBugs';
import ModalBugs from '../../COMPONENTS/Bugs/ModalBugs/ModalBugs';
import SideBarBugs from '../../COMPONENTS/Bugs/SideBarBugs';



import '../../index.css';



export const BugsTemplate = (props) => {

    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SideBarBugs />
                <MenuBugs />
                <Component {...propsRoute} />
                <ModalBugs />
            </div>
        </>
    }} />
}
