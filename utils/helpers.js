//function to format the date into MM/DD/YYYY format
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

//export to use formatdate function throughout application
module.exports = { formatDate };