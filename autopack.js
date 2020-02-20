
//Declare $ function
var $ = function (id) { return document.getElementById(id); };


var findBox = function() {
    var itemInfo = $("itemInfo");
    var length = itemInfo.lengthDim;
    var height = itemInfo.heightDim;
    var weight = itemInfo.weight;
    var width = itemInfo.widthDim;
    var pack_type = $("pack_type").value;

    length = Math.ceil(parseFloat(length));
    height = Math.ceil(parseFloat(height));
    width = Math.ceil(parseFloat(width));
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


    var dim = [length_adj, width_adj, height_adj];

    /*
        Sort the dimensions array from greatest to least

        Uses sort function to sort in descending order
     */
    dim.sort(function(a, b){return b-a});

    /*
        Determine if item is too large to go Parcel
        If the package is too large, it has to go UPS Freight which is a different shipping system
     */
    if(dim[0] + dim[1] > 165 || dim[0] > 108)
    {
        var too_large = true;
    }
    if(weight > 150) {
        var too_heavy = true;
    }

    if(too_large && too_heavy) {
        window.alert("Item is too large and heavy to ship Parcel.\n\nSee manager for Freight options.");
    }
    else if(too_large) {
        window.alert("Item is too large to ship Parcel.\n\nSee manager for Freight options.");

    }
    else if(too_heavy) {
        window.alert("Item is too heavy to ship Parcel.\n\nSee manager for Freight options.");
    }

}



window.onload = function () {
    $("pack_submit").onclick = findBox;
};