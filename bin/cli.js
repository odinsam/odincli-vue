#! /usr/bin/env node
import { program } from 'commander';
// const packageJsonData = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
//获取package.json的版本号
// program.version(packageJsonData.version, '--version', '输出版本号');
// program.option('-c, --C [input]', 'test custom');
//解析命令行的指令，必须要加上，不然打印不出信息
program.command('vue <projectName>', '自定制创建vue2项目');
program.parse(process.argv);
const opts = program.opts();
