export const format_AM_PM = (time) => {
    const formattedTime = new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
}

export const format_date = (time) => {
    const date = new Date(time).getDate();
    const month = new Date(time).getMonth();
    const year = new Date(time).getFullYear();

    const thisDate = new Date().getDate();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    if (date === thisDate &&
        month === thisMonth &&
        year === thisYear) return 'Today';
    else if (date === thisDate - 1 &&
            (date === thisDate - 1) !== 0 && // Checks that we're not on the first day of the month
            month === thisMonth &&
            year === thisYear) return 'Yesterday';
    else if (date === thisDate - 2 &&
            (date === thisDate - 2) !== 0 && // Checks that we're not on the first day of the month
            month === thisMonth &&
            year === thisYear) return '2 days ago';
    else if (date === thisDate - 3 &&
            (date === thisDate - 3) !== 0 && // Checks that we're not on the first day of the month
            month === thisMonth &&
            year === thisYear) return '3 days ago';
    else return `${month} ${date}${getDateSuffix(date)}`;
}

const getDateSuffix = date => {
    switch(date) {
        case 1 || 31:
            return "st";
        case 2 || 22:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th"
    }
}