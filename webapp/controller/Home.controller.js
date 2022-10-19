sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/m/MessageToast"
    ],
    function (Controller, Filter, FilterOperator,MessageToast) {
      "use strict";
      return Controller.extend("ACQ.PaginaAcquisti.controller.Home", {
        onSearch: function () {
          const oTable = this.byId("gridList");
          const sName = this.byId("filterID").getSelectedKeys();
          const sProd = this.byId("fbProd").getValue();
          const sData1 = this.byId("fbData").getSelectedKeys();
          const sCol = this.byId("fbCol").getValue();
          
          oTable.setBusy(true);
  
          var aFilters = [];
  
          if (sName.length > 0) {
            for (let i = 0; i < sName.length; i++) {
              var filter = new Filter("id", FilterOperator.EQ, sName[i]);
              aFilters.push(filter);
            }
          }
          if (sProd !== "") {
            var filter = new Filter("Team" , FilterOperator.Contains, sProd);
            aFilters.push(filter);
          }
          if (sData1.length > 0) {
            for (let i = 0; i < sData1.length; i++) {
              var filter = new Filter("Year", FilterOperator.EQ, sData1[i]);
              aFilters.push(filter);
            }
          }
          if (sCol !== "") {
            var filter = new Filter("color" , FilterOperator.Contains, sCol);
            aFilters.push(filter);
          }
          var oBinding = oTable.getBinding("items");
          oBinding.filter([aFilters]);
          oTable.setBusy(false);
        },
        onClear: function () {
          this.byId("fbName").setValue();
          this.byId("fbProd").setValue();
          this.byId("fbData").setValue();
          this.byId("fbCol").setValue();
          this.onSearch();
        },
        onDetail: function (oEvent) {
          const id = oEvent.getSource().getAggregation("content")[0].getBindingContext("cars").getObject().id;
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("detail", {
            cars: id,
          });
        },
        onBack1: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("main");
        },
      });
    }
  );
  