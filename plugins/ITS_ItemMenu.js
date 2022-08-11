/*:
* @plugindesc IN THE SCAR ItemMenu System plugin
* @author DaySeven0314
* @help
*
* @param ItemMenuSwitchNumber
* @desc Switch Number of Enadle or Disenable Item Menu
* Default: 0
* @default 0
*
* @param ItemMenuCommonEventID
* @desc Common Event ID Number of Item Menu
* Default: 0
* @default 0
*
*/
var parameters = PluginManager.parameters('ITS_ItemMenu');
var SwitchNumber = Number(parameters['ItemMenuSwitchNumber']);
var CommonEventID = Number(parameters['ItemMenuCommonEventID']);


var ITS_ItemMenu_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    ITS_ItemMenu_Game_Interpreter_pluginCommand.call(this, command, args);

    if (typeof command != 'undefined') {

        var EnableItemMenu = function(isEanble){   
                $gameSwitches.setValue(SwitchNumber,isEanble);
        }
            
        if(command === 'ItemMenu'){
            if(Input.isPressed('control')){

                EnableItemMenu(false);
                 $gameTemp.reserveCommonEvent(CommonEventID);
                    
            }
        }

        if(command === 'EnableItemMenu'){
            EnableItemMenu(true);
        }

        if(command === 'DisenableItemMenu'){
             EnableItemMenu(false); 
        }
    }
}