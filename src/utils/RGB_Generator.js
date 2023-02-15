export  const colorRandomizer = () => {
    const max = 255;

    const red = Math.floor(Math.random() * max);
    const green = Math.floor(Math.random() * max);
    const blue = Math.floor(Math.random() * max);

    const rgb = `(${red}, ${green}, ${blue})`;
    return rgb;
}