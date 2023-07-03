
const sample_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(sample_url).then(function(data) {
    let names = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    let dataID = []
    let dataOTU_id = []
    let dataSampleValues = []
    let dataOTULabel = []

    samples.forEach((elem) => {
        dataID.push(elem.id);
        dataOTU_id.push(elem.otu_ids);
        dataSampleValues.push(elem.sample_values);
        dataOTULabel.push(elem.otu_labels);
    });
});