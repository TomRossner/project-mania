// Generate RGB
export const generateRGB = () => {

    const MAX = 255;

    const randomNum = () => Math.floor(Math.random() * MAX);

    const red = randomNum();
    const green = randomNum();
    const blue = randomNum();

    const rgb = `(${red}, ${green}, ${blue})`;
    // Output => (1, 2, 3)

    return rgb;
}