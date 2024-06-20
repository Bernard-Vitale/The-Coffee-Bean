import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="notFoundDiv">
      <h1>Error 404: Page Not Found</h1>
      <Link to="/" className="button">
        <button className="linkButton">Go to the home page</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
