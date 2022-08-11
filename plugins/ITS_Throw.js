

var ITS_LayerXy = function(x,y){

  var Layer = 0;
  var eventId = $gameMap.eventIdXy(x,y);
  var terrainTag = $gameMap.terrainTag(x,y);

  if(eventId!=0){

    var characterName = $gameMap.event(eventId).characterName();

    switch(characterName){
      case "ITS_Cabinet_2T" :
        Layer = 2;
        break;

      case "ITS_Object_2T_Same" :
        Layer = 2;
        break;

      case "!ITS_Object_1T_Below" :
        Layer = 0;
        break;

      case "ITS_Object_1T_Below" :
        Layer = 0;
        break;

      case"!$ITS_Manor_InsideDoor_Down":
        Layer = 2;
        break;

      case"!$ITS_Manor_InsideDoor_Left":
        Layer = 2;
        break;

      case"!$ITS_Manor_InsideDoor_Right":
        Layer = 2;
        break;

      case"!$ITS_Manor_InsideDoor_Up":
        Layer = 2;
        break;

      case "" :
        Layer = 0;
        break;

      default:
        Layer = 1; 
    }
  }else{Layer = 0;}

  if(terrainTag>Layer){
      Layer = terrainTag;
  }
  return Layer;
};

(function(){
    var _Game_Event_isNearThePlayer = Game_Event.prototype.isNearThePlayer;
  Game_Event.prototype.isNearThePlayer = function() {
    if (this.event().meta.UpdateOffscreen) {
      return true;
    } else {
      return _Game_Event_isNearThePlayer.call(this);
    }
  };
  Game_Event.prototype.isNearTheScreen = function() {
    if (this.event().meta.UpdateOffscreen) {
      return true;
    } else {
      return Game_CharacterBase.prototype.isNearTheScreen.call(this);
    }
  };
})();

/*!$gameSwitches.value() && (($gameMap.eventIdXy($gamePlayer.x,$gamePlayer.y)==0||$gameMap.eventIdXy($gamePlayer.x,$gamePlayer.y)==$gameMap.eventId(this._eventId).eventId)||($gamePlayer.direction==2 && $gameMap.eventIdXy($gamePlayer.x,$gamePlayer.y+1)==0 && $gameMap.terrainTag($gamePlayer.x,$gamePlayer.y+1)==0)||($gamePlayer.direction==4 && $gameMap.eventIdXy($gamePlayer.x-1,$gamePlayer.y)==0 && $gameMap.terrainTag($gamePlayer.x,$gamePlayer.y+1)==0)||($gamePlayer.direction==6 && $gameMap.eventIdXy($gamePlayer.x+1,$gamePlayer.y)==0 && $gameMap.terrainTag($gamePlayer.x,$gamePlayer.y+1)==0)||($gamePlayer.direction==8 && $gameMap.eventIdXy($gamePlayer.x,$gamePlayer.y-1)==0 && $gameMap.terrainTag($gamePlayer.x,$gamePlayer.y+1)==0))*/