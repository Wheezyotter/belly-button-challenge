
const sample_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    let names = [];
    let metadata = [];
    let samples = [];

    let dataID = [];
    let dataOTU_id = [];
    let dataSampleValues = [];
    let dataOTULabel = [];

    d3.json(sample_url).then(function(data) {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        dataID = samples.map(id => id.id);
        dataOTU_id = samples.map(otu_ids => otu_ids.otu_ids);
        dataSampleValues = samples.map(sample_values => sample_values.sample_values);
        dataOTULabel = samples.map(otu_labels => otu_labels.otu_labels);

        // Use D3 to select the dropdown menu
        let dropDownMenu = d3.select("#selDataset");

        for (i = 0; i<dataID.length; i++){
            dropDownMenu.append("option").text(dataID[i]).property("value", dataID[i])   
        }
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropDownMenu.property("value");
        displayBarGraph(dataset);
        displayBubbbleChart(dataset);

        // d3.selectAll("#selDataset").on("change", updateBar);

    });

}

function optionChanged(id) {
    displayBarGraph(id);
    displayBubbbleChart(id);
}

function displayBarGraph(sampleID) {
    d3.json(sample_url).then(function(data) {
            names = data.names;
            metadata = data.metadata;
            samples = data.samples;

            let findData = samples.find((elem) => elem.id === sampleID);

            dataID = findData.id
            dataOTU_id = (findData.otu_ids).slice(0,10).map(i => 'OTU ' + i).reverse();
            dataSampleValues = (findData.sample_values).slice(0,10).reverse();
            dataOTULabel = (findData.otu_labels).slice(0,10).reverse();
            // console.log(dataOTULabel); //Format hover text

            let trace1 = {
                x: dataSampleValues,
                y: dataOTU_id,
                text: dataOTULabel, 
                name: "OTU",
                type: "bar",
                orientation: "h"
                // ,hovertemplate:  '<i>Price</i>: $%{y:.2f}' +
                //                 '<br><b>X</b>: %{x}<br>' +
                //                 '<b>%{text}</b>'
            }

            let traceData = [trace1];

            let layout = {
                title: ("Top 10 OTUs of Sample ID: " + String(dataID)),
              };

        Plotly.newPlot("bar", traceData, layout);
    });
}

function displayBubbbleChart(sampleID) {
    d3.json(sample_url).then(function(data) {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        let findData = samples.find((elem) => elem.id === sampleID);

        dataID = findData.id;
        dataOTU_id = findData.otu_ids;
        dataSampleValues = findData.sample_values;
        dataOTULabel = findData.otu_labels;

        let trace1 = {
            x: dataOTU_id,
            y: dataSampleValues,
            text: dataOTULabel, 
            mode: 'markers',
            marker: {
                color: dataOTU_id,
                size: dataSampleValues
            },
            type: 'scatter'
        };

        let traceData = [trace1];

        let layout = {
            title: ("Top 10 OTUs of Sample ID: " + String(dataID)),
          };

    Plotly.newPlot("bubble", traceData, layout);
}); 
}

// displayBarGraph("940")
// displayBubbbleChart("940");
init();
