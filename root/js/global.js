
/******DELIVERY FORM *****/

$("#deliver").on("click", function () {
    $(".pop-up").show();
    $("#overlay").show();
});

$("#close").on("click", function () {
    $(".pop-up").hide();
    $("#overlay").hide();
});

/*******PICK UP ZIP FORM*******/
$("#pick-up").on("click", function () {
    $(".location-form").show();
    $("#overlay").show();
});

$("#close2").on("click", function () {
    $(".location-form").hide();
    $("#overlay").hide();
});

$("#locate-send-bttn").on("click", function (e) {
    //e.preventDefault();
    var storeLocation = $("input[name=location]:checked").val();
    window.location.href = "order_menu.html#" + storeLocation;
});



/*****FORM VALIDATION*****/
$("#addressType").change(function (e) {
    if ($("#addressType").val() === "other") {
        $("#other-box").show();
    } else {
        $("#other-box").hide();
    }
});

$("#send-bttn").on("click", function (e) {
    e.preventDefault();
    validateAddressForm();
});


function validateAddressForm () {
    var letters = /^[a-zA-Z\s]*$/;
    if(letters.test($("#inputName").val())) {
        //continue checking inputs
    } else {
        alert("Please enter a valid name, only letters are allowed.");
        return;
    }
    if ($("#inputAddress").val() != "") {
        //continue checking inputs
    } else {
        alert("Please enter a valid Street Address.");
        return;
    }
    if ($("#inputCity").val() != "") {
        //continue checking inputs
    } else {
        alert("Please enter a valid City");
        return;
    }
    if ($("#inputState").val().length == 2) {
        //continue checking inputs
    } else {
        alert("Please choose a State");
        return;
    }
    if ($("#inputZip").val().length == 5 && $.isNumeric($("#inputZip").val())) {
        //continue checking inputs
    } else {
        alert("Please enter a valid Zip, only five numbers.");
        return;
    }
    if ($("#inputPhone").val().length == 10 && $.isNumeric($("#inputPhone").val())) {
        //continue checking inputs
    } else {
        alert("Please enter a valid Phone Number, only numbers. No spaces, dashes or parentheses.");
        return;
    }
    var expression = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (expression.test($("#inputEmail").val())) {
        //continue checking inputs
    } else {
        alert("Please enter a valid Email");
        return;
    }
    //we made it this far submit the form
    var queryString = $("#address-form").serialize();
    window.location.href = "order_menu.html?" + queryString; 
}