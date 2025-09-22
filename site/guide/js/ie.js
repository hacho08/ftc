function isIe(){
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf("msie") != -1 || myNav.indexOf('trident') != -1) ? true : false;
}

if(isIe()){
    $.getScript('/site/guide/js/ie.js', function() {
        document.body.style.zoom = "1";

        var modalContent =
            '<section id="modal-ie" class="modal fade shown in" aria-hidden="true" role="dialog" aria-labelledby="modal-ie" style="box-shadow:0 5px 10px rgba(0,0,0,.1);">' +
            '<div class="modal-dialog" style="height:calc(100% - 1.6rem); margin:1.6rem auto;">' +
            '<div class="modal-content" style="background-color:#fff; border-radius:1.2rem;">' +
            '<div class="modal-header" style="padding:4rem 6.8rem 2rem 4rem;">' +
            '<h2 id="tit_modal_sample_03" class="modal-title" style="font-size:2.1rem;">인터넷 익스플로러 브라우저 지원 종료 안내</h2>' +
            '</div>' +
            '<div class="modal-conts" style="padding:0 4rem; color:#1d1d1d; gap:2rem;">' +
            '<div class="conts-area" style="display:block; font-size:1.6rem;">' +
            '2022년 6월 15일부터 마이크로소프트사의 인터넷 익스플로러 브라우저 기술 지원 및 보안 업데이트 지원이 중단되었습니다.<br>' +
            '공정거래위원회 웹서비스를 이용하시려면, 마이크로소프트 엣지, 크롬 등의 브라우저 최신 버전을 이용해 주세요.' +
            '</div>' +
            '</div>' +
            '<div class="modal-btn btn-wrap" style="gap:0.8rem; padding:3.2rem 4rem 4rem;">' +
            '<a href="https://www.microsoft.com/ko-kr/edge/" target="_blank" title="새창" class="btn tertiary xsm" style="padding:1rem; border:1px solid #1d1d1d; border-radius:.6rem; color:#000b17; font-size:1.5rem;">Microsoft Edge 다운로드</a>' +
            '<a href="https://www.google.com/intl/ko_kr/chrome/" target="_blank" title="새창" class="btn tertiary xsm" style="margin-left:8px; padding:1rem; border:1px solid #1d1d1d; border-radius:.6rem; color:#000b17; font-size:1.5rem;">Chrome 다운로드</a>' +
            '</div>' +
            
            '</div>' +
            '</div>' +
            '<div class="modal-back in" style="background-color:rgba(255,255,255,.95);"></div>' +
            '</section>';

        $('body').prepend(modalContent);
    });
} 