module.exports = {
  apps: [
    {name: 'server',script: 'dist/server.js',args: 'startServer',cwd:"",instances:4,exec_mode:"cluster","watch":false}
  ]
};