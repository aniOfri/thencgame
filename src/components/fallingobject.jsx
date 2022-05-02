import {useState} from 'react';
import {RandInt} from '../modules/Calculators';


function Object(props){
    const [posX, setPosX] = useState(RandInt(props.width));
    const [posY, setPosY] = useState(0);
    const [object, setObject] = useState("Hello")
    const [lifeSpan, setLifeSpan] = useState(props.lifeSpan)

    useEffect(() => {
        let interval = null;
    
        interval = setInterval(() => {
            setPosY(posY + 1);
            setLifeSpan(lifeSpan - 0.1);
        }, 10);
        return () => {
            clearInterval(interval);
        };
      }, [lifeSpan]);
    
    const styles = {
        color: "white",
        position: "absolute",
        top: posY,
        left: posX
      };

    return (
        <div style={styles}>
            <span>{object}</span>
        </div>
    )
}

function FallingObject(props){
    const [objects, setObjects] = useState([<Object width={props.width} lifeSpan={200}/>])


    return (
        <div>
            {objects}
        </div>
    );
 }

 export default FallingObject;