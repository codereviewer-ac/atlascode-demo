# Atlassian for VS Code

[![Atlassian license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

Stay in the flow by using Atlassian for VSCode to start work on a JIRA issue, raise and review PRs, and close out work! All directly from the IDE.


[**Download now**](https://marketplace.visualstudio.com/items?itemName=Atlassian.atlascode&ssr=false#overview)


## Usage


### Getting Started

-   Make sure you have VS Code version 1.77.0 or above
-   Download the extension from the marketplace
-   Authenticate with Jira and/or Bitbucket from the 'Atlassian: Open Settings' page available in the command palette
-   From the command palette, type 'Atlassian:' to see all of the extensions available commands

For more information, see [Getting started with VS Code](https://confluence.atlassian.com/display/BITBUCKET/Getting+started+with+VS+Code) and the related content.

**Note:** Jira Service Desk projects are not fully supported at this time.

### Features at a Glance

Here's a quick peek at a developer's workflow:

![dev workflow](https://raw.githubusercontent.com/atlassian/atlascode/main/.readme/dev-workflow.gif)

Reviewing with Bitbucket pull request features is a snap:

![review pr](https://raw.githubusercontent.com/atlassian/atlascode/main/.readme/review-pr.gif)

Got a burning issue you'd like to work on?

![start work](https://raw.githubusercontent.com/atlassian/atlascode/main/.readme/issue-start-work.gif)

Kick off your builds:

![builds](https://raw.githubusercontent.com/atlassian/atlascode/main/.readme/start-pipeline.gif)

Create that issue without breaking your stride:

![issue from todo](https://raw.githubusercontent.com/atlassian/atlascode/main/.readme/create-from-code-lens.gif)

...and lots more


## Feedback

Please use the in-app feedback form to tell us what you think! It's available from the 'Atlassian: Open Settings' and 'Atlassian: Open Welcome' pages available in the command palette.

## Installation

Running and debugging the extension:

-   Atlassian for VS Code is a node project, as such you'll need to run `npm install` before building.
-   To debug the extension from within VS Code you'll need a `launch.json`.
    ** An example `launch.json` that will be suitable for most users is included as `.vscode/launch.json.example`.
    ** To use the example file simply copy it to `launch.json`.
-   Once you have a `launch.json` file select "Debug and Run" from the Activity Bar and click "Start Debugging".
    \*\* After the extension builds VS Code will launch a new instance of itself (the Extension Development Host) running the extension.
-   When you want to test your code changes
    ** If the extension development host is still running restart by clicking ⟲ in the debug toolbar.
    ** If you've already stopped the host just start debugging again.



## Permissions

This extension requires specific permissions to integrate with Atlassian products:

### Jira Permissions
- **Browse Projects**: Required to view and access Jira projects and issues
- **Create Issues**: Needed to create new issues from VS Code
- **Edit Issues**: Required to update issue details, add comments, and transition issues
- **Assign Issues**: Needed to assign issues to team members
- **Work on Issues**: Required to log work and update issue status

### Bitbucket Permissions
- **Repository Access**: Required to view repositories, branches, and pull requests
- **Pull Request Management**: Needed to create, review, and merge pull requests
- **Pipeline Access**: Required to view and trigger build pipelines
- **Write Access**: Needed to push branches and create commits

### Authentication
The extension supports multiple authentication methods:
- **OAuth 2.0**: Recommended for Atlassian Cloud
- **Personal Access Tokens (PAT)**: For Bitbucket Server/Data Center
- **API Tokens**: For Jira Cloud with email authentication

## Local Development

### Prerequisites
- Node.js 16 or higher
- VS Code 1.77.0 or above
- Git

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/atlassian/atlascode.git
   cd atlascode
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env file with your feature flag API keys if needed
   ```

4. **Build the extension**:
   ```bash
   npm run compile
   ```

5. **Debug in VS Code**:
   - Copy `.vscode/launch.json.example` to `.vscode/launch.json`
   - Press F5 or use "Debug and Run" from the Activity Bar
   - VS Code will launch a new Extension Development Host instance

### Development Workflow
- **Hot Reload**: Use the debug toolbar ⟲ button to restart after changes
- **Testing**: Run `npm run test` for unit tests
- **Linting**: Use `npm run lint` to check code style
- **Remote Development**: Use Dev Containers for testing remote execution scenarios

## Users

### Target Audience
This extension is designed for software developers who use Atlassian tools in their workflow:

- **Individual Developers**: Working on personal or small team projects
- **Enterprise Teams**: Large organizations using Atlassian Cloud or Server products
- **DevOps Engineers**: Managing CI/CD pipelines and deployments
- **Project Managers**: Tracking work and managing team collaboration

### User Roles and Capabilities

#### Developer
- Create and manage Jira issues
- Start work on issues directly from VS Code
- Create and review pull requests
- Trigger and monitor build pipelines
- View project activity and updates

#### Team Lead/Manager
- Assign issues to team members
- Review and approve pull requests
- Monitor team progress and velocity
- Manage project workflows and transitions

#### Administrator
- Configure extension settings for teams
- Manage authentication and permissions
- Set up custom JQL queries and filters
- Configure CI/CD pipeline integrations

### Getting Started for New Users
1. Install the extension from the VS Code marketplace
2. Authenticate with your Atlassian accounts via "Atlassian: Open Settings"
3. Configure your preferred repositories and projects
4. Start using commands via Command Palette (Ctrl/Cmd+Shift+P → "Atlassian:")

## Analytics

The extension collects anonymized usage analytics to improve the user experience and guide feature development.

### Data Collection
- **Usage Metrics**: Feature usage, command execution, and user interactions
- **Performance Data**: Extension load times, operation durations, and error rates
- **Environment Info**: VS Code version, operating system, and extension version
- **Error Reporting**: Crash reports and error logs (no personal data included)

### Analytics Implementation
- Uses Atlassian's internal FX3 analytics platform
- Implements client-side analytics via `src/analytics.ts`
- Tracks events like installations, upgrades, and feature usage
- Supports feature flags for gradual rollouts and A/B testing

### Privacy and Control
- All data is anonymized and aggregated
- No personal information or code content is collected
- Users can provide feedback through in-app forms
- Analytics help prioritize bug fixes and new features

### Configuration
Analytics can be configured via environment variables:
```bash
ATLASCODE_FX3_API_KEY="your-api-key"
ATLASCODE_FX3_ENVIRONMENT="production"
ATLASCODE_FX3_TARGET_APP="atlascode_web"
```

## Monitoring

### Extension Health
The extension includes built-in monitoring capabilities to ensure reliable operation:

### Error Handling and Reporting
- **Automatic Error Capture**: Unhandled exceptions are logged and reported
- **User Feedback Integration**: In-app feedback forms for issue reporting
- **Debug Logging**: Comprehensive logging for troubleshooting issues
- **Performance Monitoring**: Tracking of operation times and resource usage

### Diagnostic Information
Available through VS Code's built-in tools:
- **Output Panel**: View extension logs via "View → Output → Atlassian"
- **Developer Tools**: Access browser dev tools for webview debugging
- **Command Palette**: Use "Developer: Reload Window" for hard resets

### Health Checks
- **Authentication Status**: Monitor connection status to Atlassian services
- **API Rate Limiting**: Automatic handling of rate limits and retries
- **Network Connectivity**: Detection of offline/online states
- **Extension Updates**: Automatic notifications for new versions

### Troubleshooting
Common monitoring and debugging steps:
1. Check VS Code's Output panel for error messages
2. Verify authentication status in extension settings
3. Test network connectivity to Atlassian services
4. Review extension logs for detailed error information
5. Use "Developer: Reload Window" to restart the extension

### Performance Metrics
- Extension activation time
- API response times for Atlassian services
- Memory usage and resource consumption
- User interaction response times

## Documentation

### Feature Flags

This package uses FX3 - Atlassian's internal solution for running experiments and rolling out features. Using it requires an API key, which is not included in code as a matter of policy.

If you are an Atlassian dev reading this - please look up the `atlascode` section [here](https://developer.atlassian.com/platform/frontend-feature-flags/resources/api-keys/), copy the value for the appropriate environment into `.env`, and rebuild the project.

If you are an external contributor - please feel free to ignore the feature gate client initialization failure, the default configuration of the extension will work without it, as if all feature gated content were disabled.

### Remote Debugging

For some tasks, it's important to be able to emulate [remote execution](https://code.visualstudio.com/docs/remote/remote-overview) of the VS Code - e.g. to reproduce or debug the behavior users observe when working in browser-based tools like Github Codespaces, or Salesforce Code Builder.

VSCode provides some very helpful [documentation](https://code.visualstudio.com/api/advanced-topics/remote-extensions#debugging-extensions) on how to test and debug extensions for that environment. In short, one would need to set up Dev Containers execution as described [here](https://code.visualstudio.com/api/advanced-topics/remote-extensions#debugging-in-a-custom-development-container).

To run `atlascode` in such a way, please follow the VSCode documentation:

-   Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VSCode Extension
-   Run `npm install` like you normally would
-   In VSCode, choose `Dev Containers: Rebuild and Reopen in Container` from the command pallette
-   Wait for the VSCode to re-open in the container evnironment - you'll be able to see the difference in the header/search bar
-   Proceed to run or debug the extension as usual - it will now be running as it would in remote execution

The configuration for the Dev Container is located in [./.devcontainer/devcontainer.json](https://github.com/atlassian/atlascode/blob/main/.devcontainer/devcontainer.json).

Note: for advanced use-cases, it is possible to run scripts in dev containers via [@devcontainers/cli](https://github.com/devcontainers/cli) - try `npx devcontainer --help`



## Tests

```
npm run test
```

## Contributions

Contributions to Atlassian for VS Code are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details. 

# Issues 

We moved from Bitbucket to Github. 

To open a new issues, please see [Github](https://github.com/atlassian/atlascode/issues)

To see old issues, please first look at [Github](https://github.com/atlassian/atlascode/issues) then at [Bitbucket](https://bitbucket.org/atlassianlabs/atlascode/issues)

**Note for Server/Data Center users:** The extension supports Jira and Bitbucket versions released in the last two years, per our [end of life policy](https://confluence.atlassian.com/x/ewAID).
You can find your instance's version in the footer of any Jira/Bitbucket page.

## License

See [LICENSE](LICENSE) file

<br/> 

[![With thanks from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-with-thanks-light.png)](https://www.atlassian.com)
