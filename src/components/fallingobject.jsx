import {useState, useEffect} from 'react';
import {RandInt} from '../modules/Calculators';
import {countries} from '../data/ISO3166-1.js';


function Object(props){
    var line = countries[RandInt(countries.length)];
    let url = "https://flagcdn.com/16x12/"+line.toLowerCase()+".png"

    const [posX, setPosX] = useState(RandInt(props.width*0.9));
    const [posY, setPosY] = useState(-50);
    const [object, setObject] = useState(<img src={url} width="20"/>)
    const [lifeSpan, setLifeSpan] = useState(props.lifeSpan)

    useEffect(() => {
        let interval = null;
    
        if (lifeSpan > 0){
            interval = setInterval(() => {
                setPosY(posY + props.speed);
                setLifeSpan(lifeSpan - props.speed);
            }, 10);
        }
        else{
            setPosX(RandInt(props.width*0.9))
            setPosY(-50);
            setLifeSpan(props.lifeSpan)
            clearInterval(interval);
            
            line = countries[RandInt(countries.length)];
            url = "https://flagcdn.com/16x12/"+line.toLowerCase()+".png"
            setObject(<img src={url} width="20"/>)
        }

        return () => {
            clearInterval(interval);
        };
    }, [lifeSpan]);
    
    let opacity = lifeSpan/props.lifeSpan*100+"%"
    const styles = {
        color: "white",
        position: "absolute",
        top: posY,
        left: posX,
        opacity: opacity
      };

    return (
        <div style={styles}>
            <span>{object}</span>
        </div>
    )
}

function FallingObject(props){
    let objs = [];
    for (let i = 0; i < 50; i++){
        objs.push(<Object index={i} width={props.width} lifeSpan={RandInt(800)} speed={RandInt(7)+3}/>)
    }
    const [objects, setObjects] = useState(objs)


    return (
        <div>
            {objects}
        </div>
    );
 }

 export default FallingObject;