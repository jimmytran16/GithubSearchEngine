/* function to sort the date in descending order */
function sortByDate(list){
    list.sort(function(a, b){ /* This function will sort out the list based on the given dates in ascending order */
        return new Date(a['update']) - new Date(b['update']);
    });
    return list.reverse() /* reverse the list so that it can be in descending order */
}

function formatDate(date){ /* This function is to format the date into MM/DD/YYYY display */
    const date_split = date.split("-");
    return date_split[1] + '/' + date_split[2] + '/' + date_split[0];
}

/* export the functions */
module.exports = {
    sortByDate,
    formatDate
};
