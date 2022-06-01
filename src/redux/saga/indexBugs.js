import React from 'react';
import HeaderMain from '../../COMPONENTS/Bugs/Main/HeaderMain';
import InfoMain from '../../COMPONENTS/Bugs/Main/InfoMain';
import ContentMain from '../../COMPONENTS/Bugs/Main/ContentMain';

export default function indexBugs() {
    return (
        <div className="main">
            < HeaderMain />

            <InfoMain />

            <ContentMain />
        </div>

    )
}