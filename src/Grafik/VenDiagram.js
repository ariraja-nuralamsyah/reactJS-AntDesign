import { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_venn from "@amcharts/amcharts4/plugins/venn"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function VenDiagram() {
    const chart3 = useRef(null);

    useLayoutEffect(() => {
        // Create chart
        let x3 = am4core.create("chartdiv3", am4plugins_venn.VennDiagram);

        // Create series
        let series = x3.series.push(new am4plugins_venn.VennSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        series.dataFields.intersections = "sets";

        // Set data
        series.data = [
          { name: "A", value: 10 },
          { name: "B", value: 10 },
          { name: "C", value: 3, sets: ["A", "B"] }
        ];


        chart3.current = series;

        return () => {
        x3.dispose();
        };
    }, []);

    return (
        <div id="chartdiv3" style={{ width: "100%", height: "300px" }}></div>
      );
}

export default VenDiagram
