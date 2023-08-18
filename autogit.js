import { program } from 'commander';
import axios from 'axios';
import inquirer from 'inquirer';
import { spawnSync } from 'child_process'; // Import the child_process module

program.version('1.0.0');

// Search and Open Command
program
  .command('search-open <keyword>')
  .description('Search repositories based on a keyword and open the selected repository in the browser')
  .action(keyword => {
    handleSearchAndOpen(keyword);
  });

// Search and Clone Command
program
  .command('search-clone <keyword>')
  .description('Search repositories based on a keyword and clone the selected repository')
  .action(keyword => {
    handleSearchAndClone(keyword);
  });

program.parse(process.argv);

async function handleSearchAndOpen(keyword) {
  try {
    const apiUrl = `https://api.github.com/search/repositories?q=topic:${keyword}`;
    const response = await axios.get(apiUrl);

    const repositories = response.data.items;
    if (repositories.length === 0) {
      console.log('No repositories found for the given keyword.');
      return;
    }

    // Extract repository URLs
    const repositoryUrls = repositories.map(repo => repo.html_url);

    // Use Inquirer.js to create an interactive list prompt
    const selectedRepoUrl = await inquirer.prompt([
      {
        type: 'list',
        name: 'repositoryUrl',
        message: 'Select a repository to open:',
        choices: repositoryUrls,
      },
    ]);

    // Open repository URL in default browser
    const openCommand = `open "${selectedRepoUrl.repositoryUrl}"`; // Adjust for different platforms
    spawnSync(openCommand, {
      stdio: 'inherit',
      shell: true,
    });
  } catch (error) {
    console.error('An error occurred while fetching repositories:', error.message);
  }
}


async function handleSearchAndClone(keyword) {
  try {
    const apiUrl = `https://api.github.com/search/repositories?q=topic:${keyword}`;
    const response = await axios.get(apiUrl);

    const repositories = response.data.items;
    if (repositories.length === 0) {
      console.log('No repositories found for the given keyword.');
      return;
    }

    // Extract repository names and URLs
    const repositoryChoices = repositories.map(repo => ({
      name: repo.full_name,
      value: repo.clone_url, // Store clone URL as the value
    }));

    // Use Inquirer.js to create an interactive list prompt
    const selectedRepo = await inquirer.prompt([
      {
        type: 'list',
        name: 'repository',
        message: 'Select a repository to clone:',
        choices: repositoryChoices,
      },
    ]);

    // Run git clone command
    const cloneCommand = `git clone ${selectedRepo.repository}`;
    const cloneProcess = spawnSync(cloneCommand, {
      stdio: 'inherit',
      shell: true,
    });

    if (cloneProcess.error) {
      console.error('An error occurred while cloning the repository:', cloneProcess.error.message);
    } else {
      console.log('Repository cloned successfully!');
    }
  } catch (error) {
    console.error('An error occurred while fetching repositories:', error.message);
  }
}

