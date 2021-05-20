import React from 'react';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockBubbleChart extends React.Component {
    
	render() {
        const formattedData = Object.keys(this.props.data).map(key => {
            const positiveSentiment = this.props.data[key]['POSITIVE'] || 0;
            const negativeSentiment = this.props.data[key]['NEGATIVE'] || 0;
            // const neutralSentiment = this.props.data[key]['NEUTRAL'];
            return {
                label: key,
                y: this.props.data[key].timesMentioned || 0,
                z: this.props.data[key].timesMentioned || 0,
                x: positiveSentiment - negativeSentiment
            }
        });
        console.log('FORMATTED DATA', formattedData);
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2", // "light1", "light2", "dark1", "dark2"
            axisX: {
				title: "Sentiment Score",
			},
			axisY: {
				title: "Number of times mentioned"
			},
			title:{
				text: "Stock Sentiment",
			    fontSize: 26
			},
			data: [{
				type: "bubble",
				indexLabel: "{label}",
				toolTipContent: "<b>{label}</b><br>Sentiment Score {x}<br>Times Mentioned: {y}<br>Times Mentioned: {z}",
				dataPoints: formattedData
			}]
		}
		
		return (
		<div>
			<h1>Data from r/wallstreetbets</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StockBubbleChart;

// const StockBubbleChart = ({ data }) => {
    
//   return (<div>
//       <BubbleChart
//     graph= {{
//       zoom: 1.1,
//       offsetX: -0.05,
//       offsetY: -0.01,
//     }}
//     width={1000}
//     height={800}
//     padding={0} // optional value, number that set the padding between bubbles
//     showLegend={true} // optional value, pass false to disable the legend.
//     legendPercentage={20} // number that represent the % of with that legend going to use.
//     legendFont={{
//           family: 'Arial',
//           size: 12,
//           color: '#000',
//           weight: 'bold',
//         }}
//     valueFont={{
//           family: 'Arial',
//           size: 12,
//           color: '#fff',
//           weight: 'bold',
//         }}
//     labelFont={{
//           family: 'Arial',
//           size: 16,
//           color: '#fff',
//           weight: 'bold',
//         }}
//     //Custom bubble/legend click functions such as searching using the label, redirecting to other page
//     bubbleClickFunc={bubbleClick}
//     legendClickFun={legendClick}
//     data={formattedData}
//   />
//   </div>)
// }

// // var colorLegend = [
// //     //reds from dark to light
// //     {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
// //     //neutral grey
// //     {color: "#f0f0f0", text: 'Neutral'},
// //     // blues from light to dark
// //     "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", {color: "#08306b", text: 'Positive', textColor: "#ffffff"}
// //   ];
   
// //   var tooltipProps = [{
// //     css: 'symbol',
// //     prop: '_id'
// //   }, {
// //     css: 'value',
// //     prop: 'value',
// //     display: 'Last Value'
// //   }, {
// //     css: 'change',
// //     prop: 'colorValue',
// //     display: 'Change'
// //   }];
   
// //   export default class BubbleChart extends React.Component {
// //     render () {
      
   
// //       return <ReactBubbleChart
// //         className="my-cool-chart"
// //         colorLegend={colorLegend}
// //         data={data}
// //         selectedColor="#737373"
// //         selectedTextColor="#d9d9d9"
// //         fixedDomain={{min: -1, max: 1}}
// //         legend={true}
// //         legendSpacing={0}
// //         tooltip={true}
// //         tooltipProps={tooltipProps}
// //         // tooltipFunc={tooltipFunc}
// //       />;
// //     }
// //   }
// // }

// export default StockBubbleChart;