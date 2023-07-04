# belly-button-challenge

This repository has 3 main files: index.html, samples.json, and app.js.

The app.js has all the code for the information, first I read the URL that contains the data in a JSON structure by using d3. By getting the "selDtaset" and saving the names into the variable "options", I added them to the dropdown. Next for the bar chart I sorted the data in descending order and sliced the top 10 of each of the variables that I will use to create the bar chart. I created the "label list" to add the "OTU" text to the label. 

For the bubble chart, I saved  x_values, y_values, and the label information in variables and for the metadata, I saved all the information in variables and then in a list for the purpose of iterating on it later. 

The function init generates both charts and the list of metadata information and then the function updatePlotly updates the charts and the information depending on the selection in the dropdown. 
