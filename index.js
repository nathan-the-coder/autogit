const { program } = require('commander');
const axios = require('axios');
const { execSync } = require('child_process'); // Import the child_process module

program
  .version('1.0.0')
  .command('search <keyword>')
  .description('Search repositories based on a keyword')
  .action(keyword => {
    // Call a function to handle the search logic
    handleSearch(keyword);
  });


program.parse(process.argv);

async function handleSearch(keyword) {
  try {
    const apiUrl = `https://api.github.com/search/repositories?q=topic:${keyword}`;
    const response = await axios.get(apiUrl);

    const repositories = response.data.items;
    if (repositories.length === 0) {
      console.log('No repositories found for the given keyword.');
      return;
    }

    // Extract repository names
    const repositoryNames = repositories.map(repo => repo.full_name);

    // Use FZF to display and select repositories
    const selectedRepo = execSync(`echo "${repositoryNames.join('\n')}" | fzf`, {
      encoding: 'utf-8',
      stdio: 'inherit', // This will allow FZF to interact with the terminal
    });

    // Show selected repository
    console.log(`You selected: ${selectedRepo}`);
  } catch (error) {
    console.error('An error occurred while fetching repositories:', error.message);
  }
}
