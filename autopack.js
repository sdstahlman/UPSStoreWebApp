
//Declare $ function
var $ = function (id) { return document.getElementById(id); };


window.onload = function () {
    document.getElementById("itemInfo").addEventListener('submit', function(e) {
        e.preventDefault();
        if(findBox()) {
            //window.location.href = 'https://webpages.uncc.edu/sstahlm1/Project/autopackcomplete.html';
        }
    });

    // This line causes the inputs to show in address bar - Do not like
    // $("pack_submit").onclick = findBox;
};



var findBox = function() {
    var itemInfo = $("itemInfo");
    var length = itemInfo.lengthDim.value;
    var height = itemInfo.heightDim.value;
    var weight = itemInfo.weight.value;
    var width = itemInfo.widthDim.value;
    var pack_type = $("pack_type").value;

    //Convert length inputs to floats in order to do functions later
    length = parseFloat(length);
    height = parseFloat(height);
    width = parseFloat(width);

    //Round weight up to the nearest whole pound
    //NOTE: UPS Requires all weights to round UP to a whole pound
    weight = Math.ceil(parseFloat(weight));

    //Adjusted lengths to factor in packaging materials
    var length_adj;
    var height_adj;
    var width_adj;

    //Determines the final measurements of the item after packaging materials
    if(pack_type === "frag") {
        //Adds 1.5 inches to each side for bubble wrap / foam0
        length_adj = length + 3;
        height_adj = height + 3;
        width_adj = width + 3;
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

    //Array of adjusted item dimensions
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
        return false;
    }
    else if(too_large) {
        window.alert("Item is too large to ship Parcel.\n\nSee manager for Freight options.");
        return false;

    }
    else if(too_heavy) {
        window.alert("Item is too heavy to ship Parcel.\n\nSee manager for Freight options.");
        return false;
    }

    var box_size = "na";
    var price_box;
    var price_service;
    var price_mats;
    var price_total;


//New Method - Finds the SMALLEST box now instead of the first one it fits

        var box = [];

        var skipped = new Array(3);
        var total_dim = 1000;
        var skip_i = 0;
        var chosen_box = -1;


        //Populate box with dimensions from sheet - can be out of order
//remove  There's got to be a better way to do this lol
        //Cube
        box[0] = [6, 6, 6];
        box[1] = [8, 8, 8];
        box[2] = [10, 10, 10];
        box[3] = [12, 12, 12];
        box[4] = [14, 14, 14];
        box[5] = [16, 16, 16];
        box[6] = [18, 18, 18];
        box[7] = [20, 20, 20];
        box[8] = [22, 22, 22];
        box[9] = [24, 24, 24];
        box[10] = [25, 25, 25];
        // < 20in
        box[11] = [11.75, 8.75, 4.75];
        box[12] = [12, 8, 8];
        box[13] = [12, 9, 3];
        box[14] = [12, 12, 6];
        box[15] = [13, 11 ,5];
        box[16] = [15, 12, 10];
        box[17] = [16, 12, 12];
        box[18] = [16, 16, 4];
        box[19] = [17, 11, 8];
        box[20] = [17, 17, 8];
        box[21] = [18, 12, 12];
        box[22] = [18, 16, 14];
        box[23] = [18, 18, 12];
        box[24] = [18.75, 16.875, 5];
        //Longs
        box[25] = [6, 6, 48];
        box[26] = [8, 8, 42];
        box[27] = [10, 10, 50];
        box[28] = [14, 14, 47];
        box[29] = [20, 10, 50]; //Guitar
        // > 20in
        box[30] = [20, 12, 12];
        box[31] = [20, 14, 4];
        box[32] = [20, 15, 15];
        box[33] = [20, 20, 12];
        box[34] = [22, 14, 12];
        box[35] = [22, 22, 8];
        box[36] = [24, 14, 12];
        box[37] = [24, 18, 12];
        box[38] = [24, 18, 18];
        box[39] = [24, 24, 16];
        box[40] = [26, 16, 12];
        box[41] = [26, 18, 8];
        box[42] = [26, 20, 20];
        box[43] = [30, 17, 16];
        box[44] = [30, 30, 18];
        box[45] = [36, 24, 10];
        box[46] = [36, 16, 16];
        box[47] = [38, 12 ,32];
        //Picture
        box[48] = [24, 4, 20.5];
        box[49] = [24, 6, 18];
        box[50] = [24, 10, 31]; //Suitcase
        box[51] = [30, 6, 24];
        box[52] = [36, 7, 30];
        box[53] = [44, 6, 36];
        box[54] = [52, 8, 30];


        //Sort new array
        for(var a = 0; a < box.length; a++) {
            box[a].sort(function(a, b){return b-a});
        }

        //Find the smallest box it will fit in
        for(var i = 0; i < box.length; i++) {
            if ( (dim[0] <= box[i][0] && dim[1] <= box[i][1] && dim[2] <= box[i][2]) && (box[i][0] + box[i][1] + box[i][2] < total_dim) && (i !== skipped[0] && i !== skipped[1] && i !== skipped[2] ) ) {
                chosen_box = i;
                total_dim = box[i][0] + box[i][1] + box[i][2];
                skipped[skip_i] = i;
                skip_i ++;
            }
        }

        if(chosen_box === -1) {
            window.alert("Unable to find box size.\nContact a manager.");
        }
        else {
            window.alert("Box size needed: \n" + box[chosen_box][0] + " x " + box[chosen_box][1] + " x " + box[chosen_box][2]);
        }




    return true;

};



