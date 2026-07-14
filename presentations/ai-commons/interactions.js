/* 「点击方框展开详情」交互：支持多张 ecosys 布局的幻灯片
   - 第5页 配套工具四入口：web / mobile / desktop / cli
   - 付费模式页：api（按量付费） / plan（使用套餐）
   每个 .ecosys 组使用同一 <section> 内的 .detail 面板；点击卡片展开优点/缺点/场景，再点收起。*/
(function () {
	var DATA = {
		web: {
			pro: '打开浏览器就能用，什么都不用装',
			con: '只能回答问题，无法直接操作设备中的文件',
			use: '随手查资料、问问题、写点草稿',
		},
		mobile: {
			pro: '走到哪用到哪，能说话、能拍照问它',
			con: '屏幕小，写长内容不方便',
			use: '排队等车时问几句、拍张照片让它看',
		},
		desktop: {
			pro: '一直开着随时唤出；还能挂上一个文件夹，基于里面的文件读和改，图形界面好上手',
			con: '偏轻量：真要跑命令、跑测试、连着做很多步的活，还是不如命令行',
			use: '盯着一个文件夹改东西、看本地资料、截图求助',
		},
		cli: {
			pro: '本事最大：能跑命令、跑测试、连着做很多步，把整个项目的活一口气干完',
			con: '要先装好、在“黑框框”里打开；不过还是用大白话跟它说，不用背命令',
			use: '真正做项目：加功能、修 bug、批量整理一堆文件',
		},
		// —— 付费模式 ——
		api: {
			pro: '用多少付多少，不用先充值、没有月费；想换新模型随时切，出了新款第一时间能用',
			con: '单价通常更贵；用量一大就不好控制，一不留神容易超支',
			use: '用量不大或忽高忽低、想先尝个鲜、或接进自己的程序 / 工作流里按次调用',
			scene: '应用场景',
		},
		plan: {
			pro: '固定月费、花多少心里有数；一般比按次便宜；开通即用，不用自己管密钥和额度',
			con: '有用量上限，超了要等下个月或额外加钱；用不完也照扣，用得少就亏',
			use: '每天稳定高频地用、个人重度用户、或团队统一开一份',
			scene: '应用场景',
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
				var scene = d.scene || '应对场景';
				panel.innerHTML =
					'<div class="dcol"><div class="dk">优点</div><div class="dv">' + d.pro + '</div></div>' +
					'<div class="dcol"><div class="dk">缺点</div><div class="dv">' + d.con + '</div></div>' +
					'<div class="dcol"><div class="dk">' + scene + '</div><div class="dv">' + d.use + '</div></div>';
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
