import fs from 'fs';
import path from 'path';

// Files and directories to exclude
const excludePatterns = [/node_modules/, /build/, /\.log$/, /tmp/];

// Output file
const outputFile = 'project-pack.txt';

// Helper function to check if a file/directory should be excluded
function shouldExclude(filePath) {
    return excludePatterns.some((pattern) => pattern.test(filePath));
}

// Helper function to pack a directory recursively
function packDirectory(dirPath, collectedFiles = []) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach((entry) => {
        const entryPath = path.join(dirPath, entry.name);

        if (shouldExclude(entryPath)) return;

        if (entry.isDirectory()) {
            packDirectory(entryPath, collectedFiles);
        } else {
            collectedFiles.push(entryPath);
        }
    });

    return collectedFiles;
}

// Main function to pack the project
function packProject(directories) {
    let outputContent = '';

    directories.forEach((dir) => {
        const dirPath = path.resolve(dir);

        if (!fs.existsSync(dirPath)) {
            console.error(`Directory not found: ${dir}`);
            return;
        }

        if (fs.statSync(dirPath).isDirectory()) {
            console.log(`Packing directory: ${dirPath}`);
            const files = packDirectory(dirPath);
            files.forEach((file) => {
                outputContent += `\n=== FILE: ${file} ===\n`;
                outputContent += fs.readFileSync(file, 'utf-8');
            });
        } else {
            console.error(`Skipping non-directory path: ${dirPath}`);
        }
    });

    // Write the output to a file
    fs.writeFileSync(outputFile, outputContent);
    console.log(`Project packed successfully into ${outputFile}`);
}

// Entry point
function main() {
    const args = process.argv.slice(2); // Get directories from the command line arguments

    if (args.length === 0) {
        console.error('Please specify directories to include.');
        console.error('Usage: node packer.js <directory1> <directory2> ...');
        process.exit(1);
    }

    packProject(args);
}

main();
