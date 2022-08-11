












(function(){
    var _TimerVisible_SpriteTimer_updateVisibility = Sprite_Timer.prototype.updateVisibility;
    Sprite_Timer.prototype.updateVisibility = function(){
        _TimerVisible_SpriteTimer_updateVisibility.call(this);
        this.visible = false;

    };
})();




