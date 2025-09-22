/* 서브 */
// 모바일 서브 드롭 타이틀 - 20240830 추가
/*document.addEventListener('DOMContentLoaded', () => {
    const activeLeftItem = document.querySelector('.sub-menu-list > li.active');
    const activeSubTitle = document.querySelector('.sub-head .sub-title').innerText;
    if (activeLeftItem) {
        const subUl = activeLeftItem.querySelector('.sub-ul');
        if (subUl) {
            const header = document.querySelector('.sub-head');
            if (header) {
                const updatedSubUlHtml = subUl.innerHTML.replace(/class="subm"/g, 'class="item-link"');
                const newDropHtml = `
                    <div class="krds-drop-wrap sub-title-drop">
                        <button type="button" class="sub-title drop-btn">${activeSubTitle}</button>
                        <div class="drop-menu">
                            <div class="drop-in">
                                <ul class="drop-list">
                                    ${updatedSubUlHtml}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;

                header.insertAdjacentHTML('beforeend', newDropHtml);
            }
        }
    }
});*/

//url 복사 - 20240902 추가
const copyButtons = document.querySelectorAll(".url-copy");
copyButtons.forEach(button => {
    button.addEventListener("click", function() {
        const url = window.location.href;
        const tempInput = document.createElement("textarea");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        const aaa = document.querySelector(".url-copy").classList.contains('eng')
        console.log(aaa);
        console.log(copyButtons);
        if(document.querySelector(".url-copy").classList.contains('eng')){
            alert("URL Copied!");
        } else{
            alert("URL이 복사되었습니다!");
        }
    });
});



//print 새창 - 20241219 추가
document.querySelector('.util-item.print button').addEventListener('click', function (e) {
 e.preventDefault();
 e.stopPropagation();

 const currentPageUrl = window.location.href;
 const printWindowWidth = 1024;
 const printWindowHeight = 800;
 const windowFeatures = `width=${printWindowWidth},height=${printWindowHeight},top=100,left=100`;
 const newWindow = window.open(currentPageUrl, '_blank', windowFeatures);

 newWindow.onload = function () {
     const newBody = newWindow.document.body;

     newBody.classList.add('printPage');

     if (newBody.classList.contains('printPage')) {
         newWindow.print();
     }

     //인쇄 취소시 창 닫기
     /*newWindow.onafterprint = function () {
         newWindow.close();
     };*/
 };
});

document.querySelector('.util-item.print button').onclick = null;


//select goto url
function privateUrl(){
    var value = document.getElementById("privateSelectUrl").value;
    if(value){
        window.location.href = value;
        return;
    } else{
        alert("이동할 페이지를 선택해 주세요.");
        return false;
    }
}

//table 새창
document.addEventListener("DOMContentLoaded", function () {
    var lang = document.documentElement.lang === "en" ? "New Window" : "새창";
    var fileDownloadText = document.documentElement.lang === "en" ? "File download" : "파일 다운로드";
	
    function setTitleIfExists(selector, title) {
        document.querySelectorAll(selector).forEach(function (el) {
            if (el.getAttribute("target") === "_blank") {
                el.setAttribute("title", title);
            }
        });
    }

    function setTitle(selector, title) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.setAttribute("title", title);
        });
    }
	
	function setText(selector, text) {
	    document.querySelectorAll(selector).forEach(function (el) {
	        el.textContent = text;
	    });
	}

    setTitleIfExists(".p-wrap.bbs .p-table td.p-file a[target='_blank']", lang);
    setTitleIfExists(".p-wrap.bbs .p-table td.p-subject a[target='_blank']", lang);
    setTitleIfExists(".p-wrap.bbs .p-table td .p-attach .p-attach__item a[target='_blank']", lang);
    setTitleIfExists(".p-wrap .search-list.card .p-table .p-file a[target='_blank']", lang);

    setTitle(".p-wrap.bbs .p-table td .p-attach .p-attach__item .p-attach__link", fileDownloadText);
	setTitle(".p-wrap .p-table .p-file a.ico-down", fileDownloadText);
	
	/*if (document.documentElement.lang === "en") {
		setText('.p-wrap .p-table .p-file a.ico-down', 'File Download');
		setText('.p-wrap .p-table .p-file a.ico-view', 'Document Viewer');
	}*/
	
});


/* 개인정보처리방침 */
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("#contents .guideline .krds-disclosure.conts-expand-area .btn-conts-expand");

    buttons.forEach(button => {
        const parent = button.closest(".krds-disclosure.conts-expand-area");

        function updateButtonText() {
            if (parent.classList.contains("active")) {
                button.textContent = button.textContent.replace("보기", "닫기");
            } else {
                button.textContent = button.textContent.replace("닫기", "보기");
            }
        }

        button.addEventListener("click", updateButtonText);

        const observer = new MutationObserver(updateButtonText);
        observer.observe(parent, { attributes: true, attributeFilter: ["class"] });
    });
});


$(function(){
    // 테이블 반응형
    var $tableResponsive = $('.colgroup #contents').find('.tbl-wrap.responsive .tbl');

    $tableResponsive.each(function(index, element) {
        var $element = $(element),
            rowdivIs = $element.find('td, th').is('[rowdiv]'),
            theadLength = $element.find('thead').length;

        if(rowdivIs == false && !theadLength == 0){
            $element.find('tbody th, tbody td').each(function(index, element) {
                var $this = $(element),
                    thisIndex = $this.index(),
                    theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

                $this.attr('data-content', theadText);
            });

            $element.find('tfoot th, tfoot td').each(function(index, element) {
                var $this = $(element),
                    thisIndex = $this.index(),
                    theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

                $this.attr('data-content', theadText);
            });
        }
    });
    
    $(".txt-box.agree-scroll .agree-scroll-inner").attr("tabindex", "0")

    $('.btn-sch-filter').find('.sr-only').text("열기")
    $(".btn-sch-filter").on("click", function(){
       const $filterBtn = $(this);
       const $filterToggle = $(".filter-toggle");
       
       if($filterBtn.hasClass("active")){
           $filterBtn.removeClass("active").find('.sr-only').text("열기");
           $filterToggle.slideUp();
       } else{
           $filterBtn.addClass("active").find('.sr-only').text("닫기");
           $filterToggle.slideDown();
       }
    });

    //accordion
    $('.accordion .accordion-item .btn-accordion').attr('title', '열기');
    $('.accordion .accordion-item .btn-accordion').on("click", function(){
       const $btnAccordion = $(this);
       const $AccordionItem = $btnAccordion.parents('.accordion-item');
       if($AccordionItem.hasClass("active")){
          $btnAccordion.attr('title', '열기');  
        } else{
          $btnAccordion.attr('title', '닫기');
          $(this).parents('.accordion-item').siblings().find('.btn-accordion').attr('title', '열기');  
       }
    });
	

	//프린트새창
	var lang = document.documentElement.lang;
	if (lang === 'ko'){
		$('.util-item.print button').attr('title', '새창');
	}
	else if (lang === 'en') {
		$('.util-item.print button').attr('title', 'new window');
	}	
	
	
   //게시물 검색
	const legendElement = document.querySelector('.boardSearchForm fieldset legend');
			
	if (legendElement) {
	    if (document.documentElement.lang === 'en'){
		    legendElement.textContent = "Post Search";
		} else {
		    legendElement.textContent = "게시물 검색";
		}
	}

	
	
});

//개인정보처리방침 - 20250415 추가
document.addEventListener('DOMContentLoaded', function () {
  const guideline = document.querySelector('.guideline');

  if (guideline) {
    guideline.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (!targetEl) return;

        const offset = window.innerWidth > 1024 ? 178 : 80;
        const targetTop = targetEl.offsetTop - offset;

        document.body.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }
});