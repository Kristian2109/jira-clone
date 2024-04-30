const RecentTasksContainer = () => {
  return (
    <div className="my-3 mx-2">
      <h6 className="mb-0">Recent Tasks</h6>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Summary</th>
            <th>Project Name</th>
            <th>Created By</th>
            <th>Created At</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default RecentTasksContainer;
