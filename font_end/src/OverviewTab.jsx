import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ];

const COLORS = ['#5d4a6d', '#eeeeee'];
function Overview(){
    return(
        <div class="overViewTab" style={{display:'flex', flexDirection:'column',gap:10}}>
            <div class="overViewName">
                <strong style={{margin:15}}>OverView</strong>
            </div>
            <div class="overviewShow" style={{display:'flex', flexDirection:'row', gap:10}}>
                <div class="organizations" style={{width:350, height: 450, border:'1px',borderStyle:'solid',borderColor:'black',borderRadius:15,
                                marginLeft: 15,}}>
                    <strong style={{display:'inline-block', margin:10}}>Organizations</strong>
                    <div style={{display: 'flex',flexDirection:'column', paddingLeft:30, gap: 20}}>
                        <div class="search" style={{display:'flex', width:300, height:40, border:'1px solid black', borderRadius:10, alignItems:'center'}}>
                            <i class="fa-brands fa-sistrix" style={{fontSize: 25, marginLeft: 15}}></i>
                            <span stylel={{marginLeft: 15}}>Search</span>
                        </div>
                        <span>6 results</span>
                        <table class="organizations_table" style={{borderCollapse: 'collapse'}}>
                            <thead style={{}}>
                                <tr style={{textAlign:'left',borderBottom: '1px solid black'}}>
                                    <th>
                                        <div style={{display:'flex', flexDirection:'column',width:'fit-content'}}>
                                            <span>Murillo</span>
                                            <span>4 devices</span>
                                        </div>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-circle-exclamation" style={{color:'red'}}></i>
                                        <span>4</span>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-triangle-exclamation" style={{color:'yellow'}}></i>
                                        <span>16</span>
                                    </th>
                                </tr>
                                <tr style={{textAlign:'left',borderBottom: '1px solid black'}}>
                                    <th>
                                        <div style={{display:'flex', flexDirection:'column',width:'fit-content'}}>
                                            <span>Murillo</span>
                                            <span>4 devices</span>
                                        </div>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-circle-exclamation" style={{color:'red'}}></i>
                                        <span>4</span>
                                    </th>
                                    <th>
                                        <i class="fa-solid fa-triangle-exclamation" style={{color:'yellow'}}></i>
                                        <span>16</span>
                                    </th>
                                </tr>
                            </thead> 
                        </table>
                    </div>
                </div>
                
                <div class="chart">
                    <div class="chartFlex" style={{display:'flex',flexDirection:'column', gap: 30}}>
                        <div class="chartFlex-pie" style={{display:'flex',flexDirection:'column', width:300, height:200, border:'1px solid black', borderRadius:10,overflow:'hidden'}}>
                            <span style={{width:'100%',height:15, background:'gray',padding:10}}>Device Error</span>
                            <div class="chartFlex-pie__pie"style={{ width: '300px', height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"           // Căn giữa X
                                        cy="50%"           // Căn giữa Y
                                        innerRadius={60}    // Bán kính lỗ trong (Donut)
                                        outerRadius={80}    // Bán kính vòng ngoài
                                        paddingAngle={2}    // Khoảng hở nhỏ giữa các đoạn (vạch kẻ)
                                        dataKey="value"
                                        label               // Tự động vẽ đường kẻ và con số (như số 1 trong ảnh)
                                    >
                                        {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div class="chartFlex-pie__Name_Action" style={{display:'flex', flexDirection:'row',gap:'20%'}}>
                                <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                    <div style={{width:20, height:20, background:'gray'}} />
                                    <span>Action</span>
                                </div>
                                <div class="chartFlex-pie__Name_ActionVirus" style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                    <div style={{width:20, height:20, background:'red'}} />
                                    <span>Action virus</span>
                                </div>
                            </div>
                        </div>

                        <div class="chartFlex-line" style={{display:'flex',flexDirection:'column', width:500, height:300, border:'1px solid black', borderRadius:10,overflow:'hidden'}}>
                            <h3 style={{marginLeft:10}}>
                                <i class="fas fa-chart-line"/>
                                Số lượng lỗi theo thời gian
                            </h3>
                            <canvas id='lineChart' width={300} height={300} style={{display: 'block', boxSizing: 'border-box', height: '250px', width: '450px'}}>

                            </canvas>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default Overview;