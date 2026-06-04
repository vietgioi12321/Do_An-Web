import React from "react";
import './style/AssignStyle.css'

export default function Activity(){
    return(
        <div className="activitySreen" style={{borderCollapse:'collapse',marginInline:20}}>
            <table className="actvityTable">
                <thead>
                    <th>Id</th>
                    <th>Activity</th>
                    <th></th>
                </thead>
            </table>
        </div>
    )
}