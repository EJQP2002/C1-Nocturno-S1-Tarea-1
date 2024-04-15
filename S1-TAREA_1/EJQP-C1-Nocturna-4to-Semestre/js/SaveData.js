document.addEventListener('DOMContentLoaded', () => {

    const notificationDiv = document.createElement("div");
    notificationDiv.classList.add("notification");
    document.body.appendChild(notificationDiv);

    const btnSave = document.getElementById("btnSave");
    btnSave.addEventListener('click', (event) => {
        event.preventDefault();
        const filledFields = checkInputs();
        if (filledFields) {
            storeData();
            notifyUser("Guardar Datos✅");
            clearInputs();
        } else {
            notifyUser("Agregar Datos⚠️");
        }
    });

    function storeData() {
        const fields = ["nameLastname", "age", "user", "password"];
        const data = {};
        fields.forEach(field => {
            data[`KEY_${field}`] = document.getElementById(field).value;
        });
        const KEY_Stored_Information = JSON.parse(localStorage.getItem('KEY_Stored_Information')) || [];
        KEY_Stored_Information.push(data);
        localStorage.setItem('KEY_Stored_Information', JSON.stringify(KEY_Stored_Information));
    }

    function notifyUser(message) {
        const notification = document.querySelector(".notification");
        notification.textContent = message;
        notification.style.opacity = "1";
        setTimeout(() => {
            notification.style.opacity = "0";
        }, 3000);
    }

    function checkInputs() {
        const fields = ["nameLastname", "age", "user", "password"];
        return fields.every(field => {
            const fieldValue = document.getElementById(field)?.value?.trim() || '';
            return fieldValue !== "";
        });
    }

    function clearInputs() {
        const inputIds = ["nameLastname", "age", "user", "password"];
        inputIds.forEach(id => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.value = "";
            }
        });
    }
});
