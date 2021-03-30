const defaultDimensions = {};
defaultDimensions["button"] = [200, 30];
defaultDimensions["textField"] = [200, 30];
defaultDimensions["label"] = [200, 30];
defaultDimensions["comboBox"] = [200, 30];

const defaultTextAlign = {};
defaultTextAlign["button"] = 1;
defaultTextAlign["textField"] = 0;
defaultTextAlign["label"] = 0;
defaultTextAlign["comboBox"] = 0;

class Font {
    constructor(bolded, size) {
        this.bolded = bolded;
        this.size = size;
    }

    copy() {
        return new Font(this.bolded, this.size);
    }
}

const defaultFont = {};
defaultFont["button"] = new Font(true, 20);
defaultFont["textField"] = new Font(false, 20);
defaultFont["label"] = new Font(true, 20);
defaultFont["comboBox"] = new Font(true, 20);

export function getDefaultXDimension(type) {
    return defaultDimensions[type][0];
}

export function getDefaultYDimension(type) {
    return defaultDimensions[type][1];
}

export function getDefaultTextAlign(type) {
    return defaultTextAlign[type];
}

export function getDefaultFont(type) {
    return defaultFont[type].copy();
}

const javaClass = {};
javaClass["button"] = "JButton";
javaClass["textField"] = "JTextField";
javaClass["label"] = "JLabel";
javaClass["comboBox"] = "JComboBox";

const javaTextAlignContstants = {};
javaTextAlignContstants[0] = "SwingConstants.LEFT";
javaTextAlignContstants[1] = "SwingConstants.CENTER";
javaTextAlignContstants[2] = "SwingConstants.RIGHT";

export function getJavaClass(type) {
    return javaClass[type];
}

export function getJavaTextAlignConstant(type) {
    return javaTextAlignContstants[type];
}

// export function getJavaTextAlignConstant(type) {
//     return javaTextAlignContstants[type];
// }
