$(document).ready(function()
{
      //Featured Media Image
      var $FMI = $(".js-fmi");

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
                  TweenMax.to($mediaCaption, 1, {opacity: 0}, {delay: 1});
                  TweenMax.to($mediaImage, 0.3, {scale: 1.1, opacity: 1});
            }  else {
                  TweenMax.to($mediaCaption, 1, {opacity: 1});
                  TweenMax.to($mediaImage, 1, {scale: 1, opacity: 1});
                  TweenMax.from($mediaType, 1, {scale: 1.5, left: 1000, ease:Quint.easeOut});
                  TweenMax.from($mediaText, 0.6, {scale: 10, rotationY: 45, translateX: "100%", ease:Circ.easeOut});
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
$loadMore = $(".load-more");
$jsLoadMore = $(".js-load-more");
$loadMore.on('click', $jsLoadMore, function(){
      $mediaList = [
            {
                  src: "/assets/img/media-page3.jpg", 
                  title: "Ugie Ewere with the Oba of Benin at the Royal Palace"
            }, 
            {
                  src: "/assets/img/media-page4.jpg", 
                  title: "Ugie Ewere with the Oba of Benin at the Royal Palace"
            }, 
            {
                  src: "/assets/img/media-page5.jpg", 
                  title: "Ugie Ewere with the Oba of Benin at the Royal Palace"
            },
            {
                  src:"/assets/img/media-page6.jpg",
                  title: "New Igue Festival Brochure"
            },
            {
                  src:"/assets/img/media-page7.jpg",
                  title: "New Igue Festival Brochure"
            },
            {
                  src:"/assets/img/media-page8.jpg",
                  title: "New Igue Festival Brochure"
            }
            ];

      //_.each($mediaList, loadMoreMedia());
      _.each($mediaList, loadMoreMedia);
})

function loadMoreMedia($item) {

      var mediaListTemplate = _.template('<div class="media">
            <div class="item">
                <img src="<%= src %>" alt="<%= title %>">

                <h3 class="caption"><%= title %></h3>
            </div>
        </div>');

console.log(mediaListTemplate($item));

$mainContent = $(".main-content");
$mainContent.append(mediaListTemplate($item));
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
    items: 5,
    itemsDekstop: [1200, 7],
    itemsDesktopSmall: [1000, 4],
    itemsTablet: [768, 4],
    itemsMobile: [479, 3],
    //navigation: true,
    //navigationText : ["prev","next"],
    scrollPerPage : false,
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    lazyLoad : true,
    lazyFollow : true,
    lazyEffect : "fade",
    autoHeight : false,
});

});