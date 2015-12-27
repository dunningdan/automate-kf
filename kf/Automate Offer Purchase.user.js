// ==UserScript==
// @name         Automate Offer Purchase
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate purchase of KF offer
// @author       thedunster
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @require      https://raw.github.com/nbubna/HTML/master/dist/HTML.min.js
// @match        https://www.kickfurther.com/offer/*
// @match        https://www.kickfurther.com/summary
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext:true */
    if(window.location.pathname != "/summary"){
        //load UI elements
        HTML.query('p').each(addUIElementsToPage);
    } else {
        console.log($('#claim-amount').text());
        console.log(sessionStorage.getItem('claim'));
        if($('#claim-amount').text() == sessionStorage.getItem('claim')) {
            $('.saved-card-select').trigger('click');
            $('.button.radius.paybutton')[1].click();
        } else {
            alert('Claim about to be submitted does not match the entered amount. Aborting...');
        }

    }

    function addUIElementsToPage(element) {
        if(element.a && element.a.textContent == "Contribute") {
            var a = document.createElement("a");
            a.href = "javascript:void(0);";
            a.className = "button radius instabuy";
            a.onclick = start;
            var linkText = document.createTextNode("Insta-Buy");
            a.appendChild(linkText);
            
    
            var input = document.createElement("input");
            input.type = "number";
            input.id = "instaNum";
            input.placeholder = "Insta-Buy Claim";
            element.add(input);
            element.add(a);
        }
    }
    
    function start(){
        sessionStorage.setItem('start', new Date().getTime());
        $('.button.radius.pledge').trigger('click');
        var claim = parseFloat($('#instaNum').val()).toFixed(2);
        sessionStorage.setItem('claim', claim);
        $("#amt").val(claim);
        $('.button.radius.submit-form.makeclaim').trigger('click'); 
        
    }
    
    

    /* jshint ignore:start */
]]></>).toString();
                  var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */