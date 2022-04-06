const TestRail = require("testrail");

const dotenv = require("dotenv");
const fs = require("fs");
const stripAnsi = require("strip-ansi");

let envFile = null;
try {
  envFile = fs.readFileSync(".env");
} catch (error) {
  console.error("You don't have an .env file!\n", error);
  process.exit(1);
}

const config = dotenv.parse(envFile);

const api = new TestRail({
  host: config.NETWORK_URL,
  user: config.USERNAME,
  password: config.PASSWORD
});

class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this.caseids = [];
    this.testRailResults = [];
  }

  async createRun(projectId, suiteId) {
    let now = new Date();

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };

    const suite = await api.getSuite(suiteId);
    let name = `${suite.name} - ${now.toLocaleString(
      ["en-GB"],
      options
    )} - (Automated test run)`;

    api
      .addRun(projectId, {
        suite_id: suiteId,
        name: name,
        include_all: false,
        case_ids: this.caseids
      })
      .then(r => {
        console.log("Created new test run: " + name);
        api
          .addResultsForCases(r.id, { results: this.testRailResults })
          .then(() => {
            console.log("Added test results");
          })
          .catch(error => {
            console.log(error.message || error);
          });
      })
      .catch(error => {
        console.log(error.message || error);
      });
  }

  onRunComplete(contexts, results) {
    const specResults = results.testResults;
    for (let j = 0; j < specResults.length; j++) {
      const itResults = specResults[j].testResults;
      for (let i = 0; i < itResults.length; i++) {
        const result = itResults[i];
        const id = result.title.split(":")[0];
        this.caseids.push(parseInt(id, 10));
        switch (result.status) {
          case "pending":
            this.testRailResults.push({
              case_id: parseInt(id, 10),
              status_id: 2,
              comment: "Intentionally skipped (xit)."
            });
            break;

          case "failed":
            this.testRailResults.push({
              case_id: parseInt(id, 10),
              status_id: 5,
              comment: stripAnsi(result.failureMessages[0])
            });
            break;

          case "passed":
            this.testRailResults.push({
              case_id: parseInt(id, 10),
              status_id: 1,
              comment: "Test passed successfully."
            });
            break;

          default:
            // unknown status
            break;
        }
      }
    }
    this.createRun(this._options.project_id, this._options.suite_id);
  }
}

module.exports = Reporter;
