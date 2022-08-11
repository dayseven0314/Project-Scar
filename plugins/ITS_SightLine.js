/*:
* @plugindesc IN THE SCAR Sightlint System plugin
* @author DaySeven0314
* @help
*
* @param SightlineRange
* @
* Default: 10
* @default 10
*
*
*/
var parameters = PluginManager.parameters('ITS_functions');
var sightline_FrontRange = Number(parameters['SightlineRange']);

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    

	if (typeof command != 'undefined') {
        
            
        /********* Var Ues in pluginCommand 'Sightline' ******/
        var selfSwitch_B = [$gameMap._mapId,$gameVariables.value(12),'B'];
        var sightline_RightRange = 1;
        var player_Front;
        var player_Right;
        var event_Front;
        var event_Right;
        var distance;
        var seePlayer;
        var XisRight;
        var player_ShadeSearch_Range;
        var player_shadeSearch_Direction;
        var event_ShadeSearch_Range;
        var event_shadeSearch_Direction;
        var searchEvent = function(locationX,locationY){
            var eventID = $gameMap.eventIdXy(locationX,locationY);
            if(eventID != 0){
                if($gameMap.event(eventID)._characterName != ""){
                    return eventID;
                }else{
                    return 0;
                }
            }else{
                return 0;
            }

        }

        var shadeSearch = function(searchRange,searchDirection,characterFront,characterRight,){

            var searchX;
            var searchY;

            for(i = 1; i<searchRange;i++){

                if(XisRight){
                    searchX = characterRight;
                    searchY = characterFront - i*searchDirection;
                }else{
                    searchX = characterFront - i*searchDirection;
                    searchY = characterRight;
                }
                if($gameMap.terrainTag(searchX,searchY)+searchEvent(searchX,searchY) != 0){
                    seePlayer = false;
                }

            }
        }
        
            
        /***************************************************/
        /*var stephighEvent = function(locationX,locationY){
            var eventID = $gameMap.eventIdXy(locationX,locationY);
            if(eventID != 0){
                if($gameMap.event(eventID)._characterName != ""){
                    if($gameMap.event(eventID)._characterName == "ITS_Cabinet_2T"){
                        return 2;
                    }else{
                        return 1;
                    }
                }else{
                    return 0;
                }
            }else{
                return 0;
            }

        }*/

        /****************************** pluginCommand 'ITS_Sightline' Version 1.1 ******************************************/
        if(command === 'Sightline_B'){
            // Set Default Value Fby Event Direction
            switch($gameMap.event($gameVariables.value(12)).direction()){
                case 2:
                    player_Front = $gamePlayer.y;
                    player_Right = $gamePlayer.x;
                    event_Front = $gameMap.event($gameVariables.value(12)).y;
                    event_Right = $gameMap.event($gameVariables.value(12)).x;
                    distance = player_Front - event_Front;
                    player_shadeSearch_Direction = 1;
                    event_shadeSearch_Direction = -1;
                    XisRight = true;
                    break;
                case 4:
                    player_Front = $gamePlayer.x;
                    player_Right = $gamePlayer.y;
                    event_Front = $gameMap.event($gameVariables.value(12)).x;
                    event_Right = $gameMap.event($gameVariables.value(12)).y;
                    distance = event_Front - player_Front;
                    player_shadeSearch_Direction = -1;
                    event_shadeSearch_Direction = 1;
                    XisRight = false;
                    break;
                case 6:
                    player_Front = $gamePlayer.x;
                    player_Right = $gamePlayer.y;
                    event_Front = $gameMap.event($gameVariables.value(12)).x;
                    event_Right = $gameMap.event($gameVariables.value(12)).y;
                    distance = player_Front - event_Front;
                    player_shadeSearch_Direction = 1;
                    event_shadeSearch_Direction = -1;
                    XisRight = false;
                    break;
                case 8:
                    player_Front = $gamePlayer.y;
                    player_Right = $gamePlayer.x;
                    event_Front = $gameMap.event($gameVariables.value(12)).y;
                    event_Right = $gameMap.event($gameVariables.value(12)).x;
                    distance = event_Front - player_Front;
                    player_shadeSearch_Direction = -1;
                    event_shadeSearch_Direction = 1;
                    XisRight = true;
                    break;   
            }
                //Check is Player at Sightlint Range
            if(player_Right <= event_Right+sightline_RightRange && player_Right >= event_Right-sightline_RightRange && distance < sightline_FrontRange && distance > 0){
                seePlayer = true;
                // Search Shade between Player & Event
                if(player_Right == event_Right){
                    player_ShadeSearch_Range = distance ;
                    shadeSearch(player_ShadeSearch_Range,player_shadeSearch_Direction,player_Front,player_Right);
                }else{
                    player_ShadeSearch_Range = Math.floor(distance/2) + 1;
                    shadeSearch(player_ShadeSearch_Range,player_shadeSearch_Direction,player_Front,player_Right);
                    if(seePlayer){
                        event_ShadeSearch_Range = Math.floor(distance/2) + 1;
                    }else{
                        event_ShadeSearch_Range = Math.ceil(distance/2) + 1;
                    };
                    shadeSearch(event_ShadeSearch_Range,event_shadeSearch_Direction,event_Front,event_Right);
                };
            }else{
                seePlayer = false;
            };
            //Reture Resule
            $gameSelfSwitches.setValue(selfSwitch_B,seePlayer);
        }
            /********************************************************************************/
        if(command ==='TrashCheck'){
            
            switch($gameMap.event($gameVariables.value(12)).direction()){
                case 2:
                    var _Y = $gameMap.event($gameVariables.value(12)).y+1;
                    var _X = $gameMap.event($gameVariables.value(12)).x;
                    break;
                case 4:
                    var _Y = $gameMap.event($gameVariables.value(12)).y;
                    var _X = $gameMap.event($gameVariables.value(12)).x-1;
                    break;
                case 6:
                    var _Y = $gameMap.event($gameVariables.value(12)).y;
                    var _X = $gameMap.event($gameVariables.value(12)).x+1;
                    break;
                case 8:
                    var _Y = $gameMap.event($gameVariables.value(12)).y-1;
                    var _X = $gameMap.event($gameVariables.value(12)).x;
                    break;   
            }
            
            var _Search = function(X,Y){
                var eventId = $gameMap.eventIdXy(X,Y);
                if(eventId != 0){
                    if($gameMap.event(eventId)._characterName == "ITS_Cabinet_2T"|| $gameMap.event(eventId)._characterName == "ITS_Object_2T_Same"){
                        return 2;
                    }else{return 1;}
                }else{return 0;}
            };

            if($gameMap.terrainTag(_X,_Y) == 2|| _Search(_X,_Y) == 2){
                $gameMap.event($gameVariables.value(12)).setThrough(false);
            }else if($gameMap.terrainTag(_X,_Y) ==1 || _Search(_X,_Y) ==1 ){
                $gameSwitches.setValue(23,true);
            }else{$gameSwitches.setValue(23,false);}
        }
    }
}