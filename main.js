const start = () => {
	const st = new TimelineMax();
	st.to('#title-wrapper', { top: '30%', opacity: 0, duration: 1 });
	st.to(
		'#start',
		{
			left: '140%',
			duration: 1,
			ease: CustomEase.create(
				'custom',
				'M0,0 C0,0 0.0949,-0.1072 0.15737,-0.1669 0.18227,-0.19069 0.20158,-0.20328 0.23115,-0.22088 0.26191,-0.2392 0.28396,-0.25058 0.31696,-0.26192 0.34314,-0.27092 0.36366,-0.27447 0.39114,-0.27585 0.41713,-0.27716 0.43693,-0.27516 0.46223,-0.26921 0.48623,-0.26357 0.50363,-0.25674 0.52523,-0.24433 0.55435,-0.2276 0.57481,-0.21391 0.59907,-0.1906 0.62858,-0.16224 0.64487,-0.13959 0.67008,-0.10516 0.6946,-0.07167 0.7101,-0.05093 0.72826,-0.0141 0.77114,0.07285 0.79939,0.12749 0.83031,0.21974 0.87675,0.35832 0.89902,0.4445 0.9306,0.58968 0.96488,0.74731 1,1 1,1 '
			)
		},
		'-=0.6'
	);
	st.call(() => {
		document.querySelector('#prez').style.display = 'block';
		setTimeout(() => {
			document.querySelector('#start').style.display = 'none';
		}, 600);
	});
	st.to('#prez', { opacity: 1, duration: 1 }, '+=0.5');
};
document.querySelector('#start').addEventListener('click', () => start());

const tl = new TimelineMax();
const setPage = () => {
	const c = data[current];
	tl.to('#prez *', { opacity: 0, duration: 0.4 });
	tl.call(() => {
		document.querySelector('#prez .title').innerHTML = c.title;
		document.querySelector('#prez .text').innerHTML = c.text;
		document.querySelector('#current').innerHTML = current + 1;

		document.querySelector('#prev').style.color = 'rgba(139, 36, 0, 1)';
		document.querySelector('#prev').classList.add('clickable');
		document.querySelector('#next').style.color = 'rgba(139, 36, 0, 1)';
		document.querySelector('#next').classList.add('clickable');
		if (current === 0) {
			document.querySelector('#prev').style.color = '#bebebe';
			document.querySelector('#prev').classList.remove('clickable');
		} else if (current === data.length - 1) {
			document.querySelector('#next').style.color = '#bebebe';
			document.querySelector('#next').classList.remove('clickable');
		} else {
			document.querySelector('#prev').style.color = 'rgba(139, 36, 0, 1)';
			document.querySelector('#prev').classList.add('clickable');
			document.querySelector('#next').style.color = 'rgba(139, 36, 0, 1)';
			document.querySelector('#next').classList.add('clickable');
		}
		try {
			document
				.querySelector('#img-holder')
				.removeChild(document.querySelector('#img-holder').childNodes[0]);
		} catch (err) {}
		if (c.img) {
			const node = document.createElement('img');
			node.classList.add('tut-img');
			node.src = c.img;
			document.querySelector('#img-holder').appendChild(node);
			document.querySelector('#text-variable').classList.add('text-img');
		} else {
			document.querySelector('#text-variable').classList.remove('text-img');
		}
	});
	tl.to('#prez *', { opacity: 1, duration: 0.4 });
};

let data;
let current = 0;
axios
	.get('/data.json')
	.then(res => {
		data = res.data.steps;
		setPage();
		document.querySelector('#max').innerHTML = data.length;
	})
	.catch(err => console.error(err));

const next = () => {
	if (current < data.length - 1) {
		current++;
		setPage();
	}
};

const prev = () => {
	if (current > 0) {
		current--;
		setPage();
	}
};

document.querySelector('#prev').addEventListener('click', () => prev());
document.querySelector('#next').addEventListener('click', () => next());
// document.addEventListener('scroll', e => e.preventDefault());
