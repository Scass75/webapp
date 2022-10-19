sap.ui.define([
  "./BaseController",
  "sap/m/MessageToast",
], function (BaseController, MessageToast) {
  "use strict";

  return BaseController.extend("ACQ.PaginaAcquisti.controller.Main", {
    onLogin: async function(){
      const mail = this.byId("mail").getValue().toLowerCase();
      const pass = this.byId("password").getValue();
      const canLog = await this.onCheckInput(mail , pass);
      if(canLog)
      {
          MessageToast.show("Login successful");
          this.byId("mail").setValueState("Success")
          this.byId("password").setValueState("Success")
          this.onLogSucc()
      }else{   
          MessageToast.show("Check Email or Password");
          this.byId("mail").setValueState("Error")
          this.byId("password").setValueState("Error")
      }
  },

  onCheckInput: async function(mail , pass){
      var check;
      var model = this.getView().getModel("user").oData;
      if(mail ==="" || pass ===""){
          check = false;
          if(mail ===""){
              this.byId("mail").setValueState("Error")
              this.byId("mail").setValueStateText("Fill Email Input")
          }
          if(pass ===""){
              this.byId("password").setValueState("Error")
              this.byId("password").setValueStateText("Fill Password Input")
          }
      } else {
          this.byId("mail").setValueState("None")
          this.byId("mail").setValueStateText()
          this.byId("password").setValueState("None")
          this.byId("password").setValueStateText()

          model.forEach(element => {
              if (element.email === mail && element.password === pass){
                  check= true
              }else{

              }
          });
      }
      return check;
  },
  onLogSucc : function(){
      var oRouter = this.getOwnerComponent().getRouter()
      oRouter.navTo("home");
  }
  });

});
