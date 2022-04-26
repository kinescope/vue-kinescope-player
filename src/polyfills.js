// polyfill for replaceChildren
(function () {
  console.log('polyfilled!')
  if (Node.prototype.replaceChildren === undefined) {
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
