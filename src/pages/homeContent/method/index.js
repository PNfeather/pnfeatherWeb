class Typing {
  constructor (element, text) {
    this.count = 0;
    this.element = element;
    this.text = text;
  }

  startTyping () {
    if (this.count < this.text.length) {
      if (this.element.attributes['data-text']) {
        this.element.attributes['data-text'].value = this.text.slice(0, this.count);
      }
      this.element.innerHTML = this.text.slice(0, this.count++) + '_';
      setTimeout(() => this.startTyping(), 20);
    } else {
      if (this.element.attributes['data-text']) {
        this.element.attributes['data-text'].value = this.text;
      }
      this.element.innerHTML = this.text;
    }
  }
}

export default Typing;
