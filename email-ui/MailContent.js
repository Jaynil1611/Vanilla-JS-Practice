import { MailAPI } from "./MailAPI.js";

export class MailContent {
  constructor({ currentMailId }) {
    this.itemId = currentMailId;
    this.renderMailContent();
  }

  renderMailContent() {
    const mailContent = MailAPI.getMailById(this.itemId);
    if (mailContent) {
      // let tagListHtml = `<list`;
      // mailContent.tags?.forEach((tag) => {
      //   tagListHtml += ``;
      // });
      const mailHtml = `
      <article class="mail-content__container">
        <h2>${mailContent.title}</h2>
        <p class="mail-content__text">${mailContent.content}</p>       
      <article>
      `;
      return mailHtml;
    }
  }
}
