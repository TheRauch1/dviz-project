# How to use and run this project
## Usage
### Docker
A local version of this project can be spun up with Docker. Run following command:
```bash
docker run -d -p 4173:4173 --name dviz-project therauch1/dviz
```
The project then can be accessed through http://localhost:4173

### NodeJS run
The code can also be run through NodeJS. Install NodeJS and run following commands in the project folder.

```bash
npm install

npm run dev
```

## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

# Data sources
The data used in this project came from the [owid/energy-data](https://github.com/owid/energy-data) project.