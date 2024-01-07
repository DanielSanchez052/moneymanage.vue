export default {
  formatString: function(value, listValues) {
    return value.replace(/{([0-9])}/g, (match, index) =>
      typeof listValues[index] == "undefined" ? match : listValues[index]
    );
  },

  formatMoney: (value) => {
    if(value == undefined){
      value = 0
    }

    return (value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0 
    })
  },

  getRandomColor: () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
