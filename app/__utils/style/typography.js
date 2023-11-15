/**
 * 
 */
class Font {
    constructor(font_name, font_weight, font_size) {
        this._font_name = font_name;
        this._font_weight = font_weight;
        this._font_size = font_size;
    }

    font_rule() {
        return {
            fontFamily: this._font_name,
            fontWeight: this._font_weight,
            fontSize: this._font_size
        };
    }
}

export default class Typography {
    _font_size;
    _unit;

    _display_font;
    _headline_font;
    _title_font;
    _subheading_font;
    _body_font;
    _label_font;
    _code_font;

    constructor(font_size, unit) {
        this._font_size = font_size;
        this._unit = unit;
    }

    calculate(scale) {
        return `${scale * this._font_size}${this._unit}`;
    }

    display() {
        return this._display_font.font_rule();
    }

    set_display(font_name, scale, weight = 600) {
        this._display_font = new Font(font_name, weight, this.calculate(scale));
    }

    headline() {
        return this._headline_font.font_rule();
    }

    set_headline(font_name, scale, weight = 500) {
        this._headline_font = new Font(font_name, weight, this.calculate(scale));
    }

    title() {
        return this._title_font.font_rule();
    }

    set_title(font_name, scale, weight = 500) {
        this._title_font = new Font(font_name, weight, this.calculate(scale));
    }

    subtitle() {
        return this._subheading_font.font_rule();
    }

    set_subtitle(font_name, scale, weight = 400) {
        this._subheading_font = new Font(font_name, weight, this.calculate(scale));
    }

    body() {
        return this._body_font.font_rule();
    }

    set_body(font_name, scale, weight = 400) {
        this._body_font = new Font(font_name, weight, this.calculate(scale));
    }

    label() {
        return this._label_font.font_rule();
    }

    set_label(font_name, scale, weight = 400) {
        this._label_font = new Font(font_name, weight, this.calculate(scale));
    }

    code() {
        return this._code_font.font_rule();
    }

    set_code(font_name, scale, weight = 400) {
        this._code_font = new Font(font_name, weight, this.calculate(scale));
    }
}