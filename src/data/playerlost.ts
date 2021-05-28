import { MenuItem, Menu } from "../interface/sceneinterfaceobjects";
import { State } from "../interface/state";


export const children: Array<MenuItem> = [
    {
        id: "mainmenu",
        label: "MAIN MENU",
        onClickStateTransition: State.START
    },
    {
        id: "lobby",
        label: "RETURN TO LOBBY"
    },
    {
        id: "exit",
        label: "EXIT"
    }
];

const menuData: Menu = {
    background: "tomato",
    color: "white",
    height: "40px",
    width: "150px",
    name: "menu-playerLose",
    children
};
export default menuData;
