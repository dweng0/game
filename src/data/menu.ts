import { MenuItem, Menu } from "../interface/sceneinterfaceobjects";


export const TestData: Array<MenuItem> = [
    {
        id: "one",
        label: "l thing"
    },
    {
        id: "123",
        label: "3 thing"
    },
    {
        id: "4141",
        label: "2 thing"
    }
];

export const menuData: Menu = {
    background: "tomato",
    color: "white",
    height: "40px",
    width: "150px",
    name: "menu-test",
    children: TestData
}
