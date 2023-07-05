
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

        // d3.selectAll("#selDataset").on("change", updateBar);

        // Use D3 to select the dropdown menu
        let dropDownMenu = d3.select("#selDataset");

        for (i = 0; i<dataID.length; i++){
            dropDownMenu.append("option").text(dataID[i]).property("value", dataID[i])   
        }
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropDownMenu.property("value");

    });

}

function optionChanged(id) {

}

function displayBarGraph(sampleID) {
    d3.json(sample_url).then(function(data) {
            names = data.names;
            metadata = data.metadata;
            samples = data.samples;

            let filteredID = samples.filter((elem) => elem.id === sampleID);
            let sortedData = filteredID.sort((a, b) => b.sample_values - a.sample_values);
            let slicedData = Object.values(sortedData[0]);
            slicedData_test = slicedData.slice(0,10);

            dataID = slicedData_test.map(id => id.id);
            dataOTU_id = slicedData_test.map(otu_ids => otu_ids.otu_ids);
            dataSampleValues = slicedData_test.map(sample_values => sample_values.sample_values);
            dataOTULabel = slicedData_test.map(otu_labels => otu_labels.otu_labels);

            console.log(typeof slicedData_test)
            console.log("test1", slicedData_test);

            let trace1 = {
                x: (dataOTU_id),
                y: (dataSampleValues),
                text: (dataOTULabel),
                name: "OTU",
                type: "bar",
                // orientation: "h"
            }

            let traceData = [trace1];

            let layout = {
                title: "Greek gods search results",
                margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 100
                }
              };

        Plotly.newPlot("bar", traceData, layout);
            
    });
}
displayBarGraph("940")
init()
