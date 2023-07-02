//Reading the json
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(d=>{
    console.log(d)

    d3
    .select('body')          // Select the HTML tag 'body'
    .selectAll('p')          // Select 'imaginary' paragraphs
    .data(d)                 // bind the data (d) to those imaginary p-tags
    .enter()                 // select the imaginary paragraphs...
    .append('p')             // for each imaginary paragraphs.. apend one -> insert one paragraph per data entry
    .text(d=>d.full_name)    // add text to each paragraph, the text comes out of each 'full_name' of each data entry

})
    
d3.json(url).then(d=>{
    //making 1 array from all the arrays
        sampleValues=[]
        otuids = []
    for (let i = 0; i < d.samples.length; i++) {
        otuids = otuids.concat(d.samples.map(d=> d.otu_ids)[i])
        sampleValues = sampleValues.concat(d.samples.map(d=> d.sample_values)[i])
    }
    //joining the outids and sample values for sorting 
    data = otuids.map((otuids,index)=> {
        return Object.assign({},{
            otuids,
            sampleValues: sampleValues[index]
        });
    });
    console.log(data)
    
    //console.log(d.samples.map(d=> d.sample_values)[0].concat(d.samples.map(d=> d.sample_values)[1]))
    //console.log(d.samples.map(d=> d.sample_values))

    //TOP 10
    //sort the data
    let sorted_data = d.samples.sort((a,b) => b.sample_values - a.sample_values)

    console.log(sorted_data)
  

    //slice
    //let sliced_data = sorted_data.slice(0,10)
    //console.log(sliced_data)

    //plot
    let otu = sorted_data.map(d=> d.otu_ids)
    let value = sorted_data.map(d=> d.sample_values)
    console.log(otu)
    let top10 = {
        x: value,
        y: otu,
        type: 'bar',
        //orientation: 'h'
    }
    let tracetop10 = [top10]
    Plotly.newPlot('plot1',tracetop10, {title: 'Top 10'})
})
