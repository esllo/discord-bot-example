import { Command } from "../types";
import AddRole from "./addrole";
import Echo from "./echo";
import Leave from "./leave";
import Pause from "./pause";
import Play from "./play";
import Queue from "./queue";
import Resume from "./resume";
import Skip from "./skip";
import Youtube from "./youtube";

const Commands: Command[] = [
  Echo,
  Youtube,
  AddRole,
  Play,
  Pause,
  Resume,
  Skip,
  Leave,
  Queue,
];

export default Commands;