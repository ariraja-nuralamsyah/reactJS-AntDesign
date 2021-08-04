import React, { Component } from 'react';
import './App.css';
import { Layout, Avatar, Menu, Breadcrumb} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = this.props.paddingRight;

    chart.paddingRight = 30;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2021, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.paddingRight !== this.props.paddingRight) {
      this.chart.paddingRight = this.props.paddingRight;
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
        <Header style={{padding:10}}>
          <Avatar style={{float:'right'}} src="./user.png" />
          <Title style={{color:'white'}} level={3}>ANT Design</Title>
        </Header>
          <Layout>
            <Sider>
              <Menu
              defaultSelectedKeys={['Dashboard']}
              mode="inline"
              >
                <Menu.Item key="Dashboard">
                  Dashboard
                </Menu.Item>
                <SubMenu
                title={
                  <span>
                    <MailOutlined />
                    <span>About Us</span>
                  </span>
                }>
                  <Menu.ItemGroup key="AboutUs" title="Country">
                    <Menu.Item key="location1">Location 1</Menu.Item>
                    <Menu.Item key="location2">Location 2</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ari Raja</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}



export default App;
