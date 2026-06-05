import React from 'react'
import './style/AssignStyle.css'

function Assign(){
    return(
        <div className="Assign" style={{display:'flex', flexDirection:'column'}}>
            <h3 style={{marginLeft:10, marginBlock:'10px'}}>Assign</h3>
            <h4 style={{marginLeft:20, marginBlock:'10px'}}>Danh sách gán lỗi - Developer</h4>

            <table className="listError" style={{borderCollapse:'collapse',marginInline:20}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid black'}}>ID</th>
                        <th>Tiêu Đề</th>
                        <th>Phiên Bản</th>
                        <th>Developer được gán Assign</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{border:'1px solid black'}}>
                        <td>101</td>
                        <td>Lỗi không hiển thị được thông báo</td>
                        <td>v2.1.0</td>
                        <td>Chưa gán</td>
                        <td>Open</td>
                        <td>Assign</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Assign