

let rooms = {};
let employeeData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded JSON:", data); 
    const rooms = data.rooms;
    const employees = data.employeeData;
  })
  .catch(error => console.error("Error loading JSON:", error));



function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function simulateAccess(employees) {
    const accessLog = {}; 
    const results = [];

    const sortedEmployees = [...employees].sort((a, b) => 
        timeToMinutes(a.request_time) - timeToMinutes(b.request_time)
    );

    sortedEmployees.forEach(employee => {
        const room = rooms[employee.room];
        const requestMinutes = timeToMinutes(employee.request_time);
        const employeeRoomKey = `${employee.id}_${employee.room}`;
        
        let status = "Granted";
        let reason = `Access granted to ${employee.room}`;

        if (employee.access_level < room.level) {
            status = "Denied";
            reason = "Access level insufficient";
        }
        else if (requestMinutes < timeToMinutes(room.open) || 
                 requestMinutes > timeToMinutes(room.close)) {
            status = "Denied";
            reason = "Room closed at request time";
        }
        else if (accessLog[employeeRoomKey]) {
            const timeSinceLastAccess = requestMinutes - accessLog[employeeRoomKey];
            if (timeSinceLastAccess < room.cooldown) {
                status = "Denied";
                reason = `Cooldown period active (${room.cooldown} min required)`;
            }
        }

        if (status === "Granted") {
            accessLog[employeeRoomKey] = requestMinutes;
        }

        results.push({
            id: employee.id,
            room: employee.room,
            request_time: employee.request_time,
            status: status,
            reason: reason
        });
    });

    return results;
}

function displayRoomRules() {
    const tbody = document.getElementById('roomRulesTable');
    tbody.innerHTML = '';
    
    Object.entries(rooms).forEach(([roomName, rules]) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${roomName}</td>
            <td>${rules.level}</td>
            <td>${rules.open}</td>
            <td>${rules.close}</td>
            <td>${rules.cooldown}</td>
        `;
    });
}

function displayEmployeeData() {
    const tbody = document.getElementById('employeeTable');
    tbody.innerHTML = '';
    
    employeeData.forEach(employee => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.access_level}</td>
            <td>${employee.request_time}</td>
            <td>${employee.room}</td>
        `;
    });
}

function displayResults(results) {
    const tbody = document.getElementById('resultsTable');
    const section = document.getElementById('resultsSection');
    
    tbody.innerHTML = '';
    
    results.forEach(result => {
        const row = tbody.insertRow();
        const statusClass = result.status === "Granted" ? "granted" : "denied";
        
        row.innerHTML = `
            <td>${result.id}</td>
            <td>${result.room}</td>
            <td>${result.request_time}</td>
            <td class="${statusClass}">${result.status}</td>
            <td>${result.reason}</td>
        `;
    });
    
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            rooms = data.rooms;
            employeeData = data.employeeData;

            displayRoomRules();
            displayEmployeeData();

            document.getElementById('simulateBtn').addEventListener('click', () => {
                const results = simulateAccess(employeeData);
                displayResults(results);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
