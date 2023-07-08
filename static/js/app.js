
const sample_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    let names = [];
    let metadata = [];
    let samples = [];

    let dataID = [];
    let dataOTU_id = [];
    let dataSampleValues = [];
    let dataOTULabel = [];

    tagID = d3.select("#sample-metadata").append("h5");      
    tagEth = d3.select("#sample-metadata").append("h5");      
    tagGen = d3.select("#sample-metadata").append("h5");      
    tagAge = d3.select("#sample-metadata").append("h5");      
    tagLoc = d3.select("#sample-metadata").append("h5");      
    tagBB = d3.select("#sample-metadata").append("h5");      
    tagWF = d3.select("#sample-metadata").append("h5");

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
        displayGauge(dataset);
        displayBubbbleChart(dataset);
        displayMetaData(dataset);

    });
}

function optionChanged(id) {
    displayBarGraph(id);
    displayBubbbleChart(id);
    displayMetaData(id);
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
                colorscale: 'Rainbow',
                size: dataSampleValues,
                sizemode: 'area',
                sizeref: .05
            },
            type: 'scatter',
        };

        let traceData = [trace1];

        let layout = {
            title: ("Sample ID: " + String(dataID)),
          };

    Plotly.newPlot("bubble", traceData, layout);
}); 
}

function displayMetaData(sampleID) {
    d3.json(sample_url).then(function(data) {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        let findMetaData = metadata.find((elem) => elem.id === Number(sampleID));

        dataID = findMetaData.id;
        dataEthnicity = findMetaData.ethnicity;
        dataGender = findMetaData.gender;
        dataAge = findMetaData.age;
        dataLocation = findMetaData.location;
        dataBBType = findMetaData.bbtype;
        dataWFreq = findMetaData.wfreq;

        tagID.text(`id: ${dataID}`);    
        tagEth.text(`Ethnicity: ${dataEthnicity}`);    
        tagGen.text(`Gender: ${dataGender}`);         
        tagAge.text(`Age: ${dataAge}`);        
        tagLoc.text(`Location: ${dataLocation}`);          
        tagBB.text(`bbtype: ${dataBBType}`);     
        tagWF.text(`wfreq: ${dataWFreq}`);        
    });
}

function displayGauge(sampleID) {
    let dataWFreq = []
    d3.json(sample_url).then(function(data) {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        let findMetaData = metadata.find((elem) => elem.id === Number(sampleID));

        dataID = findMetaData.id;
        dataWFreq = findMetaData.wfreq;
    });

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: dataWFreq,
          title: { 
            text: "Belly Button Wash Frequency" 
          },
          type: "indicator",
          mode: "gauge",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 1], color: "lightgray" },
              { range: [1, 2], color: "gray" },
              { range: [2, 3], color: "gray" },
              { range: [3, 4], color: "gray" },
              { range: [4, 5], color: "gray" },
              { range: [5, 6], color: "gray" },
              { range: [7, 8], color: "gray" },
              { range: [8, 9], color: "gray" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: dataWFreq
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}

init();
