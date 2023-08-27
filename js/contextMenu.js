(function () {
    var canvas = document.createElement('canvas');
		document.body.appendChild(canvas)
		var ctx = canvas.getContext('2d');
		
		var numberOfParticules = 30,
			pointerX = 0,
			pointerY = 0,
			tap = "mousedown",
			colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"]

		var setCanvasSize = function(){
			canvas.width = 2 * window.innerWidth,
			canvas.height = 2 * window.innerHeight,
			canvas.style.width = '100%',
			canvas.style.height = '100%',
			canvas.style.position = 'fixed';
			canvas.style.left = 0;
			canvas.style.top = 0;
			canvas.style.zIndex = -1;
			canvas.getContext("2d").scale(2, 2)
		}

		var	render = anime({
			duration: 1 / 0,
			update: function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height)
			}
		})

		function updateCoords(e) {
			pointerX = (e.clientX || e.touches[0].clientX) - canvas.getBoundingClientRect().left,
			pointerY = e.clientY || e.touches[0].clientY - canvas.getBoundingClientRect().top
		}
	
		function setParticuleDirection(e) {
			var t = anime.random(0, 360) * Math.PI / 180,
				a = anime.random(50, 180),
				n = [-1, 1][anime.random(0, 1)] * a;
			return {
				x: e.x + n * Math.cos(t),
				y: e.y + n * Math.sin(t)
			}

		}

		function createParticule(e, t) {
			var a = {};
			a.x = e,
			a.y = t,
			a.color = colors[anime.random(0, colors.length - 1)],
			a.radius = anime.random(16, 32),
			a.endPos = setParticuleDirection(a),
			a.draw = function() {
				ctx.beginPath(),
				ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
				ctx.fillStyle = a.color,
				ctx.fill()
			}
			return a
		}
		function createCircle(e, t) {
			var a = {};
				a.x = e,
				a.y = t,
				a.color = "#F00",
				a.radius = 0.1,
				a.alpha = 0.5,
				a.lineWidth = 6,
				a.draw = function() {
					ctx.globalAlpha = a.alpha,
					ctx.beginPath(),
					ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
					ctx.lineWidth = a.lineWidth,
					ctx.strokeStyle = a.color,
					ctx.stroke(),
					ctx.globalAlpha = 1
				}
			return a
		}
		function renderParticule(e) {
			for (var t = 0; t < e.animatables.length; t++) {
				e.animatables[t].target.draw()
			}

		}
		function animateParticules(e, t) {
			for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) {
				n.push(createParticule(e, t))
			}
			anime.timeline().add({
				targets: n,
				x: function(e) {
					return e.endPos.x
				},
				y: function(e) {
					return e.endPos.y
				},
				radius: 0.1,
				duration: anime.random(1200, 1800),
				easing: "easeOutExpo",
				update: renderParticule
			}).add({
				targets: a,
				radius: anime.random(80, 160),
				lineWidth: 0,
				alpha: {
					value: 0,
					easing: "linear",
					duration: anime.random(600, 800)
				},
				duration: anime.random(1200, 1800),
				easing: "easeOutExpo",
				update: renderParticule,
				offset: 0
			})
		}
		function debounce(e, t) {
			var a;
			return function() {
				var n = this
				  , i = arguments;
				clearTimeout(a),
				a = setTimeout(function() {
					e.apply(n, i)
				}, t)
			}

		}
		
		// document.oncontextmenu=new Function("event.returnValue=false;");
		// document.onselectstart=new Function("event.returnValue=false;");

		document.addEventListener(tap, function(e) {
			//  e.button 0 为左键，2 为右键
			if (e.button == 0) {
				"sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && 
				(
					render.play(),
					updateCoords(e),
					animateParticules(pointerX, pointerY)
				)
			}
			
			if(e.button == 2){
				fire(e.clientX, e.clientY)
			}

		}, !1);
		setCanvasSize();

		const scale = 1; // 动画的整体缩放
		const numberOfParticle = 6; // 粒子数量
		const particleColor = ['#4fc3f7','#00b454','#d8f800','#0b61a4','#4db6ac','#f06292']; // 粒子颜色
		const particleDistance = 100 * scale; // 粒子飞行距离
		const circleSize = 90 * scale;  // 圆环大小
		const circleBorderWidth = 10 * scale; // 圆环宽度
		const particleSize = 10 * scale; // 粒子大小
		const circleOpacity = .5 // 圆环透明度
		const duration = 1000; // 动画持续时间

		function createParticle(x, y, index) {
		  x = x - particleSize / 2;
		  y = y - particleSize / 2;
		  const particle = document.createElement('div');
		  particle.style.position = 'fixed';
		  particle.style.left = x + 'px';
		  particle.style.top = y + 'px';
		  particle.style.width = particleSize + 'px';
		  particle.style.height = particleSize + 'px';
		  particle.style.borderRadius = particleSize + 'px';
		  if (particleColor instanceof Array) {
			particle.style.backgroundColor = particleColor[index % particleColor.length]
		  } else {
			particle.style.backgroundColor = particleColor;
		  }

		  const angle = (index * (360 / numberOfParticle) - 90) * Math.PI / 180;
		  particle.endPos = {  // 计算出每个粒子消失点的位置
			x: Math.cos(angle) * particleDistance,
			y: Math.sin(angle) * particleDistance
		  };

		  document.body.appendChild(particle);
		  return particle;
		}

		function fire(x, y) {
		  // 实例化粒子h 和圆
		  const particles = []; 
		  for (let i = 0; i < numberOfParticle; i++) {
			particles.push(createParticle(x, y, i));
		  }
		  const circle = createCircle(x, y);

		  anime.timeline() // anime时间线动画。文档：https://github.com/juliangarnier/anime#timeline
			.add({ // 粒子飞向各自的结束点
			  targets: particles,
			  translateX: function (p) { // transform动画
				return parseFloat(p.endPos.x.toFixed(10));
			  },
			  translateY: function (p) {
				return parseFloat(p.endPos.y.toFixed(10));
			  },
			  easing: 'easeOutExpo',
			  duration: duration
			})
			.add({ // 粒子缩小
			  translateX: function (p) {
				return parseFloat(p.endPos.x.toFixed(10)); // 由于transform已经被之前translate的动画占用，如果还要加scale动画的话就要确保translate不被覆盖。
			  },
			  translateY: function (p) {
				return parseFloat(p.endPos.y.toFixed(10));
			  },
			  targets: particles,
			  scale: 0.01,
			  easing: 'easeOutQuad',
			  duration: 900,
			  offset: duration - 900 // 此动画距离动画开始时间的偏移
			})
			.add({
			  targets: circle,
			  scale: 1,
			  borderWidth: circleBorderWidth,
			  easing: 'easeOutQuad',
			  duration: duration / 3.5,
			  offset: 0
			})
			.add({
			  targets: circle,
			  borderWidth: 0,
			  easing: 'linear',
			  duration: duration / 3.5,
			  offset: duration / 3.5
			});
		  setTimeout(function () { // 移除动画dom
			particles.forEach(o => {
			  document.body.removeChild(o);
			});
			//document.body.removeChild(circle)
		  }, duration);
		}
})()