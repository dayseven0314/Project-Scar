








(function(){

    var _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
    var _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;

	Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if(this._category ==='item'){
            _Window_ItemList_drawItemNumber.call(this, item, x, y, width); 
        }else{return;}
    };

    Window_ItemList.prototype.drawItem = function(index) {
        _Window_ItemList_drawItem.call(this, index);
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            if(item.meta.hide){
                this.changePaintOpacity(this.isEnabled(item));
            }
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
        
    };
})();