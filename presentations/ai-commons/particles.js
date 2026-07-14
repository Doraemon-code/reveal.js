/* 贯穿全场的“发光 Token / 数据粒子”背景
   一层固定 canvas，缓慢上浮的发光粒子 + 稀疏连线。
   尊重 prefers-reduced-motion；轻量（约 70 粒），移动端友好。 */
(function () {
	var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	var canvas = document.createElement('canvas');
	canvas.id = 'token-field';
	Object.assign(canvas.style, {
		position: 'fixed', inset: '0', width: '100%', height: '100%',
		zIndex: '0', pointerEvents: 'none'
	});
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');

	var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
	var COLORS = ['46,139,255', '124,92,255', '168,85,247'];
	var parts = [];
	var COUNT = reduce ? 34 : 72;

	function seed(i) {
		return {
			x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
			y: (Math.sin(i * 78.233) * 12543.876) % 1
		};
	}

	function resize() {
		W = canvas.width = window.innerWidth * DPR;
		H = canvas.height = window.innerHeight * DPR;
	}

	function build() {
		parts = [];
		for (var i = 0; i < COUNT; i++) {
			var s = seed(i + 1);
			parts.push({
				x: Math.abs(s.x) * W,
				y: Math.abs(s.y) * H,
				r: (Math.abs(s.x) * 1.6 + 0.6) * DPR,
				vy: -(0.15 + Math.abs(s.y) * 0.35) * DPR,
				vx: (s.x - 0.5) * 0.25 * DPR,
				c: COLORS[i % COLORS.length],
				a: 0.35 + Math.abs(s.y) * 0.45
			});
		}
	}

	function step() {
		ctx.clearRect(0, 0, W, H);
		for (var i = 0; i < parts.length; i++) {
			var p = parts[i];
			p.x += p.vx; p.y += p.vy;
			if (p.y < -20) { p.y = H + 20; }
			if (p.x < -20) { p.x = W + 20; } else if (p.x > W + 20) { p.x = -20; }

			// 稀疏连线（数据流的感觉）
			for (var j = i + 1; j < parts.length; j++) {
				var q = parts[j];
				var dx = p.x - q.x, dy = p.y - q.y;
				var d2 = dx * dx + dy * dy;
				if (d2 < (120 * DPR) * (120 * DPR)) {
					ctx.strokeStyle = 'rgba(88,166,255,' + (0.06 * (1 - d2 / ((120 * DPR) * (120 * DPR)))) + ')';
					ctx.lineWidth = DPR;
					ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
				}
			}
			// 发光粒子
			var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
			g.addColorStop(0, 'rgba(' + p.c + ',' + p.a + ')');
			g.addColorStop(1, 'rgba(' + p.c + ',0)');
			ctx.fillStyle = g;
			ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
		}
		requestAnimationFrame(step);
	}

	window.addEventListener('resize', function () { resize(); build(); });
	resize(); build(); step();
})();
