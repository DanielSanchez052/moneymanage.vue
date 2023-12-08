export default {
  formatString: function(value, listValues) {
    return value.replace(/{([0-9])}/g, (match, index) =>
      typeof listValues[index] == "undefined" ? match : listValues[index]
    );
  }

}