const issues = [
  {
      id: 1, status: 'New', owner: 'Ravan', effort: 5,
      created: new Date('2018-08-15'), due: undefined,
      title: 'Error in console when clicking Add',
  },
  {
      id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
      created: new Date('2018-08-16'), due: new Date('2018-08-30'),
      title: 'Missing bottom border on panel',
  } 
];

const IssueFilter = () => {
    return(
        <div>
           This is a placeholder for the issue filter
        </div>
    )
}

const IssueAdd = () => {
    return(
        <div>This is a placeholder for a form to add an issue.</div>
    )
}

const IssueList = () => {
    return(
        <>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable>
            {issues.map((issue) => 
                <IssueRow issue={issue} />
            )}
            </IssueTable>
            <hr />
            <IssueAdd />
        </>
    )
}

const IssueTable = ({children}) => {
    return(
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
                {children}
            </tbody>
        </table>
    )
}

const IssueRow = ({issue}) => {
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    )
}

ReactDOM.render(<IssueList />, document.getElementById('content'))