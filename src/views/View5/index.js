import React from 'react';
import './view5.css';
import River from '../../charts/RiverChart';
import Timeband from '../../charts/TimebandChart';
import AbnormalPoints from '../../charts/AbnormalPoints';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'



function View5() {
    let tabHead=[
        {
            link:'/page1',
            name:'河流图 ',
      
            
        },
        {
            link:'/page2',
            name:'时间条带图 ',
      
        },
        {
            link:'/page3',
            name:'异常结点图 ',
          
        }
    ]
    let routes=[
        {
            path:'/page1',
            component:Page1
        },
        {
            path:'/page2',
            component:Page2
        },
        {
            path:'/page3',
            component:Page3
        }
    ]
    return (
        <div className="App">
            <Router>
                <div >
                
                    
                        {
                            tabHead.map(item=>{
                                return <tab key={item.link}>
                                            <Link to={item.link}>{item.name}</Link>
                                        </tab>
                            })
                        }
                    
                </div>
                <Switch>
                    {
                        routes.map(item=>{
                            return <Route path={item.path} component={item.component} key={item.path}></Route>
                        })
                    }
                <Redirect to="/page1" />
                </Switch>
            </Router>
        </div>
    );
}

function Page1(){
    return (
        <div>
            <River/>
        </div>
    )
}
function Page2(){
    return (
        <div>
            <Timeband/>
        </div>
    )
}
function Page3(){
    return (
        <div>
           <AbnormalPoints/>
        </div>
    )
}


export default View5;