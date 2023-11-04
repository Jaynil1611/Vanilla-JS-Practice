export class EventCard {
  constructor(taskData) {
    this.taskData = taskData;
    this.queue = [];
    this.eventContainerList = document.querySelectorAll(".event__container");

    this.sortTaskData();
    this.renderDayEvents();
  }

  transformData() {}

  findEventContainer(startHour) {
    return Array.from(this.eventContainerList).find(
      (event) => Number(event.dataset.hour) === startHour
    );
  }

  renderDayEvents() {
    this.taskData.forEach(({ startHour, startMin, endHour, endMin }) => {
      const eventContainer = this.findEventContainer(startHour);
      const eventCard = document.createElement("div");
      console.log(eventContainer.dataset.hour);
      const top = (startHour + startMin / 60) * 60;
      const height = (endHour - startHour + (endMin - startMin) / 60) * 60;
      console.log(top, height, startHour, startMin, endHour, endMin);

      eventCard.style.top = `${top}px`;
      eventCard.style.position = "absolute";
      eventCard.style.width = "90%";
      eventCard.style.height = `${height}px`;
      eventCard.style.backgroundColor = "cyan";

      eventContainer.appendChild(eventCard);
    });
  }

  sortTaskData() {
    this.taskData = this.taskData.map(({ startTime, endTime, ...rest }) => {
      let [startHour, startMin] = startTime.split(":");
      let [endHour, endMin] = endTime.split(":");
      startHour = parseInt(startHour);
      startMin = parseInt(startMin);
      endHour = parseInt(endHour);
      endMin = parseInt(endMin);

      return {
        ...rest,
        startHour,
        startMin,
        endHour,
        endMin,
      };
    });

    this.taskData.sort((a, b) => {
      if (a.endHour < b.endHour) {
        return -1;
      }
      if (a.startHour < b.startHour) {
        return -1;
      }
      if (a.startHour === b.startHour) {
        return a.endMin - b.endMin;
      }
      return 1;
    });
  }
}
