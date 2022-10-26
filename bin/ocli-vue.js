#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import inq from 'inquirer';
import handlebars from 'handlebars';
import ora from 'ora';
import download from 'download-git-repo';
import myChalk from '../utils/chalk.js';
program.description('ocli vue <projectName>');
program.parse();
if (program.args.length != 1) {
    console.log('缺少projectName，请参见帮助 -h | --help');
} else {
    inq.prompt([
        {
            type: 'list',
            message: '选择vue版本',
            name: 'vueVersion',
            choices: ['vue2', 'vue3'],
            filter: function (val) {
                // 使用filter将回答变为小写
                return val.toLowerCase();
            }
        }
    ]).then((v_a) => {
        if (v_a['vueVersion'] === 'vue2') {
            // console.log('program.args');
            const spinner = ora('模板下载中……');
            const projectName = program.args[0];
            // 存储模板地址
            const templates = {
                v3ct_pinia_less: {
                    // 仓库地址
                    url: 'https://github.com/odinsam/v2ct_vuex_less.git',
                    // 仓库下载地址，格式为：仓库地址:用户名/仓库名#分支名
                    downloadUrl: 'github:odinsam/v2ct_vuex_less#master',
                    description:
                        'vue2 + js + vuex + router + less + nanoid + pubsub-js'
                }
            };
            // const loading = ora('模板下载中...');
            spinner.start();
            // 使用 download-git-repo 下载模板
            download(
                // 下载目标，格式为：仓库地址:用户名/仓库名字#分支
                templates['v3ct_pinia_less'].downloadUrl,
                // 下载完成后的项目名称，也就是文件夹名
                projectName,
                {
                    // 以克隆形式下载
                    clone: true
                },
                // 下载结束后的回调
                (err) => {
                    // 如果错误回调不存在，就表示下载成功了
                    if (err) {
                        // 调用 ora 下载失败方法，进行提示
                        spinner.fail(`下载失败！${err}`);
                        return;
                    } else {
                        myChalk['green']('下载成功！');
                        spinner.succeed();
                        // spinner.succeed('下载成功！');
                        // 把采集到的用户数据解析替换到 package.json 文件中
                        // 保存下载下来的模板 package.json 配置文件路径
                        const packagePath = `${projectName}/package.json`;
                        // 使用 fs 获取下载到的模板中额 package.json 配置文件
                        const packageContent = fs.readFileSync(
                            packagePath,
                            'utf8'
                        );
                        // 使用 handlebars 编译这个文件为渲染函数
                        // answers.name = projectName;
                        // answers.author = 'odinsam';
                        // console.log(answers);
                        const packageResult = handlebars.compile(
                            packageContent
                        )({ name: projectName, author: 'odinsam' });
                        // 将修改后配置写入下载下来的模板中
                        fs.writeFileSync(packagePath, packageResult);
                        console.log('初始化模板成功！');
                        return;
                    }
                }
            );
        }
        if (v_a['vueVersion'] === 'vue3') {
            // console.log('program.args');
            const spinner = ora('模板下载中……');
            inq.prompt([
                {
                    type: 'confirm',
                    message: '是否使用typescript,直接回车默认启用',
                    name: 'useTs',
                    default: true
                },
                {
                    type: 'list',
                    message: '状态管理组件选择',
                    name: 'stateManager',
                    choices: ['Pinia', 'Vuex'],
                    filter: function (val) {
                        // 使用filter将回答变为小写
                        return val.toLowerCase();
                    }
                },
                {
                    type: 'list',
                    message: 'css模式选择',
                    name: 'cssType',
                    choices: ['Less', 'Sass'],
                    filter: function (val) {
                        // 使用filter将回答变为小写
                        return val.toLowerCase();
                    }
                }
            ]).then((answers) => {
                const projectName = program.args[0];
                // 存储模板地址
                const templates = {
                    v3ct_pinia_less: {
                        // 仓库地址
                        url: 'https://github.com/odinsam/v3ct_pinia_less.git',
                        // 仓库下载地址，格式为：仓库地址:用户名/仓库名#分支名
                        downloadUrl: 'github:odinsam/v3ct_pinia_less#master',
                        description:
                            'vue3 + ts + pinia + router + less + nanoid + pubsub-js'
                    }
                };
                // const loading = ora('模板下载中...');
                spinner.start();
                // 使用 download-git-repo 下载模板
                download(
                    // 下载目标，格式为：仓库地址:用户名/仓库名字#分支
                    templates['v3ct_pinia_less'].downloadUrl,
                    // 下载完成后的项目名称，也就是文件夹名
                    projectName,
                    {
                        // 以克隆形式下载
                        clone: true
                    },
                    // 下载结束后的回调
                    (err) => {
                        // 如果错误回调不存在，就表示下载成功了
                        if (err) {
                            // 调用 ora 下载失败方法，进行提示
                            spinner.fail(`下载失败！${err}`);
                            return;
                        } else {
                            myChalk['green']('下载成功！');
                            spinner.succeed();
                            // spinner.succeed('下载成功！');
                            // 把采集到的用户数据解析替换到 package.json 文件中
                            // 保存下载下来的模板 package.json 配置文件路径
                            const packagePath = `${projectName}/package.json`;
                            // 使用 fs 获取下载到的模板中额 package.json 配置文件
                            const packageContent = fs.readFileSync(
                                packagePath,
                                'utf8'
                            );
                            // 使用 handlebars 编译这个文件为渲染函数
                            answers.name = projectName;
                            answers.author = 'odinsam';
                            // console.log(answers);
                            const packageResult =
                                handlebars.compile(packageContent)(answers);
                            // 将修改后配置写入下载下来的模板中
                            fs.writeFileSync(packagePath, packageResult);
                            console.log('初始化模板成功！');
                            return;
                        }
                    }
                );
            });
        }
    });
}
