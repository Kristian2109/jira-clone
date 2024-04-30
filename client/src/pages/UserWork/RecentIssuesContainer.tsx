import { Await, useLoaderData } from "react-router";
import { WorkPageLoaderType } from ".";
import { Suspense } from "react";
import { Issue } from "../../types/project";
import RecentIssuesTable from "./RecentIssuesTable";

const RecentTasksContainer = () => {
  const { userIssues } = useLoaderData() as WorkPageLoaderType;

  return (
    <div className="my-4">
      <h6>Recent Issues</h6>
      <hr className="my-2"></hr>
      <Suspense fallback={<p>Loading Issues</p>}>
        <Await
          resolve={userIssues}
          errorElement={<p>Error while loading issues.</p>}
        >
          {(issues: Issue[]) =>
            issues.length === 0 ? (
              <p>No issues Created by You</p>
            ) : (
              <RecentIssuesTable issues={issues} />
            )
          }
        </Await>
      </Suspense>
    </div>
  );
};

export default RecentTasksContainer;
