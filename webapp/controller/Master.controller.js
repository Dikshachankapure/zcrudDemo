sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("poczcruddemo.controller.Master", {
		onInit: function() {
			var tblPersonaltbl = this.getView().byId("tblPersonaltbl");
			var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			tblPersonaltbl.setModel(oDataModel);
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onAdd: function() {

			this.getRouter().navTo("Detail", {}, true);
		},

		_onEdit: function(oEvent) {
			var objPId = oEvent.getSource().getBindingContext().getObject();
			//Get the Model. 
			this.getRouter().navTo("EditDetail", {
				PId: objPId.Pid
			});
		},

		_onDelete: function(oEvent) {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			this.getView().setModel(oModel);
			var tblPersonaltbl = this.getView().byId("tblPersonaltbl");

			var deleteRecord = oEvent.getSource().getBindingContext().getObject();
			oModel.remove("/PersonalInfoSet('" + deleteRecord.Pid + "')", {
				method: "DELETE",
				success: function(odata) {
					tblPersonaltbl.setModel(oModel);
					MessageBox.success("Record Delete Successfully");
				},
				error: function(e) {
					MessageBox.error("error");
				}
			});
		},

		onSearch: function(oEvent) {
			// build filter array

			var filters = [];
			var query = oEvent.getParameter("query");
			/*	var filter = new sap.ui.model.Filter("Pname", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
				
				// update list binding
				var list = this.getView().byId("tblPersonaltbl");
				var binding = list.getBinding("items");
				binding.filter(filters);*/
			var list = this.getView().byId("tblPersonaltbl");
			var odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			odataModel.read("/PersonalInfoSet?$filter=Pname eq '" + query + "'", null, null, true, function(oData, oResponse) {
				//list.setModel(jsonModel);
			});
		}
	});
});