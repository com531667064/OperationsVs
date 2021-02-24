import React, { Component } from 'react';
// import data from './data';
import { Layout } from 'antd';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';

const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {

  

    render() {
     
        return (
            <div>
                <Layout>
                    <header style={{ height: 30 }}>
                           <div style={{textAlign:'center'}}> <h3 >高性能集群性能数据可视化</h3></div>
                     
                    </header>
                </Layout>
                <Layout style={{ height: 900 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 300 }}>
                            <View1/>
                        </Content>
                        <Content style={{ height: 262 }}>
                            <View2 />
                        </Content>
                        <Content style={{ height: 270 }}>
                            <View3 />
                        </Content>
                    </Sider>
                    <Layout>
                        <Layout>
                        <Content style={{ height: 900 }}>
                            <View4 />
                        </Content>
                            <Sider width={900} style={{backgroundColor:'#eee'}}>
                                <View6 />
                            </Sider>
                       </Layout>
                      
                        <Layout style={{ height: 500 }}>
                            <Content>
                                <View5 />
                            </Content>
                           
                        </Layout>
                    </Layout>
                </Layout>
                <Layout>
                    <Footer style={{ height: 20 }}>
                        <div style={{textAlign:'center'}}>
                            Source Code <a href='https://github.com/com531667064/OperationsVs'>https://github.com/com531667064/OperationsVs</a>;
                       
                        </div>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
