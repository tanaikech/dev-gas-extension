import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { exec } from "child_process";
import fs from "fs/promises";
import { setTimeout } from "node:timers/promises";
import { promisify } from "util";
import { z } from "zod";

const server = new McpServer({
  name: "MCP server for gas-fakes",
  version: "0.0.3",
});

const execAsync = promisify(exec);

const tools = [
  {
    name: "run_gas_with_gas-fakes",
    schema: {
      description: [
        `Use this for the following situations.`,
        `- You are required to safely execute a script of Google Apps Script in a sandbox using gas-fakes.`,
        `- You are required to process tasks that cannot be achieved with other tools, and you can generate a Google Apps Script to achieve the tasks, and safely execute it in a sandbox using gas-fakes.`,
        `- You are required to process tasks that cannot be achieved with other tools, and a Google Apps Script to achieve the tasks is provided from a prompt or other tools, and safely execute it in a sandbox using gas-fakes.`,
        `- When you received not to use this tool from a prompt or a tool response, don't use this tool.`,
      ].join("\n"),
      inputSchema: {
        gas_script: z
          .string()
          .describe(
            `Provide a Google Apps Script. The Google Apps Script is the generated script or the script provided by a prompt. When you put the script in a function like \`function sample() { script }\`, it is required to add \`sample();\` to run the function. When you directly put the script, the script can be run. If an error occurs, modify the script by referring to StackOverflow again.`
          ),
        whitelistItems: z
          .array(z.string().describe(`File ID of file on Google Drive`))
          .describe(
            `Use this to access the existing files on Google Drive. Provide the file IDs of the files on Google Drive as an array. When this is used, the property "sandbox" is required to be true. The default is no items in an array.`
          )
          .optional(),
        sandbox: z
          .boolean()
          .describe(
            `The default is true. When this is true, the script is run with the sandbox. When this is false, the script is run without the sandbox.`
          ),
      },
    },
    func: async (object = {}) => {
      const { sandbox = true, whitelistItems = [], gas_script } = object;
      const importFile = "./sample_gas.mjs";

      function getImportScript() {
        const importScriptAr = [`import "@mcpher/gas-fakes/main.js"`, ""];
        if (whitelistItems.length === 0) {
          importScriptAr.push(
            sandbox ? `ScriptApp.__behavior.sandBoxMode = true;` : "",
            `\n\n${gas_script}\n\n`,
            sandbox ? `ScriptApp.__behavior.trash();` : ""
          );
        } else {
          const wl = whitelistItems
            .map((id) => `behavior.newIdWhitelistItem("${id}").setWrite(true)`)
            .join(",");
          importScriptAr.push(
            `const behavior = ScriptApp.__behavior;`,
            `behavior.sandboxMode = true;`,
            `behavior.strictSandbox = true;`,
            `behavior.setIdWhitelist([${wl}]);`,
            `\n\n${gas_script}\n\n`,
            `ScriptApp.__behavior.trash();`
          );
        }
        return importScriptAr.join("\n");
      }

      try {
        const importScript = getImportScript();
        await fs.writeFile(importFile, importScript);
        await setTimeout(500);

        const { stdout } = await execAsync(`node ./${importFile}`);
        return {
          content: [{ type: "text", text: stdout || "Done." }],
          isError: false,
        };
      } catch (err) {
        return {
          content: [{ type: "text", text: err.message }],
          isError: true,
        };
      } finally {
        try {
          await fs.unlink(importFile);
        } catch (err) {
          return {
            content: [{ type: "text", text: err.message }],
            isError: true,
          };
        }
      }
    },
  },
];

for (let { name, schema, func } of tools) {
  server.registerTool(name, schema, func);
}

const transport = new StdioServerTransport();
await server.connect(transport);
