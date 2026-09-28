# iPolloWork Desktop Acceptance / iPolloWork 桌面验收

## English

- Date: 2026-09-28
- Platform: macOS arm64
- iPolloWork: 0.50.12
- Project: `AI 热点交付验收 2026-09-14`
- Engine and model: OpenCode / Big Pickle
- Package: `copilot-review-effort-auditor-1.0.0.ipollowork-plugin`

The package was imported through **Extensions → Plugins → Add → File**. The preview identified version 1.0.0, one required Skill, and zero agents, commands, MCP servers, permissions, authorization methods, local services, or native-code entries. The plugin and its Skill were then enabled.

The acceptance task explicitly invoked `copilot-review-effort-auditor` and `references/audit-format.md` against `examples/effort-audit-packet.md`. iPolloWork loaded both installed resources, requested one-time access to the repository example packet, and wrote `copilot-review-effort-auditor-acceptance.md` in the acceptance project.

The generated report passed these checks:

- verdict: `blocked`;
- confirmed cases: R-03 Balanced, R-04 Lite, and R-05 Balanced;
- unresolved cases: R-01, R-02, R-06, and R-07;
- confirmed volume: 120 reviews per month;
- unresolved volume: 160 reviews per month;
- confirmed range: USD 22.00–440.00 per month;
- scenario envelope: USD 30.00–1,240.00 per month;
- evidence paths, precedence winners, ignored settings, cutover map, actions, verification fields, rollback signals, and human-review reminder were present;
- the report ended with the required advisory boundary.

This run verifies the packaged import, installed Skill discovery, reference loading, task invocation, and file output path. It does not make live GitHub configuration or billing changes.

## 中文

- 日期：2026-09-28
- 平台：macOS arm64
- iPolloWork：0.50.12
- 项目：`AI 热点交付验收 2026-09-14`
- 引擎与模型：OpenCode / Big Pickle
- 安装包：`copilot-review-effort-auditor-1.0.0.ipollowork-plugin`

通过 **扩展 → 插件 → 添加 → 文件** 导入安装包。预览正确识别 1.0.0 版本与 1 个必需 Skill，并显示 0 个 Agent、命令、MCP、权限、授权方式、本地服务及原生代码入口。随后启用了插件与 Skill。

验收任务明确调用 `copilot-review-effort-auditor` 和 `references/audit-format.md`，审计 `examples/effort-audit-packet.md`。iPolloWork 成功加载安装后的两个资源，在获得一次性仓库示例文件访问权限后，于验收项目中生成 `copilot-review-effort-auditor-acceptance.md`。

生成报告通过以下检查：

- 结论为 `blocked`；
- 已确认案例为 R-03 Balanced、R-04 Lite、R-05 Balanced；
- 未决案例为 R-01、R-02、R-06、R-07；
- 已确认审查量为每月 120 次；
- 未决审查量为每月 160 次；
- 确认区间为每月 USD 22.00–440.00；
- 场景包络为每月 USD 30.00–1,240.00；
- 报告包含证据路径、优先级获胜步骤、被忽略设置、切换图、行动、验证字段、回滚信号和人工复核提醒；
- 报告以要求的 advisory 边界句结尾。

本次验收覆盖安装包导入、安装后 Skill 发现、参考文件加载、任务调用与文件输出。该过程未修改 GitHub 在线配置或账单。
