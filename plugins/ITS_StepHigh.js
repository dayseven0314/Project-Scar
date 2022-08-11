/*:
* @plugindesc IN THE SCAR StepHigh System plugin
* @author DaySeven0314
* @help
*
* @param StepHighSwitchNumber
* @desc Is Number of SetpHigh Switch
* Default: 0
* @default 0
*
* @param CancelStepHighAnimationCommandEventID
* @desc Is Command Event ID of SetpHigh Animation
* Default: 0
* @default 0
*
*/
var parameters = PluginManager.parameters('ITS_StepHigh');
var SH_SwitchNumber = Number(parameters['StepHighSwitchNumber']);
var SH_CommonEventID = Number(parameters['CancelStepHighAnimationCommandEventID']);


var ITS_StepHigh_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ITS_StepHigh_Game_Interpreter_pluginCommand.call(this, command, args);

    if (typeof command != 'undefined') {
        
        var stephighEvent = function(locationX,locationY){
            var eventID = $gameMap.eventIdXy(locationX,locationY);
            if(eventID != 0){
                switch($gameMap.event(eventID)._characterName){
                    case "ITS_Cabinet_2T" :
                        return 2;

                    case "ITS_Object_2T_Same" :
                        return 2;

                    case "!ITS_Object_1T_Below" :
                        return 0;

                    case "ITS_Object_1T_Below" :
                        return 0;

                    case"!$ITS_Manor_InsideDoor_Down":
                        return 2;

                    case"!$ITS_Manor_InsideDoor_Left":
                        return 2;

                    case"!$ITS_Manor_InsideDoor_Right":
                        return 2;

                    case"!$ITS_Manor_InsideDoor_Up":
                        return 2;

                    case"!ITS_Object_1T_Above":
                        return 0;

                    case"ITS_Object_2T_Above":
                        return 0;

                    case "" :
                        return 0;

                    default:
                        return 1;
                }
            }else{
                return 0;
            }

        };

        if(command ==='Stephigh'){

            if(Input.isPressed('up')){

                if($gameMap.terrainTag($gamePlayer.x,$gamePlayer.y - 1) > 1 || stephighEvent($gamePlayer.x,$gamePlayer.y - 1) > 1){
                    $gamePlayer.setThrough(false);
                }else{$gamePlayer.setThrough(true);}

            }else if(Input.isPressed('down')){

                if($gameMap.terrainTag($gamePlayer.x,$gamePlayer.y + 1) > 1 || stephighEvent($gamePlayer.x,$gamePlayer.y + 1) > 1){
                    $gamePlayer.setThrough(false);
                }else{$gamePlayer.setThrough(true);}

            }else if(Input.isPressed('left')){

                if($gameMap.terrainTag($gamePlayer.x - 1,$gamePlayer.y) > 1 || stephighEvent($gamePlayer.x - 1,$gamePlayer.y) > 1){
                    $gamePlayer.setThrough(false);
                }else{$gamePlayer.setThrough(true);}

            }else if(Input.isPressed('right')){

                if($gameMap.terrainTag($gamePlayer.x + 1,$gamePlayer.y) > 1 || stephighEvent($gamePlayer.x + 1,$gamePlayer.y) > 1){
                    $gamePlayer.setThrough(false);
                }else{$gamePlayer.setThrough(true);}

            }
            
            if($gameMap.terrainTag($gamePlayer.x,$gamePlayer.y) == 0 && stephighEvent($gamePlayer.x,$gamePlayer.y) == 0){
                $gameTemp.reserveCommonEvent(SH_CommonEventID);
                $gamePlayer.setThrough(false);
                $gameSwitches.setValue(SH_SwitchNumber,false);
            }
        }
    }
};
/*($gameMap.event($gameVariables.value(12)).direction()==2 && $gameMap.eventIdXy($gameMap.event(this._eventId).x,$gameMap.event(this._eventId).y-1) == $gameVariables.value(12)) || ($gameMap.event($gameVariables.value(12)).direction()==4 && $gameMap.eventIdXy($gameMap.event(this._eventId).x+1,$gameMap.event(this._eventId).y) == $gameVariables.value(12)) || ($gameMap.event($gameVariables.value(12)).direction()==6 && $gameMap.eventIdXy($gameMap.event(this._eventId).x-1,$gameMap.event(this._eventId).y) == $gameVariables.value(12))||($gameMap.event($gameVariables.value(12)).direction()==8 && $gameMap.eventIdXy($gameMap.event(this._eventId).x,$gameMap.event(this._eventId).y+1) == $gameVariables.value(12))*/