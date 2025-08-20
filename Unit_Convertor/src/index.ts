type Category = "length" | "temperature";

const lengthUnits: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
}

const tempsUnits = ['C', 'F', 'K'];

function isLength(unit: string) {
    return unit.toLowerCase() in lengthUnits;
}

function isTemp(unit: string) {
    return tempsUnits.includes(unit.toUpperCase());
}

function convertLength(value: number, from: string, to: string) {
    return (value * lengthUnits[from.toLowerCase()] / lengthUnits[to.toLowerCase()]);
}

function convertTemp(value: number, from: string, to: string) {
    if (from === to) {
        return value;
    }
    let K = from === "C" ? value + 273.15 : from === "F" ? (value - 32) * 5 / 9 + 273.15 : value;

    return to === "C" ? K - 273.15 : to === "F" ? (K - 273.15) * 9 / 5 + 32 : K;
}

function main() {
    const [, , valueStr, rawMapping] = process.argv;

    if (!valueStr || !rawMapping) {
        console.log("Missing Arugments");
        return;
    }

    const value = Number(valueStr);

    let mapping = rawMapping.replace("->", "-");
    const [from, to] = mapping.split("-") || [];
    if (!Number.isFinite(value) || !from || !to) {
        console.log("Invalid input");
        return;
    }

    let result: number;

    if (isLength(from) && isLength(to)) {
        result = convertLength(value, from, to);
    } else if (isTemp(from) && isTemp(to)) {
        result = convertTemp(value, from, to);
    } else {
        console.log("Cannot convert between different categories.");
        return;
    }

    console.log(`Converted value is: ${value} ${from} = ${Math.round(result * 1000) / 1000} ${to}`);
}

main();

