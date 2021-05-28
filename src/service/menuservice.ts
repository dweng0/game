import { Scene } from "@babylonjs/core";
import { Button, AdvancedDynamicTexture } from "@babylonjs/gui";
import { Menu, MenuItem } from "../interface/sceneinterfaceobjects";

class MenuService {

    /**
     * Adds a menu to the screen.
     * @param scene the scene to add the menu to
     * @param menuData the data to render
     */
    static buildMenu(scene: Scene, menuData?: Menu): void { 
        if(!menuData) { 
            return
        }
        
        const menu = AdvancedDynamicTexture.CreateFullscreenUI(menuData.name, true, scene);
            
        let iterator = 1;

        menuData.children.forEach((item: MenuItem) => {
            var btn = Button.CreateSimpleButton(`${item.id}-${iterator}`, item.label);
                btn.width = menuData.width;
                btn.height = menuData.height;
                btn.color = menuData.color;
                btn.cornerRadius = 20;
                btn.top = 55 * iterator;
                btn.background = menuData.background;
                btn.onPointerUpObservable.add(function() {
                    alert("you did it!");
                });

            menu.addControl(btn);
            iterator++;
        });

    }
}

export default MenuService;