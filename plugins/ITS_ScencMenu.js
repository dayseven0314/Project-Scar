





(function(){

    var _ScencMenu_create = Scene_Menu.prototype.create;
    var _ScencMeun_createCommandWindow =  Scene_Menu.prototype.createCommandWindow;
   
    Scene_Menu.prototype.create = function() {
        _ScencMenu_create.call(this);
        this._goldWindow.visible = false;
        this._statusWindow.visible = false;
    };
    
    Scene_Menu.prototype.createCommandWindow = function() {
        _ScencMeun_createCommandWindow.call(this);
        this._commandWindow.x = Graphics.width / 2 - this._commandWindow.width/ 2;
        this._commandWindow.y = Graphics.height / 2 - this._commandWindow.height/ 2;
    };  
     
})();