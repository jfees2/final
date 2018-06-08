/*MENU ORDER TABS-----*/
$(document).ready(function () {
	$("ul.tabs li").click(function () {
		var tabId = $(this).attr("data-tab");
		$("ul.tabs li").removeClass("current");
		$(".tab-content").removeClass("current");
		$(this).addClass('current');
		$("#" + tabId).addClass("current");
	});
    
    /*YOUR ODER DIV*/
    var storeInfo;
    if (window.location.hash === "#encintas") {
        storeInfo = "Encintas <br> 1983 Love Blvd <br> 800-123-4567";
    } else if (window.location.hash === "#oceanbeach") {
        storeInfo = "Ocean Beach <br> 1983 Love Blvd <br> 800-999-4567";
    } else {
        storeInfo = "North Park <br> 1983 Love Blvd <br> 800-555-4567";
    }
    
    document.getElementById("store-info").innerHTML = storeInfo;
    
    function updateOrder() {
        dough = $("#dough option:selected").html();
        size = $("#pie-sizes option:selected").html();
        sauce = $("#sauce option:selected").html();
        cheese = $("#cheese option:selected").html();
        
        if (dough === "") {
            dough = "no dough";
        }
        if (size === "") {
            size = "no size selected";
        }
        if (sauce === "") {
            sauce = "no sauce";
        }
        if (cheese === "") {
            cheese = "no cheese";
        }

        document.getElementById("extra").innerHTML = "Dough: " + dough + "<br>Size: " + size + "<br>Sauce: " + sauce + "<br>Cheese: " + cheese;
        
        var totalPrice = 0;
        totalPrice += parseFloat($("#pie-sizes option:selected").val());
        totalPrice += parseFloat($("#sauce option:selected").val());
        totalPrice += parseFloat($("#cheese option:selected").val());
        
        $(".items input[type=checkbox]").each(function () {
           if ($(this).is(":checked")) {
            totalPrice += .99;
           }
        });
        
        document.getElementById("total").innerHTML = totalPrice.toFixed(2);
    }
    
    function updateOrderToppings(toppingList) {
        document.getElementById("toppings").innerHTML = toppingList;
    }

    $("#dough").change(function () {
        updateSizeOptions();
        $(".items :input").attr("disabled", false);
        $("#cheese").attr("disabled", false);
        $("#sauce").attr("disabled", false);
        $("#pie-sizes").attr("disabled", false);
        $("#checkout-bttn").show();
        updateOrder();
    });
    $("#pie-sizes").change(function () {
        updateOrder();
    });
    $("#sauce").change(function () {
        updateOrder();
    });
    $("#cheese").change(function () {
        updateOrder();
    });
    $(":checkbox").change(function () {
        var topping_list = "";
        $('input[type=checkbox]').each(function () {
            var topping = ($(this).is(":checked") ? $(this).val() : "");
            if (topping !==  "") {
                topping_list += (topping_list === "" ? topping : ", " + topping);
            }
        });
        updateOrder();
        updateOrderToppings(topping_list);
    });
    
    /****DYNAMIC SIZE AND PRICING*****/
    function updateSizeOptions () {
        //build the size and price options
        var pizzaOptions = {
            classic: {
                name: ["Small", "Medium", "Large"],
                price: [9.99, 12.99, 14.99]
            },
            wholewheat: {
                name: ["Medium", "Large"],
                price: [11.99, 13.99]
            },
            garlicandherb: {
                name: ["Large", "Extra Large"],
                price: [16.99, 19.99]
            },
            glutenfree: {
                name: ["Small"],
                price: [10.99]
            }
        };
        
        var selectedDough = document.getElementById("dough").value;
        var doughIndex = selectedDough.replace(/\s+/g, "").toLowerCase();
        var optionList;
        switch(doughIndex) {
            case "classic": 
                optionList = pizzaOptions.classic;
                break;
            case "wholewheat": 
                optionList = pizzaOptions.wholewheat;
                break;
            case "garlicandherb": 
                optionList = pizzaOptions.garlicandherb;
                break;
            case "glutenfree": 
                optionList = pizzaOptions.glutenfree;
                break;
            default: 
                optionList = pizzaOptions.classic;
                break;
        }

        //determine number of options
        var numOfOptions = optionList.name.length;
        var x = document.getElementById("pie-sizes"); 
        x.innerHTML = "";
        
        for (var i = 0; i < numOfOptions; i++) {
            var opt = document.createElement("option");
            var val = document.createAttribute("value");

            val.value = optionList.price[i]; 
            opt.setAttributeNode(val);

            //add text in drop down
            var dropDownList = document.createTextNode(optionList.name[i] + " - $" + optionList.price[i]);
            opt.appendChild(dropDownList);
            
            if (x != null) {
                x.appendChild(opt);
            }
        }
    }
    /*****CHECK OUT BUTTON*****/
    $("#checkout-bttn").click(function (e) {
		e.preventDefault();
        var orderComplete = confirm("Are you sure your order is complete?");
        
        if (orderComplete) {
           $("#payment-form-container").show(); 
        }
	});
    
    /*****payment form vaildation********/
    
    $("#payment-bttn").on("click", function (e) {
        e.preventDefault();
        validatePaymentForm();
    });


    function validatePaymentForm () {
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
        
        var letters = /^[a-zA-Z\s]*$/;
        if(letters.test($("#inputName").val())) {
            //continue checking inputs
        } else {
            alert("Please enter a valid name, only letters are allowed.");
            return;
        }
        
        if ($("#inputExpMonth").val() > 0) {
            //continue checking inputs
        } else {
            alert("Please select an experation month.");
            return;
        }
        
        if ($("#inputExpYear").val() > 0) {
            //continue checking inputs
        } else {
            alert("Please select an experation year.");
            return;
        }
        
        var expDate = new Date($("#inputExpYear").val(), $("#inputExpMonth").val());
        var currentDate = new Date();
        
        if (expDate > currentDate) {
            //continue checking inputs
        } else {
            alert("The Card you are trying to use is expired.");
            return;
        }
        
        if ($("#inputCVV").val().length >= 3 && $("#inputCVV").val().length <= 4 && $.isNumeric($("#inputCVV").val())) {
            //continue checking inputs
        } else {
            alert("Please enter a valid CVV, only three or four numbers.");
            return;
        }
        
        if ($("#inputCardNum").val().length >= 13 && $("#inputCardNum").val().length <= 16 && $.isNumeric($("#inputCardNum").val())) {
            //continue checking inputs
        } else {
            $("#inputCardNum-error").html("Please enter a vaild 13-16 digit card number.");
            $("#inputCardNum-error").show();
            return;
        }
        
        if (validateCard()) {
            $("#inputCardNum-error").hide();
            window.location.href = "thank_you.html";
        } else {
            $("#inputCardNum-error").html("Invalid Card Number. Please re-enter.");
            $("#inputCardNum-error").show();
            return;
        }
    }
    
    function validateCard () {
        var card_number = $("#inputCardNum").val();
        var reverse_digits = card_number.split("").reverse().join("");
        var sum = 0;
        for(var i = 0; i < card_number.length; i++ ) {
            if(i % 2 === 0) {
                //odd number, leave it be and add it to the sum
                sum += parseInt(reverse_digits.charAt(i));
                 window.console.log("sum: " + sum);
            } else {
                //Even number, double it and add it to the sum
                var doubled_num = parseInt(reverse_digits.charAt(i))*2;
                 window.console.log("doubled_num: " + doubled_num);
                if(doubled_num > 9) {
                    //2 characters
                    var two_nums = doubled_num.toString();
                    sum += parseInt(two_nums.charAt(0)) + parseInt(two_nums.charAt(1));
                     window.console.log("sum: " + sum);
                } else {
                    //1 character
                    sum += parseInt(reverse_digits.charAt(i))*2;
                     window.console.log("sum: " + sum);
                }
            }
        }
        
         window.console.log("sum: " + sum);

        var remainder = sum % 10;
        window.console.log("remainder: " + remainder);
        if(remainder === 0) {
            //valid card
            window.console.log("valid card");
            return true;
        } else {
            //invalid card
            window.console.log("invalid card");
            return false;
        }
        
    }
    
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        
        return vars;
    }
    var customerInfo = getUrlVars();
    window.console.log(customerInfo);
    if (customerInfo.length > 0) {
       document.getElementById("inputName").value = decodeURIComponent(customerInfo["inputName"]);
        document.getElementById("inputAddress").value = decodeURIComponent(customerInfo["inputAddress"]);
        document.getElementById("inputCity").value = decodeURIComponent(customerInfo["inputCity"]);
        document.getElementById("inputState").value = decodeURIComponent(customerInfo["inputState"]);
        document.getElementById("inputZip").value = decodeURIComponent(customerInfo["inputZip"]); 
    }
    
    $("#sameAddress").click(function () {
       if ($("#sameAddress").is(":checked")) {
           document.getElementById("inputName").value = decodeURIComponent(customerInfo["inputName"]);
           document.getElementById("inputAddress").value = decodeURIComponent(customerInfo["inputAddress"]);
           document.getElementById("inputCity").value = decodeURIComponent(customerInfo["inputCity"]);
           document.getElementById("inputState").value = decodeURIComponent(customerInfo["inputState"]);
           document.getElementById("inputZip").value = decodeURIComponent(customerInfo["inputZip"]);
       } else {
           document.getElementById("inputName").value = "";
           document.getElementById("inputAddress").value = "";
           document.getElementById("inputCity").value = "";
           document.getElementById("inputState").value = "";
           document.getElementById("inputZip").value = "";
       }
    });
    
    
    
});




