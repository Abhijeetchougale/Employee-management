import { useState } from 'react';

const useInputChange = (State) => {
    const [obj, setObj] = useState(State);

    const inputChange = (event) => {
        const {name, value, checked}= event.target
        if(name === "isFullDay"){
            setObj((prevAtte)=>({...prevAtte, [name]:checked}))
        }else{
            setObj((prevAtte)=>({...prevAtte, [name]:value}))
        }
    };

    const reset = () => {
        setObj(State);
    };

    return { obj, inputChange, reset, setObj };
};

export default useInputChange;
