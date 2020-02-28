
//Declare $ function
var $ = function (id) { return document.getElementById(id); };


window.onload = function () {
    document.getElementById("itemInfo").addEventListener('submit', function(e) {
        e.preventDefault();
        if(findBox()) {
            //window.location.href = 'https://webpages.uncc.edu/sstahlm1/Project/autopackcomplete.html';
        }
    });
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

    /*
        IF block to determine the best box to use

        Goes in order from smallest to largest based
     */
    var i = 0;
    while(i < 3) {
        if (dim[0] <= 6) {
            if (dim[2] <= 6) {
                box_size = "6 x 6 x 6";
            } else if (dim[2] <= 50) {
                box_size = "6 x 6 x 50";
            }
        } else if (dim[0] <= 8) {
            if (dim[1] <= 8) {
                if (dim[2] <= 8) {
                    box_size = "8 x 8 x 8";
                } else if (dim[2] <= 42) {
                    box_size = "8 x 8 x 42";
                }
            }
        } else if (dim[0] <= 10) {
            if (dim[1] <= 10) {
                if (dim[2] <= 10) {
                    box_size = "10 x 10 x 10";
                } else if (dim[2] <= 50) {
                    box_size = "10 x 10 x 50";
                }
            }
        } else if (dim[0] <= 11.75) {
            if (dim[1] <= 8.75) {
                if (dim[2] <= 4.75) {
                    box_size = "11.75 x 8.75 x 4.75";
                }
            }
        } else if (dim[0] <= 12) {
            if (dim[1] <= 8) {
                if (dim[2] <= 8) {
                    box_size = "12 x 8 x 8";
                }
            } else if (dim[1] <= 9) {
                if (dim[2] <= 3) {
                    box_size = "12 x 9 x 3";
                }
            } else if (dim[1] <= 12) {
                if (dim[2] <= 6) {
                    box_size = "12 x 12 x 6";
                } else if (dim[2] <= 12) {
                    box_size = "12 x 12 x 12";
                }
            }
        } else if (dim[0] <= 13) {
            if (dim[1] <= 11) {
                if (dim[2] <= 5) {
                    box_size = "13 x 11 x 5";
                }
            }
        } else if (dim[0] <= 14) {
            if (dim[1] <= 14) {
                if (dim[2] <= 14) {
                    box_size = "14 x 14 x 14";
                } else if (dim[2] <= 14) {
                    box_size = "14 x 14 x 47";
                }
            }
        } else if (dim[0] <= 15) {
            if (dim[1] <= 12) {
                if (dim[2] <= 10) {
                    box_size = "15 x 12 x 10";
                }
            }
        } else if (dim[0] <= 16) {
            if (dim[1] <= 12) {
                if (dim[2] <= 12) {
                    box_size = "16 x 12 x 12";
                }
            } else if (dim[1] <= 16) {
                if (dim[2] <= 4) {
                    box_size = "16 x 16 x 4";
                } else if (dim[2] <= 16) {
                    box_size = "16 x 16 x 16";
                }
            }
        } else if (dim[0] <= 17) {
            if (dim[1] <= 11) {
                if (dim[2] <= 8) {
                    box_size = "17 x 11 x 8";
                }
            }
            if (dim[1] <= 17) {
                if (dim[2] <= 8) {
                    box_size = "17 x 17 x 8";
                }
            }
        } else if (dim[0] <= 18) {
            if (dim[1] <= 12) {
                if (dim[2] <= 12) {
                    box_size = "18 x 12 x 12";
                }
            } else if (dim[1] <= 16) {
                if (dim[2] <= 14) {
                    box_size = "18 x 16 x 14";
                }
            } else if (dim[1] <= 18) {
                if (dim[2] <= 12) {
                    box_size = "18 x 18 x 12";
                } else if (dim[2] <= 18) {
                    box_size = "18 x 18 x 18";
                }
            }
        } else if (dim[0] <= 18.75) {
            if (dim[1] <= 17) {
                if (dim[2] <= 5) {
                    box_size = "18.75 x 16.875 x 5";
                }
            }
        } else if (dim[0] <= 20) {
            if (dim[1] <= 12) {
                if (dim[2] <= 12) {
                    box_size = "20 x 12 x 12";
                }
            } else if (dim[1] <= 14) {
                if (dim[2] <= 4) {
                    box_size = "20 x 14 x 4";
                }
            } else if (dim[1] <= 15) {
                if (dim[2] <= 15) {
                    box_size = "20 x 15 x 15";
                }
            } else if (dim[1] <= 20) {
                if (dim[2] <= 12) {
                    box_size = "20 x 20 x 12";
                } else if (dim[2] <= 20) {
                    box_size = "20 x 20 x 20";
                }
            }
        } else if (dim[0] <= 22) {
            if (dim[1] <= 14) {
                if (dim[2] <= 12) {
                    box_size = "22 x 14 x 12";
                }
            } else if (dim[1] <= 22) {
                if (dim[2] <= 8) {
                    box_size = "22 x 22 x 8";
                } else if (dim[2] <= 22) {
                    box_size = "22 x 22 x 22";
                }
            }
        }
        //24
        else if (dim[0] <= 24) {
            if (dim[1] <= 14) {
                if (dim[2] <= 12) {
                    box_size = "24 x 14 x 12";
                }
            } else if (dim[1] <= 18) {
                if (dim[2] <= 6) {
                    box_size = "24 x 6 x 18";
                } else if (dim[2] <= 12) {
                    box_size = "24 x 18 x 12";
                } else if (dim[2] <= 18) {
                    box_size = "24 x 18 x 18";
                }
            } else if (dim[1] <= 20.5) {
                if (dim[2] <= 4) {
                    box_size = "24 x 4 x 20.5";
                }
            } else if (dim[1] <= 24) {
                if (dim[2] <= 16) {
                    box_size = "24 x 24 x 16";
                } else if (dim[2] <= 24) {
                    box_size = "24 x 24 x 24";
                }
            }
        }
        //25
        else if (dim[0] <= 25) {
            if (dim[1] <= 25) {
                if (dim[2] <= 25) {
                    box_size = "25 x 25 x 25";
                }
            }
        }
        //26
        else if (dim[0] <= 26) {
            if (dim[1] <= 16) {
                if (dim[2] <= 12) {
                    box_size = "26 x 26 x 12";
                }
            } else if (dim[1] <= 18) {
                if (dim[2] <= 8) {
                    box_size = "26 x 18 x 8";
                }
            } else if (dim[1] <= 20) {
                if (dim[2] <= 20) {
                    box_size = "26 x 20 x 20";
                }
            }
        }
        //30
        else if (dim[0] <= 30) {
            if (dim[1] <= 17) {
                if (dim[2] <= 16) {
                    box_size = "30 x 17 x 16";
                }
            } else if (dim[1] <= 24) {
                if (dim[2] <= 6) {
                    box_size = "30 x 6 x 24";
                }
            } else if (dim[1] <= 30) {
                if (dim[2] <= 18) {
                    box_size = "30 x 30 x 18";
                }
            }
        } else if (dim[0] <= 31) {
            if (dim[1] <= 24) {
                if (dim[2] <= 10) {
                    box_size = "31 x 10 x 24";
                }
            }
        }
        //36
        else if (dim[0] <= 36) {
            if (dim[1] <= 16) {
                if (dim[2] <= 16) {
                    box_size = "36 x 16 x 16";
                }
            } else if (dim[1] <= 24) {
                if (dim[2] <= 10) {
                    box_size = "36 x 24 x 10";
                }
            } else if (dim[1] <= 30) {
                if (dim[2] <= 7) {
                    box_size = "36 x 7 x 30";
                }
            }

        }
        //38
        else if (dim[0] <= 38) {
            if (dim[1] <= 32) {
                if (dim[2] <= 12) {
                    box_size = "38 x 32 x 12";
                }
            }
        } else if (dim[0] <= 44) {
            if (dim[1] <= 36) {
                if (dim[2] <= 6) {
                    box_size = "44 x 6 x 36";
                }
            }
        } else if (dim[0] <= 52) {
            if (dim[1] <= 30) {
                if (dim[2] <= 8) {
                    box_size = "52 x 8 x 30";
                }
            }
        }

        if(box_size === "na") {
            for (var j = 0; j < dim.length; j++) {
                dim[j] += 1;
            }
            i++;
        }
        else {
            i = 10;
        }
    }

    if(box_size === "na") {
        window.alert("Unable to find box size.\nContact a manager.");
    }
    else {
        window.alert("Box size needed: \n" + box_size);
    }


    return true;

}



