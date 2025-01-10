# Project Packer

A utility script to pack your project's code into a single file (`project-pack.txt`) in an AI-friendly format. The script recursively scans directories, collects file contents, and writes them to an output file while excluding specified files or directories.

---

## Features
- Recursively scans directories for files.
- Packs file contents into a single output file (`project-pack.txt`).
- Excludes unnecessary files like `node_modules`, `build`, `.log`, and `tmp`.
- Easily configurable exclusion patterns.

---

## Setup and Usage

### Node.js Version

#### Prerequisites
- Ensure **Node.js** (v14+) is installed.

#### Setup
1. Save the Node.js version of the script as `packer.js` in your project root directory.
2. Modify the `excludePatterns` array in the script if you need to exclude additional files or directories.

#### React Version

Ensure Node.js (v14+) is installed.
Place the script outside the src folder of your React project.

example:
node src/packer.js src/pages src/components src/utils


Output Example:
=== FILE: /path/to/src/pages/Home.js ===
// Contents of Home.js

=== FILE: /path/to/src/components/Header.js ===
// Contents of Header.js

=== FILE: /path/to/src/utils/api.js ===
// Contents of api.js


#### Usage
Run the script with the following command:
```bash
node packer.js <directory1> <directory2> ...

example:
node packer.js controllers routes utils app.js



