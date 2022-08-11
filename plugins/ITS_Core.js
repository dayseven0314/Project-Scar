

(function() {

    ImageManager.isTwoTileHighObject = function(filename) {
        var sign = filename.match(/[\&\@\%]+/);
        return sign && sign[0].contains('&');
    };

    ImageManager.isStepHighObject = function(filename) {
        var sign = filename.match(/[\&\@\%]+/);
        return sign && sign[0].contains('@');
    };

    ImageManager.isHoldableObject = function(filename) {
        var sign = filename.match(/[\&\@\%]+/);
        return sign && sign[0].contains('%');
    };

//========================================================================================
//                                      Game_Map
//========================================================================================

    Game_Map.prototype.isStepHighPassble = function(x, y){
        switch(this.terrainTag(x,y)){
            case 0:
                return true;
            case 1:
                return true;
            case 2:
                return false;
            default:
                return false;
        }
    };

//========================================================================================
//                                  Game_CharacterBase
//========================================================================================

    var _Game_CharacterBase_prototype_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function(){
        _Game_CharacterBase_prototype_initMembers.call(this);
        this.initStepHigh();
    };

    Game_CharacterBase.prototype.initStepHigh = function(){
        this._stepHigh = false;
        this._isTwoTileHighObject = false;
        this._isStpeHighObject = false;
        this._isHoldableObject = false;
    };

    var _Game_CharacterBase_prototype_setPriorityType = Game_CharacterBase.prototype.setPriorityType;
    Game_CharacterBase.prototype.setPriorityType = function(priorityType) {
        this.isStepHigh()? this._priorityType = 2 : _Game_CharacterBase_prototype_setPriorityType.call(this, priorityType);
    };

    Game_CharacterBase.prototype.isStepHigh = function(){
        return this._stepHigh;
    };

    Game_CharacterBase.prototype.isTwoTileHighObject = function(){
        return this._isTwoTileHighObject;
    };

    Game_CharacterBase.prototype.isStpeHighObject = function(){
        return this._isStpeHighObject;
    };

    Game_CharacterBase.prototype.isHoldableObject = function(){
        return this._isHoldableObject;
    };

    Game_CharacterBase.prototype.setStepHigh = function(bool){
        this._stepHigh = bool;
        this.setPriorityType();
    };

    var _Game_CharacterBase_prototype_screenY = Game_CharacterBase.prototype.screenY;
    Game_CharacterBase.prototype.screenY = function() {
        var sY = _Game_CharacterBase_prototype_screenY.call(this);   
        return sY - this.stepHighOffset();
    };

    Game_CharacterBase.prototype.stepHighOffset = function(){
        return (this.isStepHigh() ? 18 : 0);
    };

    var _Game_CharacterBase_prototype_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d){
       var value =  _Game_CharacterBase_prototype_isMapPassable.call(this, x, y, d);
       if(this.isStepHigh()){
            var x2 = $gameMap.roundXWithDirection(x, d);
            var y2 = $gameMap.roundYWithDirection(y, d);
            return $gameMap.isStepHighPassble(x, y) && $gameMap.isStepHighPassble(x2, y2);
       }else{
           return value;
       }
    };

    var _Game_CharacterBase_prototype_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
    Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y){
        var value = _Game_CharacterBase_prototype_isCollidedWithEvents.call(this, x, y);
        if(this.isStepHigh()){
            var events = $gameMap.eventsXyNt(x, y);
            return events.some(function(event) {
                return event.isTwoTileHighObject();
            });
        }else{
            return value;
        }
    };

    var _Game_CharacterBase_prototype_setImage = Game_CharacterBase.prototype.setImage;
    Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
        _Game_CharacterBase_prototype_setImage.call(this, characterName, characterIndex);
        this._isTwoTileHighObject = ImageManager.isTwoTileHighObject(characterName);
        this._isStpeHighObject = ImageManager.isStepHighObject(characterName);
        this._isHoldableObject = ImageManager.isHoldableObject(characterName);
    };

    Game_CharacterBase.prototype.isStepHighOnMap = function(x, y){
        var value = $gameMap.terrainTag(x,y)
        return value === 1;
    };

    Game_CharacterBase.prototype.isStepHighOnEvent = function(x, y){
        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            return !event.isTwoTileHighObject() && (event.isNormalPriority()||event.isStpeHighObject());
        });
    };

//========================================================================================
//                                     Game_Player
//========================================================================================

    var _Game_Player_prototype_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
    Game_Player.prototype.clearTransferInfo = function(){
        _Game_Player_prototype_clearTransferInfo.call(this);
        this._stepHigh = false;
    };

    var _Game_Player_prototype_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive){
        _Game_Player_prototype_update.call(this, sceneActive);
        this.upbateStepHigh();
    };

    Game_Player.prototype.upbateStepHigh = function(){
        if(this.isStepHigh()){
            var x = this._x;
            var y = this._y;
            var realX = this._realX;
            var realY = this._realY;
            if(!this.isStepHighOnMap(x, y) && !this.isStepHighOnEvent(x, y) && x == realX && y == realY){
                this.setStepHigh(false);
            }
        }
    };


    

//========================================================================================
//                                     Game_Event
//========================================================================================

var _Game_Event_prototype_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function(){
    _Game_Event_prototype_setupPageSettings.call(this);
    this.eventReflashStepHigh();
};

var _Game_Event_prototype_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    _Game_Event_prototype_update.call(this);
    this.eventReflashStepHigh();
};

Game_Event.prototype.eventReflashStepHigh = function(){
    if(this.isHoldableObject()){
        var x = this._x;
        var y = this._y;
        var isPlayerStepHigh = $gamePlayer.isStepHigh();
        if(this.isStepHighOnMap(x, y) || this.isStepHighOnEvent(x, y)){
            this.setStepHigh(true);
        }else{
            this.setStepHigh(false);
        }
        if(this.isStepHigh()){
            if(!isPlayerStepHigh){
                this._priorityType = 1;
            }else{
                this._priorityType = 3;
            }
        }
    }
    
    
    
};

})();


