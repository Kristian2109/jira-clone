import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="container-fluid px-0">
      <div className="py-4">
        <div className="row">
          <div className="col col-lg-6 col-sm-12">
            <h5>Jira Work Management</h5>
            <p>
              Jira Work Management helps people organize projects and get the
              things done
            </p>
          </div>
          <div className="col col-lg-6 col-sm-12">
            <h5>Contacts</h5>
            <div className="text-start">
              <p className="my-1">
                Phone:
                <a href="tel:0884440155" className="grey-text text-lighten-3">
                  0884440155
                </a>
              </p>
              <p className="my-1">
                Email:
                <a
                  href="mailto:kristian.petrov1998@gmail.com"
                  className="grey-text text-lighten-3"
                >
                  kristian.petrov1998@gmail.com
                </a>
              </p>
              <p className="my-1">
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.linkedin.com/in/kristian-petrov-39186a235/"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright mb-0 py-2">
        <div className="container center">© Jira Work Management 2024</div>
      </div>
    </footer>
  );
};
