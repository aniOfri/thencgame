import {useState, useEffect} from 'react';
import {RandInt} from '../modules/Calculators';


class Globe{
    constructor(index, width, height) {
        this.index = index;
        this.posX = RandInt(width*0.7)+width*0.1;
        this.offsetX = 0;
        this.posY = -50-RandInt(150);
        this.maxLifeSpan = RandInt(height)+200;
        this.lifeSpan = 0;
        this.randomSize = 1+Math.random();
        this.speed = RandInt(3)+1;

        let globes = ["🌍", "🌎", "🌏"];
        this.globe = globes[RandInt(3)];
      }

      move(width, height){
        if (this.lifeSpan < this.maxLifeSpan){
            this.posY += this.speed
            this.lifeSpan += this.speed
            
            if (this.offsetX == 0)
            this.offsetX = 50;
        else if (this.offsetX == 50)
            this.offsetX = 0;
        }
        else{
            this.posX = RandInt(width*0.7)+width*0.1;
            this.posY = -50-RandInt(150);
            this.maxLifeSpan = RandInt(height)+200;
            this.lifeSpan = 0;
            this.randomSize = 1+Math.random();
            this.speed = RandInt(3)+1;
            this.offsetX = 0;

            
            let globes = ["🌍", "🌎", "🌏"];
            this.globe = globes[RandInt(3)];
        }
      }

      getGlobe(){
        let opacity = (this.maxLifeSpan-this.lifeSpan)/this.maxLifeSpan*100+"%";
        const styles = {
            position: "absolute",
            top: this.posY,
            left: this.posX+this.offsetX,
            opacity: opacity,
            fontSize: (20*this.randomSize),
            transition: "left 1s cubic-bezier(.96,-1.07,.48,.85)"
          };
    
        return (
            <p key={this.index} style={styles}>{this.globe}</p>
        )
      }
}

function FallingObject(props){
    let objs = [];
    for (let i = 0; i < 25; i++){
        objs.push(new Globe(i, props.width, props.height))
    }

    const [objects, setObjects] = useState(objs)
    const [foo, setFoo] = useState(0);

    useEffect(() => {
        let interval = null;

        interval = setInterval(() => {
            setFoo(foo+1);
            let temp = objects;

            for (let i = 0; i < 25; i++){
                temp[i].move(props.width, props.height);
            }

            setObjects(temp);
        }, 10); 

        return () => {
            clearInterval(interval);
        };
    }, [foo]);

    let flags = [];
    for (let i = 0; i < 25; i++){
        flags.push(objects[i].getGlobe())
    }

    return (
        <div>
            {flags}
        </div>
    );
 }

 export default FallingObject;