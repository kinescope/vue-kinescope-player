import { IS_BROWSER } from "./constants";

// polyfill for replaceChildren
(function () {
  if (IS_BROWSER && Node.prototype.replaceChildren === undefined) {
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
