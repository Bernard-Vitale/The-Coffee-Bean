import coffeBeanFilled from "../assets/images/coffeeBeanBrown.png";
import coffeeBeanEmpty from "../assets/images/coffeeBeanWhite.png";

const RoastLevel = ({ level }) => {
  return (
    <div className="roastLevelContainer homeItemCardText">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>
          {index < level ? (
            <img className="roastLevelBeanImg" src={coffeBeanFilled} alt="Filled Coffee Bean" />
          ) : (
            <img className="roastLevelBeanImg" src={coffeeBeanEmpty} alt="Not Filled Coffee Bean" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RoastLevel;
