document.addEventListener('DOMContentLoaded', function() {

	//bg
	const bg = document.querySelector('.bg');
	let targetX = 580;
	let targetY = 770;
	let currentX = 580;
	let currentY = 770;
	let speed = 0.0075;

	function setSpeed(newSpeed) {
		speed = newSpeed;
	}

	bg.style.transform = `translate(${currentX}px, ${currentY}px)`;

	document.addEventListener('mousemove', (event) => {
		targetX = event.clientX;
		targetY = event.clientY;
	});

	function animate() {
		currentX += (targetX - currentX) * speed;
		currentY += (targetY - currentY) * speed;
		bg.style.transform = `translate(${currentX}px, ${currentY}px)`;
		requestAnimationFrame(animate);
	}

	animate();

	const mainSect = document.querySelector('.main-sect.news');

	function isHalfSectionInView() {
		const rect = mainSect.getBoundingClientRect();
		const sectionHeight = rect.height;
		const windowHeight = window.innerHeight;

		return rect.top <= (windowHeight / 2) && rect.bottom >= (windowHeight / 2 + sectionHeight / 2);
	}

	function handleScroll() {
		if (isHalfSectionInView()) {
			bg.style.opacity = 1;
		} else {
			bg.style.opacity = 0.5;
		}
	}

	window.addEventListener('scroll', handleScroll);
	handleScroll();


	//hover
	const animatedElements = document.querySelectorAll('.news .swiper-navigation button, .service .service-item a');

	animatedElements.forEach(element => {
		let hoverTimeout;
		let hoverStartTime;

		element.addEventListener('mouseenter', () => {
			element.classList.add('hover');
			clearTimeout(hoverTimeout);
			hoverStartTime = Date.now();
		});

		element.addEventListener('mouseleave', () => {
			const elapsedHoverTime = Date.now() - hoverStartTime;
			const remainingTimeToNextSecond = 800 - (elapsedHoverTime % 800);

			hoverTimeout = setTimeout(() => {
				element.classList.remove('hover');
			}, remainingTimeToNextSecond);
		});
	});



	//news
	const newsSection = document.querySelector('.main-sect.news');

	newsSection.classList.add('load');
	setTimeout(() => {
		if (newsSection) {
			newsSection.classList.remove('load');
		}
	}, 400);

	const newsSwiper = new Swiper('.news-swiper', {
		slidesPerView: 1,
		speed: 400,
		effect : 'fade',
		centeredSlides: true,
		fadeEffect: { crossFade: true },
		loopAddBlankSlides: 1,
		loop : false, //20250328 수정
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.news .swiper-button-next',
			prevEl: '.news .swiper-button-prev',
		},
		pagination: {
			el: ".news .swiper-pagination",
			clickable: true,
		},
	});

	const newsSwiperPlay = document.querySelector('.news .swiper-button-play');
	const newsSwiperStop = document.querySelector('.news .swiper-button-stop');

	newsSwiperPlay.style.display = "none";

	newsSwiperPlay.addEventListener("click", () => {
		newsSwiper.autoplay.start();
		newsSwiperStop.style.display = "";
		newsSwiperPlay.style.display = "none";
	});

	newsSwiperStop.addEventListener("click", () => {
		newsSwiper.autoplay.stop();
		newsSwiperStop.style.display = "none";
		newsSwiperPlay.style.display = "";
	});


	//popup
	const popupSwiper = new Swiper('.popup-swiper', {
		slidesPerView: 1,
		speed: 400,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.popup .swiper-button-next',
			prevEl: '.popup .swiper-button-prev',
		},
		pagination: {
			el: ".popup .swiper-pagination",
			type: "fraction",
		},
	});
	const popupSwiperPlay = document.querySelector('.popup .swiper-button-play');
	const popupSwiperStop = document.querySelector('.popup .swiper-button-stop');

	popupSwiperPlay.style.display = "none";

	popupSwiperPlay.addEventListener("click", () => {
		popupSwiper.autoplay.start();
		popupSwiperStop.style.display = "";
		popupSwiperPlay.style.display = "none";
	});

	popupSwiperStop.addEventListener("click", () => {
		popupSwiper.autoplay.stop();
		popupSwiperStop.style.display = "none";
		popupSwiperPlay.style.display = "";
	});

	
	//공정위 소식, 행정규칙 제·개정 소식 수정
    //notice
    const notice = document.querySelector('.notice');
    if(notice){
        const noticeWrap = notice.querySelector('.notice-wrap');
        const noticeButtons = notice.querySelectorAll('.notice-button button');

        noticeButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const noticeItem = this.closest('.notice-item');

                if (noticeItem) {
                    noticeItem.classList.add('active');
                    noticeItem.parentElement.querySelectorAll('.notice-item').forEach(function (item) {
                        if (item !== noticeItem) {
                            item.classList.remove('active');
                            item.querySelectorAll('.notice-button button').forEach(function (btn) {
                                btn.removeAttribute('title');
                            });
                        }
                    });

                    this.setAttribute('title', '선택됨');
                }
            });
        });

        noticeWrap.addEventListener('scroll', function () {
            if (this.scrollWidth - this.scrollLeft - 20 <= this.offsetWidth) {
                this.classList.add('end');
            } else {
                this.classList.remove('end');
            }
        });        
    }
    
    //tidings
    const tidings = document.querySelector(".tidings");
    if(tidings){
        const tidingsButtons = tidings.querySelectorAll(".tidings-button button");

        tidingsButtons.forEach(function (button) {
            button.addEventListener("click", function (e) {
                e.preventDefault();

                const tidingsItem = this.closest(".tidings-item");

                if (tidingsItem) {
                    tidingsItem.classList.add("active");

                    tidingsItem.parentElement.querySelectorAll(".tidings-item").forEach(function (item) {
                        if (item !== tidingsItem) {
                            item.classList.remove("active");
                            item.querySelectorAll(".tidings-button button").forEach(function (btn) {
                                btn.removeAttribute("title");
                            });
                        }
                    });

                    this.setAttribute("title", "선택됨");
                }
            });
        });        
    }
    
});

//jQuery
(function($) {
	'use strict';

	$(function() {

	});
})(window.jQuery);
