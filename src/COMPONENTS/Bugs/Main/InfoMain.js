import React from 'react'

export default function InfoMain() {
    return (
        <>
            <h3>Felix Board</h3>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={require('../../../assets/imgAnother/download (1).jfif.webloc')} alt='img1' />
                    </div>
                    <div className="avatar">
                        <img src={require('../../../assets/imgAnother/download (2).jfif.webloc')} alt='img2' />
                    </div>
                    <div className="avatar">
                        <img src={require('../../../assets/imgAnother/download (3).jfif.webloc')} alt='img3' />
                    </div>
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>

    )
}