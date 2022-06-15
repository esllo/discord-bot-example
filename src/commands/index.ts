import { ButtonCommand, Command } from "../types";
import AddRole from "./addrole";
import Clear from "./clear";
import Dice from "./dice";
import Echo from "./echo";
import Leave from "./leave";
import Pause from "./pause";
import Play from "./play";
import Queue from "./queue";
import Resume from "./resume";
import Skip from "./skip";
import Youtube from "./youtube";

const Commands: (Command | ButtonCommand)[] = [
  Echo,
  Youtube,
  AddRole,
  Play,
  Pause,
  Resume,
  Skip,
  Leave,
  Queue,
  Dice,
  Clear,
];

export default Commands;