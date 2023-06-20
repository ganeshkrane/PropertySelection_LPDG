sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.ui5.propertyselection.controller.ObjectInfo", {
            onInit: function() {
			
                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onRouteFound, this);
            },
            _onRouteFound:function(evt){
                var tplnr=evt.getParameter('arguments').Tplnr;
                var Edit = Edit==="X" ? true : false;
                this.byId("PropNumInput").setText(tplnr);
                this.AddressCall(tplnr);
                this.CdHdrCall(tplnr);
                },
                AddressCall:function(){
                    this.getOwnerComponent().getModel().read("/LG_READSet(tplnr='1853100',sprache='DE',perio='014',gueltigabeff='20210701',gueltigbiseff='20220630',dlaufnr='',updProz='ANZEIGE',prozessid='800',vsIntern='')", {
                    success: jQuery.proxy(function(oData) {

                           this.byId('addressInput').setText(oData.adresse.strasse+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+oData.adresse.hausNr + "\xa0\xa0"+ oData.adresse.land+"\xa0\xa0"+oData.adresse.plz+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+oData.adresse.ort);
                        
                        },this),
                        
                        error: jQuery.proxy(function(oErr) {
                        
                        },this)
                    });
                },
                CdHdrCall:function(tplnr){

                    this.getOwnerComponent().getModel().read("/LG_READSet(tplnr='1853100',sprache='DE',perio='014',gueltigabeff='20210701',gueltigbiseff='20220630',dlaufnr='',updProz='ANZEIGE',prozessid='800',vsIntern='')/cdhdr", {
                        // urlParameter:{
                        //     "$expand":["cdhdr"]
                        // },
                        success: jQuery.proxy(function(oData) {
                            debugger;
                           // this.byId('addressInput').setText(oData.adresse.strasse+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+oData.adresse.hausNr + "\xa0\xa0"+ oData.adresse.land+"\xa0\xa0"+oData.adresse.plz+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+oData.adresse.ort);
                            
                            var udate = oData.results[0].udate.toString().split("").reverse().join("")
                            var d = udate.slice(0,2);
                            var m = udate.slice(2,4).split("").reverse().join("");
                            var y = udate.slice(4);
                            var date = d+"."+m+"."+y;
                            this.byId('RecordInput').setText(date +"\xa0\xa0\xa0\xa0" + oData.results[0].username);
                        
                        },this),
                        error: jQuery.proxy(function(oErr) {
                        debugger;	
                        },this)
                    });
                },

            onNavBack:function(){
                    this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    this.oRouter.navTo("TargetApp");
                },
            

        });
    });


