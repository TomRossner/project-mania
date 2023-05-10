export const currentYear = () => new Date().getFullYear();

export const currentHour = () => new Date().getHours();

export const currentDate = () => new Date().getDate();

export const currentMonthNumber = () => new Date().getMonth();
    
export const dayOfWeek = () => new Date().toLocaleString(
    "en",
    {weekday: "long"}
);

export const currentMonth = () => new Date().toLocaleString(
    'default',
    {month: 'long'}
);

export const AM_PM_currentTime = () => new Date().toLocaleString(
    'en-US',
    {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
);

// Current minutes
export const currentMinutes = () => {
    return Number(new Date().getMinutes()) < 10
    ? `0${new Date().getMinutes()}`
    : new Date().getSeconds();
}

// Current seconds
export const currentSeconds = () => {
    return Number(new Date().getSeconds()) < 10
    ? `0${new Date().getSeconds()}`
    : new Date().getSeconds();
}

// Format to AM/PM time
export const format_AM_PM = (time) => {
    const formattedTime = new Date(time).toLocaleString(
        'en-US',
        {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }
    );

    return formattedTime;
}

// Format date
export const format_date = (time) => {
    const date = new Date(time).getDate();
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth();

    if (date === currentDate() &&
        month === currentMonthNumber() &&
        year === currentYear()) return 'Today';
    else if (date === currentDate() - 1 &&
            (date === currentDate() - 1) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return 'Yesterday';
    else if (date === currentDate() - 2 &&
            (date === currentDate() - 2) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return '2 days ago';
    else if (date === currentDate() - 3 &&
            (date === currentDate() - 3) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return '3 days ago';
    else {
        month = new Date(time).toLocaleString('default', { month: 'long' });
        
        return `${month} ${date}${setDateEnding(date)}`;
    }
}

// Set date ending
export const setDateEnding = date => {
    switch(date) {
        case 1 || 21 || 31:
            return "st";
        case 2 || 22:
            return "nd";
        case 3 || 23:
            return "rd";
        default:
            return "th";
    }
}

// Message time format (AM/PM time)
export const AM_PM = date => {
    return new Date(date).toLocaleString(
        'en-US',
        {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }
    );
}

// Last seen format
export const lastSeenTime = (time) => {
    const date = new Date(time).getDate();
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth();

    if (date === currentDate() &&
        month === currentMonthNumber() &&
        year === currentYear()) return `today at ${AM_PM(time)}`;
    else if (date === currentDate() - 1 &&
            (date === currentDate() - 1) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return `yesterday at ${AM_PM(time)}`;
    else {
        month = new Date(time).toLocaleString('default', { month: 'long' });
        return `${month} ${date}${setDateEnding(date)} at ${AM_PM(time)}`;
    }
}

// Task due date format
export const dueDateFormat = (time) => {
    const date = new Date(time).getDate();
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth();

    if (date === currentDate() &&
        month === currentMonthNumber() &&
        year === currentYear()) return 'Due Today';
    else if (date === currentDate() - 1 &&
            (date === currentDate() - 1) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return 'Due Yesterday';
    else if (date === currentDate() - 2 &&
            (date === currentDate() - 2) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return 'Due 2 days ago';
    else if (date === currentDate() - 3 &&
            (date === currentDate() - 3) !== 0 && // Checks that we're not on the first day of the month
            month === currentMonthNumber() &&
            year === currentYear()) return 'Due 3 days ago';
    else {
        month = new Date(time).toLocaleString('default', { month: 'long' });
        
        return `Due ${month} ${date}${setDateEnding(date)}`;
    }
}