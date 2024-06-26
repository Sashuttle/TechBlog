//Note: function to format the date into MM/DD/YYYY format
module.exports = { 
    format_date: (date) => {
        return date.toLocalDateString();
    },

    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },

    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    },
};