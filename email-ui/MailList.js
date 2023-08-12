import { MailAPI } from "./MailAPI.js";

export class MailList {
  constructor(routeTag) {
    this.routeTag = routeTag;
    this.mailListSection = document.querySelector(".mail-list");
    this.renderMailList();
  }

  renderMailList() {
    const mails = MailAPI.getAllMails(this.routeTag);
    let mailListHtml = ``;
    mails.forEach((mail) => {
      const mailListItemHtml = `
      <article class="mail-list__item">
        <span class="mail-list__item--header">${mail.title}</span>
        <span class="mail-list__item--content">${mail.content}</span>
      </article>`;

      mailListHtml += mailListItemHtml;
    });

    this.mailListSection.innerHTML = mailListHtml;
  }
}
