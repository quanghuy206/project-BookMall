import BounceLoader from "react-spinners/BounceLoader";

const Loading = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <>
           <BounceLoader style={style} color="#4e93e5" />
        </>
    )
}

export default Loading