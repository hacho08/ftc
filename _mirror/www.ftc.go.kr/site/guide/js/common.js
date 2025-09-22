/* 모바일 : 전체메뉴 */
const moblnb = {
    target: {
        header       : "#header",
        lnbOpen      : "#m-lnb-open",
        lnbWrap      : ".m-lnb-wrap",
        lnbIn        : ".m-lnb-wrap .m-lnb-in",
        lnbBody      : ".m-lnb-wrap .m-lnb-body",
        lnbMenu      : ".m-lnb-wrap .menu-wrap .mn",
        lnbMenuHori  : ".m-lnb-wrap .menu-hori",
        lnbClose     : ".m-lnb-wrap .ico-close",
        lnbAnchor    : ".m-lnb-menu .submenu-wrap .dl",
        lnbTopScroll : ".m-lnb-wrap .m-lnb-top-scroll",
    },
    init: () => {
        const $mlnbBtn = document.querySelector(moblnb.target.lnbOpen);
        const $mlnb = document.querySelector(moblnb.target.lnbWrap);
        const $mlnbCloseBtn = $mlnb.querySelector(moblnb.target.lnbClose);
        const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);

        moblnb.anchor();
        $mlnb.setAttribute("aria-hidden", "true");
        $mlnbBtn.addEventListener("click", moblnb.open);
        $mlnbCloseBtn.addEventListener("click", moblnb.close);
        $mlnbBody.addEventListener("scroll", moblnb.anchorScroll);
    },
    open: () => {
        const $header = document.querySelector(moblnb.target.header);
        const $mlnb = document.querySelector(moblnb.target.lnbWrap);
        const $mlnbIn = document.querySelector(moblnb.target.lnbIn);

        $header.style.zIndex="1000";
        $mlnb.setAttribute("aria-hidden", "false");
        $mlnb.classList.add("is-open");
        $mlnbIn.setAttribute("tabindex", 0);
        $mlnbIn.focus();
        document.body.classList.add("is-m-lnb");
    },
    close: () => {
        const $body = document.body;
        const $header = document.querySelector(moblnb.target.header);
        const $mlnb = document.querySelector(moblnb.target.lnbWrap);
        const $mlnbBtn = document.querySelector(moblnb.target.lnbOpen);
        const $mlnbIn = document.querySelector(moblnb.target.lnbIn);

        $mlnb.classList.remove("is-open");
        $mlnb.classList.add("is-close");
        $mlnbIn.removeAttribute("tabindex");
        $mlnb.setAttribute("aria-hidden", "true");
        $body.classList.remove("is-m-lnb");
        $mlnbBtn.focus();

        setTimeout(()=>{
            $mlnb.classList.remove("is-close");
            $header.style.zIndex="";
        },500);
    },
    anchormenuReset: () => {
        const $mlnbMenu = document.querySelectorAll(moblnb.target.lnbMenu);

        $mlnbMenu.forEach($menu => {
            $menu.classList.remove("active");
        });
    },
    anchor: () => {
        const $mlnb = document.querySelector(moblnb.target.lnbWrap);
        const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);
        const $mlnbMenus = $mlnb.querySelectorAll(moblnb.target.lnbMenu);
        const $mlnbAnchors = $mlnb.querySelectorAll(moblnb.target.lnbAnchor);
        
        let currentKey = null;
        try {
            const currentUrl = new URL(window.location.href);
            currentKey = currentUrl.searchParams.get("key") || null;
        } catch (error) {
            //console.error(error);
        }
    
        const smElements = $mlnbBody.querySelectorAll(".submenu-wrap .dl .dd .sm");
        let hasActiveSm = false;
    
        smElements.forEach($sm => {
            try {
                const smUrl = new URL($sm.href, window.location.origin);
                const smKey = smUrl.searchParams.get("key") || null;
    
                if (currentKey && smKey && currentKey === smKey) {
                    $sm.classList.add("active");
                    hasActiveSm = true;
                }
            } catch (error) {
                //console.error(error);
            }
        });
    
        const $mlnbAnchor99 = document.querySelector("#mlnb-anchor99");
        if ($mlnbAnchor99 && hasActiveSm) {
            const $mnMenu = document.querySelector('.m-lnb-menu .menu-wrap .mn[href="#mlnb-anchor99"]');
            if ($mnMenu) $mnMenu.classList.add("active");
    
            const $dt = $mlnbAnchor99.querySelector("dt");
            if ($dt) $dt.classList.add("active");
        }

        const $activeMenu = $mlnbBody.querySelector(".submenu-wrap .dl .dd .sm.active");

        if ($activeMenu) {
            const menuRect = $activeMenu.getBoundingClientRect();
            const bodyRect = $mlnbBody.getBoundingClientRect();
            const activeOffsetTop = menuRect.top - bodyRect.top + $mlnbBody.scrollTop - 9;

            $mlnbBody.scrollTop = activeOffsetTop;
        } else {
            $mlnbMenus[0].classList.add("active");
        }

        $mlnbAnchors.forEach($item => {
            const _depth4s = $item.querySelectorAll(".is-depth4");
            if(_depth4s.length > 0) {
                _depth4s.forEach(($el) => {
                    $el.addEventListener("click", ($btn) => {
                        const $target = $btn.target.nextElementSibling;
                        const $btnPrev = $target.querySelector(".ico-prev");
                        const $btnClose = $target.querySelector(".ico-close");

                        $target.style.display = "block";
                        setTimeout(function(){
                            $target.classList.add("is-open");
                        }, 0);
                        $btnPrev.focus();
                        $btnPrev.addEventListener("click", ($prev) => {
                            depth4Close()
                        });
                        $btnClose.addEventListener("click", ($prev) => {
                            depth4Close()
                        });

                        function depth4Close() {
                            $target.classList.remove("is-open");
                            $btn.target.focus();
                            setTimeout(function(){
                                $target.style.display = "";
                            }, 400);
                        }
                    });
                });
            }
        });
    },
    anchorScroll: () => {
        const $mlnb = document.querySelector(moblnb.target.lnbWrap);
        const $mlnbIn = $mlnb.querySelector(moblnb.target.lnbIn);
        const $mlnbMenuHori = $mlnb.querySelector(moblnb.target.lnbMenuHori);
        const $mlnbBody = $mlnb.querySelector(moblnb.target.lnbBody);
        const $mlnbAnchors = $mlnb.querySelectorAll(moblnb.target.lnbAnchor);
        const $mlnbTopScroll = $mlnb.querySelector(moblnb.target.lnbTopScroll);
        const _scrollTop = $mlnbBody.scrollTop;
        const _scrollH = $mlnbBody.scrollHeight;
        const _bodyH = $mlnbBody.clientHeight;

        $mlnbAnchors.forEach($item => {
            const _id = $item.getAttribute("id");
            const $mn = $mlnb.querySelector(`[href="#${_id}"]`);
            const _offset = $item.offsetTop;
            if (_scrollTop >= _offset || _bodyH + _scrollTop >= _scrollH) {
                moblnb.anchormenuReset();
                $mn.classList.add("active");
                if($mlnbTopScroll) {
                    const $mlnbMenuHoriUl = $mlnbMenuHori.querySelector(".ul");
                    const _offsetLeft = $mn.offsetLeft;
                    $mlnbBody.addEventListener('scrollend', () => {
                        $mlnbMenuHoriUl.scrollLeft = _offsetLeft;
                    });
                }
            }
        });

        //lnb type2
        if($mlnbTopScroll) {
            let _lastBodyScrollY = 0;
            $mlnbBody.addEventListener('scroll', (e) => {
                const _bodyScrollY =  e.target.scrollTop;
                if (_bodyScrollY > 0) {
                    const _mlnbMenuScrollH = $mlnbTopScroll.scrollHeight;
                    $mlnbTopScroll.style.height = `${_mlnbMenuScrollH}px`;
                    $mlnbTopScroll.style.transition = "ease-out .4s";
                    $mlnbIn.classList.add("is-active");
                } else if (_bodyScrollY < 50 && _bodyScrollY < _lastBodyScrollY) {
                    $mlnbTopScroll.style.height = "";
                    $mlnbTopScroll.style.transition = "ease-out .4s .2s";
                    setTimeout(() => {
                        $mlnbIn.classList.remove("is-active");
                    }, 600);
                }
                _lastBodyScrollY = _bodyScrollY;
            });
        }
    },
}

/* 웹 : 전체메뉴 - 20241023 수정 */
const pclnb = {
    target: {
        lnbArea: ".lnb",
        lnbWrap: ".w-lnb-wrap",
        lnbMenu: ".lnb .lnb-list .mn",
        lnbMenuWrap: ".lnb .menu-wrap",
        lnbMenuAct: ".lnb .lnb-list .mn.active",
        lnbSubMenu: ".lnb .lnb-list .sm",
        lnbSubMenuAct: ".lnb .lnb-list .sm.active",
        lnbDim: ".w-lnb-dim",
    },
    init: () => {
        const $body = document.body;
        const $lnbDim = document.createElement("div");

        $lnbDim.classList.add("w-lnb-dim");
        $lnbDim.style.display = "none";
        $body.appendChild($lnbDim);

        pclnb.open();
        pclnb.lnb();
    },
    open: () => {
        const $lnbMns = document.querySelectorAll(pclnb.target.lnbMenu);
        const $lnbSms = document.querySelectorAll(pclnb.target.lnbSubMenu);
        const $lnbDim = document.querySelector(pclnb.target.lnbDim);

        $lnbMns.forEach($menu => {
            const hasSubmenu = $menu.nextElementSibling !== null && $menu.nextElementSibling.classList.contains('w-lnb-wrap');

            if (hasSubmenu) {
                const $srDiv = document.createElement("span");
                const $srTxt = document.createTextNode("열기");
				
				if (document.documentElement.lang === 'en'){
					$srTxt.textContent = "open";
				} else{
					$srTxt.textContent = "열기";
				}
				
                $srDiv.classList.add("sr-only");
                $srDiv.appendChild($srTxt);
                $menu.appendChild($srDiv);
            }

            if ($menu.nextElementSibling === null) $menu.classList.add("mn-link");

            $menu.addEventListener("click", ($item) => {
                const $currentMenuWrap = $item.currentTarget.closest('.li').querySelector(pclnb.target.lnbMenuWrap);

                if (!$item.currentTarget.classList.contains("active") && $item.currentTarget.nextElementSibling !== null) {
                    pclnb.menuReset();
                    $item.currentTarget.classList.add("active");
                    $item.currentTarget.nextElementSibling.classList.add("is-open");

                    const srOnlyElement = $item.currentTarget.querySelector(".sr-only");
                    if (srOnlyElement) {
                        srOnlyElement.textContent = "닫기";
						
						if (document.documentElement.lang === 'en'){
							srOnlyElement.textContent = "close";
						} else{
							srOnlyElement.textContent = "닫기";
						}
                    }

                    $currentMenuWrap.style.minHeight = 'auto';

                    const $activeButton = $item.currentTarget.closest('.li').querySelector('.sm.active');
                    const $submenuWrap = $activeButton ? $activeButton.closest('li').querySelector('.submenu-wrap') : null;

                    if ($submenuWrap) {
                        const submenuHeight = $submenuWrap.offsetHeight;
                        $currentMenuWrap.style.minHeight = `${submenuHeight}px`;
                    }

                    $lnbDim.style.display = "block";
                    document.body.classList.add("is-w-lnb");
                    comLayout.scrollbar.open();
                } else {
                    pclnb.menuReset();
                    pclnb.close();
                    const srOnlyElement = $item.currentTarget.querySelector(".sr-only");
                    if (srOnlyElement) {
                        srOnlyElement.textContent = "열기";
						
						if (document.documentElement.lang === 'en'){
							srOnlyElement.textContent = "open";
						} else{
						     srOnlyElement.textContent = "열기";
						}
					
                    }
                }
            });
        });

        if ($lnbSms.length > 0) {
            $lnbSms.forEach($sub => {
                $sub.addEventListener("click", (e) => {
                    const $clickedSm = e.target;
                    const $smChildrens = $clickedSm.closest("ul").querySelectorAll(".sm");

                    [...$smChildrens].forEach($sm => {
                        $sm.classList.remove("active");
                    });

                    $clickedSm.classList.add("active");

                    const $lnbMenuWrap = $clickedSm.closest('.li').querySelector('.menu-wrap');
                    $lnbMenuWrap.style.minHeight = 'auto';

                    const $submenuIn = $clickedSm.nextElementSibling;
                    if ($submenuIn) {
                        const submenuHeight = $submenuIn.offsetHeight;
                        $lnbMenuWrap.style.minHeight = `${submenuHeight}px`;
                    }
                });
            });

            document.querySelectorAll(".lnb .li").forEach(li => {
                const smButtons = li.querySelectorAll(".sm");
                const hasActive = Array.from(smButtons).some(button => button.classList.contains("active"));

                if (!hasActive) {
                    const firstSmButton = li.querySelector(".ul li:first-child .sm");
                    if (firstSmButton) {
                        firstSmButton.classList.add("active");

                        const $submenuIn = firstSmButton.nextElementSibling;
                        const $lnbMenuWrap = firstSmButton.closest('.li').querySelector('.menu-wrap');

                        if ($submenuIn) {
                            const submenuHeight = $submenuIn.offsetHeight;
                            $lnbMenuWrap.style.minHeight = `${submenuHeight}px`;
                        }
                    }
                }
            });
        }

        $lnbDim.addEventListener("click", () => {
            pclnb.close();
        });

        window.addEventListener("keyup", (e) => {
            if (!e.target.closest(".lnb")) {
                pclnb.close();
            }
        });
    },
    close: () => {
        const $lnbLayer = document.querySelector(pclnb.target.lnbWrap);
        const $lnbDim = document.querySelector(pclnb.target.lnbDim);
        $lnbLayer.classList.remove("is-open");
        $lnbDim.style.display = "none";

        pclnb.menuReset();
        document.body.classList.remove("is-w-lnb");
        comLayout.scrollbar.close();
    },
    menuReset: () => {
        const $lnbMn = document.querySelectorAll(pclnb.target.lnbMenu);
        const $lnbWrap = document.querySelectorAll(pclnb.target.lnbWrap);

        $lnbMn.forEach(($item) => {
            $item.classList.remove("active");
        });

        $lnbWrap.forEach(($item) => {
            if ($item && $item instanceof Element && $item.classList.contains("is-open")) {
                $item.classList.remove("is-open");
            }
        });
    },
    lnb: () => {
        const $lnb = document.querySelector("#side");
        const $lnb4wrap = document.querySelector("#side .depth4-wrap");
        let isUserAction = false;

        if ($lnb !== null && $lnb4wrap !== null) {
            const $depth4s = $lnb.querySelectorAll(".sub-ul .is-depth4");
            const $activeItem = $lnb.querySelector(".sub-ul li.active .depth4-wrap");
            if ($activeItem) {
                openLnb($activeItem);
            }

            $depth4s.forEach(($menu) => {
                $menu.addEventListener("click", ($el) => {
                    const $target = $el.target.nextElementSibling;
                    isUserAction = true;

                    if ($target.classList.contains("is-open")) {
                        lnbClose($target);
                    } else {
                        openLnb($target, true);
                    }
                });
            });

            function openLnb($target, focusOnOpen) {
                const $targetPrev = $target.querySelector(".depth4-tit");
                const $targetLast = $target.querySelector(".depth4-ul li:last-child a");
                $target.style.display = "block";
                setTimeout(function(){
                    $target.classList.add("is-open");
                }, 0);

                if (focusOnOpen) {
                    $targetPrev.focus();
                }

                $targetPrev.addEventListener("click", () => {
                    lnbClose($target);
                });

                $target.addEventListener("keydown", function(e){
                    $targetLast.onblur = function() {
                        if (e.key === 'Tab' && !e.shiftKey) {
                            lnbClose($target);
                        }
                    }
                });

                $targetPrev.addEventListener("keydown", function(e){
                    e.target.onblur = function() {
                        if (e.key === 'Tab' && e.shiftKey) {
                            lnbClose($target);
                        }
                    }
                });
            }

            //depth4 열려있을 경우 side foucs시 depth4 닫히도록 수정
            let isTabPressed = false;
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    isTabPressed = true;
                }
            });

            document.addEventListener('focusin', function(e) {
                if (isTabPressed) {
                    const $lnb = document.querySelector("#side");
                    if ($lnb) {
                        const $depth4s = $lnb.querySelectorAll(".depth4-wrap.is-open");
                        const $firstFocusable = $lnb.querySelector(".acco-list > .li:first-child a, .acco-list > .li:first-child button");
                        if ($firstFocusable === document.activeElement) {
                            $depth4s.forEach($wrap => {
                                lnbClose($wrap);
                            });
                        }
                    }
                    isTabPressed = false;
                }
            });

            function lnbClose($target) {
                $target.classList.remove("is-open");
                setTimeout(function(){
                    $target.style.display = "";
                }, 400);
            }
        }
    },
};

/* 공통 : 레이아웃 */
const comLayout = {
    target: {
        headerTop : document.querySelector("#header-top"),
        header : document.querySelector("#header"),
        container : "#container",
        footer : "#footer",
    },
    init : () => {
        comLayout.scroll();
        comLayout.headerEvent ();
        window.addEventListener('resize', () => {
            comLayout.headerEvent();
        });
    },
    isTarget: ()=> {
        const $islnbm = document.querySelector("#header");
        const _value = ($islnbm.length) ? true : false;

        return _value;
    },
    scroll:  () => {
        let _lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const $wrap = document.querySelector("#wrapper");
            const _conOffsetTop= document.querySelector("#container").offsetTop;
            const _scrollY =  window.scrollY;
            const _scrollDown = _scrollY > _lastScrollY;
            const _scrollUp = _scrollY < _lastScrollY;
            if (_scrollY > _conOffsetTop + 50 && _scrollDown) {
                $wrap.classList.add("scroll-down");
                $wrap.classList.remove("scroll-up");
            } else if (_scrollY > _conOffsetTop + 50 && _scrollUp) {
                $wrap.classList.add("scroll-up");
                $wrap.classList.remove("scroll-down");
            } else {
                $wrap.classList.remove("scroll-down", "scroll-up");
            }
            _lastScrollY = _scrollY;
        });
    },
    headerEvent : () => {
        const $header = document.querySelector("#header");
        const _headerH = document.querySelector("#header .header-in").clientHeight;

        $header.style.height = `${_headerH + 1}px`;
    },
    scrollbar : {
        open : () => {
            const _hasScrollY = document.body.scrollHeight > window.wrapHeight;
            if(_hasScrollY) document.body.classList.add("hasScrollY");
        },
        close : () => {
            document.body.classList.remove("hasScrollY");
        },
    },
}

/* 공통 : 패턴 */
const common = {
    target: {
        header : document.querySelector("#header"),
        container : "#container",
        footer : "#footer",
        prefix : "krds",
    },
    device: {
        isMob : 1024,
    },
    init: ()=> {
        common.dropEvent ();
        common.toggleEvent();
        common.accordianEvent.init();
        const $links = document.querySelectorAll("a");
        $links.forEach($link => {
            const _href = $link.getAttribute( 'href' );
            $link.addEventListener("click", (el) => {
                if(_href === "#") el.preventDefault();
            });
        });
    },
    dropEvent: () => {
        const _dropBtns = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-btn`);
        const _dropCloseBtns = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-close`);

        _dropBtns.forEach(($dropBtn) => {
            const _span = document.createElement("span");
            const _txt = document.createTextNode("열기");
			const _txtEn = document.createTextNode("open");
											
            _span.classList.add("sr-only");
            //_span.appendChild(_txt);
			
			if (document.documentElement.lang === 'en'){
				_span.appendChild(_txtEn);
			} else{
				_span.appendChild(_txt);
			}
			

            $dropBtn.appendChild(_span);

            $dropBtn.addEventListener("click", ($el) => {
                const $menu = $el.target.nextElementSibling;
                const $srTxt = $el.target.querySelector(".sr-only");
                if($menu.style.display !== "block") {
                    common.dropClose();
                    $menu.style.display = "block"
                    $el.target.classList.add("active");
                    $srTxt.textContent = "닫기";
					
					if (document.documentElement.lang === 'en'){
						$srTxt.textContent = "close";
					} else{
						$srTxt.textContent = "닫기";
					}
					
                } else {
                    common.dropClose();
                    $srTxt.textContent = "열기";
					
					if (document.documentElement.lang === 'en'){
						$srTxt.textContent = "open";
					} else{
						$srTxt.textContent = "열기";
					}
                }
            });
        });

        _dropCloseBtns.forEach(($closeBtn) => {
            $closeBtn.addEventListener("click", () => {
                common.dropClose();
            });
        });

        document.addEventListener("click", ($e) => {
            if(!$e.target.closest(`.${common.target.prefix}-drop-wrap`)) common.dropClose();
        });
    },
    dropClose: () => {
        const _dropBtns = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-btn`);
        const _dropMenus = document.querySelectorAll(`.${common.target.prefix}-drop-wrap .drop-menu`);
        _dropMenus.forEach(($menu) => {
            $menu.style.display = "";
        });
        _dropBtns.forEach(($btn) => {
            $btn.classList.remove("active");
        });
    },
    popupEvent: ($id) => {
        const $clickBtn = document.activeElement;
        const $header = common.target.header;
        const $openTarget = document.querySelector($id);
        const $openTargetType = $openTarget.getAttribute('data-type');
        const $focusPopupWrap = document.querySelector(`${$id}`);
        const $focusPopup = document.querySelector(`${$id} .popup`);
        const $closeBtn = document.querySelector(`${$id} .popup-close`);

        $openTarget.classList.add("is-open");

        document.body.classList.add("scroll-no");
        common.accEvent.open();
        if($openTargetType !== 'bottom' && common.target.header !== null) {
            $header.style.zIndex="1000";
        }

        if($openTargetType == 'full') {
            $openTarget.setAttribute("tabindex", 0);
            $focusPopupWrap.focus();
        } else {
            $focusPopup.setAttribute("tabindex", 0);
            $focusPopup.focus();
        }

        $closeBtn.addEventListener("click", () => {
            $openTarget.classList.remove("is-open");
            $openTarget.classList.add("is-close");
            $focusPopup.removeAttribute("tabindex");
            $clickBtn.focus();

            if (common.target.header !== null) $header.style.zIndex="";

            common.accEvent.close();
            setTimeout(() => {
                $openTarget.classList.remove("is-close");
                document.body.classList.remove("scroll-no");
            }, 600);
        });
    },
    accEvent :  {
        open : () => {
            const $container = document.querySelector(common.target.container);
            const $footer = document.querySelector(common.target.footer);
            $container.setAttribute("aria-hidden", "true");
            $footer.setAttribute("aria-hidden", "true");
        },
        close: () => {
            const $container = document.querySelector(common.target.container);
            const $footer = document.querySelector(common.target.footer);
            $container.setAttribute("aria-hidden", "false");
            $footer.setAttribute("aria-hidden", "false");
        },
    },
    toggleEvent : () => {
        const _toggleBtns = document.querySelectorAll(".toggle-btn");
        _toggleBtns.forEach(($toggleBtn) => {
            $toggleBtn.addEventListener("click", ($btnAct) => {
                const $target = $btnAct.target.closest(".toggle-head");
                const $targetBody = $target.nextElementSibling;
                const _targetBodyH = $targetBody.querySelector(".wrap").scrollHeight;
                const $srEl = $btnAct.target.querySelector(".sr-only");

                if(!$target.classList.contains("active")) {
                    $srEl.wrapText = '닫힘';
                    $target.classList.add("active");
                    $targetBody.classList.add("active");
                    $targetBody.style.height = `${_targetBodyH}px`;
                    window.addEventListener("resize", () => {
                        if($targetBody.classList.contains("active")) {
                            const _targetBodyH = $targetBody.querySelector(".wrap").scrollHeight;
                            $targetBody.style.height = `${_targetBodyH }px`;
                        }
                    });
                } else {
                    $srEl.wrapText = '열림';
                    $target.classList.remove("active");
                    $targetBody.classList.remove("active");
                    $targetBody.style.height = '';
                }

            })
        });
    },
    accordianEvent : {
        init: () => {
            const _accordians = document.querySelectorAll(".acco-list");
            _accordians.forEach(($parent) => {
                const _accoDataAct = $parent.getAttribute("data-action");
                const _accoAct = _accoDataAct !== null;
                const _lis = $parent.querySelectorAll(".li");
                const _list = [..._lis];
                _list.forEach(($e) => {
                    const $item = $e.closest(".li");
                    const $itemToggle = $e.querySelector(".acco-btn");
                    const $itemSr = $item.querySelector(".acco-btn .sr-only");
                    const $itemBody = $e.querySelector(".acco-body");

                    // acco-body가 없는 경우 처리 - 20240830 추가
                    if (!$itemBody) return;

                    if($e.classList.contains("active")) common.accordianEvent.open($item);
                    if($parent.classList.contains("is-open")) {
                        common.accordianEvent.open($item);
                    } else {
                        //$itemBody.style.display = 'none';
                        //$itemSr.textContent = "펼침";
						
						if (document.documentElement.lang === 'en'){
					        $itemSr.textContent = "unfolding";
						} else {
							$itemSr.textContent = "펼침";
						};
                    }

                    $itemToggle.addEventListener("click", ($el) => {
                        const $menu = $el.target.closest(".li");

                        (!$menu.classList.contains("active")) ? common.accordianEvent.open($menu) : common.accordianEvent.close($menu);
                        if(_accoAct) common.accordianEvent.reset(_list, $menu);
                    });
                });
            });
        },
        open : ($item) => {
            const $accoSr = $item.querySelector(".acco-btn .sr-only");
            const $accoBody = $item.querySelector(".acco-body");

            $item.classList.add("active");
            $accoBody.style.display = 'block';
            //$accoSr.textContent = "접기";
			
			if (document.documentElement.lang === 'en'){
				$accoSr.textContent = "folding";
			} else {
				 $accoSr.textContent = "접기";
			};

            const _accoBodyH = $item.querySelector(".acco-in").scrollHeight;
            //$accoBody.style.height = `${_accoBodyH+1}px`;
            $accoBody.style.height = `${_accoBodyH}px`;
            setTimeout(() => {
                $accoBody.style.display = 'block';
            },0);

        },
        close : ($item) => {
            const $accoSr = $item.querySelector(".acco-btn .sr-only");
            const $accoBody = $item.querySelector(".acco-body");

            $accoSr.textContent = "펼침";
            $accoBody.style.height = '';
            $accoBody.style.overflow = '';
            $item.classList.remove("active");
            setTimeout(() => {
                $accoBody.style.display = 'none';
            }, 400);
			
			if (document.documentElement.lang === 'en'){
			    $accoSr.textContent = "unfolding";
			} else {
			    $accoSr.textContent = "펼침";
			}
			
        },
        reset : (_list, $menu) => {
            _list.forEach(($e) => {
                const $target = $e;
                const $accoSr = $target.querySelector(".acco-btn .sr-only");
                const $accoBody = $target.querySelector(".acco-body");
                if(_list.indexOf($menu) !== _list.indexOf($target)) {
                    // acco-body가 없는 경우 처리 - 20240830 추가
                    if ($accoBody) {
                        $target.classList.remove("active");
						
                        //$accoSr.textContent = "펼침";				
						if (document.documentElement.lang === 'en'){
					        $accoSr.textContent = "unfolding";
						} else {
							 $accoSr.textContent = "펼침";
						}
						
                        $accoBody.style.height = '';
                        setTimeout(() => {
                            $accoBody.style.display = 'none';
                        }, 400);
						
                    }
                }
            });
        },
    },
}


document.addEventListener('DOMContentLoaded', function(){
	const accordions = document.querySelectorAll('.acco-list li');
	
	accordions.forEach(function($item){
		const $itemBtn = $item.querySelector('.acco-btn');
		const $itemTitle = $item.querySelector('.acco-head h3');
		
		if ($itemBtn && $itemTitle) {
			$itemBtn.title = $itemTitle.textContent;
		}
	})
})



//띠배너 스크롤 시 class 추가
function lineBnScroll() {
    const $bn = document.querySelector('#header-top');
    const $bnHeight = $bn.offsetHeight;
    const $body = document.querySelector("body");
    const scrollY = window.scrollY;
    if ($bn) {
		/*
        $body.classList.add('bn-hidden');
		if (scrollY <= $bnHeight) {
            $body.classList.remove('bn-hidden');
        }
		*/
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if(comLayout.target.header !== null) {
        setTimeout(() => {
            moblnb.init();
            pclnb.init();
            comLayout.init();
        }, 100);
    }
});

window.addEventListener("load", () => {
    setTimeout(() => {
        common.init();
    }, 100);

    if (comLayout.target.headerTop !== null) {
        setTimeout(() => {
            lineBnScroll();
        }, 200);
    }
});

window.addEventListener('scroll', () => {
    if (comLayout.target.headerTop !== null) {
        setTimeout(() => {
            lineBnScroll();
        }, 200);
    }
});

//모바일 메뉴명 찾기 - 20240830 추가
const searchInput = document.getElementById('menu-search');
const searchButton = document.getElementById('menu-search-btn');
let currentIndex = -1;
let menuLinks = [];

function updateMenuLinks() {
    const searchValue = searchInput.value.trim().toLowerCase();
    menuLinks = Array.from(document.querySelectorAll('.submenu-wrap a'))
        .filter(link => link.textContent.toLowerCase().includes(searchValue));
}

function focusNextMenuLink() {
    if (menuLinks.length === 0) return;
    currentIndex = (currentIndex + 1) % menuLinks.length;
    menuLinks[currentIndex].focus();
}

if(searchButton && searchInput){
    searchButton.addEventListener('click', () => {
        updateMenuLinks();
        focusNextMenuLink();
    });
    
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 폼 제출 방지
            updateMenuLinks();
            focusNextMenuLink();
        }
    });
}

//화면크기 - 20240830 추가
document.addEventListener('DOMContentLoaded', () => {
    const zoomDrops = document.querySelectorAll('.zoom-drop');

    if (zoomDrops.length) {
        const zoomLevels = {
            xsm: 0.9,
            sm: 1,
            md: 1.1,
            lg: 1.2,
            xlg: 1.3
        };

        let savedZoom = localStorage.getItem('zoomLevel');
        if (savedZoom) {
            savedZoom = parseFloat(savedZoom);
            applyZoom(savedZoom);
            updateActiveButton(savedZoom);
        }

        zoomDrops.forEach(zoomDrop => {
            const zoomBtns = zoomDrop.querySelectorAll('.item-link');
            const zoomResetBtn = zoomDrop.querySelector('.ico-reset');

            zoomBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const buttonClass = Array.from(btn.classList).find(cls => zoomLevels[cls]);
                    if (!buttonClass) return; // 만약 매칭되는 클래스가 없으면 중지
                    const zoomLevel = zoomLevels[buttonClass];
                    applyZoom(zoomLevel);
                    updateActiveButton(zoomLevel);
                    localStorage.setItem('zoomLevel', zoomLevel);
                });
            });

            zoomResetBtn?.addEventListener('click', () => {
                const defaultZoom = zoomLevels.sm;
                applyZoom(defaultZoom);
                updateActiveButton(defaultZoom);
                localStorage.setItem('zoomLevel', defaultZoom);
            });
        });

        function applyZoom(zoomLevel) {
            document.body.style.zoom = zoomLevel;
        }

        function updateActiveButton(zoomLevel) {
            zoomDrops.forEach(zoomDrop => {
                const zoomBtns = zoomDrop.querySelectorAll('.item-link');
                zoomBtns.forEach(btn => btn.classList.remove('active'));

                const activeClass = Object.keys(zoomLevels).find(key => zoomLevels[key] === zoomLevel);
                if (activeClass) {
                    const activeBtn = zoomDrop.querySelector(`.item-link.${activeClass}`);
                    if (activeBtn) {
                        activeBtn.classList.add('active');
                    }
                }
            });
        }
    }
});



$(function () {
    // 유통서면실태 조사 기간이 아닐때...
    $(".kftcgokr").on("click", function (event) {
        event.preventDefault();
        alert("지금은 조사기간이 아닙니다");
        return false;
    });

    
    $("#sub #accessibility a").on("click", function (e){
        e.preventDefault();
        $(".breadcrumb .home a").focus();
    });
    
    
    /* 화면크기 */
    $('.head-etc .etc-ul li:nth-last-child(2) .drop-menu .drop-btm-btn button').focusout(function(e){
        e.preventDefault();
        $(this).parents('.drop-menu').siblings('.drop-btn').removeClass('active');
        $(this).parents('.drop-menu').siblings('.drop-btn').find('.sr-only').text('열기');
        $(this).parents('.drop-menu').css('display', 'none');
		
		if (document.documentElement.lang === 'en'){
	        $(this).parents('.drop-menu').siblings('.drop-btn').find('.sr-only').text('open');
		} else {
		    $(this).parents('.drop-menu').siblings('.drop-btn').find('.sr-only').text('열기');
		}
    });

			
    /* language */	
    $('.head-etc .etc-ul li:last-child .drop-menu .drop-list li:last-child').focusout(function(e){
        e.preventDefault();
		
		if (document.documentElement.lang === 'en'){
			$(this).parents('.drop-menu').siblings('.drop-btn').find('.sr-only').text('open');
		} else {
			$(this).parents('.drop-menu').siblings('.drop-btn').find('.sr-only').text('열기');
		}
		
        $(this).parents('.drop-menu').siblings('.drop-btn').removeClass('active');
        $(this).parents('.drop-menu').css('display', 'none');
    });

    $('.head-etc .etc-ul li .drop-menu').keydown(function(e){
        if ( e.keyCode === 9 && e.shiftKey ) {
			
		if (document.documentElement.lang === 'en'){
		    $(this).siblings('.drop-btn').find('.sr-only').text('open');
		} else {
			$(this).siblings('.drop-btn').find('.sr-only').text('열기');
		};
					
         $(this).siblings('.drop-btn').removeClass('active');
         $(this).css('display', 'none');
        }
    });
	
	
});
