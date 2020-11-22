import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst"; 
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AppComponent } from '../app.component';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  private data:any = [];
  private output:any = [];


  private orgTypes: { orgTyp: string, amount: number , children:any[]}[] =[];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private http: HttpClient) {
    this.getData();
  }


  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  getData(){
    const url ='http://localhost:5500/src/data/personTask.json'
    this.http.get(url).subscribe((res)=>{
    this.data = res;

    //  console.log(this.orgTypes.length);
     // this.orgTypes[0] =  { "orgTyp": "hii", "amount": 10 };



   
    //  if(this.orgTypes.length == 0){
    //   this.orgTypes[0] =  { "orgTyp": this.data[0].organisationType, "amount": 1 };  
    // }

    //  var k = 1;

    //   for(let i = 0; i < this.data.length; i++){
    //     for(let j = 0; j < k; j++){


    //       //if(this.orgTypes[j] != null)
    //       if(this.orgTypes[j].orgTyp == this.data[i].organisationType){
    //         this.orgTypes[j].amount++;
    //         console.log("iffff");
    //         k++;
    //         //k++;

    //       }
    //       else {
    //         this.orgTypes[j] =  { "orgTyp": this.data[i].organisationType, "amount": 1 };  
    //         k++;
    //       }


    //     }
    //   }


    for(let i = 0; i < this.data.length; i++){

      this.orgTypes[i] =  { "orgTyp": this.data[i].organisationType, "amount": 0, "children":[] };

      console.log(this.data[i].organisationType);
    }

    var flags = [], l = this.orgTypes.length, i;
  for( i=0; i<l; i++) {
      if( flags[this.orgTypes[i].orgTyp]) continue;
      flags[this.orgTypes[i].orgTyp] = true;
      this.output.push({ "name": this.orgTypes[i].orgTyp, "value": 0 ,"children":[{"name": this.orgTypes[i].orgTyp, "value": 0}]});


}

let k = 0;

for(let i = 0; i < this.output.length; i++){
  for(let j = 0; j < this.data.length; j++){

  if(this.output[i].name == this.data[j].organisationType){
   this.output[i].value=++k;
 }
}
k=0;
}


     })
   }




  ngAfterViewInit() {

    /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
let chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst); 
chart.padding(0, 0, 0, 0);
chart.radius = am4core.percent(98);


//chart.dataSource.url = "http://localhost:5500/src/data/demo.json";
//chart.dataSource.load();
//chart.dataSource.parser = new am4core.JSONParser();
//chart.dataSource.parser.options.emptyAs=0;

//chart.dataSource.data = "/Users/oeztuerk 1/Desktop/amChartAngular/my-project/src/test.json";

//chart.data = this.output;
chart.data = [
  {
    "name": "RK",
    "children": [
              { "name": "EE1", "value": 5 },
              { "name": "EE1", "value": 5 },

            ]
  },
  {
      "name": "FF",
      "children": [
        { "name": "EE1", "value": 8 },
        { "name": "EE1", "value": 2 }
      ]
    },
    {
      "name": "MV",
    },
    {
      "name": "BV",
    }
];



// chart.data = [{
//   name: "First",
//   children: [
//     { name: "A1", value: 100 },
//     { name: "A2", value: 60 }
//   ]
// },
// {
//   name: "Second",
//   children: [
//     { name: "B1", value: 135 },
//     { name: "B2", value: 98 }
//   ]
// },
// {
//   name: "Third",
//   children: [
//     {
//       name: "C1",
//       children: [
//         { name: "EE1", value: 130 },
//         { name: "EE2", value: 87 },
//         { name: "EE3", value: 55 }
//       ]
//     },
//     { name: "C2", value: 148 },
//     {
//       name: "C3", children: [
//         { name: "CC1", value: 53 },
//         { name: "CC2", value: 30 }
//       ]
//     },
//     { name: "C4", value: 26 }
//   ]
// },
// {
//   name: "Fourth",
//   children: [
//     { name: "D1", value: 415 },
//     { name: "D2", value: 148 },
//     { name: "D3", value: 89 }
//   ]
// },
// {
//   name: "Fifth",
//   children: [
//     {
//       name: "E1",
//       children: [
//         { name: "EE1", value: 33 },
//         { name: "EE2", value: 40 },
//         { name: "EE3", value: 89 }
//       ]
//     },
//     {
//       name: "E2",
//       value: 148
//     }
//   ]
// }];


console.log(chart.data)

chart.colors.step = 1;
chart.fontSize = 11;
chart.innerRadius = am4core.percent(30);

chart.fontFamily = "Arial";



chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";

//chart.dataFields.color = "color";







let level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
chart.seriesTemplates.setKey("0", level0SeriesTemplate)

// this makes labels to be hidden if they don't fit
level0SeriesTemplate.labels.template.truncate = true;
level0SeriesTemplate.labels.template.hideOversized = true;
level0SeriesTemplate.showOnInit = false;
level0SeriesTemplate.usePercentHack = false;

level0SeriesTemplate.radius = am4core.percent(100);
level0SeriesTemplate.innerRadius = am4core.percent(0);

let selectedState = level0SeriesTemplate.states.create("selected");
selectedState.properties.opacity = 0.7;
level0SeriesTemplate.defaultState.properties.radius = am4core.percent(100);

let currentlySelected;

let hs;

let iwas;


level0SeriesTemplate.slices.template.events.on("over", function(event) {

  iwas = event;

  if(iwas.target.dataItem.sunburstDataItem.children)
  {
   event.target.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  }
})

level0SeriesTemplate.slices.template.events.on("hit", function(event) {
  zoomOutButton.show();
  var hitSlice = event.target;
  hs = hitSlice;

  if (hs.dataItem.sunburstDataItem) 
  {

    let series = event.target.dataItem.component;

    let se;
    se=series;

    
    if (!series.dummyData) {
      series.tooltip.disabled = true;
      hs.dataItem.label.radius = (hitSlice.radius - hitSlice.pixelInnerRadius) - 7;
      hs.dataItem.label.bent = true;
      hs.dataItem.label.rotation = -180;

      currentlySelected = hitSlice;
      series.dummyData = true;
      series.setState("selected");
      hs.dataItem.sunburstDataItem.series.show();
      se.slices.each(function(slice) 
      {
        if (slice != event.target) {
          slice.dataItem.hide();
        }
      })
    }
    else {
      drillUp(hitSlice);
    }
  }
})


level0SeriesTemplate.labels.template.adapter.add("rotation", function(rotation, target) {
  target.maxWidth = target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
  target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);
  return rotation;
})

let level1SeriesTemplate = level0SeriesTemplate.clone();
level1SeriesTemplate.hidden = true;
level1SeriesTemplate.innerRadius = am4core.percent(10);
chart.seriesTemplates.setKey("1", level1SeriesTemplate)
level1SeriesTemplate.fillOpacity = 0.75;

let level2SeriesTemplate = level0SeriesTemplate.clone();
level2SeriesTemplate.hidden = true;
level2SeriesTemplate.innerRadius = am4core.percent(20);
chart.seriesTemplates.setKey("2", level2SeriesTemplate)

let zoomOutButton = chart.seriesContainer.createChild(am4core.ZoomOutButton);
zoomOutButton.visible = false;
zoomOutButton.horizontalCenter = "middle";
zoomOutButton.verticalCenter = "middle";
zoomOutButton.events.on("hit", function() {
  drillUp(currentlySelected)
})


function drillUp(slice) {
  collapse(slice);
  let series = slice.dataItem.component;
  series.tooltip.disabled = false;
  series.dummyData = false;
  series.setState("default");

  series.slices.each(function(slice) {
    if (slice != event.target) {
      slice.dataItem.show();
    }
  })

  if (series.parentDataItem.seriesDataItem) {
    currentlySelected = series.parentDataItem.seriesDataItem.slice;
  }
  else {
    zoomOutButton.hide();
  }
}


function collapse(slice) {

  slice.dataItem.label.bent = false;
  slice.dataItem.label.radius = 10;


  if (slice.dataItem.sunburstDataItem.children) {
    slice.dataItem.sunburstDataItem.children.each(function(child) {
      child.seriesDataItem.component.setState("hidden");
      collapse(child.seriesDataItem.slice);
    })
  }
}


 
  }
}