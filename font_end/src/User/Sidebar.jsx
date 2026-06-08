import React from "react"


function Sidebar({tabs, activeTab, setActiveTab, onRender}){
    return(
        <div>
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
                  border: 'none'
                  }}
              >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          </div>
        <hr/>

        <div className="tab-content">
          {onRender()}
        </div>
      </div>
    )
}

export default Sidebar
