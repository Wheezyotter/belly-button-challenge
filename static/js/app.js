// Url to gather belly button diversity data
const sample_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// intialization function
function init() {
    // declare variables
    let names = [];
    let metadata = [];
    let samples = [];
    let dataID = [];
    let dataOTU_id = [];
    let dataSampleValues = [];
    let dataOTULabel = [];

    // create html metadata tags
    tagID = d3.select("#sample-metadata").append("h5");      
    tagEth = d3.select("#sample-metadata").append("h5");      
    tagGen = d3.select("#sample-metadata").append("h5");      
    tagAge = d3.select("#sample-metadata").append("h5");      
    tagLoc = d3.select("#sample-metadata").append("h5");      
    tagBB = d3.select("#sample-metadata").append("h5");      
    tagWF = d3.select("#sample-metadata").append("h5");

    // reads data from the sample url
    d3.json(sample_url).then(function(data) {
        // stores data in three main groups
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        // maps sample data
        dataID = samples.map(id => id.id);
        dataOTU_id = samples.map(otu_ids => otu_ids.otu_ids);
        dataSampleValues = samples.map(sample_values => sample_values.sample_values);
        dataOTULabel = samples.map(otu_labels => otu_labels.otu_labels);

        // Use D3 to select the dropdown menu
        let dropDownMenu = d3.select("#selDataset");

        // fills drop down with all sample IDs
        for (i = 0; i<dataID.length; i++){
            dropDownMenu.append("option").text(dataID[i]).property("value", dataID[i])   
        }

        // Assign the value of the dropdown menu option to a variable
        let dataset = dropDownMenu.property("value");

        // displays all graphs
        displayBarGraph(dataset);
        displayBubbbleChart(dataset);
        displayMetaData(dataset);

    });
}

// function that displays all graphs when a new sample id is selected
function optionChanged(id) {
    displayBarGraph(id);
    displayBubbbleChart(id);
    displayMetaData(id);
}

// Creates bar graph given a certain sample ID
function displayBarGraph(sampleID) {
    // collects sample data
    d3.json(sample_url).then(function(data) {
            // stores json data
            names = data.names;
            metadata = data.metadata;
            samples = data.samples;

            // saves only the json data from the selected sample ID
            let findData = samples.find((elem) => elem.id === sampleID);

            // saves and formats sample data to have the top 10 results
            dataID = findData.id
            dataOTU_id = (findData.otu_ids).slice(0,10).map(i => 'OTU ' + i).reverse();
            dataSampleValues = (findData.sample_values).slice(0,10).reverse();
            dataOTULabel = (findData.otu_labels).slice(0,10).reverse();

            // formats hover text
            dataOTULabelSplit = []
            for (i = 0; i<dataOTULabel.length; i++){
                dataOTULabelSplit.push(dataOTULabel[i].replace(/;/g, "<br>"));
            }


            // sets data
            let trace1 = {
                x: dataSampleValues,
                y: dataOTU_id,
                text: dataOTULabelSplit, 
                name: "OTU",
                type: "bar",
                orientation: "h",
            }

            let traceData = [trace1];

            // sets layout
            let layout = {
                title: ("Top 10 OTUs of Sample ID: " + String(dataID)),
              };
        // displays plot
        Plotly.newPlot("bar", traceData, layout);
    });
}

// Creates a bubble chart of all OSU data per sample ID
function displayBubbbleChart(sampleID) {
    // collects sample data
    d3.json(sample_url).then(function(data) {
        // stores json data
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        // saves only the json data from the selected sample ID
        let findData = samples.find((elem) => elem.id === sampleID);

        // Saves json data
        dataID = findData.id;
        dataOTU_id = findData.otu_ids;
        dataSampleValues = findData.sample_values;
        dataOTULabel = findData.otu_labels;

        // formats hover text
        dataOTULabelSplit = []
        for (i = 0; i<dataOTULabel.length; i++){
            dataOTULabelSplit.push(dataOTULabel[i].replace(/;/g, "<br>"));
        }

        // sets data
        let trace1 = {
            x: dataOTU_id,
            y: dataSampleValues,
            text: dataOTULabelSplit, 
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

        // sets layout
        let layout = {
            title: ("Sample ID: " + String(dataID)),
          };
    // displays plot
    Plotly.newPlot("bubble", traceData, layout);
}); 
}

// displays metadata of each sample id in the demographic info panel
function displayMetaData(sampleID) {
    // collects sample data
    d3.json(sample_url).then(function(data) {
        // stores json data
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        // saves only the json data from the selected sample ID        
        let findMetaData = metadata.find((elem) => elem.id === Number(sampleID));

        // Saves json data
        dataID = findMetaData.id;
        dataEthnicity = findMetaData.ethnicity;
        dataGender = findMetaData.gender;
        dataAge = findMetaData.age;
        dataLocation = findMetaData.location;
        dataBBType = findMetaData.bbtype;
        dataWFreq = findMetaData.wfreq;

        // updates html tags with the sample metadata
        tagID.text(`id: ${dataID}`);    
        tagEth.text(`Ethnicity: ${dataEthnicity}`);    
        tagGen.text(`Gender: ${dataGender}`);         
        tagAge.text(`Age: ${dataAge}`);        
        tagLoc.text(`Location: ${dataLocation}`);          
        tagBB.text(`bbtype: ${dataBBType}`);     
        tagWF.text(`wfreq: ${dataWFreq}`);        
    });
}

// Runs init function when page opens
init();
