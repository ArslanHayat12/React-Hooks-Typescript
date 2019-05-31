var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// classes and subclasses, access modifiers
var Widget = /** @class */ (function () {
    function Widget() {
    }
    Widget.prototype.render = function () {
        this._draw();
    };
    Widget.prototype._draw = function () {
        this._measureSize();
        // ...
    };
    Widget.prototype._measureSize = function () {
        return 42;
    };
    return Widget;
}());
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype._draw = function () {
        //		compile error: cannot use
        //		this._measureSize();
    };
    return Label;
}(Widget));
