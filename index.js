const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.

const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
	try {
		const response = await fetch(wasmModuleUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch WASM: ${response.statusText}`);
		}
		const buffer = await response.arrayBuffer();
		const wasmInstance = await WebAssembly.instantiate(buffer, importObject);
		return wasmInstance;
	} catch (error) {
		console.error("Error instantiating WASM module:", error);
		throw error;
	}
};

const runWasm = async () => {
	try {
		// Cache instance.exports for better performance
		const wasmModule = await wasmBrowserInstantiate(
			"./main.wasm",
			go.importObject,
		);
		const exports = wasmModule.instance.exports;

		// Allow the wasm_exec go instance, bootstrap and execute our wasm module
		go.run(wasmModule.instance);

		// Get all exported functions
		console.log("Available exports:", Object.keys(exports));

		// Group related calculations for better readability
		// Basic arithmetic
		console.log("Basic arithmetic:");
		console.log("5 * 3 =", exports.multiply(5, 3));
		console.log("10 / 2 =", exports.divide(10, 2));
		console.log("4 + 6 =", exports.add(4, 6));
		console.log("9 - 4 =", exports.subtract(9, 4));

		// Advanced operations
		console.log("\nAdvanced operations:");
		console.log("2^3 =", exports.power(2, 3));
		console.log("5! =", exports.factorial(5));
	} catch (error) {
		console.error("Failed to run WASM:", error);
	}
};

runWasm().catch(console.error);
