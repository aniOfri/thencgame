import {useState, useEffect} from 'react';
import {RandInt} from '../modules/Calculators';
import {countries} from '../data/ISO3166-1.js';


class Flag{
    constructor(width) {
        this.posX = RandInt(width*0.9);
        this.posY = -50-RandInt(150);
        this.maxLifeSpan = RandInt(600)+200;
        this.lifeSpan = 0;
        this.randomSize = 1+Math.random();
        this.speed = RandInt(5)+1;
        this.country = countries[RandInt(countries.length)].toLowerCase()
      }

      move(width){
        if (this.lifeSpan < this.maxLifeSpan){
            this.posY += this.speed
            this.lifeSpan += this.speed
        }
        else{
            this.posX = RandInt(width*0.9);
            this.posY = -50-RandInt(150);
            this.maxLifeSpan = RandInt(600)+200;
            this.lifeSpan = 0;
            this.randomSize = 1+Math.random();
            this.speed = RandInt(5)+1;
            this.country = countries[RandInt(countries.length)].toLowerCase();
        }
      }

      getFlag(){
        let url = "https://flagcdn.com/28x21/"+this.country+".png"
        
        let opacity = (this.maxLifeSpan-this.lifeSpan)/this.maxLifeSpan*100+"%";
        const styles = {
            position: "absolute",
            top: this.posY,
            left: this.posX,
            opacity: opacity,
          };
    
        return (
            <div style={styles}>
                <img src={url} width={28*this.randomSize} height={21*this.randomSize}/>
            </div>
        )
      }
}

function FallingObject(props){
    let objs = [];
    for (let i = 0; i < 25; i++){
        objs.push(new Flag(props.width))
    }

    const [objects, setObjects] = useState(objs)
    const [foo, setFoo] = useState(true);

    useEffect(() => {
        let interval = null;

        interval = setInterval(() => {
            setFoo(!foo)
            let temp = objects;
            for (let i = 0; i < 25; i++){
                temp[i].move(props.width);
            }
            setObjects(temp);
        }, 10); 

        return () => {
            clearInterval(interval);
        };
    }, [foo]);

    let flags = [];
    for (let i = 0; i < 25; i++){
        flags.push(objects[i].getFlag())
    }

    return (
        <div>
            {flags}
        </div>
    );
 }

 export default FallingObject;