class NoticeComponent extends HTMLElement{
  constructor(){
      super();
      this.shadowObj = this.attachShadow({ mode: "open" });
  }
  render(){
    const template = this.getTemplate();
    this.shadowObj.innerHTML = template;
  }

  getTemplate() {
    return`
      <slot name="content"></slot>
    `
  }

  connectedCallback(){
    this.render();
  }
};

customElements.define('notice-component', NoticeComponent);

export default NoticeComponent;