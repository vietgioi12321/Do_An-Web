import React from "react"


function Sidebar({tabs, activeTab, setActiveTab, onRender}){
    return(
        <div>
          {/* Phần Header Tabs được ghim cố định (Sticky) */}
          <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, paddingTop: '10px' }}>
            {/* page navigative */}
            <nav className="page">
                <ol style={{display:'flex', listStyle:'none',marginBottom:'6px',paddingLeft:'20px'}}>
                <li style={{}}><a href='trangchu'>Home</a></li>
                <span style={{margin:'0 6px'}}> &gt; </span>
                <li><a href='oke' style={{textDecoration:'none', color:'inherit'}}>{activeTab}</a></li>
                </ol>
            </nav>

            <div className="dashboardName" style={{marginLeft:'30px', gap: '6px',display:'flex',alignItems:'flex-end'}}>
                <i className="fa-regular fa-clock"></i>
                <span>Dashboard</span>
            </div>

            <div className="page-function" style={{ display: 'flex', gap: '30px' }}>
                {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                    color: activeTab === tab ? '#3C8DC2' : 'black',
                    background: 'none',
                    border: 'none',
                    fontWeight: activeTab === tab ? 'bold' : 'normal',
                    padding: '10px 0',
                    cursor: 'pointer'
                    }}
                >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            </div>
            <hr style={{ margin: 0 }}/>
          </div>

          <div className="tab-content" style={{ marginTop: '10px' }}>
            {onRender()}
          </div>
      </div>
    )
}

export default Sidebar
