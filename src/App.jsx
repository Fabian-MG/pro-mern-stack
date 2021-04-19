/* eslint-disable react/prop-types */
const initialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2018-08-30"),
    title: "Missing bottom border on panel",
  },
];

const IssueFilter = () => {
  return <div>This is a placeholder for the issue filter</div>;
};

const IssueAdd = ({ createIssue }) => {
  const initialState = { owner: "", title: "" };
  const [issueForm, setIssueForm] = React.useState(initialState);
  const { owner, title } = issueForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIssueForm({ ...issueForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createIssue(issueForm);
    setIssueForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="owner"
        value={owner}
        onChange={handleChange}
        placeholder="Owner"
      />
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <button type="submit">Add Issue</button>
    </form>
  );
};

const IssueList = () => {
  const [issues, setIssues] = React.useState([]);

  const createIssue = (issue) => {
    const newIssueList = [...issues];
    newIssueList.push({
      ...issue,
      id: issues.length + 1,
      created: new Date(),
    });
    setIssues(newIssueList);
  };

  const loadData = () => {
    setTimeout(() => {
      setIssues(initialIssues);
    }, 500);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd createIssue={createIssue} />
    </>
  );
};

const IssueTable = ({ issues }) => {
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
};

const IssueRow = ({ issue }) => {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ""}</td>
      <td>{issue.title}</td>
    </tr>
  );
};

ReactDOM.render(<IssueList />, document.getElementById("content"));
