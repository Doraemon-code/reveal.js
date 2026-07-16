/* 「点击方框展开详情」交互：ai-primary 两张 ecosys 幻灯片
   - 第 6 页 指定信源：doc（官方文档）/ data（某年数据）/ author（某位作者）
   - 第 7 页 指定输出格式：md / table / json / email
   每个 .ecosys 组使用同一 <section> 内的 .detail 面板；点击卡片展开优/缺/应对场景，再点收起。*/
(function () {
	var DATA = {
		// —— 指定信源 ——
		doc: {
			pro: '让它只认官方文档写，减少凭空编',
			con: '得指清楚是哪家、哪个版本的文档',
			use: '查用法、写对接说明、做技术总结',
		},
		data: {
			pro: '圈定时间与范围，引用就可核查',
			con: '范围太窄它可能说"没找到"',
			use: '写报告、做行业概览时引数据',
		},
		author: {
			pro: '贴近某人的视角与风格，更像其手笔',
			con: '只是模仿，不是本人观点，别当权威',
			use: '学流派、模仿写作风格、做人物拆解',
		},
		// —— 指定输出格式 ——
		md: {
			pro: '结构清晰，能直接粘进笔记/文档',
			con: '对方不认 Markdown 时会看到一堆符号',
			use: '写 README、笔记、知识库条目',
		},
		table: {
			pro: '多项目横竖对比，一眼能看出大小关系',
			con: '项目太多列会挤，要精简到关键几列',
			use: '对比选型、列清单、呈现多维度数据',
		},
		json: {
			pro: '机器能直接读，能接进程序/工作流',
			con: '人看起来费劲，调试要对字段',
			use: '生成接口数据、做自动化输入',
		},
		email: {
			pro: '天生带称呼/正文/落款，发出即用',
			con: '语气要再调，别太"机构腔"',
			use: '回复客户、申请、内部沟通',
		},
	};

	function bindGroup(group) {
		var cards = group.querySelectorAll('.card[data-key]');
		var section = group.closest('section');
		var panel = section ? section.querySelector('.detail') : null;
		if (!cards.length || !panel) return;

		cards.forEach(function (card) {
			card.addEventListener('click', function () {
				var key = card.getAttribute('data-key');
				var wasActive = card.classList.contains('active');
				cards.forEach(function (c) { c.classList.remove('active'); });
				if (wasActive) { panel.classList.remove('show'); return; }
				var d = DATA[key];
				if (!d) return;
				card.classList.add('active');
				panel.innerHTML =
					'<div class="dcol"><div class="dk">优点</div><div class="dv">' + d.pro + '</div></div>' +
					'<div class="dcol"><div class="dk">缺点</div><div class="dv">' + d.con + '</div></div>' +
					'<div class="dcol"><div class="dk">应对场景</div><div class="dv">' + d.use + '</div></div>';
				panel.classList.add('show');
			});
		});
	}

	function init() {
		var groups = document.querySelectorAll('.ecosys');
		if (!groups.length) return;
		groups.forEach(bindGroup);
	}

	if (document.readyState !== 'loading') init();
	else document.addEventListener('DOMContentLoaded', init);
})();