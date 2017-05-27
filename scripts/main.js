


$( document ).ready(function() {


var pointerColor = function (target) {
            if(((target.dataset.value) / (target.dataset.max)) <= .5){
                var color = '#74b94c';
                return color;
            }else{
                var color = '#d0021b';
                return color;
            }
    }



var allGauges = function () {

 $.each($('.gauge'), function(index, val) {

     var target = this; // your canvas element
     var opts = {

       angle: 0, // The span of the gauge arc
       lineWidth: 0.09, // The line thickness
       radiusScale: 1, // Relative radius
       pointer: {
         length: 0.45, // // Relative to gauge radius
         strokeWidth: 0.02, // The thickness
         color: pointerColor(target), // Fill color
       },
       limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
       limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
       generateGradient: true,
       percentColors : [[0.0, '#74b94c' ], [0.50, '#74b94c'], [1.0, '#d0021b']],
       highDpiSupport: true     // High resolution support
     };
     var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
     gauge.maxValue = target.dataset.max; // set max gauge value
     gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
     gauge.animationSpeed = 29; // set animation speed (32 is default value)
     gauge.set(target.dataset.value); // set actual value

});

}

allGauges();
$(window).resize(function(event) {
  allGauges();
});

 $('.trans-details').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
   rtl: true,
  asNavFor: '.transactions',
  dots:false,
  mobileFirst:true
});

$('.transactions').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.trans-details',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
   rtl: true,
   mobileFirst:true,
   nextArrow:'.trans-arrows .next',
   prevArrow:'.trans-arrows .prev'
});

$('body').on('click', '.process', function(event) {
  event.preventDefault();
  $(this).parent('.process-container').toggleClass('open');
});

$('.members-nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var hisName = $(this).find('.his-name').text() // newly activated tab
$('.header .his-name').text(hisName)
})

$('body').on('click', '.show-second', function(event) {
  event.preventDefault();
  $('body').addClass('second-modal');
});

$('#message-modal').on('hidden.bs.modal', function (e) {
  $('body').removeClass('second-modal');
})

if($('.date').length){
var dp = $('.date').datepicker({
    todayButton: new Date(),
    autoClose:true,
    onSelect: function onSelect(formatedDate, date) {
        alert(formatedDate);
        alert(date);
    }
}).data('datepicker');

}

var data = {
  // A labels array that can contain any sort of values
  labels: ['أسبوع 4','أسبوع 3','أسبوع 2','أسبوع 1'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [2, 3, 1.5, 3.5]
  ]
};

var options = {
  width: '90%',
  height: 160,
   lineSmooth: false,
    axisY:{
      showGrid: false,
      showLabel: false
    },
    low: 0
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
if($('.closed-process').length){
new Chartist.Line('.closed-process', data, options);
}
var sum = function(a, b) { return a + b };
if($('.late-process').length){

new Chartist.Pie('.late-process', {
  series: [15,71]
}, {
  donut: true,
  donutWidth: 11,
  donutSolid: true,
  startAngle: 10,
  showLabel: false,
  width: '70%',

});
}

var gaugeTitel = $('#gauge-title');

$('<span class="pull-right">'+gaugeTitel.attr('data-max')+'</span>').appendTo('.gauge-labels')
$('<span class="pull-left">0</span>').appendTo('.gauge-labels')

$('.footer').prepend('<span class="footer-toggle close"></span>')

$('body').on('click', '.footer-toggle', function(event) {
  event.preventDefault();
  $('body').toggleClass('footer-closed');

});

$('body').on('click', '.more-details', function(event) {
  event.preventDefault();
  $(this).toggleClass('opened');
  $('body').toggleClass('details-opened');
  $('.to-be-closed').slideToggle('fast');
  $('.members-table').slideToggle('fast')
});


var opc = $("#mixed");
var bar = $("#bar");
if(opc.length > 0)
{var myChart = new Chart(opc, {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [ {
      type: 'line',
      label: 'Line Component',
      data: [5,3,1,2,9,2,5,4,6,8,11,5],
      fill: false,
      lineTension:0,
      pointBackgroundColor:'#35adb3',
      pointBorderWidth:12,
      pointBorderColor:'#35adb3',
      borderColor:'#35adb3'
    },
    {
      type: 'bar',

      data: [5,3,1,2,9,7,5,4,6,8,11,5],
      backgroundColor:'#74b94c'
    }]
  },
  options: {
    plugin_one_attribute: true,

    scales: {
      yAxes: [{
        display: true,
        position: 'right',
        ticks: {

          beginAtZero: true // minimum value will be 0.
        },
        gridLines: {
                    display:false
                }
      }],
      xAxes:[{
        gridLines: {
                    display:false
                }
      }]
    },
    legend: {
            display: false
        }
  }
});
}
if(bar.length > 0){

  var customTooltips = function (tooltip) {
      $(this._chart.canvas).css("cursor", "pointer");

      $(".chartjs-tooltip").css({
        opacity: 0,
      });

      if (!tooltip || !tooltip.opacity) {
        return;

      }

      if (tooltip.dataPoints.length > 0) {
        tooltip.dataPoints.forEach(function (dataPoint) {
          var content = [dataPoint.xLabel, dataPoint.yLabel].join(": ");
          var $tooltip = $("#tooltip-" + dataPoint.datasetIndex);

          $tooltip.html(content);
          $tooltip.css({
            opacity: 1,
            top: dataPoint.y + "px",
            left: dataPoint.x + "px",
          });
        });
      }
    };


var barChart = new Chart(bar, {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
    {

      type: 'bar',

      data: [5,3,1,2,9,7,5,4,6,8,11,5],
      backgroundColor:'#74b94c'
    }]
  },
  options: {
    tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            position:'nearest',
            backgroundColor:"#fff",
            titleFontColor:"#333",
            bodyFontColor:"#333",
            caretSize:10,
            bodySpacing:5,
             callbacks: {
              title:function (tooltipItem,data) {
                return 'معاملة'
              },
            label: function(tooltipItem, data) {
                return  Number(tooltipItem.yLabel).toFixed(0);
            },
            afterBody:function (tooltipItem,data) {
              return
            }
        }
          },
    plugin_one_attribute: false,

    scales: {
      yAxes: [{
        display: true,
        position: 'right',
        ticks: {

          beginAtZero: true // minimum value will be 0.
        },
        gridLines: {
                    display:false
                }
      }],
      xAxes:[{
        gridLines: {
                    display:false
                }
      }]
    },
    legend: {
            display: false
        }
  }
});}


var pieConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [4,6,2],
                backgroundColor:[
                  '#ef5050',
                  '#3981bb',
                  '#74b94c'
                ],
                label: '',
            borderWidth:'2px'
            }],
            labels: [
                "  عاجل جداً",
                "  عاجل ",
                "  عادي"
            ]
        },
        options: {
          plugin_two_attribute: true,
          cutoutPercentage: 70,
            responsive: true,
            legend: {
                position: 'bottom',
                labels:{
                usePointStyle: true,
                pointStyle: 'circle',
                padding:10
                }
            },
            title: {
                display: false
            },
            animation: {
                animateScale: false,
                animateRotate: true
            }
        }
    };

if(document.getElementById("pie"))
   {var ctx = document.getElementById("pie").getContext("2d");
           var myDoughnat = new Chart(ctx, pieConfig);
   }
if(typeof Chart != 'undefined'){
Chart.plugins.register({
  beforeDraw: function(chart) {
     if (chart.config.options.plugin_two_attribute)
    {var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize ='32px';
        ctx.font = "23px 'dinnRegular'";
        ctx.textBaseline = "middle";
        ctx.textAlign = 'center';

        var text = "23",
            textX = width / 2,
            textY = (height / 2) - 30;
        var text2 = "مجموع المعاملات",
            text2X = width / 2,
            text2Y = (height / 2);

        ctx.fillText(text, textX, textY);
        ctx.font = "12px 'dinnRegular'";
        ctx.fillText(text2, text2X, text2Y);
        ctx.save();
      }}
});

        Chart.plugins.register({
            afterDatasetsDraw: function(chartInstance, easing) {
               if (chartInstance.config.options.plugin_one_attribute)
               {
                // To only draw at the end of animation, check for easing === 1
                var ctx = chartInstance.chart.ctx;

                chartInstance.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function(element, index) {
                            ctx.fillStyle = '#ffffff';

                            var fontSize = 12;
                            var fontStyle = 'normal';
                            var fontFamily = 'dinnRegular';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            var dataString = dataset.data[index].toString();

                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            var padding = 5;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding +10);
                        });
                    }
                });
            }
            }
        });
}





$('body').on('click', '.big-calendar', function(event) {
  event.preventDefault();
  $('body').addClass('calendar');
  $('.all-events').slideUp('fast')
});
$('body').on('click', '.event-details', function(event) {
  event.preventDefault();
  $('body').removeClass('calendar');
  $('.all-events').slideDown('fast')
});

});


