$(document).ready(function()
{
      //Featured Media Image
    var $FMI = $(".js-fmi"),
    $newsletterStatus = $(".newsletter-status");

      $FMI.each(function(){
            $this = $(this);
            TweenMax.set($this, {perspective: 1500});

            $this.hover(
                  function() {
                        $this = $(this);
                        showFMI($this);
                  }, 
                  function() {
                        $this = $(this);
                        showFMI($this, false);
                  }

            );
      });

      function showFMI($target, $bool) {
            var $this = $target,
            $mediaImage = $this.find('img'),
            $mediaCaption = $this.find('div'),
            $mediaType = $this.find('h5'),
            $mediaText = $this.find('p');

            if($bool === false) {
                  TweenMax.to($mediaCaption, 1, {opacity: 0, z:0}, {delay: 1});
                  TweenMax.to($mediaImage, 0.3, {scale: 1.1, opacity: 1, z:0});
            }  else {
                  TweenMax.to($mediaCaption, 1, {opacity: 1, z:0});
                  TweenMax.to($mediaImage, 1, {scale: 1, opacity: 1, z:0});
                  TweenMax.from($mediaType, 1, {scale: 1.5, left: 1000, z:0, ease:Quint.easeOut});
                  TweenMax.from($mediaText, 0.6, {scale: 10, rotationY: 45, z:0, translateX: "100%", ease:Circ.easeOut});
            }
      }

      /*$slider = $(".js-slider-wrapper");
      $sliderPrev = $(".js-slider-prev");
      $sliderNext = $(".js-slider-next");
      $slider.owlCarousel({
            items: 1,
            loop: true,
            touchDrag: true,
            autoHeight: true,
            navText: ['next', 'prev'],
            autoplay: true,
            smartSpeed: 400,
            animateIn: true,
            mobileBoost: true,
            dotData: true
      });*/
var $loadMore = $(".load-more");
$jsLoadMore = $(".js-load-more");
$loadMore.on('click', $jsLoadMore, function(e){
      var $this = $(this);
      $href = $this.find('a').attr("href");
      $href = $href.replace('media', 'media/mini-media');
      $.getJSON($href, function( data) {
        //console.log(data);
        $mediaList = data.links;
        $mediaLink = $mediaList ? $mediaList.pop() : "";
        if($mediaLink.nextLink != "") {
            $this.find('a').attr("href", $mediaLink.nextLink);
        } else {
            console.log("yes");
        }
        console.log(typeof $mediaLink.nextLink);
        if($mediaLink.nextLink == "") {
            console.log("yes");
        }

        //_.each($mediaList, loadMoreMedia());
        _.each($mediaList, loadMoreMedia);

      });


      e.preventDefault();
})

function loadMoreMedia($item) {

      var mediaListTemplate = _.template('<div class="media">
            <div class="item">
                <a href="<%= url %>" title="<%= title %>">
                <%= cover_image %>

                <h4 class="caption"><%= title %></h4>
                </a>
            </div>
        </div>');

//console.log(mediaListTemplate($item));

$mainContent = $(".main-content");
    $(".load-more").before(mediaListTemplate($item));
}

/*function activateCarousel() {
      $carousel = $(".carousel");

      if($carousel.length > 0) {
      } 
}

Modernizr.load({

});

activateCarousel();
*/

$carousel = $(".carousel");
$carousel.owlCarousel({
    autoPlay: 6000, //Set AutoPlay to 3 seconds
    items: 10,
    itemsDekstop: [1200, 7],
    itemsDesktopSmall: [1000, 8],
    itemsTablet: [768, 6],
    itemsMobile: [479, 4],
    //navigation: true,
    //navigationText : ["prev","next"],
    scrollPerPage : false,
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    lazyLoad : true,
    lazyFollow : true,
    lazyEffect : "fade",
    autoHeight : true,
});

$jsSlideshow = $(".js-slideshow");
$jsSlideshowContainer = $(".js-slideshow-container");
$loadSpinner = $("#fountainG");

$jsSlideshow.on('click', function(e){
     e.preventDefault();
    $this = $(this);
    $jsSlideshowLink = $this.attr("href");
    //$scWidth = $jsSlideshowContainer.outerWidth();
    $scHeight = $jsSlideshowContainer.outerHeight();
    $scCurrentImg =  $jsSlideshowContainer.find("img");

    $jsSlideshowContainer.imagesLoaded($jsSlideshowLink)
        .progress(function(insance, image){
            TweenMax.fromTo($loadSpinner, 1, {y: "100%", z: 0, autoAlpha: 0}, {autoAlpha: 1, z: 0, y: 0});
        })
        .done(function(instance){
            $jsSlideshowContainer.css({height: $scHeight});
            var imgTimeline = new TimelineMax({smoothChildTiming: true});

            imgTimeline.to($scCurrentImg, 1, {autoAlpha: 0, perspective: "30px", scaleX: 3, scaleY: 3, z: -300, transformOrigin: "0% 100%", rotationY: 15, rotationX: 15, onComplete: function(){
                  $scCurrentImg.attr("src", $jsSlideshowLink);
            }, ease:Expo.easeOut})
            .to($jsSlideshowContainer, 0.2, {height: "auto", z: -300, ease:Expo.easeInOut})
            .to($scCurrentImg, 1, {autoAlpha: 1, scaleX: 1, delay: 0.1, scaleY: 1, perspective: "-30px", z: -300, rotationY: 0, rotationX: 0, ease:Expo.easeOut});
             TweenMax.to($loadSpinner, 1, {autoAlpha: 0, z: 0, y: 0, delay: 1});
        });
  
});
$(".newsletter-signup-form").submit(function(e){
  $this = $(this);
  $.ajax({
        type: 'POST',
        url: $this.attr('action'),
        data: $this.serialize(),
        success:function(data){
            if(data.success){
               $newsletterStatus.find("span").html("<strong>Thank You.</strong> Your email has been successfully added to our newsletter.");
                TweenMax.fromTo($newsletterStatus, 1, {y: "100%", z: 0, autoAlpha: 0}, {autoAlpha: 1, z: 0, y: 0});

               //$newsletterStatus.delay(500).slideDown(500,'easeInOutSine');

                setTimeout(function(){
                    $(".newsletter-status").delay(500).slideDown(500,'easeInOutSine');}, 10000
                );
                console.log(data.message);
            } else {
                $newsletterStatus.find("span").html("<strong class='burgundy'>Error.</strong> Your email address could not be added at this time. Please confirm that your email address is correct");
                TweenMax.fromTo($newsletterStatus, 1, {y: "100%", z: 0, autoAlpha: 0}, {autoAlpha: 1, z: 0, y: 0});
                //$newsletterStatus.delay(500).slideDown(500,'easeInOutSine');
                console.log(data);
            }
        },
        dataType:'json',
        async:false
    });
  e.preventDefault();
});

$nsClose = $(".js-ns-close");
$nsClose.on("click", function(){
     TweenMax.to($newsletterStatus, 1, {y: "100%", z: 0, autoAlpha: 0});

});

$miniMenu = $(".mini-menu");
$mobileMiniNav = $(".mobile-show-block");

$miniMenu.on('click', function(){
    if ($mobileMiniNav.hasClass('js-is-hidden')) {
        TweenMax.to($mobileMiniNav, 1, {autoAlpha: 1, height: '700px'});
        $mobileMiniNav.removeClass('js-is-hidden');
    } else {
        TweenMax.to($mobileMiniNav, 1, {autoAlpha: 0, height: 0});
        $mobileMiniNav.addClass('js-is-hidden');
    }
});
});