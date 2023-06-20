sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/comp/library',
    'sap/ui/model/type/String',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/SearchField',
	'sap/m/Token',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/table/Column',
	'sap/m/Column',
	'sap/m/Text',
    'sap/ui/core/Fragment'
],
// added a new comment  
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,compLibrary, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, ODataModel, UIColumn, MColumn, Text,fragment) {
        "use strict";

        return Controller.extend("com.ui5.proprtyselection.controller.SelectionScreen", {
            onInit: function () {
                    this.oModel = this.getOwnerComponent().getModel();
            },
            onFilterBarSearch:function(){

                var FilArr = [];
                var tplnr = this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().getValue();
                var Plz = this._oVHD.getFilterBar().getFilterGroupItems()[3].getControl().getValue();
                var city1 = this._oVHD.getFilterBar().getFilterGroupItems()[4].getControl().getValue();
                var houseNum1 = this._oVHD.getFilterBar().getFilterGroupItems()[2].getControl().getValue();
                var street = this._oVHD.getFilterBar().getFilterGroupItems()[1].getControl().getValue();
                //var postCode1 = this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().getValue();
                var ObjectNum = this._oVHD.getFilterBar().getFilterGroupItems()[5].getControl().getValue();

                if(tplnr){
                    FilArr.push(new sap.ui.model.Filter("tplnr","EQ",tplnr));
                }
                if(Plz){
                    FilArr.push(new sap.ui.model.Filter("postCode1","EQ",Plz));
                }
                if(city1){
                    FilArr.push(new sap.ui.model.Filter("city1","EQ",city1));
                }
                if(houseNum1){
                    FilArr.push(new sap.ui.model.Filter("houseNum1","EQ",houseNum1));
                }
                if(street){
                    FilArr.push(new sap.ui.model.Filter("street","EQ",street));
                }
                if(ObjectNum){
                    FilArr.push(new sap.ui.model.Filter("objnr","EQ",ObjectNum));
                }
                
                this.oModel.read("/SH01Set", {
                    filters:FilArr,
                    success: jQuery.proxy(function(oData) {
                        debugger;
                       var json1 = new sap.ui.model.json.JSONModel(oData);
                        json1.setSizeLimit(oData.results.length);
                        this._oVHD.getTable().setModel(json1);

                        

                       
                    },this),
                    error: jQuery.proxy(function(oErr) {
                    debugger;	
                    },this)
                });
                
            },
            onSearch:function(oEvent){
                



                this._oBasicSearchField = new SearchField();
                // if (!this.pDialog) {
                //     this.pDialog = this.loadFragment({
                //         name: "com.ui5.propertyselection.view.Selection"
                //     });
                // }
                if(!this.pDialog){
                    this.pDialog= new sap.ui.xmlfragment( "com.ui5.propertyselection.view.Selection", this);
                   // var json=new sap.ui.model.json.JSONModel("model/Data.json");
                    //this.pDialog.setModel(json);
                    this.getView().addDependent(this.pDialog);
                    this.pDialog.addStyleClass("sapUiSizeCompact"); 
                    }
                    this._oVHD = this.pDialog;
                    var oFilterBar = this.pDialog.getFilterBar();
                    oFilterBar.setFilterBarExpanded(false);
                    this.pDialog.getTableAsync().then(function (oTable) {
                        // var jsonModel= new sap.ui.model.json.JSONModel("./model/Data.json");
                         //oTable.setModel(json1);
                         
                         // For Desktop and tabled the default table is sap.ui.table.Table
                         if (oTable.bindRows) {
                             //oTable.unBindRows();
                             oTable.removeAllColumns();
                             //oTable.removeAllRows();
                             // Bind rows to the ODataModel and add columns
                             oTable.bindAggregation("rows", {
                                 path: "/results",
                                 events: {
                                     dataReceived: function() {
                                        this.pDialog.update();
                                     }
                                 }
                             });
                             var i18nMoldel=this.getOwnerComponent().getModel("i18n").getResourceBundle();
                             oTable.addColumn(new UIColumn({label: i18nMoldel.getText("FunLoc"), template: "tplnr"}));
                             oTable.addColumn(new UIColumn({label: i18nMoldel.getText("Name1"), template: "name1"}));
                             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Name2"), template: "name2"}));
                             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Plz"), template: "postCode1"}));
                             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Ort"), template: "city1"}));
                             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Street"), template: "street"}));
                             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("HsNum"), template: "houseNum1"}));
                          // oTable.addColumn(new UIColumn({label: "Number of Contact Person", template: "pernr"}));
                             
                             
                         }
     
                         // For Mobile the default table is sap.m.Table
                         if (oTable.bindItems) {
                             // Bind items to the ODataModel and add columns
                             
                             oTable.removeAllColumns();
                             //oTable.removeAllitems();
 
                             oTable.bindAggregation("items", {
                                 path: "/results",
                                 template: new ColumnListItem({
                                     cells: [new Label({text: "{tplnr}"}),
                                     new Label({text: "{name1}"}),
                                     new Label({text: "{name2}"}),
                                     new Label({text: "{postCode1}"}),
                                     new Label({text: "{city1}"}),
                                     new Label({text: "{street}"}),
                                     new Label({text: "{houseNum1}"}),
                                  //   new Label({text: "{pernr}"}),
                                     ]
                                     
                                 }),
                                 events: {
                                     dataReceived: function() {
                                        this.pDialog.update();
                                     }
                                 }
                             });
                             var i18nMoldel=this.getOwnerComponent().getModel("i18n").getResourceBundle();
                            
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('FunLoc')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Name1')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Name2')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Plz')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Ort')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Street')})}));
                             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('HsNum')})}));
                            // oTable.addColumn(new MColumn({header: new Label({text: "Number of Contact Person"})}));
                             
                             
                             
                             
                         }
                         
                         this.pDialog.update();
                     }.bind(this));
                         // set flag that the dialog is initialized
                         this._bDialogInitialized = true;

                         var json1 = new sap.ui.model.json.JSONModel([]);
                       
                        this._oVHD.getTable().setModel(json1);
                        var Tplnr=this.byId("tplnrInput").getValue();
                        var expanded = Tplnr ? true : false;
                        var oFilterBar = this.pDialog.getFilterBar();
                        oFilterBar.setFilterBarExpanded(expanded);
                        this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().setValue(Tplnr);

                    this.pDialog.open();
               
                // this.pDialog.then(function(oDialog) {
                //     var oFilterBar = oDialog.getFilterBar();
                //     this._oVHD = oDialog;
                //     // Initialise the dialog with model only the first time. Then only open it
                   
                //     this.getView().addDependent(oDialog);
    
                //     // Set key fields for filtering in the Define Conditions Tab
                //     // oDialog.setRangeKeyFields([{
                //     //     label: "Product",
                //     //     key: "ProductCode",
                //     //     type: "string",
                //     //     typeInstance: new TypeString({}, {
                //     //         maxLength: 7
                //     //     })
                //     // }]);
    
                //     // Set Basic Search for FilterBar
                //     oFilterBar.setFilterBarExpanded(false);
                //    // oFilterBar.setBasicSearch(this._oBasicSearchField);
    
                //     // Trigger filter bar search when the basic search is fired
                //     // this._oBasicSearchField.attachSearch(function() {
                //     //     oFilterBar.search();
                //     // });
    
                //     oDialog.getTableAsync().then(function (oTable) {
                //        // var jsonModel= new sap.ui.model.json.JSONModel("./model/Data.json");
                //         //oTable.setModel(json1);
                        
                //         // For Desktop and tabled the default table is sap.ui.table.Table
                //         if (oTable.bindRows) {
                //             //oTable.unBindRows();
                //             oTable.removeAllColumns();
                //             //oTable.removeAllRows();
                //             // Bind rows to the ODataModel and add columns
                //             oTable.bindAggregation("rows", {
                //                 path: "/results",
                //                 events: {
                //                     dataReceived: function() {
                //                         oDialog.update();
                //                     }
                //                 }
                //             });
                //             var i18nMoldel=this.getOwnerComponent().getModel("i18n").getResourceBundle();
                //             oTable.addColumn(new UIColumn({label: i18nMoldel.getText("FunLoc"), template: "tplnr"}));
                //             oTable.addColumn(new UIColumn({label: i18nMoldel.getText("Name1"), template: "name1"}));
                //             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Name2"), template: "name2"}));
                //             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Plz"), template: "postCode1"}));
                //             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Ort"), template: "city1"}));
                //             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("Street"), template: "street"}));
                //             oTable.addColumn(new UIColumn({label:  i18nMoldel.getText("HsNum"), template: "houseNum1"}));
                //          // oTable.addColumn(new UIColumn({label: "Number of Contact Person", template: "pernr"}));
                            
                            
                //         }
    
                //         // For Mobile the default table is sap.m.Table
                //         if (oTable.bindItems) {
                //             // Bind items to the ODataModel and add columns
                            
                //             oTable.removeAllColumns();
                //             //oTable.removeAllitems();

                //             oTable.bindAggregation("items", {
                //                 path: "/results",
                //                 template: new ColumnListItem({
                //                     cells: [new Label({text: "{tplnr}"}),
                //                     new Label({text: "{name1}"}),
                //                     new Label({text: "{name2}"}),
                //                     new Label({text: "{postCode1}"}),
                //                     new Label({text: "{city1}"}),
                //                     new Label({text: "{street}"}),
                //                     new Label({text: "{houseNum1}"}),
                //                  //   new Label({text: "{pernr}"}),
                //                     ]
                                    
                //                 }),
                //                 events: {
                //                     dataReceived: function() {
                //                         oDialog.update();
                //                     }
                //                 }
                //             });
                //             var i18nMoldel=this.getOwnerComponent().getModel("i18n").getResourceBundle();
                           
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('FunLoc')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Name1')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Name2')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Plz')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Ort')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('Street')})}));
                //             oTable.addColumn(new MColumn({header: new Label({text: i18nMoldel.getText('HsNum')})}));
                //            // oTable.addColumn(new MColumn({header: new Label({text: "Number of Contact Person"})}));
                            
                            
                            
                            
                //         }
                        
                //         oDialog.update();
                //     }.bind(this));
                //         // set flag that the dialog is initialized
                //         this._bDialogInitialized = true;
                //         oDialog.open();
                // }.bind(this));
                
				
            },
            onchangeTplnr:function(oEvent){
                var value= oEvent.getParameter('value');
                if(value){
                    var reg = new RegExp('^\\d*$');
                    if(!reg.test(value)){
                        oEvent.getSource().setValue(value.substr(0,value.length-1));
                    }
                }
            },
            onSubmitTplnr:function(){
                this.onContinue();
            },
            PerioRead:function(tplnr){
                var that=this;
                var filter= new sap.ui.model.Filter("tplnr","EQ",tplnr);
                this.oModel.read("/PERIO_READSet", {
                    filters:[filter],
                    success: jQuery.proxy(function(oData) {
                       // this.byId("msgStrip").setVisible(false);
                        that.byId("tplnrInput").setVisible(false);
                        that.byId("searchBtn").setVisible(false);
                        that.byId("tplnrTxt").setText(tplnr);
                        that.byId("tplnrTxt").setVisible(true);
                        that.byId("AcPeriodLbl").setVisible(true);
                        that.byId("AcPeriod").setVisible(true);
                        that.byId("EditContinueBtn").setVisible(true);
                        that.byId("backBtn").setVisible(true);
                        var json= new sap.ui.model.json.JSONModel(oData);
                        this.byId("AcPeriod").setModel(json);
                        this.byId("AcPeriod").bindAggregation("items", {
                            path: "/results",
                            template: new sap.ui.core.Item({
                                key: "{perio}",
                                text: "{gueltigabeff} - {gueltigbiseff} | {perio}"
                            })
                        });
                        var obj = oData.results.filter(function(e){if(e.kzpakt===true){return e}});
                        if(obj.length>0){
                            this.byId("AcPeriod").setSelectedKey(obj[0].perio); 
                        }
                        
                        if(this._oVHD){
                            this._oVHD.close();
                        }

                        

                       
                    },this),
                    error: jQuery.proxy(function(oErr) {
                        debugger;
                        var Message =JSON.parse(oErr.responseText).error.message.value;
                        sap.m.MessageToast.show(Message);
                      //  this.byId("msgStrip").setText(Message);
                      //  this.byId("msgStrip").setVisible(true);
                      if(this._oVHD){
                        this._oVHD.close();
                    }
                    },this)
                });
            },
            onValueHelpOkPress: function (oEvent) {
                var that=this;

                var TabData=this._oVHD.getTable().getModel().getData().results;
                var Index=this._oVHD.getTable().getSelectedIndex();
                var tplnr= TabData[Index].tplnr;
                this.PerioRead(tplnr);
               

                
           

            },

            handleCloseMsg:function(oEvent){
                oEvent.getSource().setVisible(false);
            },
            onValueHelpCancelPress: function () {
                this._oVHD.close();
            },

            onBack:function(){
                this.byId("tplnrInput").setVisible(true);
                this.byId("searchBtn").setVisible(true);
                this.byId("tplnrTxt").setText();
                this.byId("tplnrTxt").setVisible(false);
                this.byId("AcPeriodLbl").setVisible(false);
                this.byId("AcPeriod").setVisible(false);
                this.byId("EditContinueBtn").setVisible(false);
                this.byId("backBtn").setVisible(false);
            },
            onContinue:function(){
                if(this.byId("tplnrTxt").getVisible()){
                    var Tplnr=this.byId("tplnrTxt").getText();
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("ObjectInfo",{Tplnr :Tplnr});
                 }
                 if(this.byId("tplnrInput").getVisible()){
                    var TplnrInputVal = this.byId("tplnrInput").getValue();
                    if(TplnrInputVal===""){
                        sap.m.MessageToast.show("please enter a valid property number");
                         return;
                    }else{
                        this.PerioRead(TplnrInputVal);
                    }
                 }
                 
                 

            },
            onEditContinue:function(){
                var Tplnr=this.byId("tplnrTxt").getText();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ObjectInfo",{Tplnr :Tplnr});
            },
        });
    });
