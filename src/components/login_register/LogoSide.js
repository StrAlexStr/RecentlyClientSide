import { RiBellFill } from "react-icons/ri";

function LogoSide() {
  return (
    <div className="transform flex flex-col items-center  mt-24 lg:mt-0 scale-75 lg:scale-100 justify-around">
      <span className="text-7xl text-logo">
        <RiBellFill />
      </span>
      <strong
        className="text-main text-7xl font-light"
        style={{ fontFamily: "Baloo2" }}
      >
        Recently
      </strong>
      <span
        className="text-secondary-dark text-4xl font-semibold"
        style={{ fontFamily: "Josefin" }}
      >
        - Be Aware -
      </span>
    </div>
  );
}

export default LogoSide;
