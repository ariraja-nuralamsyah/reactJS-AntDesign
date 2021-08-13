import React, { useLayoutEffect } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import axios from 'axios';
import chartData from '../data/chartData.json';

am4core.useTheme(am4themes_animated);

function last30Days(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const lastMonth = ((month-1) >= 10 ? (month-1) : "0"+(month-1));
    const day = date.getDate();  
    return year+"-"+lastMonth+"-"+day;
}
function ChartQuality() {
    useLayoutEffect(() => {
        let x = am4core.create("chartdiv", am4charts.XYChart);
        // async function fetchData(){
        //     const result = await axios(
        //         'chartData.json',
        //     );
        //     // console.log(lastDate);
        //     x.data = (result.data).filter(item => item.date > lastDate);
        // }
        // fetchData();
        
        const lastDate = last30Days();
        x.data = chartData.filter(item => item.date > lastDate);
            
        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Week";
            
        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "PB";
        
        let series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.stroke = am4core.color("#ff0000"); // red
        series.strokeWidth = 2; // 2px
        series.tooltipText = "{valueY.value}";
        x.cursor = new am4charts.XYCursor();
        
        let bullet = series.bullets.push(new am4charts.LabelBullet());
        bullet.label.text = "{valueY.formatNumber('#.00')}"
        bullet.label.fontSize = 8;
        bullet.locationY = -0.03;


        dateAxis.dateFormats.setKey("week", "ww");
        valueAxis.min=0;
        dateAxis.gridIntervals.setAll([
            { timeUnit: "day", count: 1 },
            { timeUnit: "day", count: 7 },
        ]);
            
        return () => {
            x.dispose();
        };
    }, []);
    return (
        <>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </>
    )
}
        
export default ChartQuality
        