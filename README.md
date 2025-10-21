[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="top"></a>

# dev-gas-extension

<a name="abstract"></a>

# Description

Introducing "dev-gas-extension," a Gemini CLI extension designed to supercharge your Google Apps Script (GAS) development. This tool streamlines your entire workflow by integrating GAS with VSCode. It allows you to generate, test, and deploy scripts using natural language prompts within a unified environment. A key feature is the "fake sandbox," which provides a secure local environment for safely testing AI-generated code before deployment. With custom commands to automate tasks like creating, cloning, and updating projects, this extension significantly enhances efficiency and productivity for GAS developers.

# How to install dev-gas-extension

## 1. Install Gemini CLI

First, install the Gemini CLI using npm:

```bash
npm install -g @google/gemini-cli
```

Next, you will need to authorize the CLI. Follow the instructions provided in the [official documentation](https://github.com/google-gemini/gemini-cli?tab=readme-ov-file#-authentication-options).

## 2. Install Clasp

Install Clasp, the command-line tool for Google Apps Script:

```bash
npm install -g @google/clasp
```

Authorize Clasp by following the instructions on the [official GitHub repository](https://github.com/google/clasp?tab=readme-ov-file#authorization).

Clasp can now be used as an MCP server. While you can configure it directly in your `settings.json`, the Gemini CLI Extension in this guide will handle this for you.

## 3. Install gas-fakes

The `gas-fakes` package is required for local testing and should be installed in your working directory.

**1. Create a working directory**

```bash
makedir sample
cd sample
```

In this article, this working directory is used.

**2. Install gas-fakes**

```bash
npm install @mcpher/gas-fakes
```

**3. Authorization**

You can see how to authorize at [https://github.com/brucemcpherson/gas-fakes/blob/main/GETTING_STARTED.md](https://github.com/brucemcpherson/gas-fakes/blob/main/GETTING_STARTED.md).

## 4. Install dev-gas-extension

Install the Gemini CLI extension for GAS development:

```bash
gemini extensions install https://github.com/tanaikech/dev-gas-extension
```

For managing Google Workspace as well, you can install the [ToolsForMCPServer-extension](https://github.com/tanaikech/ToolsForMCPServer-extension).

## 5. Testing the Installation

This extension can be used both on the terminal with and without VSCode.

**1. Launch Gemini CLI**

Launch the Gemini CLI from the VSCode terminal:

```bash
gemini
```

**2. Verify the installed MCP servers with the following command in the Gemini CLI:**

```
/mcp
```

When `dev-gas-extension` could be correctly installed, the following response can be seen.

```text
Configured MCP servers:

🟢 gas-fakes-mcp (from dev-gas-extension) - Ready (1 tool)
  Tools:
  - run_gas_with_gas-fakes

🟢 clasp (from dev-gas-extension) - Ready (5 tools)
  Tools:
  - clone_project
  - create_project
  - list_projects
  - pull_files
  - push_files

🟢 workspace-developer (from dev-gas-extension) - Ready (2 tools)
  Tools:
  - fetch_workspace_docs
  - search_workspace_docs
```

The `workspace-developer` tool is from the [Use Large Language Models (LLMs) to develop on Google Workspace](https://developers.google.com/workspace/guides/build-with-llms) guide.

# Sample prompts

The sample prompts using the tools of this MCP server are as follows.

- []()

---

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

[Donate](https://tanaikech.github.io/donate/)

<a name="updatehistory"></a>

# Update History

- v1.0.0 (October 21, 2025)

  1. Initial release.

[TOP](#top)
