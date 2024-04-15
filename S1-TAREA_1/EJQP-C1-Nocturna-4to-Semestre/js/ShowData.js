document.addEventListener('DOMContentLoaded', () => {
    displayData();
});

function displayData() {
    const storedData = JSON.parse(localStorage.getItem('KEY_Stored_Information')) || [];
    const tableBody = document.querySelector("#dataTable tbody");

    tableBody.innerHTML = "";

    storedData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.KEY_nameLastname}</td>
            <td>${data.KEY_age}</td>
            <td>${data.KEY_user}</td>
            <td class="masked" data-original-password="${data.KEY_password}">${maskPassword(data.KEY_password)}</td>
            <td>
            <button onclick="revealPassword(this)">Ver Contraseña</button>
            </td>
            <td>     
            <button onclick="deleteRow(${index})">Eliminar</button>  
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function maskPassword(password) {
    return password.replace(/./g, '*');
}

function revealPassword(button) {
    const row = button.parentNode.parentNode;
    const passwordCell = row.querySelector(".masked");
    const originalPassword = passwordCell.dataset.originalPassword;
    passwordCell.textContent = originalPassword;
}

function deleteRow(index) {
    const storedData = JSON.parse(localStorage.getItem('KEY_Stored_Information')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('KEY_Stored_Information', JSON.stringify(storedData));
    displayData();
}
