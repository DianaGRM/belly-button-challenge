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
    var options = d.names
    
    //options 
    let selDataset = document.getElementById("selDataset")
    for (var option of options) {
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selDataset.appendChild(optionElement);
      }
    
   

    //BAR CHART
    //TOP 10
    //sort the data
    let sorted_data = d.samples.sort((a,b) => b.sample_values - a.sample_values)


    //slice
    let sliced_data = sorted_data[0].otu_ids.slice(0,10)
    let sliced_values = sorted_data[0].sample_values.slice(0,10)
    let text = sorted_data[0].otu_labels.slice(0,10)
    
    
    //making the label 
    let label = []
    for (let i = 0; i < sliced_data.length; i++) {
        label.push("OTU "+sliced_data[i])
        
    }

    //plot 
    let otu = label
    let value = sliced_values

    otu = otu.reverse()
    value = value.reverse()
    text = text.reverse()
   
    //BUBBLE CHART
    let x_values = d.samples[0].otu_ids
    let y_values = d.samples[0].sample_values
    let text1 = d.samples[0].otu_labels

    //METADATA
    let id = ("id: " + d.metadata[0].id)
    let ethnicity = ("ethnicity: " + d.metadata[0].ethnicity)
    let gender =("gender: " +d.metadata[0].gender)
    let age = ("age: " + d.metadata[0].age)
    let location= ("location: " + d.metadata[0].location)
    let bbtype = ("bbtype: "+ d.metadata[0].bbtype)
    let wfreq = ("wfreq: " + d.metadata[0].wfreq)

    let metada = [id, ethnicity, gender, age, location, bbtype, wfreq]

    let parentelement = document.getElementById("sample-metadata");
    

    // Initializes the page with a default plot
    function init() {
        //bar
        data = [{
            x: value,
            y: otu,
            type: 'bar',
            orientation: 'h',
            hovertext: text
       }];
        //bubble
       data2 = [{
        x: x_values,
        y: y_values,
        mode: 'markers',
        hovertext: text1,
        marker:{
        size: y_values,
        color: x_values}

        }];
        var layout = {
            title: {text: 'OTU ID', 
                    position: 'bottom'},
            height: 600,
            width: 1200
        };
       
        Plotly.newPlot("bar", data);
        Plotly.newPlot("bubble", data2,layout);
        
        //METADATA
        metada = [id, ethnicity, gender, age, location, bbtype, wfreq]

        for (var element of metada){
            var listitemelement = document.createElement("p");
    
            listitemelement.textContent = element;
    
            parentelement.appendChild(listitemelement);
        }
      }

    d3.selectAll("#selDataset").on("change", updatePlotly);
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");
      
        // Initialize x and y arrays
        let x = [];
        let y = [];

        //loop the option 
        for (let i = 0; i < options.length; i++) {
            if(dataset===options[i]){
                
                //slice
                 let sliced_data = sorted_data[i].otu_ids.slice(0,10);
                 let sliced_values = sorted_data[i].sample_values.slice(0,10);
                 let text = sorted_data[i].otu_labels.slice(0,10);

                //making the label 
                let label = []
                 for (let i = 0; i < sliced_data.length; i++) {
                 label.push("OTU "+sliced_data[i])
        
                }

                //bar
                let otu = label
                let value = sliced_values
                otu = otu.reverse()
                value = value.reverse()
                text = text.reverse()

                //bubble
                let x_values = d.samples[i].otu_ids
                let y_values = d.samples[i].sample_values
                let text1 = d.samples[i].otu_labels

                //METADATA
                let id = ("id: " + d.metadata[i].id)
                let ethnicity = ("ethnicity: " + d.metadata[i].ethnicity)
                let gender =("gender: " +d.metadata[i].gender)
                let age = ("age: " + d.metadata[i].age)
                let location= ("location: " + d.metadata[i].location)
                let bbtype = ("bbtype: "+ d.metadata[i].bbtype)
                let wfreq = ("wfreq: " + d.metadata[i].wfreq)

                metada = [id, ethnicity, gender, age, location, bbtype, wfreq];
                parentelement = document.getElementById("sample-metadata");
                
            
                for (var index=0; index < metada.length; index++){
                    
                    var listitemelement = parentelement.getElementsByTagName("p")[index];

                    listitemelement.textContent = metada[index];
            
                    
                }

                //plots

                x= value;
                y= otu;
                hovertext= text;

                x1=x_values;
                y1=y_values;
                hovertext1= text1;
                marker={
                    size: y_values,
                    color: x_values};

                };


            
        }
      
        
      
        // Note the extra brackets around 'x' and 'y'
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "hovertext", [hovertext]);

        Plotly.restyle("bubble", "x", [x1]);
        Plotly.restyle("bubble", "y", [y1]);
        Plotly.restyle("bubble", "hovertext", [hovertext1]);
        Plotly.restyle("bubble","marker",[marker]);
      }
      
    init();
     })



