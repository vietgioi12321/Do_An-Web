import React,{ useState} from 'react';
import { useAssignData,handleUpdateDeveloper } from '../../services/actionService';
import TableTabStyle from "../../../assets/style/TableTabStyle";

function Assign() {
    const {bugs,loading,fetchBugs} = useAssignData(localStorage.getItem('userId'));
    const [changedDevs, setChangedDevs] = useState({});
    const [isChangeDev, setIsChangeDev] = useState(false);


    if (loading) {
        return <div style={{ margin: 20, color: 'var(--text-main)' }}>Đang tải danh sách lỗi...</div>;
    }

    return (
        <div className="Assign" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginLeft: 10, marginBlock: '10px', color: 'var(--text-main)' }}>Assign</h3>
            <h4 style={{ marginLeft: 20, marginBlock: '10px', color: 'var(--text-main)' }}>Danh sách gán lỗi - Developer</h4>

            <table 
                className="listError" 
                style={{ 
                    borderCollapse: 'collapse', 
                    marginInline: 20,
                    color: 'var(--text-main)' // Đảm bảo hiển thị tốt trên nền tối
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                        <th style={TableTabStyle.thead_th}>ID</th>
                        <th style={TableTabStyle.thead_th}>Tiêu Đề</th>
                        <th style={TableTabStyle.thead_th}>Tên thiết bị</th>
                        <th style={TableTabStyle.thead_th}>Phiên bản</th>
                        <th style={TableTabStyle.thead_th}>Developer được gán</th>
                        <th style={TableTabStyle.thead_th}>Trạng Thái</th>
                        <th style={TableTabStyle.thead_th}>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={TableTabStyle.tbody_td}>
                                Không có dữ liệu lỗi nào được trả về từ API.
                            </td>
                        </tr>
                    ) : (
                        // 3. Duyệt mảng để in danh sách chính xác theo API trả về
                        bugs.map((bug) => {
                            return(
                            <tr key={bug.logEntryId} style={{ borderBottom: '1px solid #ddd' }}>
                                {/* Cột 1: ID (logEntryId) */}
                                    <td style={TableTabStyle.tbody_td}>
                                        {bug.logEntryId}
                                    </td>
                                    
                                    {/* Cột 2: Tiêu Đề (name + thông điệp lỗi ngắn gọn) */}
                                    <td style={TableTabStyle.tbody_td}>
                                        <div style={{ fontWeight: 'bold', color: '#ef4444' }}>{bug.name}</div>
                                        <div style={{ fontSize: '12px', color: '#64748b', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {bug.errorMessage}
                                        </div>
                                    </td>
                                    
                                    {/* Cột 3: Tên thiết bị (deviceName) */}
                                    <td style={TableTabStyle.tbody_td}>
                                        {bug.deviceName}
                                    </td>
                                    
                                    {/* Cột 4: Phiên bản */}
                                    <td style={TableTabStyle.tbody_td}>
                                        {bug.osVersion}
                                    </td>

                                    <td style={TableTabStyle.tbody_td}>
                                        <select
                                            value={bug.userId}
                                            // 🔥 Khi chọn người mới: Chỉ lưu tạm vào State để kích hoạt nút bên Hành Động, CHƯA gửi API
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                bug.userId = newValue;
                                                bug.isChange =  true;
                                                if(bug.userId == 1){
                                                    bug.action = "UnAssign"
                                                }else{
                                                    bug.action = "Assign"
                                                }
                                                console.log("e.target.value",e.target.value);
                                                setChangedDevs(({
                                                    [bug.userId]: newValue, // Đánh dấu bug này đang chọn giá trị mới là newValue
                                                    [bug.isChange] : true,
                                                }));
                                            
                                            console.log("da thay doi bug.isChange = ",bug.isChange)
                                            }}

                                            style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid #cbd5e1',
                                            backgroundColor: '#fff',
                                            color: '#334155',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            outline: 'none'
                                            }}
                                        >
                                            {/* <option key={bug.userId} value={bug.userId}>{bug.developerName}</option> */}
                                            {/* Duyệt qua mảng danh sách để tạo ra các dòng lựa chọn */}
                                            {bug.devList?.map((dev) => (
                                            <option key={dev.userId} value={dev.userId}>
                                                {dev.nameUser}
                                            </option>
                                            ))}
                                        </select>
                                    </td>
                                    
                                    {/* Cột 5: Trạng Thái */}
                                    <td style={TableTabStyle.tbody_td}>
                                        <span style={{ 
                                            padding: '2px 6px', 
                                            borderRadius: '4px', 
                                            fontSize: '11px', 
                                            fontWeight: 'bold',
                                            backgroundColor: bug.logLevel === 'ERROR' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                            color: bug.logLevel === 'ERROR' ? '#ef4444' : '#f59e0b'
                                        }}>
                                            {bug.assignStatus}
                                        </span>
                                    </td>
                                    
                                    {/* Cột 6: Hành Động */}
                                    <td style={TableTabStyle.tbody_td}>
                                        {/* {console.log("Giá trị isChange của bug này là:", bug.isChange)}
                                        {console.log("Giá trị userId của bug này là:", bug.userId)}
                                        <span>bug.isChange = {String(bug.isChange)}</span>
                                        <span>bug.userId = {bug.userId}</span> */}
                                        {/* <span>bug.action = {bug.action}</span> */}
                                        {bug.isChange == true ?
                                            (<button style={{color: bug.userId == 1 ? 'rgba(180, 130, 0, 1)' : 'rgba(4, 120, 87, 1)',
                                                            background: bug.userId == 1 ? 'rgba(234, 179, 8, 0.55)' : 'rgba(16, 185, 129, 0.55)',
                                                            padding: 5,
                                                            border: '2px solid gray',
                                                            borderRadius:5}}
                                                            onClick={async () => {
                                                                try {
                                                                    console.log("Đang tiến hành gửi API cập nhật...");
                                                                    
                                                                    // 1. Dùng await để ép trình duyệt đợi API chạy xong và trả về kết quả thành công/thất bại
                                                                    const success = await handleUpdateDeveloper(bug.logEntryId, bug.userId);
                                                                    
                                                                    if (success) {
                                                                        alert("Cập nhật thành công!");
                                                                        bug.isChange = false;
                                                                        if (typeof fetchBugs === 'function') {
                                                                            fetchBugs();
                                                                        }
                                                                    } else {
                                                                        alert("Cập nhật thất bại từ phía Server!");
                                                                    }
                                                                } catch (error) {
                                                                    console.error("Lỗi hệ thống khi gọi API:", error);
                                                                    alert("Cập nhật thất bại do lỗi đường truyền!");
                                                                }
                                                            }}
                                            > 
                                                {bug.action}
                                            </button>
                                            ) : 
                                            (<span style={{color: bug.userId === 1 ? 'rgba(234, 179, 8)' : 'rgba(16, 185, 129)',
                                                background: bug.userId === 1 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                padding: 5,
                                                borderRadius:5
                                            }}> 
                                                {bug.action}
                                            </span>
                                            )
                                        }
                                    </td>
                                </tr>
                        )}  
                    )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Assign;