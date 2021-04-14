$(document).ready(() => {

	$("select").select2({
		minimumResultsForSearch: Infinity
	  });

	if ($('#map').length) {
		var lat = parseFloat($('#map').data('lat'));
		var lng = parseFloat($('#map').data('lng'));
	  // When the window has finished loading create our google map below
	  google.maps.event.addDomListener(window, 'load', init);
	  function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
		  // How zoomed in you want the map to start at (always required)
		  zoom: 16,
		  disableDefaultUI: false,
		  scrollwheel: true,
		  navigationControl: true,
		  mapTypeControl: false,
		  scaleControl: true,
		  draggable: true,
		  center: new google.maps.LatLng(lat , lng),
	
		};
	
		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');
	
		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);
		var markerImage = {
			url: '../images/map_img.svg',
	
			origin: new google.maps.Point(0, 0),
		}
		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(lat, lng),
		  map: map,
		  icon: markerImage,
		});
	  }
	}

	//multiselect
	// const displayLimit = $("select.select-packages").width() > 700 ? 4 : 1;
	// $("select.select-packages").selectric({
	// 	labelBuilder: function (option) {
	// 		if(option.text=="..."){
	// 			const l = $("select.select-packages option:selected").length - displayLimit;
	// 			return '<span class="more"> and ' + l + " more</span>";
	// 		}
	// 		else return '<span class="with-slash">' + option.text + "</span>";
	// 	},
	// 	multiple: {
	// 		separator: '',       
	// 		keepMenuOpen: true, 
	// 		maxLabelEntries: displayLimit
	// 	},
	// 	disableOnMobile: false,
	// 	nativeOnMobile: false
	// });

	//  Range  Slider
	var settings = {
        fill: '#C40000',
        background: '#E6E6E6',
        step: 0.1
    }
    var sliders = document.querySelectorAll('.range-slider');
    Array.prototype.forEach.call(sliders, (slider) => {
        slider.querySelector('input').addEventListener('input', (event) => {
            slider.querySelector('input.range-slider__value').value = event.target.value;
            applyFill(event.target);
        });
		slider.querySelector('input.range-slider__value').addEventListener('keyup', (event) => {
			const val = $.trim(event.target.value).replace(/[^0-9.]/g, '');
		
            slider.querySelector('input.range-slider__range').value = val=="" ? 0 : val;
			slider.querySelector('input.range-slider__value').value = val;
            applyFill(slider.querySelector('input.range-slider__range'));
        });
        applyFill(slider.querySelector('input'));
    });


    function applyFill(slider) {
        var percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
        var bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
        slider.style.background = bg;
    }



	$("body").on("click", ".open_popup", function (e) {
		e.preventDefault();
		if ($(this).attr("data-target")) {
			$($(this).attr("data-target")).openPopup();
		}
	});

	$("body").on("click", ".popup button.close", function (e) {
		e.preventDefault();
		$(this).closest(".popup").closePopup();
	});

	 //tabs
	 $('body').on('click','.tabs[data-target] > *:not(.active)',function(e){
		e.preventDefault();
		const tab_parent =  $(this).closest('.tabs'),
		  target = tab_parent.attr('data-target');
		if(tab_parent.length > 0 && target){
	
		  const tab = $(this),
			tabs = tab_parent.find('>*'),
			index = tabs.index(tab),
			content = $(target).find('>*');
	
		  tabs.removeClass('active');
		  content.removeClass('active');
	
		  tab.addClass('active');
		  content.eq(index).addClass('active');
		}
	  });

	$("form.validation").validationEngine({
		showPrompts: false,
		addFailureCssClassToField: "error",
		onFieldFailure: function (field) {
			if (field) {
				if (field.is(":radio")) {
					$(field).closest(".check_wrap").addClass("error");
				} else {
					$(field).parent().removeClass("success");
				}
			}
		},
		onFieldSuccess: function (field) {
			if (field) {
				if (field.is(":radio")) {
					$(field).closest(".check_wrap").removeClass("error");
				} else if (!$(field).is('[data-mask="phone"]')) {
					const p = $(field).parent();
					if (!p.find("i.success").length)
						$("<i/>").addClass("success").appendTo(p);
					p.addClass("success");
				}
			}
		},
	});
	$("form.validation [class*=validate]").on("change blur keyup", function () {
		$(this).validationEngine("validate");
	});

	$("body").on("click", "form.validation button[type=submit]", function (e) {
		let status = 1;
		$(this)
			.closest("form")
			.find("[class^=validate]")
			.each(function () {
				status = status & !$(this).validationEngine("validate");
			});
		return status;
	});
	
	$("#imageUpload").change(function () {
		readURL(this);
	});

	$("body").on("click", ".open_mobile_menu", function () {
		$(".mobile_menu").addClass("animate");
		setTimeout(() => $(".mobile_menu").addClass("active"), 1);
		$("body").addClass("disable_scroll");
	});

	$("body").on("click", ".mobile_popup .header .close", function () {
		const popup = $(this).closest(".mobile_popup");
		popup.removeClass("active");
		setTimeout(() => popup.removeClass("animate"), 400);
		$("body").removeClass("disable_scroll");
	});

	if ($(".home_slider").length > 0) {

		tns({
			container: ".home_slider .slider",
			controlsText: ["", ""],
			controls: true,
			items: 1,
			loop: false,
			mouseDrag: true,
			touch: true
		});
	  }

	  if ($(".how_it_work").length > 0) {
		tns({
			container: ".how_it_work .slider",
			controlsText: ["", ""],
			loop: true,
			autoplayButton: false,
			mouseDrag: true,
			touch: true,
			responsive: {
				0: {
					items: 1.1,
					gutter: 15,
					edgePadding: 23,
					speed: 400,
				},
				"992": {
					items: 3,
					gutter: 30,
				},
			},
		});
	}

	if($('.faq').length){
		$('.faq .item h3').click(function(){
		  var item = $(this).parent();
		  if(item.hasClass('open'))item.removeClass('open');
		  else item.addClass('open');
		});
	  }

	$(".bg_overlay").click(function () {
		$(".mobile_menu").removeClass("active");
		$("body").removeClass("disable_scroll");
	});

	$("body").on("click", ".d_dropdown", function (e) {
		e.stopPropagation();
	});
	$("body").on("click", ".d_dropdown .drop_content a", function (e) {
		$(this).closest(".d_dropdown").removeClass("active");
		$(document).off("click.d_dropdown");
	});

	//datepicker
	$('.datepicker_h').datetimepicker({format:"DD.MM.YYYY, HH:mm"});
	

	//spinner
	var numberSpinner = (function () {
		$(".number-spinner>.ns-btn>a").click(function () {
			var btn = $(this),
				input = btn.closest(".number-spinner").find("input"),
				max = input.attr("max") * 1,
				min = input.attr("min") * 1,
				oldValue = input.val().trim(),
				newVal = 0;
	
			if (btn.attr("data-dir") === "up") {
				newVal = parseInt(oldValue) + 1;
			} else {
				if (oldValue > 0) {
					newVal = parseInt(oldValue) - 1;
				} else {
					newVal = 0;
				}
			}
	
			if (newVal <= max && newVal >= min) input.val(newVal);
		});
		$(".number-spinner>input").keypress(function (evt) {
			evt = evt ? evt : window.event;
			var charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		});
		$(".number-spinner>input").blur(function () {
			var input = $(this),
				max = input.attr("max") * 1,
				min = input.attr("min") * 1,
				val = input.val().trim();
	
			if (val > max) input.val(max);
			if (val < min) input.val(min);
		});
	})();

	// Copy address text
    $(document).on('click', '.copy_btn', function() {
        var t = $(this);
        t.addClass('copied, hint--top hint--bounce')
        copyToClipboard(t.parent().children('span.text').text());
        setTimeout(function() {
            t.removeClass('copied, hint--top hint--bounce')
        }, 900);
    });
});
const copyToClipboard = function(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

//popup
$.fn.openPopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		const opened_popup = $(".popup").filter(".show");

		if (opened_popup.length) opened_popup.closePopup();

		elem.addClass("show");
		setTimeout(() => elem.addClass("animate"), 1);
		elem.trigger("openPopup");
		elem.off("click.popup").on("click.popup", function (e) {
			if ($(e.target).hasClass("popup")) elem.closePopup();
		});
	}
};
$.fn.closePopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		elem.removeClass("animate");
		setTimeout(() => elem.removeClass("show"), 400);
		elem.trigger("closePopup");
	}
};

//password
$(function () {
	$(".hide-show").show();
	$(".hide-show span").addClass("show");

	$(".hide-show span").click(function () {
		const inp = $(this).parent().parent().find("input");
		if ($(this).hasClass("show")) {
			inp.attr("type", "text");
			$(this).removeClass("show");
		} else {
			inp.attr("type", "password");
			$(this).addClass("show");
		}
	});

	$('form button[type="submit"]').on("click", function () {
		$(".hide-show span").addClass("show");
		$(".hide-show").each(function () {
			$(this).parent().find("input").attr("type", "password");
		});
	});
});

$("[data-mask]").each(function () {
	const type = $(this).data("mask");
	switch (type) {
		case "phone":
			$(this).inputmask({
				showMaskOnHover: false,
				mask: "(+994) ## ###-##-##",
				oncomplete: function () {
					const p = $(this).parent();
					if (!p.find("i.success").length)
						$("<i/>").addClass("success").appendTo(p);
					p.addClass("success");
				},
				onincomplete: function () {
					$(this).parent().removeClass("success");
				},
				definitions: {
					"#": {
						validator: "[0-9]",
						cardinality: 1,
						casing: "lower",
					},
					"*": {
						validator: "(10|50|51|55|60|70|77|99)",
						cardinality: 2,
						prevalidator: [{ validator: "[15679]", cardinality: 1 }],
					},
				},
			});
			break;
		case "numeric":
		case "integer":
			$(this).inputmask(type, { rightAlign: false });
			break;
		case "cur":
			$(this).inputmask({
				suffix: " " + $(this).data("currency"),
				groupSeparator: ",",
				alias: "numeric",
				placeholder: "0",
				autoGroup: !0,
				digits: 2,
				digitsOptional: !1,
				clearMaskOnLostFocus: !1,
				rightAlign: false,
			});
			break;
	}
});

