import { MailAPI } from "./MailAPI.js";
import { MailContent } from "./MailContent.js";

export class MailList {
  constructor(routeTag) {
    this.routeTag = routeTag;
    this.mailListSection = document.querySelector(".mail-list");
    this.mailContentSection = document.querySelector(".mail-content");
    this.mailContentSection.innerHTML = "";
    this.activeMailItem = null;
    this.renderMailList();
    this.handleMailListItemClick();
  }

  renderMailList() {
    const mails = MailAPI.getAllMails(this.routeTag);
    let mailListHtml = ``;
    mails.forEach((mail) => {
      const mailListItemHtml = `
      <article class="mail-list__item ${
        mail.isRead ? "mail-list__item--read" : ""
      }" data-item-id="${mail.id}">        
        <span class="mail-list__item--header">${mail.title}</span>
        <span class="mail-list__item--content">${mail.content}</span>        
        <div class="mail-list__item--actions">
          <button data-action="read">Read</button>
         </div>
      </article>`;

      mailListHtml += mailListItemHtml;
    });

    this.mailListSection.innerHTML = mailListHtml;
  }

  handleMailListItemClick() {
    this.mailListSection.addEventListener("click", (e) => {
      const closestSelectedMailItem = e.target.closest("article");
      const currentMailId = closestSelectedMailItem.dataset?.itemId;
      console.log(e.target.dataset);
      if (e.target.dataset.action === "read") {
        this.handleMarkAsReadOrUnread({
          element: closestSelectedMailItem,
          mailId: currentMailId,
        });
        return;
      }
      this.activeMailItem?.classList.remove("mail-list--active");
      this.activeMailItem = closestSelectedMailItem;
      closestSelectedMailItem.classList.add("mail-list--active");
      const mailContentInstance = new MailContent({ currentMailId });
      this.mailContentSection.innerHTML =
        mailContentInstance.renderMailContent();
    });
  }

  handleMarkAsReadOrUnread({ element, mailId }) {
    const currentMail = MailAPI.getMailById(mailId);
    MailAPI.updateMail({ ...currentMail, isRead: true });
    element.classList.toggle("mail-list__item--read");
  }
}
