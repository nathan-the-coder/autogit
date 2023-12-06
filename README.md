# Autogit CLI

Autogit is a command-line tool that allows you to interact with GitHub repositories using various commands.

## Installation

1. Clone this repository:
```sh
git clone https://github.com/nathan-the-coder/autogit-cli
```

2. Navigate to the project directory:
```sh
cd autogit-cli
```
3. Install dependencies:
```sh
npm install
```

## Usage

### Search and Open a Repository

Search for repositories based on a keyword and open the selected repository in your default browser:
```sh 
npm start search-open <keyword> # or ./autogit -so <keyword>
```

Replace `<keyword>` with the tag or keyword you want to search for. After selecting a repository, it will be opened in your browser.

### Search and Clone a Repository

Search for repositories based on a keyword and clone the selected repository to your local machine:
```sh
npm start search-clone <keyword> # or ./autogit -sc <keyword>
```


Replace `<keyword>` with the tag or keyword you want to search for. After selecting a repository, it will be cloned to your current working directory.

## Examples

Search for repositories related to Node.js and open the selected repository in the browser:
```sh
npm start search-open nodejs # or ./autogit -so nodejs
```


Search for repositories related to Python and clone the selected repository:
```sh 
npm start search-clone python # or ./autogit -sc python
```

## Additional Info

### Use autogit anywhere in terminal 

Add [autogit](./autogit) to the PATH in shell config on Linux
```sh 
fish_add_path <autogit folder> # For Fish shell 
export PATH="<autogit folder>:$PATH" # For bash and zsh shell
```
Replace the `<autogit folder>` placeholder with the folder containing the autogit.js file

> In Windows, just go to "Settings > About > Advance System Settings > Environment Variables"
> and Create a new environment variable for the current user/system
> and put in the prompt the folder that contains the autogit.js file

## Contributing

Contributions are welcome! If you have ideas for improvements, bug fixes, or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

