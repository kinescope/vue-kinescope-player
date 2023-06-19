// polyfill for replaceChildren
(function () {
  if (Node && Node.prototype.replaceChildren === undefined) {
    Node.prototype.replaceChildren = function (addNodes) {
      while (this.lastChild) {
        this.removeChild(this.lastChild)
      }
      if (addNodes !== undefined) {
        this.append(addNodes)
      }
    }
  }
}())
