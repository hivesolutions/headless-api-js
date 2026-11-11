# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* More TypeScript description of types
* Documentation of the usage of the client - [#4](https://github.com/hivesolutions/headless-api-js/issues/4)

### Changed

* Tests run on Node.js 16 to 26 and on Bun

### Fixed

* Issue with the example script pointing to a missing file
* Issue with the contents posted to Headless being lost in the redirect to its secure address - [#4](https://github.com/hivesolutions/headless-api-js/issues/4)
* Issue with the headers of a request being discarded when built without parameters
