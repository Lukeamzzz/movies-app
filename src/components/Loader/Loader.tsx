import { Bouncy } from "ldrs/react";
import 'ldrs/react/Bouncy.css';

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-[650px]">
            <Bouncy size="150" speed="1.4" color='#673ab7' />
        </div>
    );
};

export default Loader;