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
            $this = $target;
            $mediaCaption = $this.find('div'),
            $mediaType = $this.find('h5'),
            $mediaText = $this.find('p');

            if($bool === false) {
                  TweenMax.to($mediaCaption, 1, {opacity: 0}, {delay: 1});
            }  else {
                  TweenMax.to($mediaCaption, 1, {opacity: 1});
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
});