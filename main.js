import './style.css'
import { handleLocation} from "./src/utils/route";
import { NotificationSystem } from './src/ui/NotificationSystem/NotificationSystem';

handleLocation()

NotificationSystem.init()
window.onpopstate = handleLocation