export default {
  formatString: function(value, listValues) {
    return value.replace(/{([0-9])}/g, (match, index) =>
      typeof listValues[index] == "undefined" ? match : listValues[index]
    );
  },

  formatMoney: (value) => {
    return (value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0 
    })
  }
}
