/**
 * Created by HuangKun on 2017/05/18.
 * 可变高List, 在rendhandler里改变box高度即可
 */

(function () {
    cc.ListHeightVariable = function () {
    };

    Laya.class(cc.ListHeightVariable, "cc.ListHeightVariable");
    var _proto = cc.ListHeightVariable.prototype;

    cc.ListHeightVariable.Convert = function (list) {
        list.$renderItems = list.renderItems;
        list._ys = [0];
        list.renderItems = function () {
            for (var i = 0, n = list._cells.length; i < n; i++) {
                list.renderItem(list._cells[i], list._startIndex + i);
            }
            list.changeSelectStatus();
        };

        list.$renderItem = list.renderItem;
        list.renderItem = function (cell, index) {
            list.$renderItem(cell, index);
            cell.y = list._ys[index];
            if (list._ys.length === index + 1 && index < list.array.length) {
                var newY = cell.y + cell.height;
                list._ys.push(newY);
                list._scrollBar.setScroll(0, newY - list._content.height, list._scrollBar.value);
            }
        };

        list.$onScrollBarChange = list.onScrollBarChange;

        list.onScrollBarChange = function (e) {
            list.runCallLater(list.changeCells);
            var scrollValue = list._scrollBar.value;
            var lineX = 1;
            var lineY = list.repeatY;
            var index = 0;
            var i;
            for (i = 0; i < list._ys.length; i++) {
                if (list._ys[i] > scrollValue)
                    break;
                index = i;
            }

            if (index > list._startIndex) {
                var num = index - list._startIndex;
                var down = true;
                var toIndex = list._startIndex + lineX * (lineY + 1);
                list._isMoved = true;
            } else if (index < list._startIndex) {
                num = list._startIndex - index;
                down = false;
                toIndex = list._startIndex - 1;
                list._isMoved = true;
            }

            for (i = 0; i < num; i++) {
                if (down) {
                    var cell = list._cells.shift();
                    list._cells[list._cells.length] = cell;
                    var cellIndex = toIndex + i;
                } else {
                    cell = list._cells.pop();
                    list._cells.unshift(cell);
                    cellIndex = toIndex - i;
                }
                list.renderItem(cell, cellIndex);
            }
            list._startIndex = index;

            list._content.scrollRect.y = scrollValue;
        };

        list.$posCell = list.posCell;
        list.posCell = function (cell, cellIndex) {
            if (!list._scrollBar) return;
            cell.y = list._ys[cellIndex];
        };

        list.$changeCells = list.changeCells;
        list.changeCells = function () {
            list._cellChanged = false;
            if (list._itemRender) {
                list.scrollBar = this.getChildByName("scrollBar");
                var cell = this._getOneCell();
                var cellWidth = (cell.width + this._spaceX) || 1;
                var cellHeight = (cell.height + this._spaceY) || 1;
                if (this._width > 0) this._repeatX2 = this._isVertical ? Math.round(this._width / cellWidth) : Math.ceil(this._width / cellWidth);
                if (this._height > 0) this._repeatY2 = this._isVertical ? Math.ceil(this._height / cellHeight) : Math.round(this._height / cellHeight);
                var listWidth = this._width ? this._width : (cellWidth * this.repeatX - this._spaceX);
                var listHeight = this._height ? this._height : (cellHeight * this.repeatY - this._spaceY);
                this._cellSize = this._isVertical ? cellHeight : cellWidth;
                this._cellOffset = this._isVertical ? (cellHeight * Math.max(this._repeatY2, this._repeatY) - listHeight - this._spaceY) : (cellWidth * Math.max(this._repeatX2, this._repeatX) - listWidth - this._spaceX);
                if (this._isVertical && this._scrollBar) this._scrollBar.height = listHeight;
                else if (!this._isVertical && this._scrollBar) this._scrollBar.width = listWidth;
                this.setContentSize(listWidth, listHeight);
                var numX = this._isVertical ? this.repeatX : this.repeatY;
                var numY = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
                this._createItems(0, numX, numY);
                this._createdLine = numY;
                if (this._array) {
                    this.array = this._array;
                    this.runCallLater(this.renderItems);
                }
            }
        };

        /**
         *列表数据源。
         */
        Laya.getset(0, list, 'array', function () {
            return this._array;
        }, function (value) {
            this.runCallLater(this.changeCells);
            this._array = value || [];
            var length = this._array.length;
            this.totalPage = Math.ceil(length / (this.repeatX * this.repeatY));
            this._selectedIndex = this._selectedIndex < length ? this._selectedIndex : length - 1;
            this.startIndex = this._startIndex;
            if (this._scrollBar) {
                this._scrollBar.stopScroll();
                var numX = this._isVertical ? this.repeatX : this.repeatY;
                var numY = this._isVertical ? this.repeatY : this.repeatX;
                var lineCount = Math.ceil(length / numX);
                var total = this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage;
                if (total > 1) {
                    this._scrollBar.scrollSize = this._cellSize;
                    this._scrollBar.thumbPercent = numY / lineCount;
                    this._scrollBar.setScroll(0, this._ys[this._ys.length - 1] - list._content.height, this._scrollBar.value);
                    this._scrollBar.target = this._content;
                } else {
                    this._scrollBar.setScroll(0, 0, 0);
                    this._scrollBar.target = this._content;
                }
            }
        });


        list.tweenTo = function (index, time, complete) {
            (time === void 0) && (time = 200);
            if (list._scrollBar) {
                var value = list._ys[index];
                Tween.to(list._scrollBar, { value: value }, time, null, complete, 0, true);
            } else {
                list.startIndex = index;
                if (complete) complete.run();
            }
        }

        if (list._scrollBar) {
            list._scrollBar.off(/*laya.events.Event.CHANGE*/"change", list, list.$onScrollBarChange);
            list._scrollBar.on(/*laya.events.Event.CHANGE*/"change", list, list.onScrollBarChange);
        }
    };
})();