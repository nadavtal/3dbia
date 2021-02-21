export const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(225, 204,230, .3)",
      borderColor: "rgb(205, 130, 158)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(184, 185, 210, .3)",
      borderColor: "rgb(35, 26, 136)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(35, 26, 136)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220, 1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]

};


export const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 16
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(255, 255, 255, 0.2)'
          },
          ticks: {
            fontColor: '#fff'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(255, 255, 255, 0.2)'
          },
          ticks: {
            fontColor: '#fff'
          }
        }
      ]
    }
  };

export const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 12, 4],
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: '#fff',
      borderWidth: 1
    }
  ]
};

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'white',
      fontSize: 18
    }
  },
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          fontColor: '#fff'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          fontColor: '#fff'
        }
      }
    ]
  }
};

export const doughnutChartData = {
  labels: ['March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [240, 50, 130, 40],
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5']
    }
  ]
};

export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'black'
    }
  }
};

export const pieChartData = {
  labels: ['March', 'April', 'May', 'June'],

  datasets: [
    {
      data: [307, 123, 613, 208],
      backgroundColor: ['#F7464A', '#46BFBD', '#42c9ff', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#66d3ff', '#FFC870']
    }
  ]
};

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'white',
      fontSize: 18
    }
  }
};
export const radarChartData = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [
    {
      label: 'My First dataset',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [65, 59, 90, 81, 56, 55, 40]
    }
  ]
};
export const radarChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'white'
    }
  }
};

export const polarChartData = {
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
  datasets: [
    {
      data: [300, 50, 100, 40, 120],
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: [
        '#FF5A5E',
        '#5AD3D1',
        '#FFC870',
        '#A8B3C5',
        '#616774'
      ]
    }
  ]
};
  