function createElement(ele, attrObj) {
  var element = document.createElement(ele);

  if (attrObj) {
    for (var i in attrObj) {
      element.setAttribute(i, attrObj[i]);
    }
  }
  return element;
}
