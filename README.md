<p align="center">
  <h1 align="center">> installr</h1>
  <p align="center">
    <img src="https://github.com/maxam2017/installr/assets/25841814/1c1c0f3b-edf1-4673-a2d0-981b260d9249" alt="installr logo" width="200">
  </p>
</p>

<p align="center">
  <a href="https://github.com/maxam2017/installr/releases"><img src="https://img.shields.io/github/release/maxam2017/installr.svg" alt="GitHub Release"></a>
  <a href="https://github.com/maxam2017/installr/actions/workflows/ci.yml"><img src="https://github.com/maxam2017/installr/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href=""><img src="https://img.shields.io/badge/language-typescript-blue?style" alt="Language"></a>
  <a href=""><img src="https://img.shields.io/github/license/maxam2017/productive-box" alt="Lincense"></a>
</p>


installr is a performant package installation tool designed to simplify the process of managing and installing packages while automatically resolving dependencies.

It currently supports on macOS 🍎 only.

## What's included

- 🤖 **Automated Installation**: installr automatically installs specified packages and resolves their dependencies, ensuring that packages are installed in the correct order.

- ⚡️ **Performant Installation**: installr is designed to be fast and efficient, installing packages in parallel to minimize installation time.

- 🧾 **Simple Configuration**: Define your packages and their dependencies in a JSON or YAML configuration file.

## Installation

No dependencies required. Just download the latest binary from the [releases page](https://github.com/maxam2017/installr/releases).

After downloading the binary, make it executable by running the following command:

```bash
chmod +x installr
```

If you want to use installr from anywhere, move it to a directory in your PATH, such as `/usr/local/bin`:

```bash
mv installr /usr/local/bin
```

## Usage
Create a configuration file (config.json or config.yaml) with a list of packages and their dependencies. For example:

```json
{
  "packages": [
    {
      "name": "packageA",
      "installScript": ["npm install -g packageA"],
      "dependencies": ["packageB", "packageC"]
    },
    {
      "name": "packageB",
      "installScript": ["npm install -g packageB"]
    },
    {
      "name": "packageC",
      "installScript": ["npm install -g packageC"],
    }
  ]
}
```

Run installr with your configuration file:

```bash
installr config.json
```

installr will automatically install the specified packages and handle dependencies. (In this example, packageB and packageC will be installed before packageA.)

For more details about the configuration file, see the [schema.json file](assets/schema.json).

## Options

- **-h**, **--help**: Show help message.

## License

Distributed under the MIT License - see `LICENSE` file for detail.
