document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js loaded');
    const chartData = window.chartData.split('\n').slice(1).map(row => row.split(','));
    const chartData2 = window.chartData2.split('\n').slice(1).map(row => row.split(','));
    const chartData3 = window.chartData3.split('\n').slice(1).map(row => row.split(','));
    const chartData4 = window.chartData4.split('\n').slice(1).map(row => row.split(','));

    // console.log(document.getElementById('companyDetails').textContent)
//     console.log(window.companyDetail);
// console.log(window.lastRow);
// console.log(window.newsData);



    // chart 1
    const dates1 = chartData3.map(row => row[0]);
    const closePrices1 = chartData3.map(row => parseFloat(row[4]));
    const ctx1 = document.getElementById('stockChartTop').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: dates1,
            datasets: [{
                label: '',
                data: closePrices1,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'red',
                borderWidth: 1,
                fill: false
            }]
        },
        // continue with other chart options...
        options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                display: false
              }
            },
            elements: {
              point: {
                radius: 0
              },
              line: {
                tension: 0
              }
            },
            layout: {
              padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }
            }
          }
    });

    // chart 2
          // Map your data to the format expected by Chart.js
          // const chartJsData = chartData.map(row => ({
          //   t: new Date(row[0]).getTime(),
          //   o: parseFloat(row[1]),
          //   h: parseFloat(row[2]),
          //   l: parseFloat(row[3]),
          //   c: parseFloat(row[4])
          // }));

          // // Create a new Chart.js chart
          // const ctx2 = document.getElementById('stockChartContainer').getContext('2d');
          // new Chart(ctx2, {
          //   type: 'candlestick',
          //   data: {
          //       datasets: [{
          //           data: chartJsData
          //       }]
          //   },
          //   options: {
          //       scales: {
          //           x: {
          //               type: 'time',
          //               position: 'bottom'
          //           }
          //       }
          //   }
          // });




    ///////////////
    const dataPoints = chartData.map(row => [
        new Date(row[0]).getTime(),
        parseFloat(row[1]),
        parseFloat(row[2]),
        parseFloat(row[3]),
        parseFloat(row[4])
    ]);
    Highcharts.stockChart('stockChartContainer', {
        chart: {
            type: 'candlestick',
            backgroundColor: 'none',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#ddd'
        },
        // continue with other chart options...
        rangeSelector: {
            buttons: [{
              type: 'week',
              count: 1,
              text: '1w'
            }, {
              type: 'week',
              count: 2,
              text: '2w'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'month',
              count: 2,
              text: '2m'
            }, {
              type: 'month',
              count: 4,
              text: '4m'
            }, {
              type: 'month',
              count: 6,
              text: '6m'
            },{
              type: 'month',
              count: 8,
              text: '8m'
            },  {
              type: 'all',
              text: 'All'
            }],
            selected: 3,
            buttonTheme: {
              fill: 'rgba(0, 123, 255, 0.5)',
              stroke: 'rgba(0, 123, 255, 1)',
              'stroke-width': 1,
              style: {
                color: 'white'
              },
              states: {
                select: {
                  fill: 'red',
                  stroke: 'rgba(0, 123, 255, 1)',
                  'stroke-width': 2,
                  style: {
                    color: 'white'
                  }
                }
              }
            }
          },
          title: {
            text: 'Company Stock Price',
            style: {
              color: 'white',
              fontSize: '18px'
            }
          },
          plotOptions: {
            candlestick: {
              color: 'green',
              upColor: 'red',
              lineColor: 'black',
              upLineColor: 'black',
              lineWidth: 1.5, // Increase the line width
              pointWidth: 16, // Increase the point width to enlarge the candles
              animation: false, // Disable animation to remove gaps between candles
              states: {
                hover: {
                  lineWidth: 5 // Increase the line width on hover
                }
              },
              tooltip: {
                pointFormat:
                  '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.4f}</b><br/>' + // Display up to 4 decimal places
                  'High: <b>{point.high:.4f}</b><br/>' +
                  'Low: <b>{point.low:.4f}</b><br/>' +
                  'Open: <b>{point.open:.4f}</b><br/>' +
                  'Close: <b>{point.close:.4f}</b><br/>'
              }
            }
          },
          series: [{
            type: 'candlestick',
            name: 'Stock Price',
            data: dataPoints
          }],
          yAxis: {
            // gridLineColor: '#ddd',
            gridLineWidth: 0, // Add this line
            labels: {
              style: {
                color: '#555'
              },
              format: '{value:.4f}' // Format Y-axis labels to display up to 4 decimal places
            },
            title: {
              text: 'Price',
              style: {
                color: '#555',
                fontWeight: 'bold'
              }
            },
            minPadding: 0.0, // Increase padding at the bottom of the Y-axis to fit larger candles
            maxPadding: 0.0, // Increase padding at the top of the Y-axis to fit larger candles
          },
          xAxis: {
            gridLineColor: '#ddd',
            labels: {
              style: {
                color: '#555'
              }
            },
            title: {
              text: 'Date',
              style: {
                color: '#555',
                fontWeight: 'bold'
              }
            }
          }
    });

    // chart 3
    const dates = chartData2.map(row => row[0]);
    const closePrices = chartData2.map(row => parseFloat(row[4]));
    const ctx = document.getElementById('mainLineChart').getContext('2d');
    ctx.canvas.style.zIndex = '1';
    const mainlineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '',
                data: closePrices,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        // continue with other chart options...
        options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true, // Enable tooltips
                mode: 'index', // Display data for all data points of the same index (same date)
                intersect: false, // Show data even if not directly over the data point
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y.toFixed(2); // Display up to 4 decimal places
                    return `${label}: ${value}`;
                  },
                  title: function (context) {
                    return 'Date: ' + context[0].formattedValue;
                  }
                }
              }
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date',
                  color: 'white' // Change the color of the x-axis title
                },
                ticks: {
                  color: 'white', // Change the color of the x-axis labels
                  callback: function(value, index, values) {
                    // Display only every 3rd date
                    return index % 3 === 0 ? new Date(value).toLocaleDateString() : '';
                  }
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Close Price',
                  color: 'white' // Change the color of the y-axis title
                },
                ticks: {
                  color: 'white', // Change the color of the y-axis labels
                  callback: function (value) {
                    return value.toFixed(4); // Display up to 4 decimal places on Y-axis labels
                  }
                }
              }
            },
            elements: {
              point: {
                radius: 0
              },
              line: {
                tension: 0
              }
            },
            layout: {
              padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }
            }
          }
    });

    // chart 4
    const ctx4 = document.getElementById('stockChart4').getContext('2d');
    ctx4.canvas.style.zIndex = '1';
    const lineChart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: chartData4.map(row => row[0]),
            datasets: [{
                label: '',
                data: chartData4.map(row => parseFloat(row[4])),
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1,
                fill: true
            }]
        },
        // continue with other chart options...
        options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true, // Enable tooltips
                mode: 'index', // Display data for all data points of the same index (same date)
                intersect: false, // Show data even if not directly over the data point
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y.toFixed(2); // Display up to 4 decimal places
                    return `${label}: ${value}`;
                  },
                  title: function (context) {
                    return 'Date: ' + context[0].formattedValue;
                  }
                }
              }
            },
            scales: {
              x: {
                display: false,
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                display: false,
                title: {
                  display: true,
                  text: 'Close Price'
                },
                ticks: {
                  callback: function (value) {
                    return value.toFixed(4); // Display up to 4 decimal places on Y-axis labels
                  }
                }
              }
            },
            elements: {
              point: {
                radius: 0
              },
              line: {
                tension: 0
              }
            },
            layout: {
              padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }
            }
          }
    });

    // jQuery for clicking events
    $("li").click(function() {
        $("li").removeClass("clicked");
        $(this).addClass("clicked");
    });

    $(".side-navbar ul li a").click(function(){
        $(".side-navbar ul li a").removeClass("clicked");
        $(this).addClass("clicked");
    });

    // For description expansion
    $(".view-more").on("click", function() {
        var $button = $(this);
        var $contentShort = $button.prevAll(".content-short");
        var $contentFull = $button.prevAll(".content-full");
        var $companyLogo = $(".company-logo2");

        if ($contentShort.is(":visible")) {
            $contentShort.hide();
            $contentFull.show();
            $companyLogo.hide();
            $button.text("View Less");
        } else {
            $contentShort.show();
            $contentFull.hide();
            $companyLogo.show();
            $button.text("View More");
        }
    });

    $(window).scroll(function() {
      // var topProfileHeight = $('#top-profile').outerHeight();
      var topProfileHeight = window.innerHeight * 0.20;
      var scrollPos = $(window).scrollTop();
  
      if (scrollPos > topProfileHeight) {
          $('#navbar-side-logo').show();
      } else {
          $('#navbar-side-logo').hide();
      }
  });



});
