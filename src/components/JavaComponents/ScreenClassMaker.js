import { getJavaClass, getJavaTextAlignConstant } from "./JComponentData";

export function makeClassText(components) {
    let componentDeclarations = "";
    components.forEach((element) => {
        componentDeclarations += "private " + getJavaClass(element.type) + " " + element.variableName + ";\n";
    });
    console.log(componentDeclarations);

    let componentInitializations = [];
    components.forEach((element) => {
        let initString = "";

        initString += `${element.variableName} = new ${getJavaClass(element.type)}();\n`;
        initString += `${element.variableName}.setFont(new Font("Arial", ${element.font.bolded ? "Font.BOLD" : "Font.PLAIN"}, ${element.font.size}));\n`;
        initString += `${element.variableName}.setHorizontalAlignment(${getJavaTextAlignConstant(element.type)});\n`;
        initString += `${element.variableName}.setBounds(${element.x + 5}, ${element.y + 5}, ${element.width}, ${element.height});\n`;
        initString += `this.add(${element.variableName});\n`;
        if (element.type === "button") initString += `${element.variableName}.addActionListener(this);\n`;

        componentInitializations.push(initString);
    });

    componentInitializations.forEach((element) => {
        console.log(element + "\n");
    });
}

export function makeComponentDeclarations(components) {
    let componentDeclarations = "// Remember to change your frame dimensions\n\n// Add to your screen class \n\n";
    components.forEach((element) => {
        componentDeclarations += "private " + getJavaClass(element.type) + " " + element.variableName + ";\n";
    });
    return componentDeclarations;
}

export function makeComponentInitializations(components) {
    // let componentInitializations = [];
    let componentInitializations = "// Add to your screen class constructor \n\n";
    components.forEach((element) => {
        let initString = "";

        console.log(element);
        console.log(getJavaTextAlignConstant(element.textAlign));

        initString += `${element.variableName} = new ${getJavaClass(element.type)}();\n`;
        initString += `${element.variableName}.setFont(new Font("Arial", ${element.font.bolded ? "Font.BOLD" : "Font.PLAIN"}, ${element.font.size}));\n`;
        initString += `${element.variableName}.setHorizontalAlignment(${getJavaTextAlignConstant(element.textAlign)});\n`;
        initString += `${element.variableName}.setBounds(${element.x + 5}, ${element.y + 5}, ${element.width}, ${element.height});\n`;
        initString += `${element.variableName}.setText("${element.text}");\n`;
        initString += `this.add(${element.variableName});\n`;
        if (element.type === "button") initString += `${element.variableName}.addActionListener(this);\n`;
        initString += `\n`;

        // componentInitializations.push(initString);
        componentInitializations += initString;
    });

    return componentInitializations;
}
