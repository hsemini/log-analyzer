// count1,count2,..etc use for maintain for loops
//array1,array2,...,etc use for store split words

var mainRootID = 1; //
var subRootID  = 0; //subDivRunner
var playState = 'Initial';
var mainRootCount = 0 ; 
var catchMainOne= 1; //helps to count main roots
var subRootCount=0;
var level = 1;
var backward_forward_controler = 0;
var listIdCreater;

//use when click on the player
var clickMainIDContainer = []; 
var clickSubIDContainer = [];
var posOfClickMainIDContainer = 0;
var posOfClickSubIDContainer = 0;
var lock='off'; // if lock:lock='on', if unlock:lock='off'  
var collapsible =[]; // collapsible=true-->expand collapsible=false-->collapse

var array1 =[];

var donutData;
var dataStructure=[];

var donutData_for_donut2;
var dataStructure_for_donut2 = [];

var trueAppear= 0;
var falseAppear= 0;
var originalDataSetForBarChart = [];
var data = [];

var subTrue =0;
var subFalse = 0;

var center_group_for_donut2;
var totalValue_for_donut2 ;

//-----------------------------------------------------------------------------------------------------------------------------------------
//variables for testing

var startTime_replayableWidget = 0;
var endTime_replayableWidget = 0;

var startTime_barChart = 0;
var endTime_barChart = 0;

var StartTime_pieChart1 = 0 ;
var endTime_pieChart1 = 0;

var StartTime_pieChart2 = 0 ;
var endTime_pieChart2 = 0; 

var StartTime_timeLine = 0 ;
var endTime_timeLine = 0; 

//-----------------------------------------------------------------------------------------------------------------------------------------

var barChartLegentController = 1; //this will helps to prevent duplicating legends in bar chart
 
//-----------------------------------------------------------------------------------------------------------------------------------------

//check tree is empty or not
if($("#list li").length>0){
    var count = 1; // is used to continue while loop
    //this while loop give main root count
    while(catchMainOne==1){
        if(document.contains(document.getElementById(count.toString())) ){
           mainRootCount++;
           catchMainOne=1;    
       }else{
           catchMainOne=0;
       } 
      count++;
    }
   
}else{
    alert('no data assign to the tree view');
}

for(var count1=0 ; count1<mainRootCount ; count1++){ 
    collapsible[count1] = 'false';
    listIdCreater="li_"+(count1+1);  
    document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/plus_icon.png")';
}

function setUnselect(){
    for(var count1=1 ; count1<=mainRootCount ; count1++){ 
        document.getElementById(count1.toString()).style.backgroundColor='#FFFFFF' ;
    }
}

var mainDiv = document.getElementsByClassName('player_data_holder')[0];

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--setDataForBarChart--*/
var treeIndex = 1;
var trueCountArray = [];
var falseCountArray = [] ;
var arrayIndex;
var subCount;
var totalTrueFalseCount= 0 ;
var trueAppear; 
var falseAppear;
var testID; 
var testRoot;
    
//line chart variables
var OriginalDataForLineChart = [];
var duplicateDataForLineChart = [];
var testID_a , testID_a_element , testID_a_content , dateStatement;

var treeIndex = 1;
var trueCountArray = [];
var falseCountArray = [] ;
var subRootCountHolder = [];
var arrayIndex;
var subCount;
var totalTrueFalseCount= 0 ;
var trueAppear; 
var falseAppear;
var testID; 
var testRoot;
    
for(arrayIndex = 0 ; arrayIndex<mainRootCount ; arrayIndex++){   

    subCount = getSubRootCount(treeIndex);
    trueAppear=0;
    falseAppear=0;
    testID='';
    testID_a = '';
    dateStatement = '';
    for(var i=1;i<subCount+1;i++){
        testID=treeIndex+'_'+i;
        testRoot= document.getElementById(testID);
             
        if(testRoot.childNodes[0].id=="T"){
             trueAppear++;
             testID_a = testID+'_a';
             testID_a_element = document.getElementById(testID_a);
             testID_a_content = testID_a_element.innerHTML;
             dateStatement = dateCatcher(testID_a_content);
             OriginalDataForLineChart.push({
                Date: dateStatement,
                Value: 0, 
                TrueFalseVale: "True",
                DateRecord : "Test Suite No:"+treeIndex+", "+dateStatement
             }); 
            
        }
             
        if(testRoot.childNodes[0].id=="F"){
             falseAppear++;
             testID_a = testID+'_a';
             testID_a_element = document.getElementById(testID_a);
             testID_a_content = testID_a_element.innerHTML;
             dateStatement = dateCatcher(testID_a_content);
             OriginalDataForLineChart.push({
                Date: dateStatement,
                Value:0,
                TrueFalseVale: "False",
                DateRecord : "Test Suite No:"+treeIndex+", "+dateStatement
             }); 
        }    
    }
    
    originalDataSetForBarChart.push({
          TestSuite: "TS"+treeIndex,
          True: trueAppear,
          False: falseAppear
     });
   trueCountArray[treeIndex-1]=trueAppear;
   falseCountArray[treeIndex-1] = falseAppear;   
   totalTrueFalseCount = totalTrueFalseCount+trueAppear+falseAppear;
   subRootCountHolder[arrayIndex] = trueAppear+falseAppear;    
   treeIndex++; 
      
}

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--BAR CHART--*/
  
  var margin = {
     top: 20,
     right: 10,
     bottom: 30,
     left: 40
 },
      
 width = 890 - margin.left - margin.right,
      
 height = 300 - margin.top - margin.bottom;

 var x0 = d3.scale.ordinal()
     .rangeRoundBands([0, width], .5);

 var x1 = d3.scale.ordinal();

 var y = d3.scale.linear()
     .range([height, 0]);

 var color = d3.scale.ordinal()
     .range(["#4169E1", "#800080"]);

 var xAxis = d3.svg.axis()
     .scale(x0)
     .orient("bottom");

 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")
     .tickFormat(d3.format(""));
    
    
 var w = width + margin.left + margin.right;
    
 var h = height + margin.top + margin.bottom;

 /*var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.trueFalseCount + "</span>";
  });*/
  
 var svg = d3.select(".chart1").append("svg")
           .attr("width", w)
           .attr("height", h)
           .append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//svg.call(tip);

var xg = svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")");

 var yg = svg.append("g")
     .attr("class", "y axis");

 yg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Count");
 

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--LINE CHART--*/

    var line_xAxisGroup = null,
	    line_dataCirclesGroup = null,
	    line_dataLinesGroup = null; 
    
    var line_maxDataPointsForDots = 100, //100 means line can show 100 dots only,so change it if need
	    line_transitionDuration = 1000; 
    
   var line_pointRadius = 7; 
    
   var line_parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;  
    
    //set original data set for here
       
    var line_margin = {top: 5, right: 210, bottom: 30, left: 20};
    var line_width = 1400 - line_margin.left - line_margin.right;
    var line_height = 90 - line_margin.top - line_margin.bottom;
    
    var line_x = d3.time.scale()
        .range([0, line_width]);

    var line_y = d3.scale.linear()
        .range([line_height, 0]);

    var line_xAxis = d3.svg.axis()
        .scale(line_x)
        .orient("bottom");

    var line_yAxis = d3.svg.axis()
        .scale(line_y)
        .orient("left");

    var line_line = d3.svg.line()
        .x(function(d) { return line_x(d.Date); })
        .y(function(d) { return line_y(d.Value); });


    var line_svg = d3.select(".chart4").append("svg")
        .attr("width", line_width + line_margin.left + line_margin.right)
        .attr("height", line_height + line_margin.top + line_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + line_margin.left + "," + line_margin.top + ")");

    OriginalDataForLineChart.forEach(function(d) {
        d.Date = line_parseDate(d.Date);
        d.Value = +d.Value;
    });

    line_x.domain(d3.extent(OriginalDataForLineChart, function(d) { return d.Date; }));
    line_y.domain(d3.extent(OriginalDataForLineChart, function(d) { return d.Value;}));

    line_svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + line_height + ")")
          .call(line_xAxis);

    
    line_svg.append("path")
          .datum(OriginalDataForLineChart)
          .attr("class", "line")
          .attr("d", line_line);

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--DONUT CHART--*/

 var toolTipDiv = d3.select(".player_holder2").append("div").attr("class", "toolTip");

    var donutWidth = 330;
    var donutHeigth = 210;
    var donutOuterRadius = 60;
    var donutInnerRadius = 40;
    var textOffset = 24;
    var tweenDuration = 1050;

    //OBJECTS TO BE POPULATED WITH DATA LATER
    var lines, valueLabels, nameLabels;
    var pieData = [];    
    var oldPieData = [];
    var filteredPieData = [];

    //D3 helper function to populate pie slice parameters from array data
    var donut = d3.layout.pie().value(function(d){
      return d.itemValue;
    });
    
    var donutColor = d3.scale.ordinal()
	.range(["#4169E1", "#800080"]);  
    
    //D3 helper function to draw arcs, populates parameter "d" in path object
    var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(donutInnerRadius)
      .outerRadius(donutOuterRadius);

    var vis = d3.select(".chart2").append("svg:svg")
      .attr("width", donutWidth)
      .attr("height", donutHeigth);

    //GROUP FOR ARCS/PATHS
    var arc_group = vis.append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + (donutWidth/2) + "," + (donutHeigth/2) + ")");

    //GROUP FOR LABELS
    var label_group = vis.append("svg:g")
      .attr("class", "label_group")
      .attr("transform", "translate(" + (donutWidth/2) + "," + (donutHeigth/2) + ")");

    //GROUP FOR CENTER TEXT  
    var center_group = vis.append("svg:g")
      .attr("class", "center_group")
      .attr("transform", "translate(" + (donutWidth/2) + "," + (donutHeigth/2) + ")");

    
    //WHITE CIRCLE BEHIND LABELS
    var whiteCircle = center_group.append("svg:circle")
      .attr("fill", "white")
      .attr("r", donutInnerRadius);
    var centerText='';
    
    // "TOTAL" LABEL
var totalLabel = center_group.append("svg:text")
  .attr("class", "label")
  .attr("dy", -15)
  .attr("text-anchor", "middle") // text-align: right
  .text("TOTAL");

//TOTAL TRAFFIC VALUE
var totalValue = center_group.append("svg:text")
  .attr("class", "total")
  .attr("dy", 7)
  .attr("text-anchor", "middle") // text-align: right
  .text(mainRootCount);

//UNITS LABEL
var totalUnits = center_group.append("svg:text")
  .attr("class", "units")
  .attr("dy", 21)
  .attr("text-anchor", "middle") // text-align: right
  .text("Test Suites");

    // to run each time data is generated
    function donutUpdate(number) {
        StartTime_pieChart1 = new Date().getTime();
    //setDonutDataStructure();
    donutData = dataStructure[number].donutData;

      oldPieData = filteredPieData;
      pieData = donut(donutData);

      var sliceProportion = 0; //size of this slice
      filteredPieData = pieData.filter(filterData);
      function filterData(element, index, array) {
        element.name = donutData[index].itemLabel;
        element.value = donutData[index].itemValue;
        sliceProportion += element.value;
        return (element.value > 0);
      }

        //DRAW ARC PATHS
        paths = arc_group.selectAll("path").data(filteredPieData);
        paths.enter().append("svg:path")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .attr("fill", function(d, i) { return donutColor(i); })
          .transition()
            .duration(tweenDuration)
            .attrTween("d", pieTween);
        paths
          .transition()
            .duration(tweenDuration)
            .attrTween("d", pieTween);
        paths.exit()
          .transition()
            .duration(tweenDuration)
            .attrTween("d", removePieTween)
          .remove();

    paths.on("mousemove", function(d){
        toolTipDiv.style("left", d3.event.pageX+10+"px");
        toolTipDiv.style("top", d3.event.pageY-25+"px");
        toolTipDiv.style("display", "inline-block");
        toolTipDiv.html((d.donutData.itemLabel)+"<br>"+(d.donutData.itemValue));
      
    });

    paths.on("mouseout", function(d){
        toolTipDiv.style("display", "none");
    });




        //DRAW TICK MARK LINES FOR LABELS
        lines = label_group.selectAll("line").data(filteredPieData);
        lines.enter().append("svg:line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", -donutOuterRadius-3)
          .attr("y2", -donutOuterRadius-18)
          .attr("stroke", "gray")
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines.transition()
          .duration(tweenDuration)
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines.exit().remove();
    //DRAW LABELS WITH PERCENTAGE VALUES
        valueLabels = label_group.selectAll("text.value").data(filteredPieData)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          })
          .text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1) + "%";
          });

        valueLabels.enter().append("svg:text")
          .attr("class", "value")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (donutOuterRadius+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (donutOuterRadius+textOffset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1)+"%";
 });
        valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

        valueLabels.exit().remove();

        //DRAW LABELS WITH ENTITY NAMES
        nameLabels = label_group.selectAll("text.units").data(filteredPieData)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.enter().append("svg:text")
          .attr("class", "units")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (donutOuterRadius+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (donutOuterRadius+textOffset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 18;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

        nameLabels.exit().remove();
		 var total = 0;
		pieData.forEach(function(d){ total+=(d.value*1); });
		/*center_group.selectAll('text').donutData([total]).enter().append('text').text(function(d){
								return d;
								}).attr('class','value').attr('dy', 8).attr('text-anchor', 'end').attr('transform', 'translate(20, 0)');*/
    endTime_pieChart1 = new Date().getTime();
    var totalPie1 = (endTime_pieChart1-StartTime_pieChart1)/1000;
    //alert(totalPie1);    
    }

    // Interpolate the arcs in data space.
    function pieTween(d, i) {
      var s0;
      var e0;
      if(oldPieData[i]){
        s0 = oldPieData[i].startAngle;
        e0 = oldPieData[i].endAngle;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        s0 = oldPieData[i-1].endAngle;
        e0 = oldPieData[i-1].endAngle;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
        s0 = oldPieData[oldPieData.length-1].endAngle;
        e0 = oldPieData[oldPieData.length-1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = i(t);
        return arc(b);
      };


    }

    function removePieTween(d, i) {
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }

    function textTween(d, i) {
      var a;
      if(oldPieData[i]){
        a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
        a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
      } else {
        a = 0;
      }
      var b = (d.startAngle + d.endAngle - Math.PI)/2;

      var fn = d3.interpolateNumber(a, b);
      return function(t) {
        var val = fn(t);
        return "translate(" + Math.cos(val) * (donutOuterRadius+textOffset) + "," + Math.sin(val) * (donutOuterRadius+textOffset) + ")";


      };

    }

//----------------------------------------------------------------------------------------------------------------------------------------
/*--DONUT2 CHART--*/

 var toolTipForDonut2 = d3.select(".player_holder2").append("div").attr("class", "toolTip");

    var donut_Width = 330;
    var donut_Heigth = 210;
    var donut_Outer_Radius = 60;
    var donut_Inner_Radius = 40;
    var text_Offset = 24;
    var tween_Duration = 1050;

    //OBJECTS TO BE POPULATED WITH DATA LATER
    var lines_for_donut2, valueLabels_for_donut2, nameLabels_for_donut2;
    var pieData_for_donut2 = [];    
    var oldPieData_for_donut2 = [];
    var filteredPieData_for_donut2 = [];

    //D3 helper function to populate pie slice parameters from array data
    var donut2 = d3.layout.pie().value(function(d){
      return d.itemValue;
    });
    
    var donutColor_for_donut2 = d3.scale.ordinal()
	.range(["#4169E1", "#800080"]);  
    
    //D3 helper function to draw arcs, populates parameter "d" in path object
    var arc_for_donut2 = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(donut_Inner_Radius)
      .outerRadius(donut_Outer_Radius);

    var  vis_for_donut2= d3.select(".chart3").append("svg:svg")
      .attr("width", donut_Width)
      .attr("height", donut_Heigth);

    //GROUP FOR ARCS/PATHS
    var arc_group_for_donut2 = vis_for_donut2.append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + (donut_Width/2) + "," + (donut_Heigth/2) + ")");

    //GROUP FOR LABELS
    var label_group_for_donut2 = vis_for_donut2.append("svg:g")
      .attr("class", "label_group")
      .attr("transform", "translate(" + (donut_Width/2) + "," + (donut_Heigth/2) + ")");

    //GROUP FOR CENTER TEXT  
    center_group_for_donut2 = vis_for_donut2.append("svg:g")
      .attr("class", "center_group")
      .attr("transform", "translate(" + (donut_Width/2) + "," + (donut_Heigth/2) + ")");

    
    //WHITE CIRCLE BEHIND LABELS
    var whiteCircle_for_donut2 = center_group_for_donut2.append("svg:circle")
      .attr("fill", "white")
      .attr("r", donut_Inner_Radius);
    var centerText='';
    
    // "TOTAL" LABEL
var totalLabel_for_donut2 = center_group_for_donut2.append("svg:text")
  .attr("class", "label")
  .attr("dy", -15)
  .attr("text-anchor", "middle") // text-align: right
  .text("TOTAL");

//TOTAL TRAFFIC VALUE
totalValue_for_donut2 = center_group_for_donut2.append("svg:text")
  .attr("class", "total")
  .attr("dy", 7)
  .attr("text-anchor", "middle") // text-align: right
  .text('0');

//UNITS LABEL
var totalUnits_for_donut2 = center_group_for_donut2.append("svg:text")
  .attr("class", "units")
  .attr("dy", 21)
  .attr("text-anchor", "middle") // text-align: right
  .text("Test Cases");

    // to run each time data is generated
    function donutUpdate_for_donut2(number,id,subid) {
    StartTime_pieChart2 = new Date().getTime();
    setTotalLableInDonut2(id,subid);     
        
    //setDonutDataStructure();
    donutData_for_donut2 = dataStructure_for_donut2[number].donutData_for_donut2;

      oldPieData_for_donut2 = filteredPieData_for_donut2;
      pieData_for_donut2 = donut2(donutData_for_donut2);

      var sliceProportion = 0; //size of this slice
      filteredPieData_for_donut2 = pieData_for_donut2.filter(filterData);
        
      function filterData(element, index, array) {
        element.name = donutData_for_donut2[index].itemLabel;
        element.value = donutData_for_donut2[index].itemValue;
        sliceProportion += element.value;
        return (element.value > 0);
      }

        //DRAW ARC PATHS
        paths_for_donut2 = arc_group_for_donut2.selectAll("path").data(filteredPieData_for_donut2);
        paths_for_donut2.enter().append("svg:path")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .attr("fill", function(d, i) { return donutColor_for_donut2(i); })
          .transition()
            .duration(tween_Duration)
            .attrTween("d", pie_Tween);
        paths_for_donut2
          .transition()
            .duration(tween_Duration)
            .attrTween("d", pie_Tween);
        paths_for_donut2.exit()
          .transition()
            .duration(tween_Duration)
            .attrTween("d", remove_Pie_Tween)
          .remove();

    paths_for_donut2.on("mousemove", function(d){
        toolTipForDonut2.style("left", d3.event.pageX+10+"px");
              toolTipForDonut2.style("top", d3.event.pageY-25+"px");
              toolTipForDonut2.style("display", "inline-block");
        toolTipForDonut2.html((d.donutData_for_donut2.itemLabel)+"<br>"+(d.donutData_for_donut2.itemValue));
      
    });

    paths_for_donut2.on("mouseout", function(d){
        toolTipForDonut2.style("display", "none");
    });




        //DRAW TICK MARK LINES FOR LABELS
        lines_for_donut2 = label_group_for_donut2.selectAll("line").data(filteredPieData_for_donut2);
        lines_for_donut2.enter().append("svg:line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", -donut_Outer_Radius-3)
          .attr("y2", -donut_Outer_Radius-18)
          .attr("stroke", "gray")
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines_for_donut2.transition()
          .duration(tween_Duration)
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines_for_donut2.exit().remove();
    //DRAW LABELS WITH PERCENTAGE VALUES
        valueLabels_for_donut2 = label_group_for_donut2.selectAll("text.value").data(filteredPieData_for_donut2)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          })
          .text(function(d){
            var percentage_for_donut2 = (d.value/sliceProportion)*100;
            return percentage_for_donut2.toFixed(1) + "%";
          });

        valueLabels_for_donut2.enter().append("svg:text")
          .attr("class", "value")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (donut_Outer_Radius+text_Offset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (donut_Outer_Radius+text_Offset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            var percentage_for_donut2 = (d.value/sliceProportion)*100;
            return percentage_for_donut2.toFixed(1)+"%";
 });
        valueLabels_for_donut2.transition().duration(tween_Duration).attrTween("transform", text_Tween);

        valueLabels_for_donut2.exit().remove();

        //DRAW LABELS WITH ENTITY NAMES
        nameLabels_for_donut2 = label_group_for_donut2.selectAll("text.units").data(filteredPieData_for_donut2)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels_for_donut2.enter().append("svg:text")
          .attr("class", "units")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (donut_Outer_Radius+text_Offset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (donut_Outer_Radius+text_Offset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 18;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels_for_donut2.transition().duration(tween_Duration).attrTween("transform", text_Tween);

        nameLabels_for_donut2.exit().remove();
		 var total = 0;
		pieData_for_donut2.forEach(function(d){ total+=(d.value*1); });
		/*center_group_for_donut2.selectAll('text').donutData_for_donut2([total]).enter().append('text').text(function(d){
								return d;
								}).attr('class','value').attr('dy', 8).attr('text-anchor', 'end').attr('transform', 'translate(20, 0)');*/
    endTime_pieChart2 = new Date().getTime();
    var totalPieChart2 = (endTime_pieChart2-StartTime_pieChart2)/1000;    
    //alert(totalPieChart2);
    }

    // Interpolate the arcs in data space.
    function pie_Tween(d, i) {
      var s0;
      var e0;
      if(oldPieData_for_donut2[i]){
        s0 = oldPieData_for_donut2[i].startAngle;
        e0 = oldPieData_for_donut2[i].endAngle;
      } else if (!(oldPieData_for_donut2[i]) && oldPieData_for_donut2[i-1]) {
        s0 = oldPieData_for_donut2[i-1].endAngle;
        e0 = oldPieData_for_donut2[i-1].endAngle;
      } else if(!(oldPieData_for_donut2[i-1]) && oldPieData_for_donut2.length > 0){
        s0 = oldPieData_for_donut2[oldPieData_for_donut2.length-1].endAngle;
        e0 = oldPieData_for_donut2[oldPieData_for_donut2.length-1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = i(t);
        return arc_for_donut2(b);
      };


    }

    function remove_Pie_Tween(d, i) {
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = i(t);
        return arc_for_donut2(b);
      };
    }

    function text_Tween(d, i) {
      var a;
      if(oldPieData_for_donut2[i]){
        a = (oldPieData_for_donut2[i].startAngle + oldPieData_for_donut2[i].endAngle - Math.PI)/2;
      } else if (!(oldPieData_for_donut2[i]) && oldPieData_for_donut2[i-1]) {
        a = (oldPieData_for_donut2[i-1].startAngle + oldPieData_for_donut2[i-1].endAngle - Math.PI)/2;
      } else if(!(oldPieData_for_donut2[i-1]) && oldPieData_for_donut2.length > 0) {
        a = (oldPieData_for_donut2[oldPieData_for_donut2.length-1].startAngle + oldPieData_for_donut2[oldPieData_for_donut2.length-1].endAngle - Math.PI)/2;
      } else {
        a = 0;
      }
      var b = (d.startAngle + d.endAngle - Math.PI)/2;

      var fn = d3.interpolateNumber(a, b);
      return function(t) {
        var val = fn(t);
        return "translate(" + Math.cos(val) * (donut_Outer_Radius+text_Offset) + "," + Math.sin(val) * (donut_Outer_Radius+text_Offset) + ")";


      };

    }

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--Harizontal Bar Chart--*/
/*
var horizontal_categories= ['','# of failure test cases>10 ','# of failure test cases=10','# of failure test cases=9','# of failure test cases=8','# of failure test cases=7','# of failure test cases=6','# of failure test cases=5','# of failure test cases=4','# of failure test cases=3','# of failure test cases=2','# of failure test cases=1','# of failure test cases=0'];

var horizontal_dataset = [213,209,190,179,156,209,190,179,213,209,190,179];

var horizontal_colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];

		var horizontal_grid = d3.range(25).map(function(i){
			return {'x1':0,'y1':0,'x2':0,'y2':480};
		});

		var horizontal_tickVals = horizontal_grid.map(function(d,i){
			if(i>0){ return i*10; }
			else if(i===0){ return "100";}
		});

		var horizontal_xscale = d3.scale.linear()
						.domain([10,250])
						.range([0,722]);

		var horizontal_yscale = d3.scale.linear()
						.domain([0,horizontal_categories.length])
						.range([0,480]);

		var horizontal_colorScale = d3.scale.quantize()
						.domain([0,horizontal_categories.length])
						.range(horizontal_colors);

		var horizontal_canvas = d3.select('.chart5')
						.append('svg')
						.attr({'width':900,'height':550});

		var horizontal_grids = horizontal_canvas.append('g')
						  .attr('id','grid')
						  .attr('transform','translate(150,10)')
						  .selectAll('line')
						  .data(horizontal_grid)
						  .enter()
						  .append('line')
						  .attr({'x1':function(d,i){ return i*30; },
								 'y1':function(d){ return d.y1; },
								 'x2':function(d,i){ return i*30; },
								 'y2':function(d){ return d.y2; },
							})
						  .style({'stroke':'#adadad','stroke-width':'1px'});

		var	horizontal_xAxis = d3.svg.axis();
			horizontal_xAxis
				.orient('bottom')
				.scale(horizontal_xscale)
				.tickValues(horizontal_tickVals);

		var	horizontal_yAxis = d3.svg.axis();
			horizontal_yAxis
				.orient('left')
				.scale(horizontal_yscale)
				.tickSize(2)
				.tickFormat(function(d,i){ return horizontal_categories[i]; })
				.tickValues(d3.range(17));

		var horizontal_y_xis = horizontal_canvas.append('g')
						  .attr("transform", "translate(150,0)")
						  .attr('id','horizontal_yAxis')
						  .call(horizontal_yAxis);

		var horizontal_x_xis = horizontal_canvas.append('g')
						  .attr("transform", "translate(150,480)")
						  .attr('id','horizontal_xAxis')
						  .call(horizontal_xAxis);

		var horizontal_chart = horizontal_canvas.append('g')
							.attr("transform", "translate(150,0)")
							.attr('id','bars')
							.selectAll('rect')
							.data(horizontal_dataset)
							.enter()
							.append('rect')
							.attr('height',19)
							.attr({'x':0,'y':function(d,i){ return horizontal_yscale(i)+19; }})
							.style('fill',function(d,i){ return horizontal_colorScale(i); })
							.attr('width',function(d){ return 0; });


		var horizontal_transit = d3.select("svg").selectAll("rect")
						    .data(horizontal_dataset)
						    .transition()
						    .duration(1000) 
						    .attr("width", function(d) {return horizontal_xscale(d); });

		var horizontal_transitext = d3.select('#bars')
							.selectAll('text')
							.data(horizontal_dataset)
							.enter()
							.append('text')
							.attr({'x':function(d) {return horizontal_xscale(d)-200; },'y':function(d,i){ return horizontal_yscale(i)+35; }})
							.text(function(d){ return d; }).style({'fill':'#fff','font-size':'14px'});

*/
//-----------------------------------------------------------------------------------------------------------------------------------------

//set draggable views
$(document).ready(function() {
    var a = 3;
    $('#replayableWidget,#event_panel,#graph_panel1,#graph_panel2,#graph_panel3,#graph_panel4').draggable({
       start: function(event, ui) { $(this).css("z-index", a++); }
    });
    $('#main div').click(function() {
        $(this).addClass('top').removeClass('bottom');
        $(this).siblings().removeClass('top').addClass('bottom');
        $(this).css("z-index", a++);

    });
});

//-----------------------------------------------------------------------------------------------------------------------------------------
/*--UPDATE BAR CHART--*/
function update() {
     startTime_barChart = new Date().getTime();
     for (var i = 0; i < data.length; i++) {
         var testSuite = d3.keys(data[i]).filter(function (key) {
             return key !== "TestSuite";
         });

     }

     data.forEach(function (d) {
         d.trueFalseCount = testSuite.map(function (name) {
             return {
                 name: name,
                 value: +d[name]
             };
         });

     });

     x0.domain(data.map(function (d) {
         return d.TestSuite;
     }));
     x1.domain(testSuite).rangeRoundBands([0, x0.rangeBand()]);
     y.domain([0, d3.max(data, function (d) {
         return d3.max(d.trueFalseCount, function (d) {
             return d.value;
         });
     })]);
      
     //making the x axis/y axis
     xg.call(xAxis);
     yg.call(yAxis);
      
     //removing all the rectangles
     svg.selectAll(".TestSuite").remove();
     
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var word= "<strong style='color:white'>"+
                            "Pass count :"+
                      "</strong>"+
                     " <span style='color:white'>" + d.True + 
                      "</span></br>"+
                     "<strong style='color:white'>"+
                            "Fail count :"+
                      "</strong>"+
                     " <span style='color:white'>" + d.False + 
                      "</span>";
            return word;
        });
    
     var state = svg.selectAll(".TestSuite")
         .data(data)
         .enter().append("g")
         .attr("class", "TestSuite")
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide)
         .attr("transform", function (d) {
         return "translate(" + x0(d.TestSuite) + ",0)";
     });
    
    svg.call(tip);
     
     state.selectAll("rect")
         .data(function (d) {
         return d.trueFalseCount;
     })
         .enter().append("rect")
         .attr("width", x1.rangeBand())
         .attr("x", function (d) {
         return x1(d.name);
     })
         .attr("y", function (d) {
         return y(d.value);
     })
         .attr("height", function (d) {
         return height - y(d.value);
     })
         .style("fill", function (d) {
         return color(d.name);
     });
 
      
  if(barChartLegentController==1){    
   var legend = svg.selectAll(".legend")
      .data(testSuite.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

   legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

   legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
      
  barChartLegentController=2;      
  }
    
  endTime_barChart = new Date().getTime();
  var totalbar = (endTime_barChart-startTime_barChart)/1000;     
  //alert('Total bar time : '+ totalbar+' seconds');
 }

//-----------------------------------------------------------------------------------------------------------------------------------------

function playFunction(index) {
        
        //when pause button is clicked
        if(index== 1)   pauseButtonFunction();

        //when play button is clicked
        if(index==2 )   playButtonFunction();   
        
        //when stop button is clicked
        if(index==3)    stopButtonFunction();
       
        //when backward button is clicked
        if(index==4)    backwardButtonFunction();
           
        //when forward button is clicked
        if(index==5)    forwardButtonFunction();
        
        //when sub play button clicked
        if(index==6)    subPlayButtonFunction();
        
    }  

//-----------------------------------------------------------------------------------------------------------------------------------------

function playButtonFunction(){
    
    startTime_replayableWidget = new Date().getTime(); 
    
    document.getElementById("playSubButton").style.visibility="visible";
    document.getElementById("stopButton").style.visibility="visible";
    document.getElementById("backwardButton").style.opacity=1;
    document.getElementById("forwardButton").style.opacity=1;
    document.getElementById("playButton").src="images/playHover.png";
    document.getElementById("stopButton").src="images/stop.png";                
    document.getElementById("pauseButton").src="images/pause.png";
    document.getElementById("forwardButton").src="images/forward.png";
    document.getElementById("backwardButton").src="images/backward.png";
    document.getElementById("playSubButton").src="images/subplay.png";
        
    if(playState=='Initial'){
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ; //select first div
        mainRootID++;
    }else if(playState=='Click'){
        mainRootID=clickMainIDContainer[posOfClickMainIDContainer-1];
        playSubRoot(mainRootID,1);
        subRootCount=getSubRootCount(mainRootID);
        document.getElementById( mainRootID.toString()+"_"+subRootCount.toString()).style.backgroundColor='#FFFFFF' ;
    }else if(playState=='SubClick'){
        array1 = clickSubIDContainer[posOfClickSubIDContainer-1].split('_');
        mainRootID=array1[0];
        subRootID=array1[1];
        playSubRoot(mainRootID,subRootID);
        subRootCount=getSubRootCount(mainRootID);
        document.getElementById( mainRootID.toString()+"_"+subRootCount.toString()).style.backgroundColor='#FFFFFF' ;
    }else if(playState=='Play'){
        subRootCount=getSubRootCount(mainRootID);
        document.getElementById( mainRootID.toString()+"_"+subRootCount.toString()).style.backgroundColor='#FFFFFF' ;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ; 
        mainRootID++;
    }
       
    if(backward_forward_controler==1){
        backward_forward_controler=0;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
        mainRootID++;
        playState='Play';
    }
    
   if(playState!='SubClick'){
    var interval = setInterval(function() {
         var StartPauseTime = new Date().getTime();
        if(playState=='Pause'|| playState=='Forward' || playState=='Backward')  clearInterval(interval);
        //if(playState=='Forward' || playState=='Backward'){
        //    if(backward_forward_controler!=0) 
        //} 
        document.getElementById(mainRootCount).style.backgroundColor='#FFFFFF' ; //set white background for last div
        document.getElementById((mainRootID-1).toString()).style.backgroundColor='#FFFFFF' ; //set white background for last div
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ; //select first div
        
        barChartData(mainRootID);
         
        data.splice(mainRootID);
        update();
            
        setDonutDataStructure();  
        donutUpdate(0);
            
        setDonutDataStructure2(mainRootID,0);
        donutUpdate_for_donut2(0 , mainRootID,0);
        
        updateLineChart(mainRootID,0);
        
        mainRootID++;
        if(mainRootID==mainRootCount+1){
            clearInterval(interval);
            endTime_replayableWidget= new Date().getTime();
            var playTotal = (endTime_replayableWidget - startTime_replayableWidget)/1000;    
            //alert('Total time : '+ playTotal+' seconds');   
        }
        if(playState=='Click'){
            clearInterval(interval);
            setUnselect();
        }
        mainDiv.scrollTop = getSubDivPos(mainRootID);  
        
    }, 1000);
  }
 
  
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function pauseButtonFunction(){
    playState = "Pause";
    
    document.getElementById("playButton").src="images/play.png";
    document.getElementById("forwardButton").src="images/forward.png";
    document.getElementById("backwardButton").src="images/backward.png";
    document.getElementById("stopButton").src="images/stop.png";
    document.getElementById("pauseButton").src="images/pauseHover.png";
    document.getElementById("playSubButton").src="images/subplay.png";
    mainRootID--;
    setUnselect();
    document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7';
    mainDiv.scrollTop = getSubDivPos(mainRootID);
    
    
}

//---------------------------------------------------------------------------------------------------------------------------------------------

function stopButtonFunction(){
    
    document.getElementById("playButton").src="images/play.png";
    document.getElementById("stopButton").src="images/stopHover.png";                
    document.getElementById("pauseButton").src="images/pause.png";
    document.getElementById("forwardButton").src="images/forward.png";
    document.getElementById("backwardButton").src="images/backward.png";
    document.getElementById("playSubButton").src="images/subplay.png";
    setUnselect();
    mainRootID--;
    document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
    mainRootID=1;
    document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ;
    mainDiv.scrollTop = getSubDivPos(mainRootID);
    
    
    
    barChartData(0);
        
    data.splice(0);
    update();
            
    setDonutDataStructure();  
    donutUpdate(0);
            
    setDonutDataStructure2(mainRootID,0);
    donutUpdate_for_donut2(0 , mainRootID,0);
    
    playState='Initial';
    
   
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function backwardButtonFunction(){
    document.getElementById("playButton").src="images/play.png";
    document.getElementById("forwardButton").src="images/forward.png";
    document.getElementById("backwardButton").src="images/backwardHover.png";
    document.getElementById("stopButton").src="images/stop.png";
    document.getElementById("pauseButton").src="images/pause.png";
    document.getElementById("playSubButton").src="images/subplay.png";
    
    if(backward_forward_controler==0){
        mainRootID--;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
        mainRootID--;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ;
        backward_forward_controler=1;
    }else{
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
        mainRootID--;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ;      
    }
    mainDiv.scrollTop = getSubDivPos(mainRootID);
    
    barChartData(mainRootID);
              
    data.splice(mainRootID);
    update();
    
    updateLineChart(mainRootID,0);
    
    setDonutDataStructure();  
    donutUpdate(0);
            
    setDonutDataStructure2(mainRootID,0);
    donutUpdate_for_donut2(0 , mainRootID,0);
    
    playState='Backward';
    
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function forwardButtonFunction(){
    
    document.getElementById("playButton").src="images/play.png";
    document.getElementById("forwardButton").src="images/forwardHover.png";
    document.getElementById("backwardButton").src="images/backward.png";
    document.getElementById("stopButton").src="images/stop.png";
    document.getElementById("pauseButton").src="images/pause.png";
    document.getElementById("playSubButton").src="images/subplay.png";
    
    if(backward_forward_controler==0){
        mainRootID--;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
        mainRootID++;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ;
        backward_forward_controler=1;
    }else{
        document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF' ;
        mainRootID++;
        document.getElementById(mainRootID.toString()).style.backgroundColor='#87afc7' ;
    }
    mainDiv.scrollTop = getSubDivPos(mainRootID);
    
    barChartData(mainRootID);
              
    data.splice(mainRootID);
    update();
    
    updateLineChart(mainRootID,0);
    
    setDonutDataStructure();  
    donutUpdate(0);
            
    setDonutDataStructure2(mainRootID,0);
    donutUpdate_for_donut2(0 , mainRootID,0);
    
    playState='Backward';
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function subPlayButtonFunction(){

        document.getElementById("playButton").src="images/play.png";
        document.getElementById("forwardButton").src="images/forward.png";
        document.getElementById("stopButton").src="images/stop.png";              
        document.getElementById("pauseButton").src="images/pause.png";
        document.getElementById("backwardButton").src="images/backward.png"
        document.getElementById("playSubButton").src="images/subplayHover.png";        
    
         playState="playSub";
            mainRootID--;
            subRootID=1;
            //need to check level
            listIdCreater="li_"+mainRootID;
            var UlIdCreater="ul_"+mainRootID;
        
        //document.getElementById(listIdCreater).style.backgroundImage="../images/minus_icon.png"; 
            subRootCount=getSubRootCount(mainRootID);
            
            //help to find sub levels
            /*if(level>0){
                
                var listIdCreater='li';
                var UlIdCreater='ul'; 
                for(var levelfinder=1 ; levelfinder<=level ; levelfinder++){
                    listIdCreater =listIdCreater+'_1';
                    UlIdCreater = UlIdCreater+'_1';
                    levelfinder++;
                }
                
                if(document.contains(document.getElementById(UlIdCreater+'_1'))){
                    level++;
                    document.getElementById(mainRoot.toString()).style.backgroundColor='#F8F8F8 ' ;
                }
                
            }*/
           
            document.getElementById(mainRootID.toString()).style.backgroundColor='#E0EBFF ';
                
                    
            $( '.tree li' ).each( function() {
                if( $( this ).children( 'ul' ).length > 0 ) {
                    $( this ).addClass( 'parent' );     
                }
            });	
             
            $('#'+listIdCreater+'> a').parent().toggleClass( 'active' );   //$('#LeftScrollableDiv').children().first();
            document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/minus_icon.png")';
            $('#'+listIdCreater+'> a').parent().children( 'ul' ).slideDown( 'fast' );
            //$('#'+listIdCreater).style.backgroundImage='url(images/minus_icon.png)';
                     
            document.getElementById( mainRootID.toString()+"_"+subRootCount.toString()).style.backgroundColor='#FFFFFF' ;
            document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#87afc7' ;
            subRootID++;
               
            var interval = setInterval(function() {
                           if(playState=="playSub"){
                                   //change previous one background coloras unselected element
                                  if(subRootID>1 ){
                                      subRootID--;
                                      document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#FFFFFF' ;
                                      subRootID++;
                                  }
                                  document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#87afc7' ;
                                  
                                  subClickBarChart(mainRootID,subRootID);
                                  update();
                               
                                  updateLineChart(mainRootID,subRootID);
                               
                                  setDonutDataStructure2(mainRootID,subRootID);
                                  donutUpdate_for_donut2(0 , mainRootID,subRootID);
                                 
                                  if(subRootID == subRootCount) {
                                      
                                      clearInterval(interval);
                                      
                                      $('#'+listIdCreater+'> a').parent().toggleClass( 'active' );   
                                      $('#'+listIdCreater+'> a').parent().children( 'ul' ).slideUp( 'medium' );
                                            document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/plus_icon.png")';
                                      subRootCount=0;
                                      subRootID=1;
                                      document.getElementById(mainRootID.toString()).style.backgroundColor='#FFFFFF ';
                                      playState='Play';
                                      playButtonFunction();
                                      
                                  }else{
                                      subRootID++;
                                  }
                                                      
                              }else{
                                  clearInterval(interval);
                              }}, 1000);
    subTrue = 0;
    subFalse = 0;
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function getSubDivPos(id) {
var pos = 0;  
if(id>2){
  var iNode;
  for(var i = 2; i < mainRootCount; i++) {
    iNode = document.getElementById(i.toString());
    if(iNode.id == id){
      break;
    }
    pos = pos + iNode.clientHeight + 5;
  }
}
  return pos;
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function clickFunction(subID,mainID,lockState){
    var number;
    mainDiv.scrollTop = getSubDivPos(mainID);
    setUnselect();
    if(lockState=='on'){ //sub root is clicked
        if(posOfClickSubIDContainer!=0){
            document.getElementById(clickSubIDContainer[posOfClickSubIDContainer-1]).style.backgroundColor='#FFFFFF'; 
        }
        if(playState=='SubClick'){
            subRootCount=getSubRootCount(clickMainIDContainer[posOfClickMainIDContainer-1]);
            number=clickMainIDContainer[posOfClickMainIDContainer-1];
            for(var count2 = 1; count2<=subRootCount; count2++){
                document.getElementById(number.toString()+"_"+count2.toString()).style.backgroundColor='#FFFFFF'; 
            }
        }
        clickSubIDContainer[posOfClickSubIDContainer]=subID; 
        document.getElementById(subID).style.backgroundColor='#87afc7';  
        posOfClickSubIDContainer++;
        playState='SubClick';
        
        subClickBarChart(mainID,subID);
        data.slice(mainID);
        update();
        
        updateLineChart(mainID,subID);
                               
        setDonutDataStructure2(mainRootID,subRootID);
        donutUpdate_for_donut2(0 , mainRootID,subRootID);   
        
    }else{ // lockState='off'-->main root is clicked
        listIdCreater="li_"+mainID;
        if(posOfClickMainIDContainer!=0){
            if(playState=='SubClick'){
                subRootCount=getSubRootCount(clickMainIDContainer[posOfClickMainIDContainer-1]);
                number=clickMainIDContainer[posOfClickMainIDContainer-1];
                for(var count2 = 1; count2<=subRootCount; count2++){
                    document.getElementById(number.toString()+"_"+count2.toString()).style.backgroundColor='#FFFFFF'; 
                }
            }
            if(collapsible[mainID-1]=='false'){ 
                document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/minus_icon.png")';
                $('#'+listIdCreater+'> a').parent().children('ul').slideDown('fast');
                collapsible[mainID-1]='true';
                clickMainIDContainer[posOfClickMainIDContainer]=mainID;
                posOfClickMainIDContainer++;
                playState='Click';
            }else{
                document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/plus_icon.png")';
                $('#'+listIdCreater+'> a').parent().children('ul').slideUp('fast');
                document.getElementById(clickSubIDContainer[posOfClickSubIDContainer-1]).style.backgroundColor='#FFFFFF';
                collapsible[mainID-1]='false';
            } 
        }else{
            document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/minus_icon.png")';
            $('#'+listIdCreater+'> a').parent().children('ul').slideDown('fast');
            clickMainIDContainer[posOfClickMainIDContainer]=mainID;
            posOfClickMainIDContainer++;
            playState='Click';
            collapsible[mainID-1] = 'true' ; 
        }
        
        barChartData(mainID);
        data.splice(mainID);
        update();
    
        updateLineChart(mainID,0);
        
        setDonutDataStructureClick(mainID);
        donutUpdate(0);
    
        setDonutDataStructure2(mainID,0);
        donutUpdate_for_donut2(0,mainID);
    }
    
    
}

//--------------------------------------------------------------------------------------------------------------------------------------------


//This function returns the sub root count of perticular tree barnch
function getSubRootCount(ab){
    var UlIdCreater="ul_"+ab;
            
    //get sub root count according to selected mainRootID
    
    var findSubDivs = document.getElementById(UlIdCreater.toString())
                      .getElementsByTagName("div");
    var subRootCount = findSubDivs.length;
    return subRootCount;
   
}

//--------------------------------------------------------------------------------------------------------------------------------------------

 function playSubRoot(mainRootID,subRootID){
    mainDiv.scrollTop = getSubDivPos(mainRootID); 
    playState="SubClick"; 
    subRootCount=getSubRootCount(mainRootID);
    document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#87afc7' ; 
    subRootID++;
    listIdCreater="li_"+mainRootID;
    
            var interval = setInterval(function() {
                           if(playState=="SubClick"){
                                   //change previous one background coloras unselected element
                                  if(subRootID>1 ){
                                      subRootID--;
                                      document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#FFFFFF' ;
                                      subRootID++;
                                  }
                                  document.getElementById(mainRootID.toString()+"_"+subRootID.toString()).style.backgroundColor='#87afc7' ;
                                 
                                  subClickBarChart(mainRootID,subRootID);
                                  update();
                               
                                  updateLineChart(mainRootID,subRootID);
                               
                                  setDonutDataStructure2(mainRootID,subRootID);
                                  donutUpdate_for_donut2(0 , mainRootID,subRootID);   
                               
                                  if(subRootID == subRootCount) {
                                      
                                      clearInterval(interval);
                                      
                                      $('#'+listIdCreater+'> a').parent().toggleClass( 'active' ); 
                                      document.getElementById(listIdCreater).style.listStyleImage='url("file:///D:myReaserch/best/images/plus_icon.png")';
                                      $('#'+listIdCreater+'> a').parent().children( 'ul' ).slideUp( 'medium' );
                                      collapsible[mainRootID-1]='false';
                                      subRootCount=0;
                                      playState='Play';
                                      playButtonFunction();
                                      
                                  }else{
                                      subRootID++;
                                  }
                                                      
                              }else{
                                  clearInterval(interval);
                              }}, 1000);
    subTrue = 0;
    subFalse = 0; 
     
 }

//---------------------------------------------------------------------------------------------------------------------------------------------

//This function use to set donut chart when playing tree
function setDonutDataStructure(){

dataStructure = [
                {
                 "donutData":[
                             {
                              "itemLabel":"Execute",
                              "itemValue":mainRootID
                             },
                             {
                              "itemLabel":"Non-Execute",
                              "itemValue":mainRootCount-mainRootID
                             },
                            ],
                }, 
                ];

}

//---------------------------------------------------------------------------------------------------------------------------------------------

//This function use to set donut chart when playing tree
function setDonutDataStructure2(ID,subID){
  
  var addCount;
  var addTrue= 0;
  var addFalse = 0;    
  for(x = 0 ; x<ID ; x++){
       addTrue = addTrue+trueCountArray[x];
       addFalse = addFalse+falseCountArray[x]; 
  }
    
  if(subID!=0){
    testID=ID+'_'+subID;
    testRoot= document.getElementById(testID);         
    if(testRoot.childNodes[0].id=="T"){
         addTrue++; 
    }
         
    if(testRoot.childNodes[0].id=="F"){
         addFalse++;
    } 
  }    
      
  dataStructure_for_donut2 = [
                                {
                                    "donutData_for_donut2":[
                                                    {
                                                        "itemLabel":"Pass",
                                                        "itemValue":addTrue
                                                    },
                                                    {
                                                        "itemLabel":"Fail",
                                                        "itemValue":addFalse
                                                    },
                                                ],
                                }, 
                            ];
}

//---------------------------------------------------------------------------------------------------------------------------------------------

//This function is used to set donut class when clicking on the tree
function setDonutDataStructureClick(clickID){

dataStructure = [
                    {
                        "donutData":[
                                        {
                                            "itemLabel":"Execute",
                                            "itemValue":clickID
                                        },
                                        {
                                            "itemLabel":"Non-Execute",
                                            "itemValue":mainRootCount-clickID
                                        },
                                    ],
                    }, 
                ];

}

//---------------------------------------------------------------------------------------------------------------------------------------------

//This function copy the needed data from original data array
function barChartData(ID){
    
    var counter;
     data = [] ;
    
    for(counter = 0 ; counter <= ID ; counter++){
        data[counter] = originalDataSetForBarChart[counter];
    }

    
}

//----------------------------------------------------------------------------------------------------------------------------------------------

function subClickBarChart(ID,subID){
    //testID=ID+'_'+subID;
    //alert(testID);
    data = [] ;
    testRoot= document.getElementById(subID);         
    if(testRoot.childNodes[0].id=="T"){
         subTrue++; 
    }
         
    if(testRoot.childNodes[0].id=="F"){
         subFalse++;
    }
    
    for(counter = 0 ; counter < ID-1 ; counter++){
        data[counter] = originalDataSetForBarChart[counter];
    }
    
   data.push({
          TestSuite: "TS"+ID,
          True: subTrue,
          False: subFalse
     });
}

//----------------------------------------------------------------------------------------------------------------------------------------------

function setTotalLableInDonut2(ID,SubID){    
        //d3.select("svg").remove(); 
        totalValue_for_donut2.remove();    
        var a;//set for for loop count
        var getTotalCount = 0; //use this for the donut3 cricle lable 
        for(a = 0 ; a<ID ; a++){
            getTotalCount = getTotalCount + trueCountArray[a] + falseCountArray[a];
         }  
        
        if(SubID!=0){
            getTotalCount = getTotalCount - (trueCountArray[ID-1]+falseCountArray[ID-1]);
            
            for(var b=1 ; b<=SubID ; b++ ){ //variable b set for run for loop
                testID=ID+'_'+b;
                testRoot= document.getElementById(testID);         
                if(testRoot.childNodes[0].id=="T" || testRoot.childNodes[0].id=="F"){
                     getTotalCount++; 
                }
            }
        }
    

   //TOTAL TRAFFIC VALUE
   totalValue_for_donut2 = center_group_for_donut2.append("svg:text")
  .attr("class", "total")
  .attr("dy", 7)
  .attr("text-anchor", "middle") // text-align: right
  .text(getTotalCount);  
}

//---------------------------------------------------------------------------------------------------------------------------------------------

function dateCatcher(statement){

    var date_finder =/(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/;
    var datePart = statement.match(date_finder);
    datePart[2] -= 1;
    var UtcDate = new Date(Date.UTC.apply(this, datePart.slice(1)));
    var month = UtcDate.getUTCMonth() + 1; //months from 1-12
    var day = UtcDate.getUTCDate();
    var year = UtcDate.getUTCFullYear();
    var hours = UtcDate.getUTCHours();
    var minutes = UtcDate.getUTCMinutes();
    var seconds = UtcDate.getUTCSeconds();
    
    var newdate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return newdate;
} 

//----------------------------------------------------------------------------------------------------------------------------------------------

function updateLineChart(index,subIndex){
    var totalSubRoots = 0;
    for(var counter_a=0 ; counter_a<index ; counter_a++ ){
        totalSubRoots = totalSubRoots+ subRootCountHolder[counter_a];
    }
    
    totalSubRoots = totalSubRoots+subIndex;
    
    for(var counut2 = 0 ; counut2<totalSubRoots ; counut2++){
        duplicateDataForLineChart[counut2] = OriginalDataForLineChart[counut2];
    } 
    //alert(duplicateDataForLineChart[duplicateDataForLineChart.length-1].DateRecord);
  if (!line_dataCirclesGroup) {
		line_dataCirclesGroup = line_svg.append('svg:g');
	}

	var line_circles = line_dataCirclesGroup.selectAll('.data-point').data(duplicateDataForLineChart);
		//.data(data);

	line_circles
		.enter()
			.append('svg:circle')
				.attr('class', 'data-point')
				.style('opacity', 1e-6)
                .style('stroke','#000000');
    
    line_circles
		.attr('cx', function(d) { return line_x(d.Date); })
		.attr('cy', function(d) { return line_y(d.Value); })
		.attr('r', function() { return (duplicateDataForLineChart.length <= line_maxDataPointsForDots) ? line_pointRadius : 0 })
        .style('fill', function(d){
                           if(d.TrueFalseVale == 'True'){ //"#4169E1", "#800080"
                              return "#4169E1";}
                          else{
                              return "#800080";
                               } 
                })
		.transition()
		.duration(line_transitionDuration)
		.style('opacity', 1);

	line_circles
		.exit()
			.transition()
			.duration(line_transitionDuration)
				// Leave the cx transition off. Allowing the points to fall where they lie is best.
				//.attr('cx', function(d, i) { return line_xAxis(i) })
				.attr('cy', function() { return line_y(0) })
				.style("opacity", 1e-6)
				.remove();

   $('svg circle').tipsy({ 
        gravity: 's',   // nw | n | ne | w | e | sw | s | se   -->  http://onehackoranother.com/projects/jquery/tipsy/
        html: true, 
        title: function(d) {
          //var d = this.__duplicateDataForLineChart__;
	      //var pDateRecord = duplicateDataForLineChart[0].DateRecord;
          return duplicateDataForLineChart[index].DateRecord;
        }
    });
     
}

//----------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------