// Vanilla JS 黑客风简历终端效果

(function () {
  const promptContainer = document.getElementById("prompt-container");
  if (!promptContainer) return;

  const state = {
    lineSpeed: 22, // 每个字符的毫秒
    pauseBetweenCommands: 320,
    cursorChar: "_",
  };

  /** 随机内容生成 **/
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const randomProfile = (function createRandomProfile() {
    const aliases = [
      "ghost0x7f",
      "null-root",
      "hexslinger",
      "zero_day",
      "bitshift",
      "silent-scan",
      "stacktrace",
    ];

    const roles = [
      "全栈开发工程师",
      "安全研究员",
      "渗透测试工程师",
      "后端工程师",
      "DevSecOps 工程师",
    ];

    const stacks = [
      ["JavaScript", "TypeScript", "Node.js", "Express"],
      ["Python", "Django", "FastAPI", "Celery"],
      ["Go", "gRPC", "Kubernetes", "Prometheus"],
      ["Rust", "Actix", "PostgreSQL", "Redis"],
    ];

    const securitySkills = [
      "Web 渗透测试",
      "CTF 逆向 / Pwn",
      "代码审计",
      "自动化扫描脚本",
      "流量分析",
      "安全基线加固",
    ];

    const projects = [
      {
        name: "ghp-portfolio",
        desc: "基于 GitHub Pages 的自动化部署个人主页，支持多主题与暗网镜像。",
      },
      {
        name: "crawlerX",
        desc: "分布式爬虫与指纹识别系统，用于资产收集和弱点发现。",
      },
      {
        name: "ctf-auto-solver",
        desc: "半自动化 CTF 工具集，包含爆破、代码模板与流量重放脚本。",
      },
      {
        name: "log-sentinel",
        desc: "安全日志聚合与异常行为检测脚本，支持多种 SIEM 平台。",
      },
    ];

    const alias = pick(aliases);
    const role = pick(roles);
    const stack = pick(stacks);
    const selectedProjects = [pick(projects), pick(projects)].filter(
      (p, idx, arr) => arr.indexOf(p) === idx
    );

    const email = alias + "@example.com";
    const github = "https://github.com/" + alias;

    return {
      alias,
      role,
      stack,
      securitySkills,
      projects: selectedProjects,
      email,
      github,
      location: pick(["上海", "北京", "深圳", "杭州", "远程 · AnyWhere"],),
    };
  })();

  /** DOM 工具函数 **/
  function createLine({ prompt, command, className }) {
    const line = document.createElement("div");
    line.className = "prompt-line" + (className ? " " + className : "");

    if (prompt) {
      const promptSpan = document.createElement("span");
      promptSpan.className = "prompt";
      promptSpan.textContent = prompt;
      line.appendChild(promptSpan);
    }

    const cmdSpan = document.createElement("span");
    cmdSpan.className = "command";
    if (command) cmdSpan.textContent = command;

    line.appendChild(cmdSpan);
    return { line, cmdSpan };
  }

  function appendOutput(html, extraClass) {
    const wrapper = document.createElement("div");
    wrapper.className = "output";
    if (extraClass) wrapper.classList.add(extraClass);
    wrapper.innerHTML = html;
    promptContainer.appendChild(wrapper);
  }

  function scrollToBottom() {
    const parent = promptContainer.parentElement;
    if (!parent) return;
    parent.scrollTop = parent.scrollHeight;
  }

  /** 打字机效果 **/
  function typeCommand(text, targetSpan) {
    return new Promise((resolve) => {
      let i = 0;
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.textContent = state.cursorChar;
      targetSpan.after(cursor);

      function tick() {
        if (i <= text.length) {
          targetSpan.textContent = text.slice(0, i);
          i++;
          scrollToBottom();
          setTimeout(tick, state.lineSpeed);
        } else {
          cursor.remove();
          resolve();
        }
      }

      tick();
    });
  }

  function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /** 命令脚本 **/
  const commands = [
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "whoami",
      });
      promptContainer.appendChild(line);
      await typeCommand("whoami", cmdSpan);
      appendOutput(
        `<div class="output-block output-highlight">${randomProfile.alias}</div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat ./profile.json",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat ./profile.json", cmdSpan);

      const json = {
        role: randomProfile.role,
        location: randomProfile.location,
        email: randomProfile.email,
        github: randomProfile.github,
      };

      appendOutput(
        `<div class="output-block">${
          "{" +
          Object.entries(json)
            .map(([k, v]) => `  "${k}": "${v}"`)
            .join(",\n") +
          "\n}"
        }</div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "ls skills/",
      });
      promptContainer.appendChild(line);
      await typeCommand("ls skills/", cmdSpan);

      appendOutput(
        `<div class="output-block">core.txt  stack.txt  security.txt</div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat skills/stack.txt",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat skills/stack.txt", cmdSpan);

      appendOutput(
        `<div class="output-block">
          <div class="section-title">TECH STACK</div>
          <div class="tag-list">
            ${randomProfile.stack
              .map((s) => `<span class="tag">${s}</span>`)
              .join("")}
          </div>
        </div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat skills/security.txt",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat skills/security.txt", cmdSpan);

      appendOutput(
        `<div class="output-block">
          <div class="section-title">SECURITY</div>
          <div class="tag-list">
            ${randomProfile.securitySkills
              .slice(0, 5)
              .map((s) => `<span class="tag">${s}</span>`)
              .join("")}
          </div>
        </div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat experience.log",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat experience.log", cmdSpan);

      appendOutput(
        `<div class="output-block">
          <div class="section-title">EXPERIENCE</div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-title">0x01 · 高并发服务 / 安全加固</div>
              <div class="timeline-meta">2021 - 2023 · 构建和维护面向公网的 API 服务，负责鉴权与安全基线。</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-title">0x02 · CTF & 内网攻防演练</div>
              <div class="timeline-meta">参与多场企业攻防演练与 CTF 比赛，编写自动化利用与检测脚本。</div>
            </div>
          </div>
        </div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat projects.md",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat projects.md", cmdSpan);

      appendOutput(
        `<div class="output-block">
          <div class="section-title">PROJECTS</div>
          <div class="timeline">
            ${randomProfile.projects
              .map(
                (p, idx) => `
                  <div class="timeline-item">
                    <div class="timeline-title">0x0${idx + 1} · ${p.name}</div>
                    <div class="timeline-meta">${p.desc}</div>
                  </div>`
              )
              .join("")}
          </div>
        </div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "cat contact.txt",
      });
      promptContainer.appendChild(line);
      await typeCommand("cat contact.txt", cmdSpan);

      appendOutput(
        `<div class="output-block">
          <div class="section-title">CONTACT</div>
          <div class="output-block">
            <span class="output-muted">mail</span> → <a class="link" href="mailto:${
              randomProfile.email
            }">${randomProfile.email}</a>
          </div>
          <div class="output-block">
            <span class="output-muted">github</span> → <a class="link" href="${
              randomProfile.github
            }" target="_blank" rel="noreferrer">${randomProfile.github}</a>
          </div>
        </div>`
      );
    },
    async () => {
      const { line, cmdSpan } = createLine({
        prompt: "guest@github-pages:~$",
        command: "echo \"GitHub Pages: deploy complete.\"",
      });
      promptContainer.appendChild(line);
      await typeCommand("echo \"GitHub Pages: deploy complete.\"", cmdSpan);

      appendOutput(
        `<div class="output-block output-muted">GitHub Pages: resume page running on static Vanilla Web stack.</div>`
      );
    },
  ];

  async function run() {
    for (const cmd of commands) {
      await cmd();
      scrollToBottom();
      await delay(state.pauseBetweenCommands);
    }

    // 最后一行：空命令 + 闪烁光标
    const { line, cmdSpan } = createLine({
      prompt: "guest@github-pages:~$",
      command: "",
    });
    promptContainer.appendChild(line);
    cmdSpan.textContent = "";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = state.cursorChar;
    cmdSpan.after(cursor);
    scrollToBottom();
  }

  window.addEventListener("load", run);
})();
