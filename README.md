# README

This repository demonstrates compiling a Go program to WebAssembly with TinyGo and serving it locally for testing.

## Prerequisites

1. Install [TinyGo](https://tinygo.org/getting-started/install/).
2. Install [goexec](https://github.com/shurcooL/goexec) (optional for quick local hosting).

## Building the WebAssembly Module

Run the following commands in your project’s root directory:

1. Compile the Go code to a WebAssembly module:
   ```
   GOOS=js GOARCH=wasm tinygo build -target wasm -no-debug -o main.wasm
   ```

2. Copy the TinyGo-specific wasm_exec.js file into your working directory:
   ```
   cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .
   ```

## Serving Locally

Use goexec to start a simple file server on port 8080:

```
goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir(".")))'
```

Then open your browser and navigate to:

```
http://localhost:8080
```

You should see your WebAssembly module (main.wasm) and wasm_exec.js file available to the browser. You can load them in an HTML page to execute your Go functions in WebAssembly.
