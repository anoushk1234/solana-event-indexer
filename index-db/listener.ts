import { listenToProgramForEvents, program } from "./emitter_program";
import cron from "cron";
import { MyEvent } from "./database/models/model";
var CronJob = cron.CronJob;
var job = new CronJob({
  cronTime: "*/1 * * * * *",
  onTick: async function () {
    let listener = 0;
    console.log("enter");
    let [event, slot] = await new Promise((resolve, _reject) => {
      listener = program.addEventListener("MyEvent", (event, slot) => {
        resolve([event, slot]);
      });
    });

    await program.removeEventListener(listener);
    if (slot && event.label) {
      console.log("updating", slot, event.label);
      MyEvent.create({
        id: slot,
        label: event.label,
        data: event.data,
      });
      console.log("updated");
    } else {
      console.log("no data", slot, event);
    }
    console.log("slot|event ->", slot, event);
  },
  start: false,
  timeZone: "America/Los_Angeles",
});
job.start();
