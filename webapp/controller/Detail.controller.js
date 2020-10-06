sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("poczcruddemo.controller.Detail", {

		onInit: function() {
		
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("EditDetail").attachPatternMatched(this._onDetailMatched, this);
		},

		_onDetailMatched: function(oEvent) {
			var oParameters = oEvent.getParameters();
			var pId = this.getView().byId("txtPId");
			var pName = this.getView().byId("txtName");
			var pMobile = this.getView().byId("txtMobileNo");
			var pCity = this.getView().byId("txtCity");
			var pState = this.getView().byId("txtState");
			var btnSave = this.getView().byId("btnSave");
			var btnUpdate = this.getView().byId("btnUpdate");
			var that = this;

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			this.getView().setModel(oModel);

			if (oParameters.arguments.PId !== "" || oParameters.arguments.PId !== null) {
				this.PId = oParameters.arguments.PId;
				
				pId.setEnabled(false);
				btnSave.setVisible(false);
				btnUpdate.setVisible(true);
				
				oModel.read("/PersonalInfoSet('" + this.PId + "')", {
					success: function(odata, oResponse) {
						pId.setValue(oResponse.data.Pid);
						pName.setValue(oResponse.data.Pname);
						pMobile.setValue(oResponse.data.Pmobile);
						pCity.setValue(oResponse.data.Pcity);
						pState.setSelectedKey(oResponse.data.Pstate);
					},
					error: function(e) {
						MessageBox.error("error");
					}
				});
				
			} else {
				MessageBox.error("Please select correct Personal Info Id", {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error",
					onClose: function(oAction) {
						that._onNavBack();
					}
				});
			}
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function() {
			var that = this;
			that._onReset();
			
			var btnSave = this.getView().byId("btnSave");
			var btnUpdate = this.getView().byId("btnUpdate");
			btnSave.setVisible(true);
			btnUpdate.setVisible(false);
			
			
			this.getRouter().navTo("Master", {}, true);
		},

		_onReset: function() {
			var pId = this.getView().byId("txtPId");
			var pName = this.getView().byId("txtName");
			var pMobile = this.getView().byId("txtMobileNo");
			var pCity = this.getView().byId("txtCity");
			var pState = this.getView().byId("txtState");

			pId.setValue("");
			pName.setValue("");
			pMobile.setValue("");
			pCity.setValue("");
			pState.setSelectedKey(0);
		},

		_onSave: function() {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			this.getView().setModel(oModel);

			var pId = this.getView().byId("txtPId");
			var pName = this.getView().byId("txtName");
			var pMobile = this.getView().byId("txtMobileNo");
			var pCity = this.getView().byId("txtCity");
			var pState = this.getView().byId("txtState");

			if (pId.getValue() === 0 || pId.getValue() === "" || pName.getValue() === "" || pMobile.getValue() === "" || pCity.getValue() ===
				"" || pState.getSelectedKey() === "0") {
				MessageToast.show("Please Enter all required of data");
				return false;
			} else {
				var oItems = {};
				var that = this;
				oItems.Pid = pId.getValue();
				oItems.Pname = pName.getValue();
				oItems.Pmobile = pMobile.getValue();
				oItems.Pcity = pCity.getValue();
				oItems.Pstate = pState.getSelectedItem().getText();

				oModel.setHeaders({
					"X-Requested-With": "X"
				});

				oModel.create("/PersonalInfoSet", oItems, {
					success: function(oData, oResponse) {
						MessageBox.success("Record Created Successfully", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",
							onClose: function(oAction) {
								that._onNavBack();
							}
						});
					},
					error: function(oError) {
						MessageBox.error("Error : " + oError);
					}

				});
			}
		},

		_onUpdate: function() {
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDTTI_ODATA_DEMO_SRV/", true);
			this.getView().setModel(oModel);

			var pId = this.getView().byId("txtPId");
			var pName = this.getView().byId("txtName");
			var pMobile = this.getView().byId("txtMobileNo");
			var pCity = this.getView().byId("txtCity");
			var pState = this.getView().byId("txtState");

			if (pId.getValue() === 0 || pId.getValue() === "" || pName.getValue() === "" || pMobile.getValue() === "" || pCity.getValue() ===
				"" || pState.getSelectedKey() === "0") {
				MessageToast.show("Please Enter all required of data");
				return false;
			} else {
				var oItems = {};
				var that = this;
				oItems.Pid = pId.getValue();
				oItems.Pname = pName.getValue();
				oItems.Pmobile = pMobile.getValue();
				oItems.Pcity = pCity.getValue();
				oItems.Pstate = pState.getSelectedItem().getText();

				oModel.setHeaders({
					"X-Requested-With": "X"
				});

				oModel.update("/PersonalInfoSet('" + pId.getValue() + "')", oItems, {
					success: function(oData, oResponse) {
						MessageBox.success("Record Updated Successfully", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",
							onClose: function(oAction) {
								that._onNavBack();
							}
						});
					},
					error: function(oError) {
						MessageBox.error("Error : " + oError);
					}

				});
			}
		}
	});

});