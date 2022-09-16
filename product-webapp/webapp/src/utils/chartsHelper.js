export const getBackgroundColors = (dataItems) => {
    let colors = [];
    while (colors.length < dataItems.length) {
        const red = parseInt(Math.floor(Math.random() * (255 - 50 + 1)) + 50);
        const green = parseInt(Math.floor(Math.random() * (255 - 50 + 1)) + 50);
        const blue = parseInt(Math.floor(Math.random() * (255 - 50 + 1)) + 20);
        const color = `rgb(${red},${green},${blue})`;
        if (!colors.includes(color)) {
            colors.push(color);
        }
    };
    return colors;
}
export const getLables = (data, label) => {
    let labels = [];
    data.forEach((item) => {
        if (label === 'interviewerAvailDate') {
            if (!labels.includes(item[label])) {
                labels.push(item[label])
            }
        } else {
            if (!labels.includes(item[label].toLowerCase())) {
                labels.push(item[label].toLowerCase())
            }
        }
    })
    return label === 'interviewerAvailDate' ? sortDates(labels) : labels;
}
export const sortDates = (dates) => {
    return dates.sort(function (a, b) {
        const date1 = new Date(a.split(':').join('/'))
        const date2 = new Date(b.split(':').join('/'))
        return date1 - date2;
    });
}
export const getData = (data, lables, labelName) => {
    const counts = [];
    lables.forEach((lableItem, i) => {
        let count = 0;
        data.forEach((item) => {
            if (labelName !== 'interviewerAvailDate') {
                if (item[labelName].toLowerCase() === lableItem) {
                    count++
                }
            } else {
                if (parseInt(item[labelName].split('/').join("")) === parseInt(lableItem.split('/').join(''))) {
                    count++
                }
            }
        });
        counts.push(count);
    });
    return counts;
}
export const setChartDataset = (items) => {
    let data = [];
    items.forEach(item => data.push({
        data: item.data,
        backgroundColor: item.backgroundColor,
        label: item.label,
    }))
    return {
        datasets: data,
        labels: items[0].labels,
    }
}