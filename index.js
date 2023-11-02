const http = require('http');
const os = require('os');
const port = 3000;
const config = require('./config.json');
let nodeStartTime = Date.now();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');
});

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log(`Node.js version: ${process.version}`);
    
    setInterval(() => {
        displaySystemInfo();
    }, config.interval);
});

function displaySystemInfo() {
    const cpuInfo = os.cpus()[0];
    const totalCpuTime = Object.values(cpuInfo.times).reduce((acc, val) => acc + val);
    const cpuUsage = (cpuInfo.times.user + cpuInfo.times.sys) / totalCpuTime;
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const systemUptime = os.uptime();
    const nodeUptime = (Date.now() - nodeStartTime) / 1000;
    console.log('System Info');
    if (config.display.cpuUsage) {
    console.log(`CPU Usage: ${(cpuUsage * 100).toFixed(2)}%`);
    }
    if (config.display.memoryUsage) {
    console.log(`Memory Usage: ${(usedMemory / totalMemory * 100).toFixed(2)}%`);
    }
    if (config.display.systemUptime) {
    console.log(`System Uptime: ${systemUptime.toFixed(2)} seconds`);
    }
    if (config.display.nodeUptime) {
    console.log(`Node.js Uptime: ${nodeUptime.toFixed(2)} seconds`);
    }
}
