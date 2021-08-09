import { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
function PieChart(props) {
    const chart2 = useRef(null);

    useLayoutEffect(() => {
        // Create chart
        let x2 = am4core.create("chartdiv2", am4charts.PieChart);

        // Set data
        x2.data = [{
        "country": "Lithuania",
        "litres": 501.9
        }, {
        "country": "Czechia",
        "litres": 301.9
        }, {
        "country": "Ireland",
        "litres": 201.1
        }];

        // Create series
        let series = x2.series.push(new am4charts.PieSeries());
        series.dataFields.value = "litres";
        series.dataFields.category = "country";

        chart2.current = x2;

        return () => {
        x2.dispose();
        };
    }, []);

    return (
        <div id="chartdiv2" style={{ width: "100%", height: "300px" }}></div>
      );
}

export default PieChart
