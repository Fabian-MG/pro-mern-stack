/* eslint-disable react/prop-types */

const query = `query {
  issueList {
    id title status owner
    created effort due
} }`;

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

  const createIssue = async (issue) => {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id 
      }
    }`;
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          issue: {
            ...issue,
            due: new Date(
              new Date().getTime() + 1000 * 60 * 60 * 24 * 10
            ).toISOString(),
          },
        },
      }),
    });

    console.log(response);
    loadData();
  };

  const loadData = async () => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
      setIssues(result.data.issueList);
    } catch (error) {
      console.log(error);
    }
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

const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

const IssueRow = ({ issue }) => {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : " "}</td>
      <td>{issue.title}</td>
    </tr>
  );
};

ReactDOM.render(<IssueList />, document.getElementById("content"));
