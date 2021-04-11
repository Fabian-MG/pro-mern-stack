"use strict";

/* eslint-disable react/prop-types */
var issues = [{
  id: 1,
  status: "New",
  owner: "Ravan",
  effort: 5,
  created: new Date("2018-08-15"),
  due: undefined,
  title: "Error in console when clicking Add"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  effort: 14,
  created: new Date("2018-08-16"),
  due: new Date("2018-08-30"),
  title: "Missing bottom border on panel"
}];

var IssueFilter = function IssueFilter() {
  return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issue filter");
};

var IssueAdd = function IssueAdd() {
  return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for a form to add an issue.");
};

var IssueList = function IssueList() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null, issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      issue: issue,
      key: issue.id
    });
  })), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null));
};

var IssueTable = function IssueTable(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, children));
};

var IssueRow = function IssueRow(_ref2) {
  var issue = _ref2.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ""), /*#__PURE__*/React.createElement("td", null, issue.title));
};

ReactDOM.render( /*#__PURE__*/React.createElement(IssueList, null), document.getElementById("content"));