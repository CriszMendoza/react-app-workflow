const core = require("@actions/core");
const github = require("@actions/github");

//  curl --request POST \
//    --url https://api.github.com/repos/${{ github.repository }}/issues \
//    --header 'authorization: Bearer ${{ secrets.GITHUB_TOKEN }}' \
//    --data '{
//      "title": "Automated issue for commit: ${{ github.sha }}",
//      "body": "THis issue was automatically created by the Github Action workflow **${{ github.workflow}}**. \n\n The commit hash was: ${{ github.sha }}_.",
//      "assignees": ["${{ github.event.pull_request.user.login }}"]
//      }'

try {
  const token = core.getInput("token");
  const title = core.getInput("title");
  const body = core.getInput("body");
  const assignees = core.getInput("assignees").split(" ") || undefined;

  const octokit = new github.getOctokit(token);

  const response = octokit.issues.create({
    ...github.context.repo,
    title,
    body,
    assignees,
  });

  core.setOutput("issue", JSON.stringify(response.data));
} catch (error) {
  core.setFailed(error.message);
}
