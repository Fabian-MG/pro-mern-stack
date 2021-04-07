"use strict";

var IssueList = function IssueList() {
  var rowStyle = {
    border: "1px solid silver",
    padding: 4
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null, /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    issue_id: 1,
    issue_title: "Error in console when clicking Add"
  }), /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    issue_id: 2,
    issue_title: "Missing bottom border on panel"
  })), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null));
};

var IssueFilter = function IssueFilter() {
  return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issue filter");
};

var IssueTable = function IssueTable(_ref) {
  var children = _ref.children;
  var rowStyle = {
    border: "1px solid silver",
    padding: 4
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Title"))), /*#__PURE__*/React.createElement("tbody", null, children));
};

var IssueAdd = function IssueAdd() {
  return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for a form to add an issue.");
};

var IssueRow = function IssueRow(_ref2) {
  var issue_id = _ref2.issue_id,
      issue_title = _ref2.issue_title,
      rowStyle = _ref2.rowStyle;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, issue_id), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, issue_title));
};

ReactDOM.render( /*#__PURE__*/React.createElement(IssueList, null), document.getElementById('content'));