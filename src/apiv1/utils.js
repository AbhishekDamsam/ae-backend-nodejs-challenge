

const filterBetweenDates = function(Arr, startDate, endDate){
    const stringStartDate = new Date(startDate)
    const stringEndDate = new Date(endDate)
    return Arr.filter((item) => {
        const itemDate = new Date(item.time.interval_start);
        return itemDate >= stringStartDate && itemDate <= stringEndDate;
    })
}

const filteredDataGreaterThan = function(Arr, value){
    return Arr.filter(item => item.value.average > value);
}

const filteredDataLessThan = function(Arr, value){
    return Arr.filter(item => item.value.average < value);
}

const sumOfAverages = function(Arr){
    let sumvalue = 0;
    Arr.forEach((o) => sumvalue += o.value.average);
    return sumvalue;
}

const aggregateAndAverage = function(Arr){
    return sumOfAverages(Arr) / Arr.length;
}

// As our data is huge, this functions may be CPU intensive. To make use of threads/CPU cores, we can think of worker_threads
// Otherwise workerpool will help us to focus on functions rather than handling, comunication between threads & Main thread
module.exports = {
    filterBetweenDates,
    filteredDataGreaterThan,
    filteredDataLessThan,
    aggregateAndAverage,
}