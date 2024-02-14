# installr 📦

[![GitHub Release](https://img.shields.io/github/release/maxam2017/installr.svg)](https://github.com/maxam2017/installr/releases)
[![CI](https://github.com/maxam2017/installr/actions/workflows/ci.yml/badge.svg)](https://github.com/maxam2017/installr/actions/workflows/ci.yml)
[![Language](https://img.shields.io/badge/language-typescript-blue?style)]()
[![Lincense](https://img.shields.io/github/license/maxam2017/productive-box)]()

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
