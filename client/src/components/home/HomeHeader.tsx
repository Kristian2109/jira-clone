import { faJira } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/* eslint-disable jsx-a11y/anchor-is-valid */
export const HomeHeader = () => {
    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <FontAwesomeIcon icon={faJira.iconName} />
                    Jira Work Management
                </a>
            </div>
        </nav>
    )
}