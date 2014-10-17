/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.getElementById('scan').addEventListener('click', this.scan, false);
    },

    scan: function() {
        console.log('scanning');

        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) {


           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");

                var vin = result.text;

                if (result.text.length > 17)
                {
					vin = result.text.substr(result.text.length-17, 17);
				}
            document.getElementById("search-1").value = vin;
            console.log(vin);
            getdatabyform();
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) {
            console.log("Scanning failed: ", error);
        } );
    }


};

$( document ).ready(function() {
	$('#search').click(function() {
		getdatabyform();
	});

	$.ajaxSetup({
		timeout: 2*1000
	});
});

function showTally()
{
	var url = "";
	var data = "?({\"Accessory Code\":\"PB All Others\",\"Time\":6,\"Quantity\":3,\"Total\":18},{\"Accessory Code\":\"CG Highlander\",\"Time\":5,\"Quantity\":1,\"Total\":5});"
	var AccessoryCode; var Time; var Quantity; var Total;

		AccessoryCode = jsontolist(data,"Accessory Code");

}

function CalculateProd(hours,people)
{

	var prodhours = hours * people ;
	var BOMH = BomHrs.innerHTML;
	var productivity = (BOMH/prodhours)*100;
	document.getElementById('lblProd').innerHTML = "Productivity: " + productivity;
}

function countdown(yr,m,d,hr,min){
    theyear=yr;themonth=m;theday=d;thehour=hr;theminute=min;
    var today=new Date();
    var todayy=today.getYear();
    if (todayy < 1000) {
    todayy+=1900; }
    var todaym=today.getMonth();
    var todayd=today.getDate();
    var todayh=today.getHours();
    var todaymin=today.getMinutes();
    var todaysec=today.getSeconds();
    var todaystring1=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec;
    var todaystring=Date.parse(todaystring1)+(tz*1000*60*60);
    var futurestring1=(montharray[m-1]+" "+d+", "+yr+" "+hr+":"+min);
    var futurestring=Date.parse(futurestring1)-(today.getTimezoneOffset()*(1000*60));
    var dd=futurestring-todaystring;
    var dday=Math.floor(dd/(60*60*1000*24)*1);
    var dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1);
    var dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    var dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
    if(dday<=0&&dhour<=0&&dmin<=0&&dsec<=0){
        document.getElementById('count2').innerHTML=current;
        document.getElementById('count2').style.display="inline";
        document.getElementById('count2').style.width="390px";
        document.getElementById('dhour').style.display="none";
        document.getElementById('dmin').style.display="none";
        document.getElementById('dsec').style.display="none";
        document.getElementById('hours').style.display="none";
        document.getElementById('minutes').style.display="none";
        document.getElementById('seconds').style.display="none";
        return;
    }
    else {
        document.getElementById('count2').style.display="none";

        document.getElementById('dhour').innerHTML=dhour;
        document.getElementById('dmin').innerHTML=dmin;
        document.getElementById('dsec').innerHTML=dsec;
        setTimeout("countdown(theyear,themonth,theday,thehour,theminute)",1000);
    }
}

function getdatabyform(){
	var txt = $("#search-1").val();
	txt = "JTDZN3EU6C3055948";
	var url = "http://websvc-gst.integration.fitsvcs.com:8082/VPCVehProcessing/BOMInstallSvc.svc/get/JTDZN3EU6C3055948/?callback=foo";
		if (txt == "")
		{
			alert("Please enter a VIN");
		}
		else
		{
			$.ajax({
			    type:'GET',
			    dataType:'jsonp',
			    jsonp: "jsonp",
			    url:url,
			    success:function(data) {
			        alert(data.tags[0].name.length)
			    },
			    error:function() {
			        alert("Sorry, I can't get the feed");
			    }
			});
			InstallTimer.style.display = 'block';
		}


	}

	function showmenu(username){
		var currentDate = new Date();
		var day = currentDate.getDate();
		var month = currentDate.getMonth() + 1;
		var year = currentDate.getFullYear();
	  	var vtoday = day + "/" + month + "/" + year ;
		document.getElementById("lblDate").innerHTML = vtoday;
		document.getElementById("lblTeam").innerHTML = "Idea";
		document.getElementById("lblUser").innerHTML = username;
		document.getElementById("lblDate1").innerHTML = vtoday;
		document.getElementById("lblTeam1").innerHTML = "Idea";
		document.getElementById("lblUser1").innerHTML = username;
		menu.style.display = 'inline';
}

function getdata(year, model){
//	$("body").addClass('ui-disabled');
	setTimeout(function(){
        $.mobile.loading("show",{
			text: "Loading...",
			textVisible: true
		});
    }, 1);

	var txt = $("#search-1").val();
	var url = "http://a1enm5p05.fitsvcs.com:8081/PSvc/Lookup.svc/"+year+"/"+model+"?callback=?";

	$.jsonp({
        url: url,
        dataType: "jsonp",
        timeout: 3000,
        success: function (data, status) {
            $("body").pagecontainer("change", "#detail", {});
			$("#yearmodel").html(data.ModelYear + " " + data.Model);
			var carpetlist, extlist, fleetlist, intlist, protlist, speclist, techlist, wheellist, partlist;
			carpetlist = jsontolist(data,"CARPET FLOOR MATS");
			extlist = jsontolist(data,"EXTERIOR");
			fleetlist = jsontolist(data,"FLEET");
			intlist = jsontolist(data,"INTERIOR");
			protlist = jsontolist(data,"PROTECTION");
			speclist = jsontolist(data,"SPECIAL EDITION");
			techlist = jsontolist(data,"TECHNOLOGY");
			wheellist = jsontolist(data,"WHEELS");
			partlist = carpetlist + extlist + fleetlist + intlist + protlist + speclist + techlist + wheellist;
			$("#partlist").html(partlist);
			$('#partlist').collapsibleset('refresh');
			setTimeout(function(){
				$.mobile.loading("hide");
			}, 1);
//			$("body").removeClass('ui-disabled');
        },
        error: function (XHR, textStatus, errorThrown) {
            alert("Error getting parts data");
            setTimeout(function () {
				$.mobile.loading("hide");
			}, 1);
//			$("body").removeClass('ui-disabled');
        }
    });
}

function jsontolist(data, cat){
	var gotone = false;
	var list = "<div data-role=\"collapsible\">";
	list += "<h4>"+cat+"</h4>";

	/*$.each( data.ParentPart, function( index, value ){
		if(value.Category == cat)
		{
			gotone = true;
			list += "<div data-role=\"collapsible\">";
			list += "<h4>" + $.trim(value.PartNumber) + " - " + $.trim(value.PartName) + "</h4>";
			//list += "<p>" + $.trim(value.PartNumber) + " - " + $.trim(value.PartName) + "</p>";
			if(value.ChildPart != null)
			{
				$.each( value.ChildPart, function( index2, value2 ){
					//list += "<div data-role=\"collapsible\">";
					//list += "<h4>" + $.trim(value2.PartNumber) + " - " + $.trim(value2.PartName) + "</h4>";
					list += "<p>" + $.trim(value2.PartNumber) + " - " + $.trim(value2.PartName) + "</p>";
				});
			}
			list += "</div>";
		}
	});
	*/
	list += "</div>";
	if(!gotone)
		list = "";
	return list;
}
