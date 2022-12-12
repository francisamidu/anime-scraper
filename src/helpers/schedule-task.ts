import { schedule } from "node-cron";
const scheduleTasks = (time: string, task: () => void) => {
  const scheduled = schedule(time, task);
  scheduled.start();
};
export default scheduleTasks;
