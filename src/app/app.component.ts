import { ChartComponent } from './chart/chart.component';
import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-project';
  private data:any = [];


  private orgTypes: { orgTyp: string, amount: number }[] =[];
  private orgTypes2:string [] =[];





  constructor(private http: HttpClient){
    //this.getData();
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

      this.orgTypes[i] =  { "orgTyp": this.data[i].organisationType, "amount": 0 };

      console.log(this.data[i].organisationType);
    }

    var flags = [], output = [], l = this.orgTypes.length, i;
  for( i=0; i<l; i++) {
      if( flags[this.orgTypes[i].orgTyp]) continue;
      flags[this.orgTypes[i].orgTyp] = true;
      output.push({ "name": this.orgTypes[i].orgTyp, "value": 0 });


}

let k = 0;

for(let i = 0; i < output.length; i++){
  for(let j = 0; j < this.data.length; j++){

  if(output[i].name == this.data[j].organisationType){
   output[i].value=++k;
 }
}
k=0;
}

// var fs = require('fs');

// // #1 Mapping the array to an object...
// let obj = {};
// output.forEach(item => obj[item.name] = item.value);

// // #2 Converting the object to JSON...
// let json = JSON.stringify(obj);
// fs.writeFile ("input.json", JSON.stringify(obj));

     })
   }


 

  
  


}
