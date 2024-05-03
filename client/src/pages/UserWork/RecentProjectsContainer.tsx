import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ProjectType } from "../../types/project";
import { WorkPageLoaderType } from ".";
import RecentProject from "./RecentProject";
import { Link } from "react-router-dom";

const RecentProjectsContainer: FC = () => {
  const { userProjects } = useLoaderData() as WorkPageLoaderType;

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <h6 className="mb-0">Recent Projects</h6>
        <Link
          className="link-underline-opacity-0 link-underline-opacity-75-hover"
          to="/create-project"
        >
          Create Project
        </Link>
      </div>
      <hr className="mt-2 mb-3"></hr>
      <div className="d-flex">
        <Suspense fallback={<p>Loading Projects</p>}>
          <Await
            resolve={userProjects}
            errorElement={<p>Error while loading projects.</p>}
          >
            {(projects: ProjectType[]) =>
              projects.length === 0 ? (
                <p>You don't have projects</p>
              ) : (
                projects.slice(0, 5).map((project: ProjectType) => {
                  return <RecentProject key={project.id} project={project} />;
                })
              )
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default RecentProjectsContainer;
