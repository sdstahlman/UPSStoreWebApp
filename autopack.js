
//Declare $ function
var $ = function (id) { return document.getElementById(id); };


var findBox = function() {
    var length = $("itemInfo").lengthDim;
    var height = $("itemInfo").heightDim;
    var weight = $("itemInfo").weight;
    var pack_type = $("pack_type").value;

    length = Math.ceil(parseFloat(length));
    height = Math.ceil(parseFloat(height));
    weight = Math.ceil(parseFloat(weight));

    var length_adj;
    var height_adj;
    var width_adj;


    if(pack_type === "frag") {
        length_adj = length + 4;
        height_adj = height + 4;
        width_adj = width + 4;
    }
    else if(pack_type === "std") {
        length_adj = length;
        height_adj = height;
        width_adj = width;
    }
    else {
        length_adj = length;
        height_adj = height;
        width_adj = width;

    }

    let dim = [length_adj, height_adj];


}



window.onload = function () {
    $("packSubmit").onclick = findBox;
};