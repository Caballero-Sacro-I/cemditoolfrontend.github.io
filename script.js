document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado y parseado.");

    // URL de embed de Power BI
    const embedUrl = "https://app.powerbi.com/view?r=eyJrIjoiNzI1ZGIzZWMtYjQ1Zi00ZmQ3LWE0MGQtNzQ1NzdhODFiYWUzIiwidCI6IjUzOWIzYWNkLTE1MDQtNGUzNC1iODVjLTAyNGFlMTc4OTQxZCIsImMiOjR9";


    const models = window['powerbi-client'].models;
    const config = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: "539b3acd-1504-4e34-b85c-024ae178941d", // El token generado
        embedUrl: embedUrl,
        id: "9d8ba5cf-b67c-44f0-9f39-4ba871ff3ca3", // El ID del informe
        permissions: models.Permissions.All,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
        }
    };

    const reportContainer = document.getElementById('reportContainer');
    console.log("reportContainer:", reportContainer);

    if (reportContainer) {
        const report = powerbi.embed(reportContainer, config);
        console.log("Reporte embebido exitosamente.");

        // Forzar la actualización del informe embebido
        report.refresh().then(() => {
            console.log("Informe actualizado.");
        }).catch(error => {
            console.error("Error al actualizar el informe:", error);
        });
    } else {
        console.error("No se pudo encontrar el contenedor del reporte.");
    }
});




document.getElementById('logoutButton').addEventListener('click', () => {
    // Detener el proceso de Power BI
    const reportContainer = document.getElementById('reportContainer');
    if (reportContainer) {
        powerbi.reset(reportContainer); // Limpia el contenedor del reporte embebido
        console.log("Proceso de Power BI detenido.");
    }

    // Prevenir el uso del botón de retroceso para volver a esta página
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = 'index.html';
});