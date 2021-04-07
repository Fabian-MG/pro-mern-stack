const IssueList = () => {
    const rowStyle = {border: "1px solid silver", padding: 4};

    return(
        <>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable>
                <IssueRow rowStyle={rowStyle} issue_id={1}
                    issue_title="Error in console when clicking Add" />
                <IssueRow rowStyle={rowStyle} issue_id={2}
                    issue_title="Missing bottom border on panel" />
            </IssueTable>
            <hr />
            <IssueAdd />
        </>
    )
}

const IssueFilter = () => {
    return(
        <div>
           This is a placeholder for the issue filter
        </div>
    )
}

const IssueTable = ({children}) => {
    const rowStyle = {border: "1px solid silver", padding: 4};

    return(
        <table style={{borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th style={rowStyle}>ID</th>
                    <th style={rowStyle}>Title</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

const IssueAdd = () => {
    return(
        <div>This is a placeholder for a form to add an issue.</div>
    )
}

const IssueRow = ({issueID, issueTitle, rowStyle}) => {
    return (
        <tr>
            <td style={rowStyle}>{issueID}</td>
            <td style={rowStyle}>{issueTitle}</td>
        </tr>
    )
}

ReactDOM.render(<IssueList />, document.getElementById('content'))