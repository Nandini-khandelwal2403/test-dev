window.onload = function () {
    // bring all verified activities of every user
    axios({
        method: 'get',
        url: location.protocol + '//' + location.host + '/api/verified/activities'
    }).then((res) => {
        console.log(res);
        const activities = res.data;
        console.log(activities);
        let arr_time = [0, 0, 0, 0, 0];
        let arr_people = [0, 0, 0, 0, 0];
        let mapDateAndPeople = {}; // map to store date and people helped

        activities.forEach((activity) => {
            if(activity.work == "Food") {
                arr_time[0] += activity.hours;
                arr_people[0] += activity.peoplehelped;
            }else if(activity.work == "Clothes") {
                arr_time[1] += activity.hours;
                arr_people[1] += activity.peoplehelped;
            }else if(activity.work == "Education") {
                arr_time[2] += activity.hours;
                arr_people[2] += activity.peoplehelped;
            }else if(activity.work == "Medical") {
                arr_time[3] += activity.hours;
                arr_people[3] += activity.peoplehelped;
            }else if(activity.work == "Other") {
                arr_time[4] += activity.hours;
                arr_people[4] += activity.peoplehelped;
            }
            let date = activity.date;
            date = date.substring(0, 10);
            if(mapDateAndPeople[date]) {
                mapDateAndPeople[date] += activity.peoplehelped;
            }else{
                mapDateAndPeople[date] = activity.peoplehelped;
            }
        })
        console.log(arr_time);

        const ctx1 = document.getElementById('myBarChart');

        new Chart(ctx1, {
            type: 'bar',
            data: {
            labels: ['Food Distribution', 'Clothes Distribution','Education Distribution', 'Medical', 'Others'],
            datasets: [{
                label: 'Time spent in hours',
                data: arr_time,
                borderWidth: 0.5,
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time spent in hours'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Activity'
                        }
                    }
                }
            }
        });

        const ctx2 = document.getElementById('myPieChart');

        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: [
                  'Food Distribution',
                  'Clothes Distribution',
                  'Education Distribution',
                  'Medical',
                  'Others'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: arr_people,
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(50,205,50)',
                    'rgb(255, 159, 64)'
                  ],
                  hoverOffset: 4
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 25
                            }
                        }
                    }
                }
            }
        });

        ctx3 = document.getElementById('myLineChart');

        // store date and people helped in array
        const sortObj = Object.keys(mapDateAndPeople).sort().reduce(
            (obj, key) => { 
              obj[key] = mapDateAndPeople[key]; 
              return obj;
            }, 
            {}
        );

        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: Object.keys(sortObj),
                datasets: [{
                  label: 'My First Dataset',
                  data: Object.values(sortObj),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 25
                            }
                        }
                    }
                }
            }
        });
                
    })
}










