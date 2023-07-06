window.onload = function () {
    
    if (localStorage.getItem('selfName')) {
        displayProfile();
    }

    axios({
        method: 'get',
        url: location.protocol + '//' + location.host + '/api/coordinator/activities/'
    }).then((res) => {
        console.log(res);
        const activities = res.data;
        console.log(activities);
        activities.forEach((activity) => {
            const template = document.querySelector('template[data-template="act-unverified"]');
            let clone = template.content.cloneNode(true);

            clone.querySelector('.unverified').dataset.id = activity._id;
            clone.querySelector('.act-name').innerHTML = activity.activity;
            clone.querySelector('.act-hours').innerHTML = activity.hours;
            clone.querySelector('.act-did').innerHTML = activity.work;
            clone.querySelector('.act-helped').innerHTML = activity.peoplehelped;
            clone.querySelector('.act-date').innerHTML = activity.date;
            document.querySelector('.containUnverifiedActivity').appendChild(clone);
        })
        
        const unverifiedActivities = document.querySelectorAll('.unverified');
        unverifiedActivities.forEach((activity) => {
            const verify = activity.querySelector('.verify');
            console.log("verify");
            verify.addEventListener('click', (e) => {
                console.log(activity.dataset.id);
                axios({
                    method: 'post',
                    url: location.protocol + '//' + location.host + '/api/coordinator/verify/' + activity.dataset.id
                }).then((res) => {
                    console.log(res);
                    location.reload();
                })
            })

            const deleteActivity = activity.querySelector('.delete');
            deleteActivity.addEventListener('click', (e) => {
                console.log(e.target.dataset.id);
                axios({
                    method: 'delete',
                    url: location.protocol + '//' + location.host + '/api/coordinator/delete/' + activity.dataset.id
                }).then((res) => {
                    console.log(res);
                    location.reload();
                })
            })

        })
    })

    
}

function displayProfile() {
    console.log("displaying")
    document.querySelector(".username").innerHTML = localStorage.getItem("selfName");
    document.querySelector(".usernumber").innerHTML = localStorage.getItem("selfNumber");
    document.querySelector(".useremail").innerHTML = localStorage.getItem("selfEmail");
    document.querySelector(".useraddress").innerHTML = localStorage.getItem("selfAddress");
    document.querySelector(".userage").innerHTML = localStorage.getItem("selfAge");
    if(localStorage.getItem("identity") == "coordinator"){
        document.querySelector(".useridentity").innerHTML = "Coordinator";
    }else if(localStorage.getItem("identity") == "volunteer"){
        document.querySelector(".useridentity").innerHTML = "Volunteer";
    }else{
        document.querySelector(".useridentity").innerHTML = "Admin";
    }
    console.log("displayed")
}